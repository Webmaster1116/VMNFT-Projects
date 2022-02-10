import type { JsonRpcSigner } from '@ethersproject/providers/src.ts/json-rpc-provider';
import type { Contract } from 'ethers';



interface WalletInfo  {
	address: string;
	signer: JsonRpcSigner | null;
	contract1: Contract | null;
	contract2: Contract | null;
	contract3: Contract | null;
}


export default WalletInfo;