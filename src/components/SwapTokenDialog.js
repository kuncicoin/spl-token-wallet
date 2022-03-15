import React, { useState } from 'react';
import {
  Tooltip,
  Popover,
  IconButton,
  DialogActions,
  Button,
} from '@material-ui/core';
import SwapHoriz from '@material-ui/icons/SwapHoriz';
import PopupState, { bindTrigger, bindPopover } from 'material-ui-popup-state';
import Swap from '@project-serum/swap-ui';
import { Provider } from '@project-serum/anchor';
import { TokenListContainer } from '@kunci/spl-token-registry';
import { useTokenInfos } from '../utils/tokens/names';
import { useSendTransaction } from '../utils/notifications';
import { useWallet } from '../utils/wallet';
import { useConnection } from '../utils/connection';
import { useIsExtensionWidth } from '../utils/utils';
import DialogForm from './DialogForm';
import swapIcon from '../assets/icons/icon-swap.svg';
import arrowLeftIcon from '../assets/icons/icon-arrow-left.svg';

export default function SwapTokenDialog({ setShowSwapTokenDialog }) {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [sendTransaction] = useSendTransaction();
  const connection = useConnection();
  const wallet = useWallet();
  const tokenInfos = useTokenInfos();
  const tokenList = tokenInfos && new TokenListContainer(tokenInfos);
  const provider = new NotifyingProvider(connection, wallet, sendTransaction);
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
              onClick={() => setShowSwapTokenDialog(false)}
            />
            <p className="text-brand">Swap Token</p>
            <div />
          </div>
        </div>
        <div className="container" style={{ paddingTop: '25px' }}>
          <Swap
            provider={provider}
            tokenList={tokenList}
            containerStyle={{
              width: '100%',
              boxShadow: 'none',
            }}
          />
        </div>
      </div>
    </>
  );
}

function SwapButtonPopover({ size }) {
  const [sendTransaction] = useSendTransaction();
  const connection = useConnection();
  const wallet = useWallet();
  const tokenInfos = useTokenInfos();
  const tokenList = tokenInfos && new TokenListContainer(tokenInfos);
  const provider = new NotifyingProvider(connection, wallet, sendTransaction);
  return (
    tokenList && (
      <PopupState variant="popover">
        {(popupState) => (
          <div>
            <div className="button-container" {...bindTrigger(popupState)}>
              <div className="button-circle">
                <img src={swapIcon} alt="swap" />
              </div>
              <p className="text text-center">
                Swap
                <br />
                Tokens
              </p>
            </div>
            {/* <IconButton {...bindTrigger(popupState)} size={size}>
                <SwapHoriz />
              </IconButton> */}

            <Popover
              {...bindPopover(popupState)}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              PaperProps={{ style: { borderRadius: '10px' } }}
              disableRestoreFocus
              keepMounted
            >
              <Swap
                provider={provider}
                tokenList={tokenList}
                containerStyle={{ width: '432px' }}
              />
            </Popover>
          </div>
        )}
      </PopupState>
    )
  );
}

class NotifyingProvider extends Provider {
  constructor(connection, wallet, sendTransaction) {
    super(connection, wallet, {
      commitment: 'recent',
    });
    this.sendTransaction = sendTransaction;
  }

  async send(tx, signers, opts) {
    return new Promise((onSuccess, onError) => {
      this.sendTransaction(super.send(tx, signers, opts), {
        onSuccess,
        onError,
      });
    });
  }

  async sendAll(txs, opts) {
    return new Promise(async (resolve, onError) => {
      let txSigs = [];
      for (const tx of txs) {
        txSigs.push(
          await new Promise((onSuccess) => {
            this.sendTransaction(super.send(tx.tx, tx.signers, opts), {
              onSuccess,
              onError,
            });
          }),
        );
      }
      resolve(txSigs);
    });
  }
}
