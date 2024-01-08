import '@fontsource/roboto/300.css'
import '@fontsource/roboto/400.css'
import '@fontsource/roboto/500.css'
import '@fontsource/roboto/700.css'

import { useAccount } from 'wagmi'
import * as React from 'react';
import { Outlet, Link } from "react-router-dom";
import { Account } from './components/Account'
import { Balance } from './components/Balance'
import { BlockNumber } from './components/BlockNumber'
import { Connect } from './components/Connect'
import { ConnectDialog } from './components/ConnectDialog'
import ResponsiveAppBar from './components/pages/AppBar'
import LandingPage from './components/pages/LandingPage'
import { NetworkSwitcher } from './components/NetworkSwitcher'
import { ReadContract } from './components/ReadContract'
import { ReadContracts } from './components/ReadContracts'
import { ReadContractsInfinite } from './components/ReadContractsInfinite'
import { SendTransaction } from './components/SendTransaction'
import { SendTransactionPrepared } from './components/SendTransactionPrepared'
import { SignMessage } from './components/SignMessage'
import { SignTypedData } from './components/SignTypedData'
import { Token } from './components/Token'
import { WatchContractEvents } from './components/WatchContractEvents'
import { WatchPendingTransactions } from './components/WatchPendingTransactions'
import { WriteContract } from './components/WriteContract'
import { WriteContractPrepared } from './components/WriteContractPrepared'

import { Box, Paper, PaletteMode } from '@mui/material';
import CssBaseline from '@mui/material/CssBaseline';
import { createTheme, ThemeProvider, styled } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';

import { useCallback } from "react";
import Particles from "react-tsparticles";
import { loadFull } from "tsparticles";
import type { Engine, ISourceOptions } from "tsparticles-engine";
import particlesOptions from "./particles.json";


const getDesignTokens = (mode: PaletteMode) => ({
  palette: {
    mode,
    ...(mode === 'light'
      ? {
          // palette values for light mode
          primary: {
            main: '#1b0c0d',
          },
          secondary: {
            main: '#f50057',
          },
          background: {
            default: '#dcd2ca',
            paper: '#f2ede9',
          },
        }
      : {
          // palette values for dark mode
          primary: {
            main: '#FFE0B2',
          },
          secondary: {
            main: '#f50057',
          },
          background: {
            default: '#1b0c0d',
            paper: '#1b0c0d',
          },
        }),
  },
});

const ColorModeContext = React.createContext({ toggleColorMode: () => {} });

export function useColorModeContext() {
  return React.useContext(ColorModeContext);
}

export function App() {
  const { isConnected } = useAccount()
  const preferredMode = useMediaQuery('(prefers-color-scheme: dark)') ? 'dark' : 'light';

  const particlesInit = useCallback(async (engine: Engine) => {
      await loadFull(engine);
  }, []);

  const [mode, setMode] = React.useState<PaletteMode>(preferredMode);
  const colorMode = React.useMemo(
    () => ({
      // The dark mode switch would invoke this method
      toggleColorMode: () => {
        setMode((prevMode: PaletteMode) =>
          prevMode === 'light' ? 'dark' : 'light',
        );
      },
    }),
    [],
  );

  // Update the theme only if the mode changes
  const theme = React.useMemo(() => createTheme(getDesignTokens(mode)), [mode]);
  const activeParticlesOptions = React.useMemo(() => mode == 'light' ? particlesOptions : { ...particlesOptions, 
    background: {
      "color": "#1b0c0d"
    },
    particles: {
      ...particlesOptions.particles,
      color: {
        "value": "#d8ebe9"
      },
      line_linked: {
        ...particlesOptions.particles.line_linked,
        "color": "#d8ebe9"
      },
    }
  }, [mode],);

  return (
    <>
      {/* <h1>wagmi + Vite</h1> */}

      {/* <Connect /> */}
      <ColorModeContext.Provider value={colorMode}>
        <ThemeProvider theme={theme}>
          <Particles options={activeParticlesOptions as ISourceOptions} init={particlesInit}/>
            <ResponsiveAppBar />
            <Outlet />
        </ThemeProvider>
      </ColorModeContext.Provider>
      {/* {isConnected && (
        <>
          <hr />
          <h2>Network</h2>
          <NetworkSwitcher />
          <br />
          <hr />
          <h2>Account</h2>
          <Account />
          <br />
          <hr />
          <h2>Balance</h2>
          <Balance />
          <br />
          <hr />
          <h2>Block Number</h2>
          <BlockNumber />
          <br />
          <hr />
          <h2>Read Contract</h2>
          <ReadContract />
          <br />
          <hr />
          <h2>Read Contracts</h2>
          <ReadContracts />
          <br />
          <hr />
          <h2>Read Contracts Infinite</h2>
          <ReadContractsInfinite />
          <br />
          <hr />
          <h2>Send Transaction</h2>
          <SendTransaction />
          <br />
          <hr />
          <h2>Send Transaction (Prepared)</h2>
          <SendTransactionPrepared />
          <br />
          <hr />
          <h2>Sign Message</h2>
          <SignMessage />
          <br />
          <hr />
          <h2>Sign Typed Data</h2>
          <SignTypedData />
          <br />
          <hr />
          <h2>Token</h2>
          <Token />
          <br />
          <hr />
          <h2>Watch Contract Events</h2>
          <WatchContractEvents />
          <br />
          <hr />
          <h2>Watch Pending Transactions</h2>
          <WatchPendingTransactions />
          <br />
          <hr />
          <h2>Write Contract</h2>
          <WriteContract />
          <br />
          <hr />
          <h2>Write Contract (Prepared)</h2>
          <WriteContractPrepared />
        </>
      )} */}

    </>
  )
}
