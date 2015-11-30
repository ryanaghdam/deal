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


  optional: require('./lib/validators/optional'),
  required: require('./lib/validators/required'),
  string: require('./lib/validators/string'),
  boolean: require('./lib/validators/boolean'),
  number: require('./lib/validators/number'),
  function: require('./lib/validators/function'),
  array: require('./lib/validators/array'),
  object: require('./lib/validators/object')
};
