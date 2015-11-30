'use strict';

var required = require('../../../../lib/validators/required');
var assert = require('assert');

describe('required validator', function () {
  it('should return its argument if it is a value', function () {
    var actual = required(1);
    assert.equal(actual, 1);
  });

  it('should throw an error if its argument is undefined', function () {
    var fn = function () { required(); };
    assert.throws(fn, Error);
  });

  it('should throw an error if its argument is null', function () {
    var fn = function () { required(null); };
    assert.throws(fn, Error);
  });
});
