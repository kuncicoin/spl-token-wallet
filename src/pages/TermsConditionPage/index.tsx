import Footer from '../../components/LandingPage/Footer';
import Anchor from '../../components/Legal/Anchor';
import Navbar from '../../components/Legal/Navbar';
import Sidebar from '../../components/Legal/Sidebar';
import styles from './TermsConditionPage.module.css';

const TermsConditionPage = () => {
  return (
    <div className={styles.container}>
      <Navbar />

      <div className={styles.content}>
        <Sidebar />
        <article className={styles.article}>
          <header>
            <h1>Terms and Conditions</h1>
            <p>
              Last Update: <span>09/03/2022</span>
            </p>
          </header>

          <h2>GENERAL RULES AND TERMS AND CONDITIONS of KUNCIWALLET.COM</h2>
          <section style={{ marginBottom: '10px' }} />
          <h2>Dear USER:</h2>
          <section style={{ marginBottom: '10px' }} />
          <h2>
            Before accessing and using kunciwallet.com, we recommend that you
            read the General Rules and Terms and Conditions first. By accessing
            and using this kunciwallet.com, you agree toF be bound by the
            General Rules and these Terms and Conditions. Terms and conditions
            may change from time to time without notice in advance before the
            changes take effect.
          </h2>

          <section style={{ marginBottom: '30px' }} />
          <h2>A. DEFINITION</h2>
          <p>
            A cryptocurrency wallet is a device, physical medium, program or a
            service which stores the public and/or private keys for
            cryptocurrency transactions. A cryptocurrency wallet more often also
            offers the functionality of encrypting and/or signing information.
            Kunciwallet.com allows users to store, keep, receive, swap, migrate,
            and send, and also deposit their cryptocurrencies to other wallets
            using secret phrases to secure the cryptocurrencies transaction.
          </p>

          <section style={{ marginBottom: '30px' }} />

          <h2>B. TERMS OF USE OF KUNCIWALLET.COM</h2>
          <ul>
            <li>
              Users must create a wallet to use kunciwallet.com services by
              following the instructions inside the webpages.
            </li>
            <li>
              Kunciwallet.com is the only verified webpage that allows users to
              use kunciwallet.com services. Kunciwallet.com doesn't take any
              responsibility for any activities that have been conducted outside
              of the verified webpages.
            </li>
            <li>
              Kunciwalllet.com never saves or stores the secret phrase and
              password. The loss of them will be underwritten by the user.
            </li>
            <li>
              Kunciwallet.com allows users to store and keep certain
              cryptocurrencies by default. Adding another token that has been
              listed may cost the user a certain amount of fee that has been
              mentioned on the webpages.
            </li>

            <li>
              Kunciwallet.com allows users to swap their cryptocurrencies to
              other cryptocurrencies.
            </li>

            <li>
              Kunciwallet.com allows users to receive cryptocurrencies from
              other wallets.
            </li>

            <li>
              Users may migrate their current wallet to another wallet by
              following the instructions on the website.
            </li>

            <li>
              By using kunciwallet.com services, users agree and comply with the
              Terms and Conditions.
            </li>
          </ul>

          <section style={{ marginBottom: '30px' }} />

          <h2>C. Gas (dummy)</h2>
          <p>
            The term can be considered analogous to the gas that powers an
            engine: it's the fluctuating, occasionally expensive cost of
            operation. More complex smart contracts require more gas to power
            their computation, just as a bigger, more powerful car takes more
            gas to run.
          </p>
          <section style={{ marginBottom: '30px' }} />

          <p>
            The method for calculating gas fees varies depending on the network.
            For example, calculating gas on Ethereum used to be very
            complicated, but was considerably simplified with the implementation
            of Ethereum Improvement Protocol (EIP) 1559 in August 2021.
            Essentially, you pay a base fee for every unit of gas, which is
            burned, or disappears, upon successful completion of the
            transaction. On top of the base fee, you add a priority fee, again
            per unit of gas, the value of which depends on how quickly you want
            the transaction to go through.
          </p>
          <section style={{ marginBottom: '30px' }} />

          <p>
            Across the broad range of EVM-compatible networks available, gas, or
            similarly-functioning alternatives, have essentially become the
            standard method of calculating transaction costs. Fees are paid in
            the network's native token: for example, any transaction on Ethereum
            requires ETH; using BSC requires BNB; using Polygon requires MATIC.
            Some networks have adopted Ethereum's EIP-1559 model wholesale, such
            as Polygon, whilst others have made adjustments, including
            Avalanche, for their C-Chain.
          </p>

          <section style={{ marginBottom: '30px' }} />

          <h2>D. RISK WARNING</h2>

          <ul>
            <li>
              Crypto Asset Trading is a high-risk activity. Cryptocurrencies are
              volatile, where prices can change significantly over time. In
              connection with price fluctuations, the value of Cryptocurrencies
              can increase or decrease significantly at any time. All Crypto
              Assets or not, have the potential to experience a change in the
              value drastically or even become meaningless. There is a high risk
              of loss as a result of buying, selling or trading anything on the
              market and kunciwallet.com is not responsible for changes in
              fluctuations in the cryptocurrencies exchange rate.
            </li>

            <li>
              Crypto Asset Trading also has additional risks not experienced by
              Crypto Asset or other commodities on the market. Unlike most
              currencies guaranteed by government or other legal institutions or
              by gold and silver, Crypto assetare a unique Crypto Asset and is
              guaranteed by the technology and trust. There is no central bank
              that can control, protect the value of Crypto Asset in a crisis,
              or print the currency.
            </li>

            <li>
              Member/Verified Member is encouraged to be careful in measuring
              their financial situation and ensure that the Member/Verified
              Member is willing to face risks involved in selling, buying or
              trading Crypto Asset. Member/Verified Member is strongly advised
              to carry out personal research before making a decision to trade
              Crypto Asset. All decisions on trading Crypto Asset are
              independent decisions by the users, consciously without coercion
              and the release of kunciwallet.com for trading activities in
              Crypto Asset.
            </li>

            <li>
              Kunciwallet.com does not guarantee the long-term sustainability of
              Crypto Asset traded or exchanged.
            </li>

            <li>
              As long as kunciwallet.com has carried out all its obligations in
              accordance with applicable laws and regulations relating to the
              occurrence of Force Majeure, kunciwallet.com will not provide
              compensation and/or liability in any form to the Member/Verified
              Member or any other parties for any risks, responsibilities and
              demands anything that may arise in connection with the delay or
              failure to carry out obligations due to Force Majeure.
            </li>
          </ul>

          <Anchor />
        </article>
      </div>

      <Footer />
    </div>
  );
};

export default TermsConditionPage;
