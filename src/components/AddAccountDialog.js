import React, { useState } from 'react';
import DialogActions from '@material-ui/core/DialogActions';
import Button from '@material-ui/core/Button';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormGroup from '@material-ui/core/FormGroup';
import Switch from 'react-switch';
import { decodeAccount } from '../utils/utils';
import DialogForm from './DialogForm';
import arrowLeftIcon from '../assets/icons/icon-arrow-left.svg';

export default function AddAccountDialog({ open, onAdd, onClose }) {
  const [name, setName] = useState('');
  const [isImport, setIsImport] = useState(false);
  const [importedPrivateKey, setPrivateKey] = useState('');

  const importedAccount = isImport
    ? decodeAccount(importedPrivateKey)
    : undefined;
  const isAddEnabled = isImport ? name && importedAccount !== undefined : name;

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
          <p className="text-brand">Add Account</p>
          <div />
        </div>
      </div>
      <div className="container" style={{ paddingTop: '25px' }}>
        <form onSubmit={() => onAdd({ name, importedAccount })}>
          <p class="text">
            Connect your ledger and open the Kuncicoin application. When you are
            ready, click "continue".
          </p>
          <label style={{ marginTop: '10px' }} for="new-password">
            Account name
          </label>
          <input
            id="account-name"
            className="custom-input"
            placeholder="i.e account 2"
            value={name}
            onChange={(e) => setName(e.target.value.trim())}
          />

          <div className="flex-row" style={{ marginBottom: '20px' }}>
            <Switch
              checked={isImport}
              onChange={() => setIsImport(!isImport)}
              onColor="#7656E3"
              uncheckedIcon={false}
              checkedIcon={false}
              handleDiameter={18}
              width={45}
              height={24}
            />
            <p className="text">Import secret phrase</p>
          </div>

          {isImport && (
            <>
              <label for="new-password">Secret phrase</label>
              <input
                id="secret-phrase"
                className="custom-input"
                placeholder="paste here"
                label="Confirm Password"
                value={importedPrivateKey}
                onChange={(e) => setPrivateKey(e.target.value.trim())}
              />
            </>
          )}

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
              type="submit"
              disabled={!isAddEnabled}
              style={{
                width: '200px',
                opacity: isAddEnabled ? 1 : 0.5,
              }}
            >
              Continue
            </button>
          </div>
        </form>
      </div>
    </div>
    // <DialogForm
    //   open={open}
    //   onEnter={() => {
    //     setName('');
    //     setIsImport(false);
    //     setPrivateKey('');
    //   }}
    //   onClose={onClose}
    //   onSubmit={() => onAdd({ name, importedAccount })}
    //   fullWidth
    // >
    //   <DialogTitle>Add account</DialogTitle>
    //   <DialogContent style={{ paddingTop: 16 }}>
    //     <div
    //       style={{
    //         display: 'flex',
    //         flexDirection: 'column',
    //       }}
    //     >
    //       <TextField
    //         label="Name"
    //         fullWidth
    //         variant="outlined"
    //         margin="normal"
    //         value={name}
    //         onChange={(e) => setName(e.target.value.trim())}
    //       />
    //       <FormGroup>
    //         <FormControlLabel
    //           control={
    //             <Switch
    //               checked={isImport}
    //               onChange={() => setIsImport(!isImport)}
    //             />
    //           }
    //           label="Import private key"
    //         />
    //       </FormGroup>
    //       {isImport && (
    //         <TextField
    //           label="Paste your private key here"
    //           fullWidth
    //           type="password"
    //           value={importedPrivateKey}
    //           variant="outlined"
    //           margin="normal"
    //           onChange={(e) => setPrivateKey(e.target.value.trim())}
    //         />
    //       )}
    //     </div>
    //   </DialogContent>
    //   <DialogActions>
    //     <Button onClick={onClose}>Close</Button>
    //     <Button type="submit" color="primary" disabled={!isAddEnabled}>
    //       Add
    //     </Button>
    //   </DialogActions>
    // </DialogForm>
  );
}
