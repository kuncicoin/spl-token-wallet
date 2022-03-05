import styles from '../LandingPage.module.css';
import Navbar from '../../../components/LandingPage/Navbar';
import Footer from '../../../components/LandingPage/Footer';

const LandingPage = () => {
  return (
    <div className={styles.landingPage}>
      <Navbar />
      <div className={styles.hero}>
        <section>
          <section>
            <h1>
              One wallet to manage <br /> all your crypto asset
            </h1>
            <p>Open up your wallet & start sailing in crypto universe</p>
            <section>
              <img src="/icon/purple-wallet.svg" alt="Create Your Wallet" />
              <p>Create Your Wallet</p>
            </section>
          </section>
          <section>
            <img src="/illustration/hero-image.svg" alt="KunciWallet" />
          </section>
        </section>
      </div>

      <div className={styles.ourValue}>
        <section>
          <section>
            <h1>Our Value</h1>
            <p>
              Convenience, Secure, and Friendly. <br /> Made for Crypto Lovers
            </p>
          </section>

          <section>
            <section>
              <section>
                <h2>Exchange tokens in easy way</h2>
                <p>
                  Now you can send, receive, and swap tokens in just a <br />
                  few clicks, easy peasy!
                </p>
              </section>
              <img src="/illustration/our-value-1.svg" alt="Easy Way" />
            </section>

            <section>
              <section>
                <h2>Super secure transactions</h2>
                <p>
                  Super safe transactions, because we don't collect your <br />
                  funds and personal data.
                </p>
              </section>
              <img src="/illustration/our-value-2.svg" alt="Secure" />
            </section>

            <section>
              <section>
                <h2>Browser friendly</h2>
                <p>
                  You can manage your crypto assets in your browser, <br />
                  hassle-free, no download required.
                </p>
              </section>
              <img src="/illustration/our-value-3.svg" alt="Secure" />
            </section>
          </section>
        </section>
      </div>

      <div className={styles.started}>
        <section id="guidance">
          <section>
            <h1>How to get started</h1>
            <p>Just a few clicks, you can do it while you lean on your bed</p>
          </section>

          <section>
            <section>
              <img src="/illustration/guide-1.svg" alt="Open Up Kunci" />
              <p>
                Open up kunciwallet.com on your <br /> favorite browser
              </p>
            </section>

            <section>
              <img
                src="/illustration/guide-2.svg"
                alt="Create a wallet account"
              />
              <p>Create a wallet account</p>
            </section>

            <section>
              <img
                src="/illustration/guide-3.svg"
                alt="Your account is ready to use"
              />
              <p>Your account is ready to use</p>
            </section>
          </section>

          <section>
            <section>
              <img src="/icon/white-wallet.svg" alt="Create Your Wallet" />
              <p>Create Your Wallet</p>
            </section>
          </section>
        </section>
      </div>

      <div className={styles.partners}>
        <section id="partner">
          <h1>Our Partner</h1>

          <section>
            <img src="/illustration/pancakeswap-logo.svg" alt="pancakeswap" />
            <img src="/illustration/indodax-logo.svg" alt="indodax" />
            <img src="/illustration/solana-logo.svg" alt="solana" />
          </section>
        </section>
      </div>

      <Footer variant="EN" />
    </div>
  );
};

export default LandingPage;
