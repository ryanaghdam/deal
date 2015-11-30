'use strict';

module.exports = function (value) {
  if (typeof value === 'undefined') {
    return value;
  }

  if (typeof value !== 'function') {
    throw new Error('expected a function');
  }

  return value;
};
