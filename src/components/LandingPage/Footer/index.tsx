import styles from './Footer.module.css';

const Footer = ({ variant = 'EN' }) => (
  <div className={styles.footer}>
    <section>
      <section>
        <p>{variant === 'EN' ? 'About Us' : 'Tentang Kami'}</p>
        <p>Privacy Policy</p>
        <p>Terms and Conditions</p>
      </section>

      <p>
        Copyright © 2022 <b>PT. Famindo Kunci Sukses.</b> All rights reserved.
      </p>
    </section>
  </div>
);

export default Footer;
