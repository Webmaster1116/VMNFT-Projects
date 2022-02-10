import { ethers } from 'ethers';

import ABI1 from './ABI1.json';
import ABI2 from './ABI2.json';


const provider = new ethers.providers.JsonRpcProvider({ url: 'https://api.avax.network/ext/bc/C/rpc', timeout: 30000 });
const contract1 = new ethers.Contract(process.env.NEXT_PUBLIC_CONTRACT_ADDRESS1!, ABI1, provider);
const contract2 = new ethers.Contract(process.env.NEXT_PUBLIC_CONTRACT_ADDRESS2!, ABI2, provider);


export { provider, contract1, contract2 };