import { FunctionComponent } from 'react';

import IconButton from './base/IconButton';
import * as gtag from '../lib/gtag';

import styles from '../styles/components/Footer.module.css';


const Footer: FunctionComponent = () => {
	function clickedLink(event: React.MouseEvent<HTMLAnchorElement>) {
		gtag.event({
			action: 'clicked_link',
			category: 'engagement',
			label: 'User clicked on a link',
			value: event.currentTarget.dataset.linkName || 'unknown'
		});
	}


	return (
		<footer className={styles.footer}>
			<div className={styles.contactUs}>
				<div>Official <a href='https://medium.com/@VMNFT/vending-machines-nft-37698ecd5ba6' target='_blank' rel='noreferrer'>whitepaper</a> and <a href='https://market.vendingmachinesnft.io' target='_blank' rel='noreferrer'>marketplace</a></div>

				<div>Contact us via email: vendingmachinenft@gmail.com</div>
			</div>

			<div className={styles.socials}>
				<IconButton href='https://discord.com/invite/vmnft' target='_blank' rel='noreferrer' data-link-name='Discord' onClick={clickedLink}>
					<img src='/icons/discord.png' alt='Discord' />
				</IconButton>

				<IconButton href='https://twitter.com/VendMachineNFT' target='_blank' rel='noreferrer' data-link-name='Twitter' onClick={clickedLink}>
					<img src='/icons/twitter.png' alt='Twitter' />
				</IconButton>

				<IconButton href='https://www.instagram.com/vendingmachinenft' target='_blank' rel='noreferrer' data-link-name='Instagram' onClick={clickedLink}>
					<img src='/icons/instagram.png' alt='Instagram' />
				</IconButton>

				<IconButton href='https://www.youtube.com/channel/UC9oL-ytLbFDcn_kve-w9_dw' target='_blank' rel='noreferrer' data-link-name='YouTube' onClick={clickedLink}>
					<img src='/icons/youtube.png' alt='YouTube' />
				</IconButton>
			</div>

			<h3>2021 Copyrights © Vending Machines NFT. All rights reserverd.</h3>
		</footer>
	);
}


export default Footer;