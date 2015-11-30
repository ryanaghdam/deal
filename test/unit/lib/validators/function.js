'use strict';

var isFunction = require('../../../../lib/validators/function');
var assert = require('assert');

describe('function validator', function () {
  it('should return its argument if it is a function', function () {
    var fn = function () { return true; };
    var actual = isFunction(fn);
    assert.equal(actual, fn);
  });

  it('should throw an error if its argument is an object', function () {
    var fn = function () { isFunction({ a: 1 }); };
    assert.throws(fn, Error);
  });

  it('should throw an error if its argument is a number', function () {
    var fn = function () { isFunction(1); };
    assert.throws(fn, Error);
  });

  it('should now throw an error if its argument is undefined', function () {
    var actual = isFunction();
    assert.equal(actual, undefined);
  });
});
