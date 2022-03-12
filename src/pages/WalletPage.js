import React, { useState } from 'react';
// import Container from '@material-ui/core/Container';
import BalancesList from '../components/BalancesList';
// import Grid from '@material-ui/core/Grid';
// import { useIsProdNetwork } from '../utils/connection';
// import DebugButtons from '../components/DebugButtons';
// import { makeStyles } from '@material-ui/core';
import NavigationFrame from '../components/NavigationFrame';
import DomainsList from '../components/DomainsList';
import FtxPayDialog from '../components/FtxPay/FtxPayDialog';
import { useWalletPublicKeys } from '../utils/wallet';
import AddTokenDialog from '../components/AddTokenDialog';
import SwapTokenDialog from '../components/SwapTokenDialog';

// const useStyles = makeStyles((theme) => ({
//   container: {
//     [theme.breakpoints.down(theme.ext)]: {
//       padding: 0,
//     },
//     [theme.breakpoints.up(theme.ext)]: {
//       maxWidth: 'md',
//     },
//   },
//   balancesContainer: {
//     [theme.breakpoints.down(theme.ext)]: {
//       marginBottom: 24,
//     },
//   },
// }));

export default function WalletPage() {
  const [showDomains, setShowDomains] = useState(false);
  const [showFtxPayDialog, setShowFtxPayDialog] = useState(false);
  const [showAddTokenDialog, setShowAddTokenDialog] = useState(false);
  const [showSwapTokenDialog, setShowSwapTokenDialog] = useState(false);

  const [publicKeys, loaded] = useWalletPublicKeys();

  if (showDomains)
    return <DomainsList open={showDomains} setOpen={setShowDomains} />;

  if (showFtxPayDialog)
    return (
      <NavigationFrame>
        <FtxPayDialog
          open={showFtxPayDialog}
          publicKeys={publicKeys}
          onClose={() => setShowFtxPayDialog(false)}
        />
      </NavigationFrame>
    );

  if (showAddTokenDialog)
    return (
      <NavigationFrame>
        <AddTokenDialog
          open={showAddTokenDialog}
          onClose={() => setShowAddTokenDialog(false)}
        />
      </NavigationFrame>
    );

  if (showSwapTokenDialog)
    return (
      <NavigationFrame>
        <SwapTokenDialog setShowSwapTokenDialog={setShowSwapTokenDialog} />
      </NavigationFrame>
    );

  return (
    <>
      <NavigationFrame>
        <BalancesList
          setShowDomains={setShowDomains}
          setShowFtxPayDialog={setShowFtxPayDialog}
          setShowAddTokenDialog={setShowAddTokenDialog}
          setShowSwapTokenDialog={setShowSwapTokenDialog}
        />
      </NavigationFrame>
      {/* <Container fixed maxWidth="md" className={classes.container}>
      <Grid container spacing={isExtensionWidth ? 0 : 3}>
        <Grid item xs={12} className={classes.balancesContainer}>
          <BalancesList />
        </Grid>
        {isProdNetwork ? null : (
          <Grid item xs={12}>
            <DebugButtons />
          </Grid>
        )}
      </Grid>
      </Container> */}
    </>
  );
}
