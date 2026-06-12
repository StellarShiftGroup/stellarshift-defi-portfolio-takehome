'use strict';

const { describe, it } = require('node:test');
const assert = require('node:assert/strict');
const { buildPortfolioReport } = require('../src/portfolio');
const { getTransferSelector } = require('../src/transfers');

describe('portfolio report', () => {
  it('builds normalized positions', () => {
    const report = buildPortfolioReport({
      chainId: 1,
      wallets: ['0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045'],
      balancesWei: ['1000000000000000000'],
    });
    assert.equal(report.chain.chainId, 1);
    assert.equal(report.positions.length, 1);
    assert.equal(report.positions[0].nativeBalance, '1');
    assert.equal(report.positions[0].symbol, 'ETH');
    assert.ok(report.positions[0].explorerUrl.includes('etherscan.io'));
  });

  it('rejects invalid address', () => {
    assert.throws(() =>
      buildPortfolioReport({
        chainId: 1,
        wallets: ['0xbad'],
        balancesWei: ['0'],
      })
    );
  });
});

describe('transfers', () => {
  it('returns ERC-20 transfer selector', () => {
    assert.equal(getTransferSelector(), '0xa9059cbb');
  });
});
