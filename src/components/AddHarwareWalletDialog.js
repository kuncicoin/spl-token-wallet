import React, { useEffect, useState } from 'react';
import Typography from '@material-ui/core/Typography';
import DialogActions from '@material-ui/core/DialogActions';
import Button from '@material-ui/core/Button';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import Card from '@material-ui/core/Card';
import DialogForm from './DialogForm';
import { LedgerWalletProvider } from '../utils/walletProvider/ledger';
import {
  AccountsSelector,
  DerivationPathMenuItem,
  toDerivationPath,
} from '../pages/LoginPage.js';
import CircularProgress from '@material-ui/core/CircularProgress';
import { useSnackbar } from 'notistack';
import arrowLeftIcon from '../assets/icons/icon-arrow-left.svg';

const AddHardwareView = {
  Splash: 0,
  Accounts: 1,
  Confirm: 2,
};

export default function AddHardwareWalletDialog({ open, onAdd, onClose }) {
  const [view, setView] = useState(AddHardwareView.Splash);
  const [hardwareAccount, setHardwareAccount] = useState(null);
  return (
    // <DialogForm onClose={onClose} open={open} onEnter={() => {}} fullWidth>
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
          <p className="text-brand">Import Hardware Wallet</p>
          <div />
        </div>
      </div>
      <div className="container">
        {view === AddHardwareView.Splash ? (
          <AddHardwareWalletSplash
            onClose={onClose}
            onContinue={() => setView(AddHardwareView.Accounts)}
          />
        ) : view === AddHardwareView.Accounts ? (
          <LedgerAccounts
            onContinue={(account) => {
              setHardwareAccount(account);
              setView(AddHardwareView.Confirm);
            }}
            open={open}
            onClose={onClose}
          />
        ) : (
          <ConfirmHardwareWallet
            account={hardwareAccount}
            onDone={() => {
              onAdd(hardwareAccount);
              onClose();
              setView(AddHardwareView.Splash);
            }}
            onBack={() => {
              setView(AddHardwareView.Accounts);
            }}
          />
        )}
      </div>
    </div>
  );
}

function ConfirmHardwareWallet({ account, onDone, onBack }) {
  const [didConfirm, setDidConfirm] = useState(false);
  useEffect(() => {
    if (!didConfirm) {
      account.provider
        .confirmPublicKey()
        .then(() => setDidConfirm(true))
        .catch((err) => {
          console.error('Error confirming', err);
          onBack();
        });
    }
  });
  return (
    <>
      <DialogTitle>Confirm your wallet address</DialogTitle>
      <DialogContent style={{ paddingTop: 16 }}>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <Typography fontWeight="fontWeightBold">
            Check your ledger and confirm the address displayed is the address
            chosen. Then click "done".
          </Typography>
          <Typography>{account.publicKey.toString()}</Typography>
        </div>
      </DialogContent>
      <DialogActions>
        <Button color="primary" onClick={onBack}>
          Back
        </Button>
        <Button color="primary" onClick={onDone} disabled={!didConfirm}>
          Done
        </Button>
      </DialogActions>
    </>
  );
}

function AddHardwareWalletSplash({ onContinue, onClose }) {
  return (
    <>
      <p className="text">
        Connect your ledger and open the Kuncicoin application. When you are
        ready, click "continue".
      </p>
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
          className="button"
          style={{
            width: '200px',
          }}
          onClick={onContinue}
        >
          Continue
        </button>
      </div>
      {/* <div
        style={{
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <b>
          Connect your ledger and open the Kuncicoin application. When you are
          ready, click "continue".
        </b>
      </div>
      <Button color="primary" onClick={onClose}>
        Cancel
      </Button>
      <Button color="primary" onClick={onContinue}>
        Continue
      </Button> */}
      {/* <DialogTitle>Add hardware wallet</DialogTitle>
      <DialogContent style={{ paddingTop: 16 }}>
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <b>
            Connect your ledger and open the Kuncicoin application. When you are
            ready, click "continue".
          </b>
        </div>
      </DialogContent>
      <DialogActions>
        <Button color="primary" onClick={onClose}>
          Cancel
        </Button>
        <Button color="primary" onClick={onContinue}>
          Continue
        </Button>
      </DialogActions> */}
    </>
  );
}

function LedgerAccounts({ onContinue, onClose, open }) {
  const [dPathMenuItem, setDPathMenuItem] = useState(
    DerivationPathMenuItem.Bip44Root,
  );
  const { enqueueSnackbar } = useSnackbar();
  const [accounts, setAccounts] = useState(null);
  const onClick = (provider) => {
    onContinue({
      provider,
      publicKey: provider.pubKey,
      derivationPath: provider.derivationPath,
      account: provider.account,
      change: provider.change,
    });
  };
  useEffect(() => {
    if (open) {
      const fetch = async () => {
        let accounts = [];
        if (dPathMenuItem === DerivationPathMenuItem.Bip44Root) {
          let provider = new LedgerWalletProvider({
            derivationPath: toDerivationPath(dPathMenuItem),
          });
          accounts.push(await provider.init());
        } else {
          setAccounts(null);
          // Loading in parallel makes the ledger upset. So do it serially.
          for (let k = 0; k < 10; k += 1) {
            let provider = new LedgerWalletProvider({
              derivationPath: toDerivationPath(dPathMenuItem),
              account: k,
            });
            accounts.push(await provider.init());
          }
        }
        setAccounts(accounts);
      };
      fetch().catch((err) => {
        console.log(`received error when attempting to connect ledger: ${err}`);
        if (err && err.statusCode === 0x6804) {
          enqueueSnackbar('Unlock ledger device', { variant: 'error' });
        }
        onClose();
      });
    }
  }, [dPathMenuItem, enqueueSnackbar, open, onClose]);
  return (
    <>
      {accounts === null ? (
        <div style={{ padding: '24px' }}>
          <p className="text">Loading accounts from your hardware wallet</p>
          <CircularProgress
            style={{
              display: 'block',
              marginLeft: 'auto',
              marginRight: 'auto',
            }}
          />
        </div>
      ) : (
        <AccountsSelector
          showRoot={true}
          onClick={onClick}
          accounts={accounts}
          setDPathMenuItem={setDPathMenuItem}
          dPathMenuItem={dPathMenuItem}
        />
      )}
    </>
  );
}
