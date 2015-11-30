'use strict';

var array = require('../../../../lib/validators/array');
var assert = require('assert');

describe('array validator', function () {
  it('should return its argument if it is an array', function () {
    var actual = array([1, 2, 3]);
    assert.deepEqual(actual, [1, 2, 3]);
  });

  it('should return its argument if it is an empty array', function () {
    var actual = array([]);
    assert.deepEqual(actual, []);
  });

  it('should not throw an error if its argument is undefined', function () {
    var actual = array();
    assert.equal(actual, undefined);
  });

  it('should throw an error if its argument is an object', function () {
    var fn = function () { array({}); };
    assert.throws(fn, Error);
  });

  it('should throw an error if its argument is a string', function () {
    var fn = function () { array('abc'); };
    assert.throws(fn, Error);
  });

  it('should throw an error if its argument is a boolean', function () {
    var fn = function () { array(true); };
    assert.throws(fn, Error);
  });
});
