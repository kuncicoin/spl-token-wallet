import styles from './ReceiveDialog.module.css';
import arrowLeftIcon from '../../assets/icons/icon-arrow-left.svg';
import QRCode from 'qrcode.react';
import copy from 'copy-to-clipboard';
import { useSnackbar } from 'notistack';

const ReceiveDialog = ({ onClose, depositAddressStr, urlSuffix }) => {
  const { enqueueSnackbar } = useSnackbar();

  const onCopyAddress = () => {
    copy(depositAddressStr);

    enqueueSnackbar('Copied Deposit Address', {
      variant: 'success',
      autoHideDuration: 2500,
      anchorOrigin: { horizontal: 'right', vertical: 'top' },
    });
  };

  return (
    <>
      <div className="header">
        <div
          style={{
            flex: 1,
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <img
            style={{ cursor: 'pointer' }}
            src={arrowLeftIcon}
            alt="back"
            onClick={onClose}
          />
          <p className="text-brand">Receive Token</p>
          <div />
        </div>
      </div>
      <div className={styles.containerFull}>
        <p>QR Code</p>

        <section className={styles.qrCode}>
          <section>
            <QRCode value={depositAddressStr} size={256} includeMargin />
          </section>
        </section>

        <section className={styles.bottom}>
          <p>My Wallet Address</p>
          <section>
            <p>{depositAddressStr}</p>
            <div onClick={onCopyAddress}>
              <img src="/icon/copy.svg" alt="My Wallet Address" />
            </div>
          </section>
          <a
            href={
              `https://kunciscan.com/address/${depositAddressStr}` + urlSuffix
            }
            target="_blank"
            rel="noopener"
          >
            View on Kunciscan
          </a>
        </section>
      </div>
    </>
  );
};

export default ReceiveDialog;
