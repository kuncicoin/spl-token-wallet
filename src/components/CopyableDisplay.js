import React, { useRef } from 'react';
import { TextField } from '@material-ui/core';
import CopyIcon from 'mdi-material-ui/ContentCopy';
import { makeStyles } from '@material-ui/core/styles';
import { useSnackbar } from 'notistack';
import QrcodeIcon from 'mdi-material-ui/Qrcode';
import QRCode from 'qrcode.react';
import DialogContent from '@material-ui/core/DialogContent';
import IconButton from '@material-ui/core/IconButton';
import Dialog from '@material-ui/core/Dialog';
import copyIcon2 from '../assets/icons/icon-copy-2.svg';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
    alignItems: 'baseline',
  },
}));

export default function CopyableDisplay({
  value,
  label,
  autoFocus,
  qrCode,
  helperText,
}) {
  const { enqueueSnackbar } = useSnackbar();
  const textareaRef = useRef();
  const classes = useStyles();
  const copyLink = () => {
    let textArea = textareaRef.current;
    if (textArea) {
      textArea.select();
      document.execCommand('copy');
      enqueueSnackbar(`Copied ${label}`, {
        variant: 'info',
        autoHideDuration: 2500,
      });
    }
  };

  return (
    <div
      className="flex-row"
      style={{
        padding: '10px 0px',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderBottom: '1px solid #858585',
      }}
    >
      <div className="flex-column" style={{ width: '100%' }}>
        <p style={{ fontSize: '10px', color: '#CECECE' }}>{label}</p>
        <input
          ref={(ref) => (textareaRef.current = ref)}
          autoFocus={autoFocus}
          value={value}
          readOnly
          onFocus={(e) => e.currentTarget.select()}
          helperText={helperText}
          spellCheck={false}
          style={{
            width: '100%',
            fontSize: '14px',
            color: '#fff',
            backgroundColor: 'transparent',
            border: 'none',
            outline: 'none',
          }}
        />
      </div>
      <div onClick={copyLink} className="button-ghost">
        <img src={copyIcon2} alt="copy" />
      </div>
      {qrCode ? <Qrcode value={qrCode === true ? value : qrCode} /> : null}
    </div>
  );
}

const useQrCodeStyles = makeStyles((theme) => ({
  qrcodeContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    marginBottom: theme.spacing(2),
  },
}));

function Qrcode({ value }) {
  const [showQrcode, setShowQrcode] = React.useState(false);
  const classes = useQrCodeStyles();

  return (
    <>
      <IconButton onClick={() => setShowQrcode(true)}>
        <QrcodeIcon />
      </IconButton>
      <Dialog open={showQrcode} onClose={() => setShowQrcode(false)}>
        <DialogContent className={classes.qrcodeContainer}>
          <QRCode value={value} size={256} includeMargin />
        </DialogContent>
      </Dialog>
    </>
  );
}
