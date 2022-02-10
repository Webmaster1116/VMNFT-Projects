import { createContext } from 'react';

import type { ContractInfo } from '../interfaces';



const ContractInfoContext = createContext({
	contractInfo1: null as ContractInfo | null,
	setContractInfo1: (contractInfo1: ContractInfo | null) => {},

	contractInfo2: null as ContractInfo | null,
	setContractInfo2: (contractInfo1: ContractInfo | null) => {}
});


export default ContractInfoContext;