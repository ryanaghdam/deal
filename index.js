'use strict';

var R = require('ramda');

module.exports = {
  define: function define(schema) {
    return function (attrs) {
      function reducer(acc, value) {
        var valid = R.allPass(schema[value])(attrs[value]);

        if (valid) {
          acc[value] = attrs[value];
        }

        return acc;
      }

      return R.reduce(reducer, {}, R.keys(schema));
    }
  },

  optional: function optional(value) {
    return value;
  },

  required: function required(value) {
    if (typeof value === 'undefined') {
      throw new Error('value cannot be undefined');
    }

    if (value === null) {
      throw new Error('value cannot be null');
    }

    return value;
  },

  string: function string(value) {
    if (typeof value === 'undefined') {
      return value;
    }

    if (typeof value !== 'string') {
      throw new Error('expected a string');
    }

    return value;
  },

  boolean: function boolean(value) {
    if (typeof value === 'undefined') {
      return value;
    }

    if (typeof value !== 'boolean') {
      throw new Error('expected a boolean');
    }

    return value;
  },

  number: function number(value) {
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
  },

  function: function (value) {
    if (typeof value === 'undefined') {
      return value;
    }

    if (typeof value !== 'function') {
      throw new Error('expected a function');
    }

    return value;
  },

  array: function array(value) {
    if (typeof value === 'undefined') {
      return value;
    }

    if (!Array.isArray(value)) {
      throw new Error('expected an array');
    }

    return value;
  },

  object: function object(value) {
    if (typeof value === 'undefined' || value === null) {
      return value;
    }

    if (typeof value !== 'object' || Array.isArray(value)) {
      throw new Error('expected an object');
    }

    return value;
  }
};
