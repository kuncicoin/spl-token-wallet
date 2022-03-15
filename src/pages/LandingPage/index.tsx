import styles from './LandingPage.module.css';
import Navbar from '../../components/LandingPage/Navbar';
import Footer from '../../components/LandingPage/Footer';
import Hero from '../../components/LandingPage/Hero';
import { useState } from 'react';
import OurValue from '../../components/LandingPage/OurValue';
import Started from '../../components/LandingPage/Started';

const Accents = () => (
  <>
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
  </>
);

const LandingPage = () => {
  const [variant, setVariant] = useState('EN');

  return (
    <div className={styles.landingPage}>
      <Accents />
      <Navbar variant={variant} setVariant={setVariant} />
      <Hero variant={variant} />
      <OurValue variant={variant} />
      <Started variant={variant} />

      <Footer variant="EN" />
    </div>
  );
};

export default LandingPage;
