import React, { useContext, useState, useEffect } from 'react';
import EventEmitter from 'events';
import {
  useConnectionConfig,
  MAINNET_URL,
  TESTNET_URL,
} from '../connection';
import { useListener } from '../utils';
import { clusterForEndpoint } from '../clusters';
import { useCallback } from 'react';
import { PublicKey } from '@solana/web3.js';
import { TokenListProvider } from '@kunci/spl-token-registry';

// This list is used for deciding what to display in the popular tokens list
// in the `AddTokenDialog`.
//
// Icons, names, and symbols are fetched not from here, but from the
// @solana/spl-token-registry. To add an icon or token name to the wallet,
// add the mints to that package. To add a token to the `AddTokenDialog`,
// add the `mintAddress` here. The rest of the fields are not used.
const POPULAR_TOKENS = {
  [MAINNET_URL]: [
    {
      mintAddress: '3L47U6yQoyDv9RUP7ArjDS3SjdPs1SKWvsPpSrdTVjD1',
      tokenName: 'Bitcoin',
      tokenSymbol: 'BTC',
      icon:
        'https://raw.githubusercontent.com/kuncicoin/token-list/main/assets/mainnet/3L47U6yQoyDv9RUP7ArjDS3SjdPs1SKWvsPpSrdTVjD1/logo.png',
    },
    {
      mintAddress: 'BYFLmeH8UxgewLY9bP1gq9DHXiCTQ4N3Arq3Udj6Eh2v',
      tokenName: 'Ethereum',
      tokenSymbol: 'ETH',
      icon:
        'https://raw.githubusercontent.com/kuncicoin/token-list/main/assets/mainnet/BYFLmeH8UxgewLY9bP1gq9DHXiCTQ4N3Arq3Udj6Eh2v/logo.png',
    },
    {
      mintAddress: 'zoXH6FPE16xMNeiD3ZdEVrHs54JrepyV6weD1LA1vQX',
      tokenName: 'Binance Coin',
      tokenSymbol: 'BNB',
      icon:
        'https://raw.githubusercontent.com/kuncicoin/token-list/main/assets/mainnet/zoXH6FPE16xMNeiD3ZdEVrHs54JrepyV6weD1LA1vQX/logo.png',
    },
    {
      mintAddress: '8Fv1q8V2vZGV3z29cnYXgSkWjRXbpJ1FzZNV4QSpw8au',
      tokenName: 'Tether',
      tokenSymbol: 'USDT',
      icon:
        'https://raw.githubusercontent.com/kuncicoin/token-list/main/assets/mainnet/8Fv1q8V2vZGV3z29cnYXgSkWjRXbpJ1FzZNV4QSpw8au/logo.png',
    },
    {
      mintAddress: '2gUDt5JRccGMob8biikYWwDjyaqDT2FWjGdpoxiyzcTt',
      tokenName: 'USD Coin',
      tokenSymbol: 'USDC',
      icon:
        'https://raw.githubusercontent.com/kuncicoin/token-list/main/assets/mainnet/2gUDt5JRccGMob8biikYWwDjyaqDT2FWjGdpoxiyzcTt/logo.png',
    },
    {
      mintAddress: 'F7nf5p9NBsBzDXhExcZ3g5fcRqqdoFZWgNyquVvLqZni',
      tokenName: 'Indonesia Rupiah',
      tokenSymbol: 'IDR',
      icon:
        'https://raw.githubusercontent.com/kuncicoin/token-list/main/assets/mainnet/F7nf5p9NBsBzDXhExcZ3g5fcRqqdoFZWgNyquVvLqZni/logo.png',
    },
  ],
  [TESTNET_URL]: [
    {
      mintAddress: '3L47U6yQoyDv9RUP7ArjDS3SjdPs1SKWvsPpSrdTVjD1',
      tokenName: 'Bitcoin',
      tokenSymbol: 'BTC',
      icon:
        'https://raw.githubusercontent.com/kuncicoin/token-list/main/assets/mainnet/3L47U6yQoyDv9RUP7ArjDS3SjdPs1SKWvsPpSrdTVjD1/logo.png',
    },
    {
      mintAddress: 'BYFLmeH8UxgewLY9bP1gq9DHXiCTQ4N3Arq3Udj6Eh2v',
      tokenName: 'Ethereum',
      tokenSymbol: 'ETH',
      icon:
        'https://raw.githubusercontent.com/kuncicoin/token-list/main/assets/mainnet/BYFLmeH8UxgewLY9bP1gq9DHXiCTQ4N3Arq3Udj6Eh2v/logo.png',
    },
    {
      mintAddress: 'zoXH6FPE16xMNeiD3ZdEVrHs54JrepyV6weD1LA1vQX',
      tokenName: 'Binance Coin',
      tokenSymbol: 'BNB',
      icon:
        'https://raw.githubusercontent.com/kuncicoin/token-list/main/assets/mainnet/zoXH6FPE16xMNeiD3ZdEVrHs54JrepyV6weD1LA1vQX/logo.png',
    },
    {
      mintAddress: '8Fv1q8V2vZGV3z29cnYXgSkWjRXbpJ1FzZNV4QSpw8au',
      tokenName: 'Tether',
      tokenSymbol: 'USDT',
      icon:
        'https://raw.githubusercontent.com/kuncicoin/token-list/main/assets/mainnet/8Fv1q8V2vZGV3z29cnYXgSkWjRXbpJ1FzZNV4QSpw8au/logo.png',
    },
    {
      mintAddress: '2gUDt5JRccGMob8biikYWwDjyaqDT2FWjGdpoxiyzcTt',
      tokenName: 'USD Coin',
      tokenSymbol: 'USDC',
      icon:
        'https://raw.githubusercontent.com/kuncicoin/token-list/main/assets/mainnet/2gUDt5JRccGMob8biikYWwDjyaqDT2FWjGdpoxiyzcTt/logo.png',
    },
    {
      mintAddress: 'F7nf5p9NBsBzDXhExcZ3g5fcRqqdoFZWgNyquVvLqZni',
      tokenName: 'Indonesia Rupiah',
      tokenSymbol: 'IDR',
      icon:
        'https://raw.githubusercontent.com/kuncicoin/token-list/main/assets/mainnet/F7nf5p9NBsBzDXhExcZ3g5fcRqqdoFZWgNyquVvLqZni/logo.png',
    },
  ],
};

const TokenListContext = React.createContext({});

export function useTokenInfos() {
  const { tokenInfos } = useContext(TokenListContext);
  return tokenInfos;
}

export function TokenRegistryProvider(props) {
  const { endpoint } = useConnectionConfig();
  const [tokenInfos, setTokenInfos] = useState(null);
  useEffect(() => {
    if (endpoint !== MAINNET_URL && endpoint !== TESTNET_URL) return;
    const tokenListProvider = new TokenListProvider();
    tokenListProvider.resolve().then((tokenListContainer) => {
      const cluster = clusterForEndpoint(endpoint);

      const filteredTokenListContainer = tokenListContainer?.filterByClusterSlug(
        cluster?.clusterSlug,
      );
      const tokenInfos =
        tokenListContainer !== filteredTokenListContainer
          ? filteredTokenListContainer?.getList()
          : null; // Workaround for filter return all on unknown slug
      setTokenInfos(tokenInfos);
    });
  }, [endpoint]);

  return (
    <TokenListContext.Provider value={{ tokenInfos }}>
      {props.children}
    </TokenListContext.Provider>
  );
}

const customTokenNamesByNetwork = JSON.parse(
  localStorage.getItem('tokenNames') ?? '{}',
);

const nameUpdated = new EventEmitter();
nameUpdated.setMaxListeners(100);

export function useTokenInfo(mint) {
  const { endpoint } = useConnectionConfig();
  useListener(nameUpdated, 'update');
  const tokenInfos = useTokenInfos();
  return getTokenInfo(mint, endpoint, tokenInfos);
}

export function getTokenInfo(mint, endpoint, tokenInfos) {
  if (!mint) {
    return { name: null, symbol: null };
  }

  let info = customTokenNamesByNetwork?.[endpoint]?.[mint.toBase58()];
  let match = tokenInfos?.find(
    (tokenInfo) => tokenInfo.address === mint.toBase58(),
  );

  if (match) {
    if (!info) {
      info = { ...match, logoUri: match.logoURI };
    }
    // The user has overridden a name locally.
    else {
      info = { ...match, ...info, logoUri: match.logoURI };
    }
  }
  return { ...info };
}

export function useUpdateTokenName() {
  const { endpoint } = useConnectionConfig();
  return useCallback(
    function updateTokenName(mint, name, symbol) {
      if (!name || !symbol) {
        if (name) {
          symbol = name;
        } else if (symbol) {
          name = symbol;
        } else {
          return;
        }
      }
      if (!customTokenNamesByNetwork[endpoint]) {
        customTokenNamesByNetwork[endpoint] = {};
      }
      customTokenNamesByNetwork[endpoint][mint.toBase58()] = { name, symbol };
      localStorage.setItem(
        'tokenNames',
        JSON.stringify(customTokenNamesByNetwork),
      );
      nameUpdated.emit('update');
    },
    [endpoint],
  );
}
// Returns tokenInfos for the popular tokens list.
export function usePopularTokens() {
  const tokenInfos = useTokenInfos();
  const { endpoint } = useConnectionConfig();
  return (!POPULAR_TOKENS[endpoint]
    ? []
    : POPULAR_TOKENS[endpoint]
  ).map((tok) =>
    getTokenInfo(new PublicKey(tok.mintAddress), endpoint, tokenInfos),
  );
}
