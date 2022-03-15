import styles from './Anchor.module.css';

const Anchor = () => {
  return (
    <section className={styles.anchor}>
      <a href="#navbar" className={styles.desktop}>
        <img src="/icon/anchor-up.png" alt="Balik ke atas" />
        <p>Balik ke atas</p>
      </a>
      <a href="#navbar" className={styles.mobile}>
        <img src="/icon/anchor-up.png" alt="Balik ke atas" />
        <p>Balik ke atas</p>
      </a>
    </section>
  );
};

export default Anchor;
