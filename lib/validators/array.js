'use strict';

module.exports = function array(value) {
  if (typeof value === 'undefined') {
    return value;
  }

  if (!Array.isArray(value)) {
    throw new Error('expected an array');
  }

  return value;
};
