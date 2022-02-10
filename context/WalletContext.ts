import { createContext } from 'react';

import type { WalletInfo } from '../interfaces';



const WalletContext = createContext({
	wallet: {
		address: '',
		signer: null,
		contract1: null,
		contract2: null,
		contract3: null,
	} as WalletInfo,
	setWallet: (wallet: WalletInfo) => {}
});


export default WalletContext;