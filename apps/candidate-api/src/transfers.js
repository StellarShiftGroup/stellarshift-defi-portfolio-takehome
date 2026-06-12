'use strict';

const { getFunctionSelector } = require('@stellarshift/abi-tools');

/**
 * ERC-20 transfer(address,uint256) selector for log decoding tasks.
 * @returns {string}
 */
function getTransferSelector() {
  return getFunctionSelector('transfer', ['address', 'uint256']);
}

module.exports = { getTransferSelector };
