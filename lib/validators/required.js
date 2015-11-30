'use strict';

module.exports = function required(value) {
  if (typeof value === 'undefined') {
    throw new Error('value cannot be undefined');
  }

  if (value === null) {
    throw new Error('value cannot be null');
  }

  return value;
}
