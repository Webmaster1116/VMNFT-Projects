import { FunctionComponent, useState, useContext, useEffect } from 'react';
import { BigNumber, ethers } from 'ethers';

import Button from './base/Button';
import { WalletContext, ContractInfoContext } from '../context';
import * as gtag from '../lib/gtag';

import ABI1 from '../lib/ABI1.json';
import ABI2 from '../lib/ABI2.json';

import type { ContractInfo, Web3Window } from '../interfaces';

import styles from '../styles/components/Mint.module.css';


declare const window: Web3Window;


const Mint: FunctionComponent = () => {
	const [amount, setAmount] = useState(1);

	const { wallet, setWallet } = useContext(WalletContext);
	const { contractInfo1, contractInfo2 } = useContext(ContractInfoContext);

	const [usersRewards, setUsersRewards] = useState<{ rewards1: BigNumber, rewards2: BigNumber, rewards3: BigNumber } | null>(null);


	async function mint(NFTNum: number) {
		const { signer, contract1, contract2, contract3 } = wallet;
		let contract, contractInfo;

		if (NFTNum == 1) {
			contract = contract1;
			contractInfo = contractInfo1;
		} else if (NFTNum == 2) {
			contract = contract2;
			contractInfo = contractInfo2;
		}

		if (!contract || !signer || !contractInfo) return alert('Please connect your wallet!');

		const chainID = await signer.getChainId();
		if (ethers.utils.hexlify(chainID) !== process.env.NEXT_PUBLIC_CHAIN_ID) return alert('Please switch to the Avalanche mainnet!');


		try {
			const value = contractInfo.cost.mul(amount);
			const gas = await contract.estimateGas.mint(amount, { value });

			const receipt = await contract.mint(amount, { value, gasLimit: gas.toString() });
			if (!receipt) return;


			const { status } = await receipt.wait();
			if (status !== 1) return alert('Error, transaction reverted!');


			gtag.event({
				action: 'mint',
				category: 'ecommerce',
				label: 'User minted a token',
				value: amount.toString()
			});


			alert(`Successfully minted ${amount} ${amount === 1 ? 'token' : 'tokens'}`);
			window.location.reload();
		} catch (err: any) {
			if (err.code === 4001) return;

			console.log(err, `Error:\n${err.data?.message || err.message}`)

			alert(`Error:\n${err.data?.message || err.message}`);
		}
	}

	async function claimRewards(NFTNum: number) {
		const { signer, contract1, contract2, contract3 } = wallet;
		let contract, contractInfo;

		if (NFTNum == 1) {
			contract = contract1;
			contractInfo = contractInfo1;
		} else if (NFTNum == 2) {
			contract = contract2;
			contractInfo = contractInfo2;
		}

		if (!contract || !signer || !contractInfo) return alert('Please connect your wallet!');

		const chainID = await signer.getChainId();
		if (ethers.utils.hexlify(chainID) !== process.env.NEXT_PUBLIC_CHAIN_ID) return alert('Please switch to the Avalanche mainnet!');


		try {
			const gas = await contract.estimateGas.claimRewards();

			const receipt = await contract.claimRewards({ gasLimit: gas.toString() });
			if (!receipt) return;


			const { status } = await receipt.wait();
			if (status !== 1) return alert('Error, transaction reverted!');


			gtag.event({
				action: 'claimed_rewards',
				category: 'ecommerce',
				label: 'Claimed rewards',
				value: 1
			});


			alert(`Successfully claimed your sales rewards`);
			window.location.reload();
		} catch (err: any) {
			if (err.code === 4001) return;

			alert(`Error:\n${err.data?.message || err.message}`);
		}
	}

	async function connectWallet() {
		const { ethereum } = window;

		if (typeof ethereum === 'undefined') return alert('Unable to find Metamask!\nPlease make sure that you have the Metamask extension installed!');

		const provider = new ethers.providers.Web3Provider(ethereum);
		const signer = provider.getSigner(0);
		const contract1 = new ethers.Contract(process.env.NEXT_PUBLIC_CONTRACT_ADDRESS1!, ABI1, signer);
		const contract2 = new ethers.Contract(process.env.NEXT_PUBLIC_CONTRACT_ADDRESS2!, ABI2, signer);
		// const contract3 = new ethers.Contract(process.env.NEXT_PUBLIC_CONTRACT_ADDRESS1!, ABI1, signer);

		const accounts = await provider.send('eth_requestAccounts', []);
		if (!accounts) return;


		try {
			await provider.send('wallet_switchEthereumChain', [{ chainId: process.env.NEXT_PUBLIC_CHAIN_ID! }]);
		} catch (err: any) {
			if (err.code === 4001) return alert('Please switch to the Avalanche mainnet!');

			try {
				await provider.send('wallet_addEthereumChain', [
					{
						chainId: process.env.NEXT_PUBLIC_CHAIN_ID!,
						chainName: 'Avalanche Mainnet',
						rpcUrls: ['https://api.avax.network/ext/bc/C/rpc'],
						nativeCurrency: {
							name: 'Avalanche',
							symbol: 'AVAX',
							decimals: 18
						},
						blockExplorerUrls: ['https://snowtrace.io/']
					}
				]);
			} catch (err: any) {
				if (err.code !== 4001) return alert(`Error: ${err.message}`);
			}
		}


		setWallet({ address: accounts[0], signer, contract1, contract2, contract3: null });


		gtag.event({
			action: 'login',
			category: 'engagement',
			label: 'User connected a wallet',
			value: 'MetaMask'
		});
	}


	function incrementAmount() {
		const maxAmount = contractInfo1?.maxMintAmountPerTX || 10;

		if (amount + 1 <= maxAmount) setAmount(amount + 1);
	}

	function decrementAmount() {
		if (amount > 1) setAmount(amount - 1);
	}


	useEffect(() => {
		async function fetchUsersRewards() {
			const { address, contract1, contract2, contract3 } = wallet;
			if (!address || !contract1 || !contract2) return;

			const [rewards1, rewards2, rewards3] = await Promise.all([
				contract1.getRewardsOfAddress(address),
				contract2.getRewardsOfAddress(address),
				contract2.getRewardsOfAddress(address)
			]) as [BigNumber, BigNumber, BigNumber];


			setUsersRewards({
				rewards1,
				rewards2,
				rewards3
			});
		}

		fetchUsersRewards();
	}, [wallet]);


	return (
		<section className={styles.section} id='mint'>
			{contractInfo1 ?
				<div className={styles.panel}>
					<div>
						<img className={styles.image} src="images/1.png" />

						<div className={styles.title}>
							VM Gorillas NFT
						</div>

						<div className={styles.desc}>
							A GIFT NFT - Token of appreciation for believing this project and investing into this idea. Thank you! <br />
							We have long term plans and NFT is just a way to connect us. With strong community we will build amazing things! First of many to come <br /> <br />
							Note: 40% of Mint sales goes to VM Fund!
						</div>
					</div>

					<div>
						<div className={styles.supplyWrapper}>
							<div>Already Minted</div>

							<div>{contractInfo1.currentSupply} / {contractInfo1.maxSupply}</div>
						</div>

						<progress max={contractInfo1.maxSupply} value={contractInfo1.currentSupply} className={styles.progressBar}>{Math.floor(contractInfo1.currentSupply / contractInfo1.maxSupply)}%</progress>

						<div className={styles.mintSection}>
							<div>
								<div className={styles.amountSelector}>
									<button onClick={decrementAmount}>-</button>

									{amount}

									<button onClick={incrementAmount}>+</button>
								</div>

								<div>Cost: <span>{ethers.utils.formatUnits(contractInfo1.cost.mul(amount), 'ether')} AVAX</span></div>
							</div>

							{!!wallet.address
								? <Button onClick={() => { mint(1) }} title='Join the community by minting your own VMN token'>Mint</Button>
								: <Button onClick={connectWallet} title='Connect your MetaMask wallet'>Connect Wallet</Button>
							}
						</div>
						{
							!!usersRewards?.rewards1 &&
							<div className={styles.reward}>
								<div>
									<div>Rewards</div>

									<div className={styles.rewardValue}>{ethers.utils.formatUnits(usersRewards.rewards1, 'ether')}</div>
								</div>

								{usersRewards.rewards1.isZero()
									? <Button title='Not enought AVAX to claim' disabled>Claim</Button>
									: <Button onClick={() => { claimRewards(1) }} title='Claim your rewards in AVAX'>Claim</Button>
								}
							</div>
						}
					</div>
				</div>
				:
				<div className={styles.panel}>
					<img style={{ width: "100%" }} src="images/coming-soon.png" />
				</div>
			}
			{contractInfo2 ?
				<div className={styles.panel}>
					<div>
						<img className={styles.image} src="images/2.png" />

						<div className={styles.title}>
							VM Hats NFT
						</div>

						<div className={styles.desc}>
							Art drawn by our own member!! @beansupreme69 (twitter) <br />
							We are proud to accomplish this and are looking forward to help and work together with all our community members! We keep our promises! <br /><br />
							Note: 40% of Mint sales goes to VM Fund. And 10% Goes to Artist.
						</div>
					</div>

					<div>
						<div className={styles.supplyWrapper}>
							<div>Already Minted</div>

							<div>{contractInfo2.currentSupply} / {contractInfo2.maxSupply}</div>
						</div>

						<progress max={contractInfo2.maxSupply} value={contractInfo2.currentSupply} className={styles.progressBar}>{Math.floor(contractInfo2.currentSupply / contractInfo2.maxSupply)}%</progress>

						<div className={styles.mintSection}>
							<div>
								<div className={styles.amountSelector}>
									<button onClick={decrementAmount}>-</button>

									{amount}

									<button onClick={incrementAmount}>+</button>
								</div>

								<div>Cost: <span>{ethers.utils.formatUnits(contractInfo2.cost.mul(amount), 'ether')} AVAX</span></div>
							</div>

							{!!wallet.address
								? <Button onClick={() => { mint(2) }} title='Join the community by minting your own VMN token'>Mint</Button>
								: <Button onClick={connectWallet} title='Connect your MetaMask wallet'>Connect Wallet</Button>
							}
						</div>
						{
							!!usersRewards?.rewards2 &&
							<div className={styles.reward}>
								<div>
									<div>Rewards</div>

									<div className={styles.rewardValue}>{ethers.utils.formatUnits(usersRewards.rewards2, 'ether')}</div>
								</div>

								{usersRewards.rewards2.isZero()
									? <Button title='Not enought AVAX to claim' disabled>Claim</Button>
									: <Button onClick={() => { claimRewards(2) }} title='Claim your rewards in AVAX'>Claim</Button>
								}
							</div>
						}
					</div>
				</div>
				:
				<div className={styles.panel}>
					<img style={{ width: "100%" }} src="images/coming-soon.png" />
				</div>
			}
			<div className={styles.panel} style={{ marginBottom: "auto" }}>
				<img style={{ width: "100%" }} src="images/coming-soon.png" />
			</div>
		</section>
	);
}


export default Mint;
