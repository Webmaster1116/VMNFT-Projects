import type { BigNumber } from 'ethers';


interface ContractInfo  {
	maxSupply: number;
	currentSupply: number;
	cost: BigNumber;
	maxMintAmountPerTX: number;
	totalRewards: number;
}


export default ContractInfo;