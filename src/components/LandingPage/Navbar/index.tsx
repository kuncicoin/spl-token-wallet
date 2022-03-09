import { useState } from 'react';
import styles from './Navbar.module.css';

const Background = ({ setIsShowLanguage }) => (
  <div onClick={() => setIsShowLanguage(false)} />
);

const LanguageDropdown = ({ variant = 'EN', setVariant }) => {
  const [isShowLanguage, setIsShowLanguage] = useState(false);

  const languageStyle = {
    borderBottomLeftRadius: isShowLanguage ? 0 : '8px',
    borderBottomRightRadius: isShowLanguage ? 0 : '8px',
    borderBottom: '1px solid #eeeeee',
  };

  const onChangeLanguage = (toVariant: string) => {
    setVariant(toVariant);
    setIsShowLanguage(false);
  };

  return (
    <section className={styles.language}>
      <section
        style={languageStyle}
        onClick={() => setIsShowLanguage((c) => !c)}
      >
        <img
          src={`/icon/${variant.toLocaleLowerCase()}.svg`}
          alt={variant === 'EN' ? 'English' : 'Indonesia'}
        />
        <p>{variant}</p>
        <img src="/icon/chevron-down.svg" alt="Select Language" />
      </section>
      {isShowLanguage && (
        <>
          <section
            onClick={() => onChangeLanguage(variant === 'EN' ? 'ID' : 'EN')}
          >
            <img
              src={`/icon/${variant === 'EN' ? 'id' : 'en'}.svg`}
              alt={variant === 'EN' ? 'Indonesia' : 'English'}
            />
            <p>{variant === 'EN' ? 'ID' : 'EN'}</p>
          </section>
          <Background setIsShowLanguage={setIsShowLanguage} />
        </>
      )}
    </section>
  );
};

const Navbar = ({ variant = 'EN', setVariant }) => {
  const [showMenu, setShowMenu] = useState(false);

  const Menus = () => (
    <>
      <p>
        <a href="#hero">{variant === 'EN' ? 'Home' : 'Beranda'}</a>
      </p>
      <p>
        <a href="#our-value">{variant === 'EN' ? 'Explore' : 'Jelajah'}</a>
      </p>
      <p>
        <a href="#guidance">{variant === 'EN' ? 'Guidance' : 'Panduan'}</a>
      </p>
    </>
  );

  const Dropdown = () => (
    <>
      <div
        className={styles.dropdownBackground}
        onClick={() => setShowMenu(false)}
      />
      <div className={styles.dropdown}>
        <Menus />

        <section>
          <img
            src={`/icon/m-id${variant === 'EN' ? '' : '-on'}.svg`}
            alt="ID"
            onClick={() => setVariant('ID')}
          />
          <section
            style={{ borderRight: '1px solid #FFFFFF', height: '20px' }}
          />
          <img
            src={`/icon/m-en${variant === 'EN' ? '-on' : ''}.svg`}
            alt="EN"
            onClick={() => setVariant('EN')}
          />
        </section>
      </div>
    </>
  );

  const Logo = () => (
    <section>
      <img
        src="/icon/logo-kunci.svg"
        alt="KunciWallet"
        className={styles.logoKunci}
      />
      <img
        src="/icon/m-logo-kunci.svg"
        alt="KunciWallet"
        className={styles.mLogoKunci}
      />
    </section>
  );

  return (
    <>
      <div className={styles.navbar}>
        <section>
          <Logo />

          <section>
            <img
              src={`/icon/${showMenu ? 'close' : 'hamburger'}.svg`}
              alt="Menu"
              onClick={() => setShowMenu((c) => !c)}
            />

            <Menus />
            <LanguageDropdown variant={variant} setVariant={setVariant} />
          </section>
        </section>
      </div>
      {showMenu && <Dropdown />}
    </>
  );
};

export default Navbar;
