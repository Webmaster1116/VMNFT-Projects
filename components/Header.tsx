import { FunctionComponent } from "react";

import * as gtag from "../lib/gtag";

import styles from "../styles/components/Header.module.css";

const Header: FunctionComponent = () => {
  function clickedLink(event: React.MouseEvent) {
    gtag.event({
      action: "clicked_link",
      category: "engagement",
      label: "User clicked on a link",
      value: event.currentTarget.textContent || "unknown",
    });
  }

  return (
    <header className={styles.header}>
      <img src="/icons/logo.png" alt="Logo" />

      <nav>
        <ul className={styles.navBar}>
          <li>
            <a
              href="https://www.vendingmachinesnft.io/#about-us"
              target="_blank"
              rel="noreferrer"
              className={styles.navBarItem}
              title="About Us"
              onClick={clickedLink}
            >
              About Us
            </a>
          </li>
          <li>
            <a
              href="https://www.vendingmachinesnft.io/#mint"
              target="_blank"
              rel="noreferrer"
              className={styles.navBarItem}
              title="Mint"
              onClick={clickedLink}
            >
              Mint
            </a>
          </li>
          <li>
            <a
              href="https://www.vendingmachinesnft.io/#rewards"
              target="_blank"
              rel="noreferrer"
              className={styles.navBarItem}
              title="Rewards"
              onClick={clickedLink}
            >
              Rewards
            </a>
          </li>
          <li>
            <a
              href="https://www.vendingmachinesnft.io/#founders-and-team"
              target="_blank"
              rel="noreferrer"
              className={styles.navBarItem}
              title="Founders"
              onClick={clickedLink}
            >
              Founders
            </a>
          </li>
          <li>
            <a
              href="https://medium.com/@VMNFT/vending-machines-nft-37698ecd5ba6"
              target="_blank"
              rel="noreferrer"
              className={styles.navBarItem}
              title="Read the VMN whitepaper on Medium"
              onClick={clickedLink}
            >
              Whitepaper
            </a>
          </li>
          <li>
            <a
              href="https://www.vendingmachinesnft.io/#roadmap"
              target="_blank"
              rel="noreferrer"
              className={styles.navBarItem}
              title="Roadmap"
              onClick={clickedLink}
            >
              Roadmap
            </a>
          </li>
          <li>
            <a
              href="https://www.vendingmachinesnft.io/#faqs"
              target="_blank"
              rel="noreferrer"
              className={styles.navBarItem}
              title="FAQs"
              onClick={clickedLink}
            >
              FAQs
            </a>
          </li>

          <li>
            <a
              href="https://market.vendingmachinesnft.io"
              target="_blank"
              rel="noreferrer"
              className={styles.navBarItem}
              title="Trade on the official VMN marketplace to receive 50% on the royalties"
              onClick={clickedLink}
            >
              Marketplace
            </a>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
