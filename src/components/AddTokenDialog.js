import React, { useEffect, useState } from 'react';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogActions from '@material-ui/core/DialogActions';
import Button from '@material-ui/core/Button';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import TextField from '@material-ui/core/TextField';
import {
  refreshWalletPublicKeys,
  useWallet,
  useWalletTokenAccounts,
} from '../utils/wallet';
import { LAMPORTS_PER_SOL, PublicKey } from '@solana/web3.js';
import { useUpdateTokenName, usePopularTokens } from '../utils/tokens/names';
import { useAsyncData } from '../utils/fetch-loop';
import LoadingIndicator from './LoadingIndicator';
import { makeStyles, Tab, Tabs } from '@material-ui/core';
import { useSendTransaction } from '../utils/notifications';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import { abbreviateAddress } from '../utils/utils';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import Collapse from '@material-ui/core/Collapse';
import { useSolanaExplorerUrlSuffix } from '../utils/connection';
import Link from '@material-ui/core/Link';
import CopyableDisplay from './CopyableDisplay';
import DialogForm from './DialogForm';
import { showSwapAddress } from '../utils/config';
import { swapApiRequest } from '../utils/swap/api';
import TokenIcon from './TokenIcon';
import arrowLeftIcon from '../assets/icons/icon-arrow-left.svg';
import iconDropdown from '../assets/icons/icon-dropdown.svg';
import iconCross from '../assets/icons/icon-cross.svg';
import { BottomSheet } from 'react-spring-bottom-sheet';

const feeFormat = new Intl.NumberFormat(undefined, {
  minimumFractionDigits: 6,
  maximumFractionDigits: 6,
});

const useStyles = makeStyles((theme) => ({
  tabs: {
    marginBottom: theme.spacing(1),
    borderBottom: `1px solid ${theme.palette.background.paper}`,
  },
}));

export default function AddTokenDialog({ open, onClose }) {
  let wallet = useWallet();
  let [tokenAccountCost] = useAsyncData(
    wallet.tokenAccountCost,
    wallet.tokenAccountCost,
  );
  let classes = useStyles();
  let updateTokenName = useUpdateTokenName();
  const [sendTransaction, sending] = useSendTransaction();

  const [walletAccounts] = useWalletTokenAccounts();
  const popularTokens = usePopularTokens();
  const [tab, setTab] = useState(!!popularTokens ? 'popular' : 'manual');
  const [mintAddress, setMintAddress] = useState('');
  const [tokenName, setTokenName] = useState('');
  const [tokenSymbol, setTokenSymbol] = useState('');
  const [erc20Address, setErc20Address] = useState('');
  const [showDialog, setShowDialog] = useState(false);

  useEffect(() => {
    if (!popularTokens) {
      setTab('manual');
    }
  }, [popularTokens]);

  function onSubmit(params) {
    if (tab === 'manual') {
      params = { mintAddress, tokenName, tokenSymbol };
    } else if (tab === 'erc20') {
      params = { erc20Address };
    }
    sendTransaction(addToken(params), {
      onSuccess: () => {
        refreshWalletPublicKeys(wallet);
        onClose();
      },
    });
  }

  async function addToken({
    mintAddress,
    tokenName,
    tokenSymbol,
    erc20Address,
  }) {
    if (erc20Address) {
      let tokenInfo = await swapApiRequest('POST', `coins/eth/${erc20Address}`);
      mintAddress = tokenInfo.splMint;
      tokenName = tokenInfo.name;
      tokenSymbol = tokenInfo.ticker;
      if (tokenInfo.blockchain !== 'sol') {
        tokenName = 'Wrapped ' + tokenName;
      }
    }

    let mint = new PublicKey(mintAddress);
    updateTokenName(mint, tokenName, tokenSymbol);
    const resp = await wallet.createAssociatedTokenAccount(mint);
    return resp[1];
  }

  let valid = true;
  if (tab === 'erc20') {
    valid = erc20Address.length === 42 && erc20Address.startsWith('0x');
  }

  const handleType = (type) => {
    switch (type) {
      case 'popular':
        return 'Popular Tokens';
      case 'erc20':
        return 'ERC20';
      case 'manual':
        return 'Manual Input';
      default:
        return 'Unknown';
    }
  };

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
            <p className="text-brand">Add Tokens</p>
            <div />
          </div>
        </div>
        <div className="container" style={{ paddingTop: '25px' }}>
          <p class="text">
            Add a token to your wallet. This will cost 0.000586 KUNCI.
          </p>
          <label style={{ marginTop: '20px' }} for="token-type">
            Token Type
          </label>
          <div
            className="token-dropdown"
            style={{
              height: '40px',
              padding: '0px 10px',
              marginTop: '0px',
              marginBottom: '10px',
              background: 'rgba(255, 255, 255, 0.1)',
            }}
            onClick={() => setShowDialog(true)}
          >
            <p class="text" style={{ margin: '0px' }}>
              {handleType(tab)}
            </p>
            <img src={iconDropdown} alt="dropdown" />
          </div>
          <hr />
          {tab === 'manual' || !popularTokens ? (
            <React.Fragment>
              <label style={{ marginTop: '10px' }}>Token Mint Address</label>
              <input
                className="custom-input"
                placeholder="input address"
                value={mintAddress}
                onChange={(e) => setMintAddress(e.target.value)}
                disabled={sending}
              />
              <label style={{ marginTop: '10px' }}>Token Name</label>
              <input
                className="custom-input"
                placeholder="input name"
                value={tokenName}
                onChange={(e) => setTokenName(e.target.value)}
                disabled={sending}
              />
              <label style={{ marginTop: '10px' }}>Token Symbol</label>
              <input
                className="custom-input"
                placeholder="input symbol"
                value={tokenSymbol}
                onChange={(e) => setTokenSymbol(e.target.value)}
                disabled={sending}
              />
            </React.Fragment>
          ) : tab === 'popular' ? (
            <List disablePadding>
              {popularTokens
                .filter((tokenInfo) => tokenInfo.address)
                .map((tokenInfo) => (
                  <TokenListItem
                    key={tokenInfo.address}
                    tokenInfo={tokenInfo}
                    existingAccount={(walletAccounts || []).find(
                      (account) =>
                        account.parsed.mint.toBase58() === tokenInfo.address,
                    )}
                    onSubmit={onSubmit}
                    disabled={sending}
                  />
                ))}
            </List>
          ) : tab === 'erc20' ? (
            <>
              <label style={{ marginTop: '10px' }}>ERC20 Contact Address</label>
              <input
                className="custom-input"
                placeholder="input address"
                value={erc20Address}
                onChange={(e) => setErc20Address(e.target.value.trim())}
                autoFocus
                disabled={sending}
              />
              {erc20Address && valid ? (
                <Link
                  href={`https://etherscan.io/token/${erc20Address}`}
                  target="_blank"
                  rel="noopener"
                >
                  View on Etherscan
                </Link>
              ) : null}
            </>
          ) : null}
          {tab !== 'popular' && (
            <button
              className="button"
              disabled={sending || !valid}
              opacity={sending || !valid ? 0.5 : 1}
              style={{ marginTop: '10px' }}
              onClick={() => onSubmit({ tokenName, tokenSymbol, mintAddress })}
            >
              Save
            </button>
          )}
        </div>
      </div>
      <BottomSheet
        id="token-bottom-sheet"
        style={{ maxWidth: '480px', backgroundColor: '#1a202c' }}
        open={showDialog}
        onDismiss={() => setShowDialog(false)}
      >
        <div style={{ padding: '25px', paddingTop: '0' }}>
          <div
            style={{
              padding: '10px 0',
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <p className="sub-heading">Token Type</p>
            <img
              style={{ width: '12px', height: '12px', cursor: 'pointer' }}
              src={iconCross}
              alt="icon"
              onClick={() => setShowDialog(false)}
            />
          </div>
          <hr />
          <div
            className="token-radio-item"
            onClick={() => {
              setTab('popular');
              setShowDialog(false);
            }}
          >
            <p className="text" style={{ margin: '0px' }}>
              Popular Tokens
            </p>
            <div className="token-radio-button">
              {tab === 'popular' && <div className="token-radio-button-fill" />}
            </div>
          </div>

          <div
            className="token-radio-item"
            onClick={() => {
              setTab('erc20');
              setShowDialog(false);
            }}
          >
            <p className="text" style={{ margin: '0px' }}>
              ERC20
            </p>
            <div className="token-radio-button">
              {tab === 'erc20' && <div className="token-radio-button-fill" />}
            </div>
          </div>

          <div
            className="token-radio-item"
            onClick={() => {
              setTab('manual');
              setShowDialog(false);
            }}
          >
            <p className="text" style={{ margin: '0px' }}>
              Manual Input
            </p>
            <div className="token-radio-button">
              {tab === 'manual' && <div className="token-radio-button-fill" />}
            </div>
          </div>
        </div>
      </BottomSheet>
      {/* <DialogForm open={open} onClose={onClose}>
      <DialogTitle>Add Token</DialogTitle>
      <DialogContent>
        {tokenAccountCost ? (
          <DialogContentText>
            Add a token to your wallet. This will cost{' '}
            {feeFormat.format(tokenAccountCost / LAMPORTS_PER_SOL)} KUNCI.
          </DialogContentText>
        ) : (
          <LoadingIndicator />
        )}
        {!!popularTokens && (
          <Tabs
            value={tab}
            textColor="primary"
            indicatorColor="primary"
            className={classes.tabs}
            onChange={(e, value) => setTab(value)}
          >
            <Tab label="Popular Tokens" value="popular" />
            {showSwapAddress ? <Tab label="ERC20 Token" value="erc20" /> : null}
            <Tab label="Manual Input" value="manual" />
          </Tabs>
        )}
        {tab === 'manual' || !popularTokens ? (
          <React.Fragment>
            <TextField
              label="Token Mint Address"
              fullWidth
              variant="outlined"
              margin="normal"
              value={mintAddress}
              onChange={(e) => setMintAddress(e.target.value)}
              autoFocus
              disabled={sending}
            />
            <TextField
              label="Token Name"
              fullWidth
              variant="outlined"
              margin="normal"
              value={tokenName}
              onChange={(e) => setTokenName(e.target.value)}
              disabled={sending}
            />
            <TextField
              label="Token Symbol"
              fullWidth
              variant="outlined"
              margin="normal"
              value={tokenSymbol}
              onChange={(e) => setTokenSymbol(e.target.value)}
              disabled={sending}
            />
          </React.Fragment>
        ) : tab === 'popular' ? (
          <List disablePadding>
            {popularTokens.filter(tokenInfo => tokenInfo.address).map((tokenInfo) => (
              <TokenListItem
                key={tokenInfo.address}
                tokenInfo={tokenInfo}
                existingAccount={(walletAccounts || []).find(
                  (account) =>
                    account.parsed.mint.toBase58() === tokenInfo.address,
                )}
                onSubmit={onSubmit}
                disabled={sending}
              />
            ))}
          </List>
        ) : tab === 'erc20' ? (
          <>
            <TextField
              label="ERC20 Contract Address"
              fullWidth
              variant="outlined"
              margin="normal"
              value={erc20Address}
              onChange={(e) => setErc20Address(e.target.value.trim())}
              autoFocus
              disabled={sending}
            />
            {erc20Address && valid ? (
              <Link
                href={`https://etherscan.io/token/${erc20Address}`}
                target="_blank"
                rel="noopener"
              >
                View on Etherscan
              </Link>
            ) : null}
          </>
        ) : null}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        {tab !== 'popular' && (
          <Button
            type="submit"
            color="primary"
            disabled={sending || !valid}
            onClick={() => onSubmit({ tokenName, tokenSymbol, mintAddress })}
          >
            Add
          </Button>
        )}
      </DialogActions>
    </DialogForm> */}
    </>
  );
}

function TokenListItem({ tokenInfo, onSubmit, disabled, existingAccount }) {
  const [open, setOpen] = useState(false);
  const urlSuffix = useSolanaExplorerUrlSuffix();
  const alreadyExists = !!existingAccount;

  return (
    <React.Fragment>
      <div
        style={{
          display: 'flex',
          width: '100%',
          justifyContent: 'space-between',
        }}
        key={tokenInfo.name}
      >
        <div
          className="add-token-item"
          onClick={() => setOpen((open) => !open)}
        >
          <div className="flex-row">
            <ListItemIcon>
              <TokenIcon
                url={tokenInfo.logoUri}
                tokenName={tokenInfo.name}
                size={30}
              />
            </ListItemIcon>
            <div class="flex-column">
              <p style={{ fontSize: '12px', fontWeight: '600' }}>
                {tokenInfo.symbol ?? ''}
              </p>
              <p style={{ fontSize: '12px', fontWeight: '400' }}>
                {tokenInfo.name ?? abbreviateAddress(tokenInfo.address)}
              </p>
            </div>
          </div>
          {open ? <ExpandLess /> : <ExpandMore />}
        </div>
        <div style={{ padding: '10px 0px 0px 10px' }}>
          <button
            type="submit"
            className="button-ghost"
            disabled={disabled || alreadyExists}
            onClick={() =>
              onSubmit({
                tokenName: tokenInfo.name,
                tokenSymbol: tokenInfo.symbol,
                mintAddress: tokenInfo.address,
              })
            }
          >
            {alreadyExists ? 'Added' : 'Add'}
          </button>
        </div>
      </div>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <CopyableDisplay
          value={tokenInfo.address}
          label={`${tokenInfo.symbol} Mint Address`}
        />
      </Collapse>
    </React.Fragment>
  );
}
