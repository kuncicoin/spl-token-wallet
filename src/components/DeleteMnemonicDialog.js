import React, { useState } from 'react';
import DialogForm from './DialogForm';
import {
  forgetWallet,
  normalizeMnemonic,
  useUnlockedMnemonicAndSeed,
} from '../utils/wallet-seed';
import DialogTitle from '@material-ui/core/DialogTitle';
import { DialogContentText } from '@material-ui/core';
import DialogActions from '@material-ui/core/DialogActions';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import arrowLeftIcon from '../assets/icons/icon-arrow-left.svg';
import iconWarning from '../assets/icons/icon-warning.svg';

export default function DeleteMnemonicDialog({
  open,
  onClose,
  setExportMnemonicOpen,
}) {
  const [seedCheck, setSeedCheck] = useState('');
  const [mnemKey] = useUnlockedMnemonicAndSeed();
  return (
    <>
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
            <p className="text-brand">Log out</p>
            <div />
          </div>
        </div>
        <div className="container" style={{ paddingTop: '25px' }}>
          <div id="alert" className="warning-alert">
            <img src={iconWarning} alt="warning" />
            <p>
              WARNING! This action will delete all current accounts from your
              browser.
            </p>
          </div>
          <p class="text" style={{ marginTop: '10px' }}>
            To recover the current account, you will need the recovery phrase
            and the account private key.
          </p>
          <p class="text" style={{ marginTop: '20px' }}>
            To prevent loss of funds, please ensure you have the seed phrase and
            the private key for all current accounts. You can view it by
            selecting{' '}
            <span
              className="button-ghost"
              onClick={() => setExportMnemonicOpen(true)}
            >
              Export Secret Phrase
            </span>{' '}
            in the user menu.
          </p>
          <form
            onSubmit={() => {
              forgetWallet();
              onClose();
            }}
          >
            <p style={{ fontSize: '12px', marginTop: '20px' }}>Secret Phrase</p>
            <textarea
              className="secret-phrase textarea"
              placeholder="paste the secret phrase"
              value={seedCheck}
              onChange={(e) => setSeedCheck(e.target.value)}
            />
            <div
              style={{
                gap: '10px',
                display: 'flex',
                width: '100%',
                marginTop: '20px',
                justifyContent: 'space-between',
              }}
            >
              <button className="button-outline" onClick={onClose}>
                Cancel
              </button>
              <button
                className="button-ghost"
                type="submit"
                style={{
                  width: '200px',
                  color:
                    normalizeMnemonic(seedCheck) !== mnemKey.mnemonic
                      ? '#777777'
                      : '#A692ED',
                }}
                disabled={normalizeMnemonic(seedCheck) !== mnemKey.mnemonic}
              >
                Log out
              </button>
            </div>
          </form>
        </div>
      </div>
      {/* <DialogForm
        open={open}
        onClose={onClose}
        onSubmit={() => {
          forgetWallet();
          onClose();
        }}
        fullWidth
      >
        <DialogTitle>{'Delete Mnemonic & Log Out'}</DialogTitle>
        <DialogContentText style={{ margin: 20 }}>
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            You will not be able to recover the current accounts without the
            seed phrase, and the account private key. This action will delete
            all current accounts from your browser.
            <br />
            <br />
            <strong>
              To prevent loss of funds, please ensure you have the seed phrase
              and the private key for all current accounts. You can view it by selecting
              "Export Mnemonic" in the user menu.
            </strong>
          </div>
          <TextField
            label={`Please type your seed phrase to confirm`}
            fullWidth
            variant="outlined"
            margin="normal"
            value={seedCheck}
            onChange={(e) => setSeedCheck(e.target.value)}
          />
        </DialogContentText>
        <DialogActions>
          <Button onClick={onClose}>Close</Button>
          <Button
            type="submit"
            color="secondary"
            disabled={normalizeMnemonic(seedCheck) !== mnemKey.mnemonic}
          >
            Delete
          </Button>
        </DialogActions>
      </DialogForm> */}
    </>
  );
}
