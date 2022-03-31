import { useNavigate } from 'react-router-dom';
import styles from './Hero.module.css';

const Hero = ({ variant = 'EN' }) => {
  const navigate = useNavigate();

  const isExist = window.localStorage.getItem(
    'private-irgnore-wallet-suggestion',
  );

  return (
    <>
      <div className={styles.hero} id="hero">
        <section>
          <section>
            {variant === 'EN' ? (
              <>
                <h1>
                  One wallet to manage <br /> all your crypto asset
                </h1>
                <p>Open up your wallet & start sailing in crypto universe</p>
                <section onClick={() => navigate('/wallet')}>
                  <img src="/icon/purple-wallet.svg" alt="Create Your Wallet" />
                  <p>{isExist ? 'Access Your Wallet' : 'Create Your Wallet'}</p>
                </section>
              </>
            ) : (
              <>
                <h1>
                  Satu wallet untuk kelola <br /> semua aset kripto Anda
                </h1>
                <p>Buka wallet Anda & jelajahi alam semesta kripto</p>
                <section onClick={() => navigate('/wallet')}>
                  <img src="/icon/purple-wallet.svg" alt="Buat Wallet Anda" />
                  <p>{isExist ? 'Akses Wallet Anda' : 'Buat Wallet Anda'}</p>
                </section>
              </>
            )}
          </section>

          <section>
            <img src="/illustration/hero-image.png" alt="KunciWallet" />
          </section>
        </section>
      </div>
    </>
  );
};

export default Hero;
