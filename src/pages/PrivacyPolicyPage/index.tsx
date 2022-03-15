import Footer from '../../components/LandingPage/Footer';
import Anchor from '../../components/Legal/Anchor';
import Navbar from '../../components/Legal/Navbar';
import Sidebar from '../../components/Legal/Sidebar';
import styles from './PrivacyPolicyPage.module.css';

const PrivacyPolicyPage = () => {
  return (
    <div className={styles.container}>
      <Navbar />

      <div className={styles.content}>
        <Sidebar />
        <article className={styles.article}>
          <header>
            <h1>Privacy Policy</h1>
            <p>
              Last Update: <span>09/03/2022</span>
            </p>
          </header>

          <h2>Dear USER:</h2>
          <h2>
            PLEASE READ THIS PRIVACY POLICY CAREFULLY BEFORE USING
            KUNCIWALLET.COM
          </h2>
          <section style={{ marginBottom: '10px' }} />

          <p>
            Thank you for visiting and using kunciwallet.com, owned by PT.
            Famindo Kunci Sukses (FKS). We always try to do our best, including
            trying to grow and maintain your trust as a user of our site by
            protecting your personal and confidential information. By visiting &
            using kunciwallet.com, you agree to be bound by the following terms
            and conditions regarding the privacy policy set by us. We may change
            these terms and conditions from time to time, and therefore you are
            expected to check regularly. By using kunciwallet.com means that you
            accept any new or modified terms and conditions.
          </p>
          <section style={{ marginBottom: '30px' }} />

          <h2>What is KUNCIWALLET.COM</h2>
          <p>
            Kunciwallet.com is a wallet provided and owned by PT. Famindo Kunci
            Sukses allows users to do basic functions such as storing, keeping,
            receiving, swapping, migrating, and sending cryptocurrency, also
            deposit.
          </p>

          <section style={{ marginBottom: '30px' }} />
          <h2>Secret Recovery Phrase and password</h2>
          <p>
            Some Blokchains and Wallets use a very different set of tools to
            secure user accounts, compared to traditional online technologies.
            Most of us are used to creating an account with an app, or service,
            or what have you, and being able to, for example, write to Customer
            Support to reset our password, or username; we're used to the app
            keeping our data, presumably on some sort of computer that belongs
            to the company.
          </p>

          <p>
            Kunciwallet.com has two different types of secrets that are used in
            different ways to keep your wallet, and your accounts, private and
            safe: The Secret Recovery Phrase and the password.
          </p>

          <ul>
            <li>
              The Secret Recovery Phrase is the key to kunciwallet.com. If
              someone has the key, they have complete access to the wallet.
              Kunciwallet.com does not keep the keys: you are the custodian of
              your wallet. Kunciwallet.com will never ask for your Secret
              Recovery Phrase, even in a customer support scenario. If someone
              does ask for it, they are likely trying to scam you or steal your
              funds.
            </li>
            <li>
              Your secret recovery phrase is used locally to derive private
              keys, one per account/address. Accounts are stored on the
              blockchain, and these private keys unlock those accounts.
            </li>
            <li>The Secret Recovery Phrase Do and Don'ts</li>
          </ul>

          <section style={{ marginBottom: '20px' }} />

          <img src="/illustration/table-pp.svg" alt="Privacy Policy" />

          <p>
            Even Though it’s optional, we do encourage you to create a password
            to increase the protection of your wallet. Kunciwalllet.com never
            saves or stores the secret phrase and password. The loss of them
            will be underwritten by the user.
          </p>

          <section style={{ marginBottom: '30px' }} />

          <h2>I’ve been Scammed</h2>
          <p>
            In this regard, we would like to inform you that PT. Famindo Kunci
            Sukses is not affiliated or has any kind of relationship with the
            individuals who committed the fraud. PT. Famindo Kunci Sukses is not
            responsible for the actions of parties using the name of PT. Famindo
            Kunci Sukses and/or parties claiming to have a certain relationship
            with PT. Famindo Kunci Sukses various fraudulent actions.
          </p>
          <section style={{ marginBottom: '30px' }} />

          <p>
            Please note that all activities and/or promotions in any form are
            always informed through the website and/or official social media
            accounts of PT. Famindo Kunci Sukses. We urge the entire community
            to be careful of various fraudulent attempts using the name of PT.
            Famindo Kunci Sukses.
          </p>
          <section style={{ marginBottom: '30px' }} />

          <p>
            If you find or suspect activity on behalf of PT. Famindo Kunci
            Sukses, please immediately report to our support (admin) email via
            email <b>support@kuncicoin.com</b>, instagram account{' '}
            <b>@kuncicoin_id</b>, twitter account <b>@Kuncicoin_id</b>, or
            Telegram <b>t.me/kunciofficial</b>.
          </p>

          <section style={{ marginBottom: '30px' }} />
          <h2>Modification of Privacy Policy</h2>
          <p>
            Use of the site, and the information shared with this site, is
            offered to you on the basis of your willingness to accept our
            Privacy Policy, and other notices contained on this site. By using
            the site or all content on this site, you acknowledge and agree to
            our Privacy Policy, and other notices contained on this site. If you
            do not agree to be bound and comply with these terms, you are
            welcome not to use and/or visit kunciwallet.com
          </p>
          <section style={{ marginBottom: '30px' }} />
          <p>
            We reserve the right, in our sole discretion, to change, add, or
            remove any terms and conditions from this Privacy Policy without
            your knowledge and consent. Any changes to this Privacy Policy are
            effective and immediately follow the notification of changes on this
            site. You agree to review this Privacy Policy from time to time and
            agree that any subsequent use of the site as a result of changes to
            this Privacy Policy indicates your acceptance of all such changes.
          </p>

          <section style={{ marginBottom: '30px' }} />
          <h2>Cookies</h2>
          <p>
            Cookies are a type of file that contains information that is sent by
            a site to the computer hard-drive of each accessing the site for the
            purposes of recording by the accessing computer, such as:
          </p>
          <section style={{ marginBottom: '30px' }} />
          <p>
            Internet Protocol address (IP Address) of the accessor; The type of
            browser and operating system used by the user; Day, date and time
            when the accessor accesses a site; Data that functions to monitor
            access activities on a site; The address of the site accessed by the
            viewer. Kunciwallet.com uses cookies for various purposes, among
            others, to assist you in the event that you decide to revisit
            kunciwallet.com in the future, to count the number of people who
            have access to kunciwallet.com
          </p>

          <section style={{ marginBottom: '30px' }} />
          <h2>Law</h2>
          <p>
            The terms and conditions in this Privacy Policy are subject to the
            law in the territory of the Republic of Indonesia.
          </p>
          <section style={{ marginBottom: '30px' }} />
          <p>
            Well, with that being said, welcome to kunciwallet.com and let the
            force be with you! To The Moon!
          </p>
          <Anchor />
        </article>
      </div>

      <Footer />
    </div>
  );
};

export default PrivacyPolicyPage;
