'use strict';

const { isAddress, shortenAddress, toChecksumAddress } = require('@stellarshift/evm-address-kit');
const { getChain, explorerAddressUrl } = require('@stellarshift/chain-metadata');
const { formatEther } = require('@stellarshift/token-units');

/**
 * Build a normalized portfolio report for a single chain.
 * @param {{ chainId: number|string, wallets: string[], balancesWei: string[] }} input
 */
function buildPortfolioReport(input) {
  const chainId = Number(input.chainId);
  const chain = getChain(chainId);
  if (!chain) {
    throw new Error(`Unknown chainId: ${chainId}`);
  }

  const wallets = input.wallets || [];
  const balancesWei = input.balancesWei || [];

  if (wallets.length !== balancesWei.length) {
    throw new Error('wallets and balancesWei length mismatch');
  }

  const positions = wallets.map((raw, i) => {
    if (!isAddress(raw)) {
      throw new Error(`Invalid wallet at index ${i}`);
    }
    const checksum = toChecksumAddress(raw);
    const balance = formatEther(balancesWei[i]);
    return {
      address: checksum,
      display: shortenAddress(checksum, 4),
      explorerUrl: explorerAddressUrl(chainId, checksum),
      nativeBalance: balance,
      symbol: chain.nativeCurrency.symbol,
    };
  });

  return {
    schema: 'stellarshift.portfolio-report/v1',
    generatedAt: new Date().toISOString(),
    chain: {
      chainId: chain.chainId,
      name: chain.name,
      shortName: chain.shortName,
    },
    positionCount: positions.length,
    positions,
  };
}

module.exports = { buildPortfolioReport };
