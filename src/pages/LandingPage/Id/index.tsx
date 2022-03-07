import styles from '../LandingPage.module.css';
import Navbar from '../../../components/LandingPage/Navbar';
import Footer from '../../../components/LandingPage/Footer';

const LandingPage = () => {
  return (
    <div className={styles.landingPage}>
      {/* Accent */}
      <img
        src="/accent/d-accent-1.svg"
        alt="kunciwallet.com"
        className={styles.accentDOne}
      />
      <img
        src="/accent/d-accent-2.svg"
        alt="kunciwallet.com"
        className={styles.accentDTwo}
      />
      <img
        src="/accent/d-accent-3.svg"
        alt="kunciwallet.com"
        className={styles.accentDThree}
      />

      <img
        src="/accent/m-accent-1.svg"
        alt="kunciwallet.com"
        className={styles.accentMOne}
      />
      <img
        src="/accent/m-accent-2.svg"
        alt="kunciwallet.com"
        className={styles.accentMTwo}
      />
      <img
        src="/accent/m-accent-3.svg"
        alt="kunciwallet.com"
        className={styles.accentMThree}
      />

      <Navbar variant="ID" />

      <div className={styles.hero}>
        <section>
          <section>
            <h1>
              Satu wallet untuk <br /> kelola semua aset <br /> kripto Anda
            </h1>
            <p>Buka wallet Anda & jelajahi alam semesta kripto</p>
            <section>
              <img src="/icon/purple-wallet.svg" alt="Buat Wallet Anda" />
              <p>Buat Wallet Anda</p>
            </section>
          </section>
          <section>
            <img src="/illustration/hero-image.svg" alt="KunciWallet" />
          </section>
        </section>
      </div>

      <div className={styles.ourValue}>
        <section id="our-value">
          <section>
            <h1>Keunggulan Kami</h1>
            <p>
              Kemudahan, Keamanan, and Keramahan. <br /> Dibuat untuk pecinta
              aset kripto.
            </p>
          </section>

          <section>
            <section>
              <section>
                <h2>Tukar Token dengan mudah</h2>
                <p>
                  Sekarang Anda dapat mengirim, menerima, dan menukar token
                  hanya dengan beberapa klik, mudah sekali!
                </p>
              </section>
              <img src="/illustration/our-value-1.svg" alt="Easy Way" />
            </section>

            <section>
              <section>
                <h2>Transaksi sangat aman</h2>
                <p>
                  Karena kami tidak mengumpulkan dana dan data pribadi Anda.
                </p>
              </section>
              <img src="/illustration/our-value-2.svg" alt="Secure" />
            </section>

            <section>
              <section>
                <h2>Ramah dengan segala Browser</h2>
                <p>
                  Anda dapat mengelola aset kripto dengan browser, tanpa repot,
                  tidak perlu mengunduh.
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
            <h1>Panduan Penggunaan</h1>
            <p>
              Hanya dengan beberapa klik, bahkan Anda dapat melakukannya sambil
              rebahan
            </p>
          </section>

          <section>
            <section>
              <img
                src="/illustration/guide-1.svg"
                alt="Buka kunciwallet.com di browser favorit Anda"
              />
              <p>
                Buka kunciwallet.com di browser <br /> favorit Anda
              </p>
            </section>

            <section>
              <img
                src="/illustration/guide-2.svg"
                alt="Buat akun Wallet Anda"
              />
              <p>Buat akun Wallet Anda</p>
            </section>

            <section>
              <img
                src="/illustration/guide-3.svg"
                alt="Akun Wallet Anda sudah siap digunakan"
              />
              <p>
                Akun Wallet Anda sudah siap <br /> digunakan
              </p>
            </section>
          </section>

          <section>
            <section>
              <img src="/icon/white-wallet.svg" alt="Buat Wallet Anda" />
              <p>Buat Wallet Anda</p>
            </section>
          </section>
        </section>
      </div>

      {/* <div className={styles.partners}>
        <section id="partner">
          <h1>Mitra Kami</h1>

          <section>
            <img src="/illustration/pancakeswap-logo.svg" alt="pancakeswap" />
            <img src="/illustration/indodax-logo.svg" alt="indodax" />
            <img src="/illustration/solana-logo.svg" alt="solana" />
          </section>
        </section>
      </div> */}

      <Footer variant="ID" />
    </div>
  );
};

export default LandingPage;
