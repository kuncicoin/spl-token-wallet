import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import styles from './Navbar.module.css';

const Background = ({ setIsShowLanguage }) => (
  <div onClick={() => setIsShowLanguage(false)} />
);

const LanguageDropdown = ({ variant = 'EN' }) => {
  const [isShowLanguage, setIsShowLanguage] = useState(false);
  const isEnglish = variant === 'EN';

  const languageStyle = {
    borderBottomLeftRadius: isShowLanguage ? 0 : '8px',
    borderBottomRightRadius: isShowLanguage ? 0 : '8px',
    borderBottom: '1px solid #eeeeee',
  };

  let navigate = useNavigate();

  return (
    <section className={styles.language}>
      <section
        style={languageStyle}
        onClick={() => setIsShowLanguage((c) => !c)}
      >
        <img
          src={`/icon/${variant.toLocaleLowerCase()}.svg`}
          alt={isEnglish ? 'English' : 'Indonesia'}
        />
        <p>{variant}</p>
        <img src="/icon/chevron-down.svg" alt="Select Language" />
      </section>
      {isShowLanguage && (
        <>
          <section onClick={() => navigate(`/home/${isEnglish ? 'id' : 'en'}`)}>
            <img
              src={`/icon/${isEnglish ? 'id' : 'en'}.svg`}
              alt={isEnglish ? 'Indonesia' : 'English'}
            />
            <p>{isEnglish ? 'ID' : 'EN'}</p>
          </section>
          <Background setIsShowLanguage={setIsShowLanguage} />
        </>
      )}
    </section>
  );
};

const Navbar = ({ variant = 'EN' }) => {
  const isEnglish = variant === 'EN';

  return (
    <div className={styles.navbar}>
      <section>
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
        <section>
          <p>
            <Link to="/home">{isEnglish ? 'Home' : 'Beranda'}</Link>
          </p>
          <p>{isEnglish ? 'Explore' : 'Jelajah'}</p>
          <p>
            <a href="#guidance">{isEnglish ? 'Guidance' : 'Panduan'}</a>
          </p>
          <p>
            <a href="#partner">{isEnglish ? 'Partner' : 'Mitra'}</a>
          </p>

          <LanguageDropdown variant={variant} />
        </section>
      </section>
    </div>
  );
};

export default Navbar;
