'use strict';

module.exports = function string(value) {
  if (typeof value === 'undefined') {
    return value;
  }

  if (typeof value !== 'string') {
    throw new Error('expected a string');
  }

  return value;
};
