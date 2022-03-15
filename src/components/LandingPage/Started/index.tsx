import { useNavigate } from 'react-router-dom';
import styles from './Started.module.css';

const Started = ({ variant = 'EN' }) => {
  const navigate = useNavigate();

  const isExist = window.localStorage.getItem(
    'private-irgnore-wallet-suggestion',
  );

  return (
    <div className={styles.started}>
      <section id="guidance">
        {variant === 'EN' ? (
          <>
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
              <section onClick={() => navigate('/wallet')}>
                <img src="/icon/white-wallet.svg" alt="Create Your Wallet" />
                <p>{isExist ? 'Access Your Wallet' : 'Create Your Wallet'}</p>
              </section>
            </section>
          </>
        ) : (
          <>
            <section>
              <h1>Panduan Penggunaan</h1>
              <p>
                Hanya dengan beberapa klik, bahkan Anda dapat melakukannya
                sambil rebahan
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
              <section onClick={() => navigate('/wallet')}>
                <img src="/icon/white-wallet.svg" alt="Buat Wallet Anda" />
                <p>{isExist ? 'Akses Wallet Anda' : 'Buat Wallet Anda'}</p>
              </section>
            </section>
          </>
        )}
      </section>
    </div>
  );
};

export default Started;
