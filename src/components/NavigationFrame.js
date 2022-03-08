import React, { useState, useMemo } from 'react';
import Toolbar from '@material-ui/core/Toolbar';
import AppBar from '@material-ui/core/AppBar';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import { useConnectionConfig } from '../utils/connection';
import {
  clusterForEndpoint,
  getClusters,
  addCustomCluster,
  customClusterExists,
} from '../utils/clusters';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import { useWalletSelector } from '../utils/wallet';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import CheckIcon from '@material-ui/icons/Check';
import AddIcon from '@material-ui/icons/Add';
import ExitToApp from '@material-ui/icons/ExitToApp';
import AccountIcon from '@material-ui/icons/AccountCircle';
import UsbIcon from '@material-ui/icons/Usb';
import Divider from '@material-ui/core/Divider';
import Hidden from '@material-ui/core/Hidden';
import IconButton from '@material-ui/core/IconButton';
import SolanaIcon from './SolanaIcon';
import CodeIcon from '@material-ui/icons/Code';
import Tooltip from '@material-ui/core/Tooltip';
import ImportExportIcon from '@material-ui/icons/ImportExport';
import AddAccountDialog from './AddAccountDialog';
import DeleteMnemonicDialog from './DeleteMnemonicDialog';
import AddHardwareWalletDialog from './AddHarwareWalletDialog';
import { ExportMnemonicDialog } from './ExportAccountDialog.js';
import {
  isExtension,
  isExtensionPopup,
  shortenAddress,
  useIsExtensionWidth,
} from '../utils/utils';
import ConnectionIcon from './ConnectionIcon';
import { Badge } from '@material-ui/core';
import { useConnectedWallets } from '../utils/connected-wallets';
import { usePage } from '../utils/page';
import { MonetizationOn, OpenInNew } from '@material-ui/icons';
import AddCustomClusterDialog from './AddCustomClusterDialog';
import logo from '../assets/icons/logo.svg';
import crossIcon from '../assets/icons/icon-cross.svg';
import checkCircleIcon from '../assets/icons/icon-check-circle.svg';
import hardwareIcon from '../assets/icons/icon-hardware.svg';
import addUserIcon from '../assets/icons/icon-add-user.svg';
import exportIcon from '../assets/icons/icon-export.svg';
import logoutIcon from '../assets/icons/icon-logout.svg';

const useStyles = makeStyles((theme) => ({
  content: {
    flexGrow: 1,
    paddingBottom: theme.spacing(3),
    [theme.breakpoints.up(theme.ext)]: {
      paddingTop: theme.spacing(3),
      paddingLeft: theme.spacing(1),
      paddingRight: theme.spacing(1),
    },
  },
  title: {
    flexGrow: 1,
  },
  button: {
    marginLeft: theme.spacing(1),
  },
  menuItemIcon: {
    minWidth: 32,
  },
  badge: {
    backgroundColor: theme.palette.success.main,
    color: theme.palette.text.main,
    height: 16,
    width: 16,
  },
}));

export default function NavigationFrame({ children }) {
  const classes = useStyles();
  const isExtensionWidth = useIsExtensionWidth();
  const {
    accounts,
    derivedAccounts,
    hardwareWalletAccount,
    setHardwareWalletAccount,
    setWalletSelector,
    addAccount,
  } = useWalletSelector();
  const [addHardwareWalletDialogOpen, setAddHardwareWalletDialogOpen] =
    useState(false);
  const [addAccountOpen, setAddAccountOpen] = useState(false);
  const [walletSelectorOpen, setWalletSelectorOpen] = useState(false);

  if (addHardwareWalletDialogOpen)
    return (
      <AddHardwareWalletDialog
        open={addHardwareWalletDialogOpen}
        onClose={() => setAddHardwareWalletDialogOpen(false)}
        onAdd={({ publicKey, derivationPath, account, change }) => {
          setHardwareWalletAccount({
            name: 'Hardware wallet',
            publicKey,
            importedAccount: publicKey.toString(),
            ledger: true,
            derivationPath,
            account,
            change,
          });
          setWalletSelector({
            walletIndex: undefined,
            importedPubkey: publicKey.toString(),
            ledger: true,
            derivationPath,
            account,
            change,
          });
        }}
      />
    );

  if (addAccountOpen)
    return (
      <AddAccountDialog
        open={addAccountOpen}
        onClose={() => setAddAccountOpen(false)}
        onAdd={({ name, importedAccount }) => {
          addAccount({ name, importedAccount });
          setWalletSelector({
            walletIndex: importedAccount ? undefined : derivedAccounts.length,
            importedPubkey: importedAccount
              ? importedAccount.publicKey.toString()
              : undefined,
            ledger: false,
          });
          setAddAccountOpen(false);
        }}
      />
    );

  return (
    <>
      <div className="container-parent">
        <div className="header">
          <div style={{ display: 'flex', flexDirection: 'row' }}>
            <img src={logo} alt="logo" />
            <p className="text-brand">Kunciwallet</p>
          </div>
          <NavigationButtons
            walletSelectorOpen={walletSelectorOpen}
            setWalletSelectorOpen={setWalletSelectorOpen}
          />
        </div>
        {walletSelectorOpen ? (
          <WalletSelector
            setAddHardwareWalletDialogOpen={setAddHardwareWalletDialogOpen}
            setAddAccountOpen={setAddAccountOpen}
          />
        ) : (
          <div className="container">{children}</div>
        )}
      </div>

      {/* <AppBar position="static" style={{ background: '#2c3691' }}> */}
      {/*!isExtension && (
          <div
            style={{
              textAlign: 'center',
              background: '#fafafa',
              color: 'black',
              paddingLeft: '24px',
              paddingRight: '24px',
              fontSize: '14px',
            }}
          >
            <Typography>
              Beware of sites attempting to impersonate kunciwallet.com or other DeFi
              services.
            </Typography>
          </div>
          )*/}
      {/* <Toolbar>
          <Typography variant="h6" className={classes.title} component="h1">
            {isExtensionWidth ? 'Kunciwallet' : 'Kuncicoin SPL Token Wallet'}
          </Typography>
          <NavigationButtons />
        </Toolbar>
      </AppBar>
      <main className={classes.content}>{children}</main>
      {!isExtensionWidth && <Footer />} */}
    </>
  );
}

function NavigationButtons({ walletSelectorOpen, setWalletSelectorOpen }) {
  const isExtensionWidth = useIsExtensionWidth();
  const [page] = usePage();

  if (isExtensionPopup) {
    return null;
  }

  let elements = [];
  if (page === 'wallet') {
    elements = [
      isExtension && <ConnectionsButton />,
      <div style={{ display: 'flex', flexDirection: 'row', gap: '10px' }}>
        {walletSelectorOpen ? (
          <div
            className="avatar"
            style={{
              background: 'transparent',
            }}
          >
            <img
              src={crossIcon}
              alt="close"
              onClick={() => setWalletSelectorOpen((prev) => !prev)}
            />
          </div>
        ) : (
          <>
            <NetworkSelector />
            <div
              className="avatar"
              onClick={() => setWalletSelectorOpen((prev) => !prev)}
            ></div>
          </>
        )}
      </div>,
    ];
  } else if (page === 'connections') {
    elements = [<WalletButton />];
  }

  if (isExtension && isExtensionWidth) {
    elements.push(<ExpandButton />);
  }

  return elements;
}

export function ExpandButton() {
  const onClick = () => {
    window.open(chrome.extension.getURL('index.html'), '_blank');
  };

  return (
    <Tooltip title="Expand View">
      <IconButton color="inherit" onClick={onClick}>
        <OpenInNew />
      </IconButton>
    </Tooltip>
  );
}

export function WalletButton() {
  const classes = useStyles();
  const setPage = usePage()[1];
  const onClick = () => setPage('wallet');

  return (
    <>
      <Hidden smUp>
        <Tooltip title="Wallet Balances">
          <IconButton color="inherit" onClick={onClick}>
            <MonetizationOn />
          </IconButton>
        </Tooltip>
      </Hidden>
      <Hidden xsDown>
        <Button color="inherit" onClick={onClick} className={classes.button}>
          Kunciwallet
        </Button>
      </Hidden>
    </>
  );
}

export function ConnectionsButton() {
  const classes = useStyles();
  const setPage = usePage()[1];
  const onClick = () => setPage('connections');
  const connectedWallets = useConnectedWallets();

  const connectionAmount = Object.keys(connectedWallets).length;

  return (
    <>
      <Hidden smUp>
        <Tooltip title="Manage Connections">
          <IconButton color="inherit" onClick={onClick}>
            <Badge
              badgeContent={connectionAmount}
              classes={{ badge: classes.badge }}
            >
              <ConnectionIcon />
            </Badge>
          </IconButton>
        </Tooltip>
      </Hidden>
      <Hidden xsDown>
        <Badge
          badgeContent={connectionAmount}
          classes={{ badge: classes.badge }}
        >
          <Button color="inherit" onClick={onClick} className={classes.button}>
            Connections
          </Button>
        </Badge>
      </Hidden>
    </>
  );
}

export function NetworkSelector() {
  const { endpoint, setEndpoint } = useConnectionConfig();
  const cluster = useMemo(() => clusterForEndpoint(endpoint), [endpoint]);
  const [anchorEl, setAnchorEl] = useState(null);
  const [addCustomNetworkOpen, setCustomNetworkOpen] = useState(false);
  const classes = useStyles();

  return (
    <>
      <AddCustomClusterDialog
        open={addCustomNetworkOpen}
        onClose={() => setCustomNetworkOpen(false)}
        onAdd={({ name, apiUrl }) => {
          addCustomCluster(name, apiUrl);
          setCustomNetworkOpen(false);
        }}
      />
      {/* <Hidden xsDown> */}
      <select
        className="custom-select"
        name="networks"
        id="networks"
        onChange={(e) =>
          e.target.value === 'new_endpoint'
            ? (() => {
                setCustomNetworkOpen(true);
                e.target.value = endpoint;
              })()
            : setEndpoint(e.target.value)
        }
      >
        {getClusters().map((cluster) => (
          <option
            key={cluster.apiUrl}
            value={cluster.apiUrl}
            selected={cluster.apiUrl === endpoint}
          >
            {cluster.name === 'mainnet-beta-backup'
              ? 'Mainnet Beta Backup'
              : cluster.label}
          </option>
        ))}
        <option value="new_endpoint">
          {customClusterExists()
            ? 'Edit Custom Endpoint'
            : 'Add Custom Endpoint'}
        </option>
      </select>
      {/* <Button
          color="inherit"
          onClick={(e) => setAnchorEl(e.target)}
          className={classes.button}
        >
          {cluster?.label ?? 'Network'}
        </Button> */}
      {/* </Hidden> */}
      {/* <Hidden smUp>
        <Tooltip title="Select Network" arrow>
          <IconButton color="inherit" onClick={(e) => setAnchorEl(e.target)}>
            <SolanaIcon />
          </IconButton>
        </Tooltip>
      </Hidden> */}
      {/* <Menu
        anchorEl={anchorEl}
        open={!!anchorEl}
        onClose={() => setAnchorEl(null)}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        getContentAnchorEl={null}
      >
        {getClusters().map((cluster) => (
          <MenuItem
            key={cluster.apiUrl}
            onClick={() => {
              setAnchorEl(null);
              setEndpoint(cluster.apiUrl);
            }}
            selected={cluster.apiUrl === endpoint}
          >
            <ListItemIcon className={classes.menuItemIcon}>
              {cluster.apiUrl === endpoint ? (
                <CheckIcon fontSize="small" />
              ) : null}
            </ListItemIcon>
            {cluster.name === 'mainnet-beta-backup'
              ? 'Mainnet Beta Backup'
              : cluster.label}
          </MenuItem>
        ))}
        <MenuItem
          onClick={() => {
            setCustomNetworkOpen(true);
          }}
        >
          <ListItemIcon className={classes.menuItemIcon}></ListItemIcon>
          {customClusterExists()
            ? 'Edit Custom Endpoint'
            : 'Add Custom Endpoint'}
        </MenuItem>
      </Menu> */}
    </>
  );
}

export function WalletSelector({
  setAddHardwareWalletDialogOpen,
  setAddAccountOpen,
}) {
  const {
    accounts,
    derivedAccounts,
    hardwareWalletAccount,
    setHardwareWalletAccount,
    setWalletSelector,
    addAccount,
  } = useWalletSelector();
  const [anchorEl, setAnchorEl] = useState(null);
  const [deleteMnemonicOpen, setDeleteMnemonicOpen] = useState(false);
  const [exportMnemonicOpen, setExportMnemonicOpen] = useState(false);
  const classes = useStyles();

  if (accounts.length === 0) {
    return null;
  }
  return (
    <>
      <div className="wallet-selector-container">
        <div
          style={{
            padding: '10px 0px',
          }}
        >
          {accounts.map((account) => (
            <AccountListItem
              account={account}
              classes={classes}
              setAnchorEl={setAnchorEl}
              setWalletSelector={setWalletSelector}
            />
          ))}
          {hardwareWalletAccount && (
            <>
              <AccountListItem
                account={hardwareWalletAccount}
                classes={classes}
                setAnchorEl={setAnchorEl}
                setWalletSelector={setWalletSelector}
              />
            </>
          )}
        </div>
        <div
          style={{
            display: 'flex',
            flexGrow: 1,
            flexDirection: 'column',
            backgroundColor: '#27303f',
          }}
        >
          <MenuItem
            style={{ padding: '15px 20px' }}
            onClick={() => setAddHardwareWalletDialogOpen(true)}
          >
            <ListItemIcon className={classes.menuItemIcon}>
              {/* <UsbIcon fontSize="small" /> */}
              <img src={hardwareIcon} alt="Add Hardware Wallet" />
            </ListItemIcon>
            Import Hardware Wallet
          </MenuItem>
          <MenuItem
            style={{ padding: '15px 20px' }}
            onClick={() => {
              setAnchorEl(null);
              setAddAccountOpen(true);
            }}
          >
            <ListItemIcon className={classes.menuItemIcon}>
              {/* <AddIcon fontSize="small" /> */}
              <img src={addUserIcon} alt="Add Account" />
            </ListItemIcon>
            Add Account
          </MenuItem>
          <MenuItem
            style={{ padding: '15px 20px' }}
            onClick={() => {
              setAnchorEl(null);
              setExportMnemonicOpen(true);
            }}
          >
            <ListItemIcon className={classes.menuItemIcon}>
              {/* <ImportExportIcon fontSize="small" /> */}
              <img src={exportIcon} alt="Export Wallet" />
            </ListItemIcon>
            Export Secret Phrase
          </MenuItem>
          <MenuItem
            style={{ padding: '15px 20px' }}
            onClick={() => {
              setAnchorEl(null);
              setDeleteMnemonicOpen(true);
            }}
          >
            <ListItemIcon className={classes.menuItemIcon}>
              {/* <ExitToApp fontSize="small" /> */}
              <img src={logoutIcon} alt="Logout" />
            </ListItemIcon>
            Log Out
          </MenuItem>
        </div>
      </div>
      {/* <AddHardwareWalletDialog
        open={addHardwareWalletDialogOpen}
        onClose={() => setAddHardwareWalletDialogOpen(false)}
        onAdd={({ publicKey, derivationPath, account, change }) => {
          setHardwareWalletAccount({
            name: 'Hardware wallet',
            publicKey,
            importedAccount: publicKey.toString(),
            ledger: true,
            derivationPath,
            account,
            change,
          });
          setWalletSelector({
            walletIndex: undefined,
            importedPubkey: publicKey.toString(),
            ledger: true,
            derivationPath,
            account,
            change,
          });
        }}
      /> */}
      {/* <AddAccountDialog
        open={addAccountOpen}
        onClose={() => setAddAccountOpen(false)}
        onAdd={({ name, importedAccount }) => {
          addAccount({ name, importedAccount });
          setWalletSelector({
            walletIndex: importedAccount ? undefined : derivedAccounts.length,
            importedPubkey: importedAccount
              ? importedAccount.publicKey.toString()
              : undefined,
            ledger: false,
          });
          setAddAccountOpen(false);
        }}
      /> */}
      <ExportMnemonicDialog
        open={exportMnemonicOpen}
        onClose={() => setExportMnemonicOpen(false)}
      />
      <DeleteMnemonicDialog
        open={deleteMnemonicOpen}
        onClose={() => setDeleteMnemonicOpen(false)}
      />
      {/* <Hidden xsDown>
        <Button
          color="inherit"
          onClick={(e) => setAnchorEl(e.target)}
          className={classes.button}
        >
          Account
        </Button>
      </Hidden>
      <Hidden smUp>
        <Tooltip title="Select Account" arrow>
          <IconButton color="inherit" onClick={(e) => setAnchorEl(e.target)}>
            <AccountIcon />
          </IconButton>
        </Tooltip>
      </Hidden> */}
      {/* <Menu
        anchorEl={anchorEl}
        open={!!anchorEl}
        onClose={() => setAnchorEl(null)}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        getContentAnchorEl={null}
      >
        {accounts.map((account) => (
          <AccountListItem
            account={account}
            classes={classes}
            setAnchorEl={setAnchorEl}
            setWalletSelector={setWalletSelector}
          />
        ))}
        {hardwareWalletAccount && (
          <>
            <Divider />
            <AccountListItem
              account={hardwareWalletAccount}
              classes={classes}
              setAnchorEl={setAnchorEl}
              setWalletSelector={setWalletSelector}
            />
          </>
        )}
        <Divider />
        <MenuItem onClick={() => setAddHardwareWalletDialogOpen(true)}>
          <ListItemIcon className={classes.menuItemIcon}>
            <UsbIcon fontSize="small" />
          </ListItemIcon>
          Import Hardware Wallet
        </MenuItem>
        <MenuItem
          onClick={() => {
            setAnchorEl(null);
            setAddAccountOpen(true);
          }}
        >
          <ListItemIcon className={classes.menuItemIcon}>
            <AddIcon fontSize="small" />
          </ListItemIcon>
          Add Account
        </MenuItem>
        <MenuItem
          onClick={() => {
            setAnchorEl(null);
            setExportMnemonicOpen(true);
          }}
        >
          <ListItemIcon className={classes.menuItemIcon}>
            <ImportExportIcon fontSize="small" />
          </ListItemIcon>
          Export Mnemonic
        </MenuItem>
        <MenuItem
          onClick={() => {
            setAnchorEl(null);
            setDeleteMnemonicOpen(true);
          }}
        >
          <ListItemIcon className={classes.menuItemIcon}>
            <ExitToApp fontSize="small" />
          </ListItemIcon>
          {'Delete Mnemonic & Log Out'}
        </MenuItem>
      </Menu> */}
    </>
  );
}

const useFooterStyles = makeStyles((theme) => ({
  footer: {
    display: 'flex',
    justifyContent: 'flex-end',
    margin: theme.spacing(2),
  },
}));

function Footer() {
  const classes = useFooterStyles();
  return (
    <footer className={classes.footer}>
      <Button
        variant="outlined"
        color="primary"
        component="a"
        target="_blank"
        rel="noopener"
        href="https://github.com/kuncicoin/spl-token-wallet"
        startIcon={<CodeIcon />}
      >
        View Source
      </Button>
    </footer>
  );
}

function AccountListItem({ account, classes, setAnchorEl, setWalletSelector }) {
  return (
    <div
      className="account-list-item"
      key={account.address.toBase58()}
      onClick={() => {
        setAnchorEl(null);
        setWalletSelector(account.selector);
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
        <div className="avatar" />
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <p style={{ color: '#CECECE', fontSize: '14px' }}>{account.name}</p>
          <p style={{ color: '#FFF', fontSize: '14px' }}>
            {shortenAddress(account.address.toBase58())}
          </p>
        </div>
      </div>
      {account.isSelected ? <img src={checkCircleIcon} alt="check" /> : null}
    </div>
  );
}
