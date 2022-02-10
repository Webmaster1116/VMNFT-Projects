import { Fragment } from 'react';
import Head from 'next/head';

import { Header, Welcome, AboutUs, FoundersAndTeam, Mint, Rewards, Roadmap, FAQs, Footer } from '../components';

import type { NextPage } from 'next';

import styles from '../styles/pages/Index.module.css';



const Home: NextPage = () => {
	return (
		<Fragment>
			<Head>
				<title>Vending Machines NFT</title>

				<meta name='viewport' content='width=device-width,initial-scale=1.0' />

				<link rel='icon' href='/favicon.ico' />

				<meta name='description' content='4444 unique Vending Machine NFTs have been introduced to the Avalanche network. We are here to establish a strong and dedicated community that will work together to benefit from being a part of the VMN community.' />

				<meta property='og:type' content='website' />
				<meta property='og:image' content='https://vendingmachinesnft.io/icons/logo.png' />
				<meta property='og:description' content='4444 unique Vending Machine NFTs have been introduced to the Avalanche network. We are here to establish a strong and dedicated community that will work together to benefit from being a part of the VMN community.' />

				<meta name='twitter:card' content='summary_large_image' />
				<meta name='twitter:site' content='@VendMachineNFT' />
				<meta property='twitter:image' content='https://vendingmachinesnft.io/icons/logo.png' />
				<meta property='twitter:description' content='4444 unique Vending Machine NFTs have been introduced to the Avalanche network. We are here to establish a strong and dedicated community that will work together to benefit from being a part of the VMN community.' />
			</Head>


			<Header />

			<main className={styles.main}>
				<Mint />
			</main>

			<Footer />
		</Fragment>
	);
}


export default Home;