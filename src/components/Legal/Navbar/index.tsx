import { useNavigate } from 'react-router-dom';
import styles from './Navbar.module.css';

const Navbar = () => {
  const navigate = useNavigate();

  return (
    <div className={styles.navbar} id="navbar">
      <section>
        <img
          src="/icon/logo-kunci.svg"
          alt="KunciWallet"
          className={styles.logoKunci}
          onClick={() => navigate('/')}
        />
        <img
          src="/icon/m-logo-kunci.svg"
          alt="KunciWallet"
          className={styles.mLogoKunci}
          onClick={() => navigate('/')}
        />
      </section>
    </div>
  );
};

export default Navbar;
