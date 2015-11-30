'use strict';

module.exports = function boolean(value) {
  if (typeof value === 'undefined') {
    return value;
  }

  if (typeof value !== 'boolean') {
    throw new Error('expected a boolean');
  }

  return value;
};
