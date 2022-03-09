import React, { useState } from 'react';
import DialogForm from '../DialogForm';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';
import DialogActions from '@material-ui/core/DialogActions';
import { useWalletSelector } from '../../utils/wallet';
import { usePopularTokens } from '../../utils/tokens/names';
import TokenIcon from '../TokenIcon';
import Link from '@material-ui/core/Link';
import { abbreviateAddress, useIsExtensionWidth } from '../../utils/utils';
import FormControl from '@material-ui/core/FormControl';
import { useSolanaExplorerUrlSuffix } from '../../utils/connection';
import { MenuItem, Select } from '@material-ui/core';
import { BottomSheet } from 'react-spring-bottom-sheet';
import { makeStyles } from '@material-ui/core/styles';
import arrowLeftIcon from '../../assets/icons/icon-arrow-left.svg';
import iconCross from '../../assets/icons/icon-cross.svg';
import iconDropdown from '../../assets/icons/icon-dropdown.svg';

const useStyles = makeStyles((theme) => ({
  menuItem: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  tokenIcon: {
    marginRight: theme.spacing(1),
  },
  container: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: theme.spacing(3),
  },
  selector: {
    marginRight: theme.spacing(3),
  },
}));

export default function FtxPayDialog({ open, onClose }) {
  const { accounts } = useWalletSelector();
  const classes = useStyles();
  const popularTokens = usePopularTokens();
  const selectedAccount = accounts.find((a) => a.isSelected);
  const [coin, setCoin] = useState('KUNCI');
  const address = selectedAccount?.address?.toBase58();
  const urlSuffix = useSolanaExplorerUrlSuffix();
  const isExtensionWidth = useIsExtensionWidth();
  const [showDialog, setShowDialog] = useState(false);

  const onSubmit = () => {
    const urlSearchParams = new URLSearchParams();
    urlSearchParams.append('address', address);
    urlSearchParams.append('coin', coin);
    urlSearchParams.append('wallet', 'sol');
    urlSearchParams.append('memoIsRequired', false);
    window.open(
      `https://ftx.com/pay/request?${urlSearchParams}`,
      '_blank',
      'resizable,width=450,height=780',
    );
  };

  const selectedToken = () => {
    const tokenInfo = popularTokens.find(
      (tokenInfo) => tokenInfo.symbol === coin,
    );
    if (coin === 'KUNCI')
      return (
        <>
          <TokenIcon
            url={null}
            mint={null}
            tokenName={'KUNCI'}
            size={30}
            className={classes.tokenIcon}
          />
          <div class="flex-column">
            <p style={{ fontSize: '12px', fontWeight: '600' }}>KUNCI</p>
            <p style={{ fontSize: '12px', fontWeight: '400' }}>KunciCoin</p>
          </div>
        </>
      );
    return (
      <>
        <TokenIcon
          url={tokenInfo.logoUri}
          tokenName={tokenInfo.name}
          size={30}
          className={classes.tokenIcon}
        />
        <div class="flex-column">
          <p style={{ fontSize: '12px', fontWeight: '600' }}>
            {tokenInfo.symbol}
          </p>
          <p style={{ fontSize: '12px', fontWeight: '400' }}>
            <Link
              target="_blank"
              rel="noopener"
              href={
                `https://kunciscan.com/address/${tokenInfo.address}` + urlSuffix
              }
            >
              {tokenInfo.name}
            </Link>
          </p>
        </div>
      </>
    );
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
            <p className="text-brand">Deposit Funds</p>
            <div />
          </div>
        </div>
        <div className="container">
          <p class="text" style={{ marginTop: '25px' }}>
            Send funds to your Sollet wallet from an FTX account, where you can
            add funds using crypto on multiple blockchains, credit cards, and
            more.
          </p>
          <p class="text" style={{ marginTop: '25px' }}>
            If you don't have an FTX account, it may take a few moments to get
            up.
          </p>
          <div className="token-dropdown" onClick={() => setShowDialog(true)}>
            <div
              style={{
                display: 'flex',
                flexDirection: 'row',
                gap: '10px',
                alignItems: 'center',
              }}
            >
              {selectedToken()}
            </div>
            <img src={iconDropdown} alt="dropdown" />
          </div>
          <button
            onClick={onSubmit}
            className="button-ghost"
            style={{ marginTop: '20px' }}
          >
            Open FTX Pay
          </button>
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
            <p className="sub-heading">Token List</p>
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
              setCoin('KUNCI');
              setShowDialog(false);
            }}
          >
            <div
              style={{
                display: 'flex',
                flexDirection: 'row',
                gap: '10px',
                alignItems: 'center',
              }}
            >
              <TokenIcon
                url={null}
                mint={null}
                tokenName={'KUNCI'}
                size={30}
                className={classes.tokenIcon}
              />
              <div class="flex-column">
                <p style={{ fontSize: '12px', fontWeight: '600' }}>KUNCI</p>
                <p style={{ fontSize: '12px', fontWeight: '400' }}>KunciCoin</p>
              </div>
            </div>
            <div className="token-radio-button">
              {coin === 'KUNCI' && <div className="token-radio-button-fill" />}
            </div>
          </div>
          {popularTokens
            .filter((tokenInfo) => tokenInfo.address && tokenInfo.symbol)
            .map((tokenInfo) => (
              <div
                className="token-radio-item"
                key={tokenInfo.symbol}
                onClick={() => {
                  setCoin(tokenInfo.symbol);
                  setShowDialog(false);
                }}
              >
                <div
                  style={{
                    display: 'flex',
                    flexDirection: 'row',
                    gap: '10px',
                    alignItems: 'center',
                  }}
                >
                  <TokenIcon
                    url={tokenInfo.logoUri}
                    tokenName={tokenInfo.name}
                    size={30}
                    className={classes.tokenIcon}
                  />
                  <div class="flex-column">
                    <p style={{ fontSize: '12px', fontWeight: '600' }}>
                      {tokenInfo.symbol ?? abbreviateAddress(tokenInfo.address)}
                    </p>
                    <p style={{ fontSize: '12px', fontWeight: '400' }}>
                      {tokenInfo.name ?? abbreviateAddress(tokenInfo.address)}
                    </p>
                  </div>
                </div>
                <div className="token-radio-button">
                  {coin === tokenInfo.symbol && (
                    <div className="token-radio-button-fill" />
                  )}
                </div>
              </div>
            ))}
        </div>
      </BottomSheet>
    </>
    // <DialogForm open={open} onClose={onClose} fullWidth>
    //   <DialogTitle>
    //     Deposit funds with{' '}
    //     <Link target="_blank" href={'https://ftx.com/pay'}>
    //       FTX Pay
    //     </Link>
    //   </DialogTitle>
    //   <DialogContent>
    //     <DialogContentText>
    //       Send funds to your Sollet wallet from an FTX account, where you can add funds using crypto on multiple blockchains, credit cards, and more.
    //     </DialogContentText>
    //     <DialogContentText>
    //       If you don't have an FTX account, it may take a few moments to get up.
    //     </DialogContentText>
    //     <div className={classes.container}>
    //       <FormControl variant="outlined" className={classes.selector}>
    //         <Select value={coin} onChange={(e) => setCoin(e.target.value)}>
    //           <MenuItem value={'KUNCI'}>
    //             <div className={classes.menuItem}>
    //               <TokenIcon
    //                 url={null}
    //                 mint={null}
    //                 tokenName={'KUNCI'}
    //                 size={30}
    //                 className={classes.tokenIcon}
    //               />
    //               <div>{isExtensionWidth ? 'KUNCI' : 'Kuncicoin KUNCI'}</div>
    //             </div>
    //           </MenuItem>
    //           {popularTokens
    //             .filter((tokenInfo) => tokenInfo.address && tokenInfo.symbol)
    //             .map((tokenInfo) => (
    //               <MenuItem value={tokenInfo.symbol} key={tokenInfo.symbol}>
    //                 <div className={classes.menuItem}>
    //                   <TokenIcon
    //                     url={tokenInfo.logoUri}
    //                     tokenName={tokenInfo.name}
    //                     size={30}
    //                     className={classes.tokenIcon}
    //                   />
    //                   <Link
    //                     target="_blank"
    //                     rel="noopener"
    //                     href={
    //                       `https://kunciscan.com/address/${tokenInfo.address}` +
    //                       urlSuffix
    //                     }
    //                   >
    //                     {(isExtensionWidth ? '' : `${tokenInfo.name ?? abbreviateAddress(tokenInfo.address)} `) + tokenInfo.symbol}
    //                   </Link>
    //                 </div>
    //               </MenuItem>
    //             ))}
    //         </Select>
    //       </FormControl>
    //       <Button onClick={onSubmit} size="large" color="primary">
    //         Open FTX Pay
    //       </Button>
    //     </div>
    //   </DialogContent>

    //   <DialogActions>
    //     <Button onClick={onClose}>Close</Button>
    //   </DialogActions>
    // </DialogForm>
  );
}
