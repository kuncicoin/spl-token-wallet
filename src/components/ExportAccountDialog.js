import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import DialogForm from './DialogForm';
import { useWallet } from '../utils/wallet';
import { useUnlockedMnemonicAndSeed } from '../utils/wallet-seed';
import iconFolder from '../assets/icons/icon-folder.svg';
import arrowLeftIcon from '../assets/icons/icon-arrow-left.svg';
import padlockIcon from '../assets/icons/icon-padlock.svg';

export default function ExportAccountDialog({ open, onClose }) {
  const wallet = useWallet();
  const [isHidden, setIsHidden] = useState(true);
  const keyOutput = `[${Array.from(wallet.provider.account.secretKey)}]`;
  return (
    <DialogForm open={open} onClose={onClose} fullWidth>
      <DialogTitle>Export account</DialogTitle>
      <DialogContent>
        <TextField
          label="Private key"
          fullWidth
          type={isHidden && 'password'}
          variant="outlined"
          margin="normal"
          value={keyOutput}
        />
        <FormControlLabel
          control={
            <Switch
              checked={!isHidden}
              onChange={() => setIsHidden(!isHidden)}
            />
          }
          label="Reveal"
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Close</Button>
      </DialogActions>
    </DialogForm>
  );
}

export function ExportMnemonicDialog({ open, onClose }) {
  const [isHidden, setIsHidden] = useState(true);
  const [mnemKey] = useUnlockedMnemonicAndSeed();

  const downloadMnemonic = (mnemonic) => {
    const url = window.URL.createObjectURL(new Blob([mnemonic]));
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'kunci.bak');
    document.body.appendChild(link);
    link.click();
  };
  return (
    <div className="container-parent">
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
          <p className="text-brand">Export Secret Phrase</p>
          <div />
        </div>
      </div>
      <div className="container">
        {isHidden ? (
          <div
            className="secret-phrase-cover"
            onClick={() => setIsHidden(false)}
          >
            <img src={padlockIcon} alt="padlock" />
            <p>Tap to reveal the secret phrase</p>
          </div>
        ) : (
          <div className="secret-phrase">
            <p>{mnemKey.mnemonic}</p>
          </div>
        )}

        <button
          className="button"
          style={{ marginTop: '20px', opacity: isHidden ? 0.5 : 1 }}
          disabled={isHidden}
          onClick={() => downloadMnemonic(mnemKey.mnemonic)}
        >
          <img src={iconFolder} alt="icon" /> Export
        </button>
      </div>
    </div>
    // <DialogForm open={open} onClose={onClose} fullWidth>
    //   <DialogTitle>Export mnemonic</DialogTitle>
    //   <DialogContent>
    //     <TextField
    //       label="Mnemonic"
    //       fullWidth
    //       type={isHidden && 'password'}
    //       variant="outlined"
    //       margin="normal"
    //       value={mnemKey.mnemonic}
    //     />
    //     <FormControlLabel
    //       control={
    //         <Switch
    //           checked={!isHidden}
    //           onChange={() => setIsHidden(!isHidden)}
    //         />
    //       }
    //       label="Reveal"
    //     />
    //   </DialogContent>
    //   <DialogActions>
    //     <Button onClick={onClose}>Close</Button>
    //   </DialogActions>
    // </DialogForm>
  );
}
