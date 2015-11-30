'use strict';

var object = require('../../../../lib/validators/object');
var assert = require('assert');

describe('object validator', function () {
  it('should return its argument if it is an object', function () {
    var actual = object({ a: 1 });
    assert.deepEqual(actual, { a: 1 });
  });

  it('should return its argument if it is undefined', function () {
    var actual = object();
    assert.deepEqual(actual, undefined);
  });

  it('should return its argument if it is null', function () {
    var actual = object(null);
    assert.equal(actual, null);
  });

  it('should return its argument if it is an empty object', function () {
    var actual = object({});
    assert.deepEqual(actual, {});
  });

  it('should throw an error if its argument is an array', function () {
    var fn = function () { object([]); };
    assert.throws(fn, Error);
  });

  it('should throw an error if its argument is a string', function () {
    var fn = function () { object('abc'); };
    assert.throws(fn, Error);
  });

  it('should throw an error if its argument is a number', function () {
    var fn = function () { object(1); };
    assert.throws(fn, Error);
  });

  it('should throw an error if its argument is a boolean', function () {
    var fn = function () { object(false); };
    assert.throws(fn, Error);
  });
});
