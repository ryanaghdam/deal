'use strict';

module.exports = function object(value) {
  if (typeof value === 'undefined' || value === null) {
    return value;
  }

  if (typeof value !== 'object' || Array.isArray(value)) {
    throw new Error('expected an object');
  }

  return value;
};
