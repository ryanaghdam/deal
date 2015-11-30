'use strict';

module.exports = function number(value) {
  if (typeof value === 'undefined') {
    return value;
  }

  if (typeof value !== 'number') {
    throw new Error('expected a number');
  }

  if (value === Infinity || value === -Infinity) {
    throw new Error('expected a non-Infinite number');
  }

  if (isNaN(value)) {
    throw new Error('expected a number other than NaN');
  }

  return value;
};
