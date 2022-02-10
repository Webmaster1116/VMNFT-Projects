import { Fragment, useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Script from 'next/script';

import { WalletContext, ContractInfoContext } from '../context';
import { contract1, contract2 } from '../lib/web3';
import * as gtag from '../lib/gtag';

import ABI1 from '../lib/ABI1.json';
import ABI2 from '../lib/ABI2.json';

import type { Web3Window, WalletInfo, ContractInfo } from '../interfaces';
import { BigNumber, ethers } from 'ethers';
import type { AppProps } from 'next/app';

import '../styles/globals.css';


declare const window: Web3Window;


const App = ({ Component, pageProps }: AppProps) => {
	const [wallet, setWallet] = useState<WalletInfo>({ address: '', signer: null, contract1: null, contract2: null, contract3: null });
	const [contractInfo1, setContractInfo1] = useState<ContractInfo | null>(null);
	const [contractInfo2, setContractInfo2] = useState<ContractInfo | null>(null);

	const router = useRouter();


	useEffect(() => {
		const handleRouteChange = (url: string) => gtag.pageview(url);

		router.events.on('routeChangeComplete', handleRouteChange);

		return () => router.events.off('routeChangeComplete', handleRouteChange);
	}, [router.events]);

	useEffect(() => {
		async function loginUser() {
			const { ethereum } = window;
			if (typeof ethereum === 'undefined') return;


			const provider = new ethers.providers.Web3Provider(ethereum);
			const signer = provider.getSigner(0);
			const contract1 = new ethers.Contract(process.env.NEXT_PUBLIC_CONTRACT_ADDRESS1!, ABI1, signer);
			const contract2 = new ethers.Contract(process.env.NEXT_PUBLIC_CONTRACT_ADDRESS2!, ABI2, signer);
			// const contract3 = new ethers.Contract(process.env.NEXT_PUBLIC_CONTRACT_ADDRESS1!, ABI1, signer);

			const [accounts, chainID] = await Promise.all([
				provider.listAccounts(),
				signer.getChainId()
			]);

			if (!accounts || ethers.utils.hexlify(chainID) !== process.env.NEXT_PUBLIC_CHAIN_ID!) return;


			setWallet({ address: accounts[0], signer, contract1, contract2, contract3: null });


			ethereum.on('accountsChanged', (accounts: string[]) => {
				setWallet(wallet => {
					wallet.address = accounts[0];
					wallet.signer = provider.getSigner(0);

					return wallet;
				});
			});

			ethereum.on('disconnect', () => setWallet({ address: '', signer: null, contract1: null, contract2: null, contract3: null }));
		}

		loginUser();


		async function fetchContractInfo() {
			let [maxSupply, currentSupply, cost, maxMintAmountPerTX, totalRewards] = await Promise.all([
				contract1.maxSupply(),
				contract1.totalSupply(),
				contract1.cost(),
				contract1.maxMintAmountPerTX(),
				contract1.totalRewardsVault(),
			]) as [BigNumber, BigNumber, BigNumber, BigNumber, BigNumber];

			setContractInfo1({
				maxSupply: maxSupply.toNumber(),
				currentSupply: currentSupply.toNumber(),
				cost,
				maxMintAmountPerTX: maxMintAmountPerTX.toNumber(),
				totalRewards: Number(ethers.utils.formatUnits(totalRewards, 'ether')),
			});


			[maxSupply, currentSupply, cost, maxMintAmountPerTX, totalRewards] = await Promise.all([
				contract2.maxSupply(),
				contract2.totalSupply(),
				contract2.cost(),
				contract2.maxMintAmountPerTX(),
				contract2.totalRewardsVault(),
			]) as [BigNumber, BigNumber, BigNumber, BigNumber, BigNumber];

			setContractInfo2({
				maxSupply: maxSupply.toNumber(),
				currentSupply: currentSupply.toNumber(),
				cost,
				maxMintAmountPerTX: maxMintAmountPerTX.toNumber(),
				totalRewards: Number(ethers.utils.formatUnits(totalRewards, 'ether')),
			});
		}

		fetchContractInfo();
		setInterval(fetchContractInfo, 10000);
	}, []);


	return (
		<Fragment>
			<Script strategy='afterInteractive' src={`https://www.googletagmanager.com/gtag/js?id=${gtag.GA_TRACKING_ID}`} />

			<Script
				id='gtag-init'
				strategy='afterInteractive'
				dangerouslySetInnerHTML={{
					__html: `window.dataLayer = window.dataLayer || [];
							function gtag() { dataLayer.push(arguments); }

							gtag('js', new Date());

							gtag('config', '${gtag.GA_TRACKING_ID}', {
								page_path: window.location.pathname,
							});`
				}}
			/>

			<ContractInfoContext.Provider value={{ contractInfo1, setContractInfo1, contractInfo2, setContractInfo2 }}>
				<WalletContext.Provider value={{ wallet, setWallet }}>
					<Component {...pageProps} />
				</WalletContext.Provider>
			</ContractInfoContext.Provider>
		</Fragment>
	);
}


export default App;