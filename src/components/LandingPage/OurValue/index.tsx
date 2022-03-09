import styles from './OurValue.module.css';

const OurValue = ({ variant = 'EN' }) => {
  return (
    <div className={styles.ourValue}>
      <section id="our-value">
        {variant === 'EN' ? (
          <>
            <section>
              <h1>Our Value</h1>
              <p>
                Convenience, Secure, and Friendly. <br /> Made for Crypto Lovers
              </p>
            </section>

            <section>
              <section>
                <section>
                  <h2>Exchange tokens in easy way</h2>
                  <p>
                    Now you can send, receive, and swap tokens in just a <br />
                    few clicks, easy peasy!
                  </p>
                </section>
                <img src="/illustration/our-value-1.svg" alt="Easy Way" />
              </section>

              <section>
                <section>
                  <h2>Super secure transactions</h2>
                  <p>
                    Super safe transactions, because we don't collect your{' '}
                    <br />
                    funds and personal data.
                  </p>
                </section>
                <img src="/illustration/our-value-2.svg" alt="Secure" />
              </section>

              <section>
                <section>
                  <h2>Browser friendly</h2>
                  <p>
                    Manage crypto assets in your browser, <br /> hassle-free, no
                    download required.
                  </p>
                </section>
                <img src="/illustration/our-value-3.svg" alt="Secure" />
              </section>
            </section>
          </>
        ) : (
          <>
            <section>
              <h1>Keunggulan Kami</h1>
              <p>
                Kemudahan, Keamanan, and Keramahan. <br /> Dibuat untuk pecinta
                aset kripto.
              </p>
            </section>

            <section>
              <section>
                <section>
                  <h2>Tukar Token dengan mudah</h2>
                  <p>
                    Sekarang Anda dapat mengirim, menerima, dan menukar token
                    hanya dengan beberapa klik, mudah sekali!
                  </p>
                </section>
                <img src="/illustration/our-value-1.svg" alt="Easy Way" />
              </section>

              <section>
                <section>
                  <h2>Transaksi sangat aman</h2>
                  <p>
                    Karena kami tidak mengumpulkan dana dan data pribadi Anda.
                  </p>
                </section>
                <img src="/illustration/our-value-2.svg" alt="Secure" />
              </section>

              <section>
                <section>
                  <h2>Ramah dengan segala Browser</h2>
                  <p>
                    Anda dapat mengelola aset kripto dengan browser, tanpa
                    repot, tidak perlu mengunduh.
                  </p>
                </section>
                <img src="/illustration/our-value-3.svg" alt="Secure" />
              </section>
            </section>
          </>
        )}
      </section>
    </div>
  );
};

export default OurValue;
