import { useNavigate } from 'react-router-dom';
import styles from './Footer.module.css';

const Footer = ({ variant = 'EN' }) => {
  const navigate = useNavigate();

  return (
    <div className={styles.footer}>
      <section>
        <section>
          <p>{variant === 'EN' ? 'About Us' : 'Tentang Kami'}</p>
          <p onClick={() => navigate('/privacy-policy')}>Privacy Policy</p>
          <p onClick={() => navigate('/terms-n-condition')}>
            Terms and Conditions
          </p>
        </section>

        <p>
          Copyright © 2022 <b>PT. Famindo Kunci Sukses.</b> All rights reserved.
        </p>
      </section>
    </div>
  );
};

export default Footer;
