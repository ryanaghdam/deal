'use strict';

var number = require('../../../../lib/validators/number');
var assert = require('assert');

describe('number validator', function () {
  it('should return its argument if it is a number', function () {
    var actual = number(1);
    assert.equal(actual, 1);
  });

  it('should not throw an error if its argument is undefined', function () {
    var actual = number();
    assert.equal(actual, undefined);
  });

  it('should throw an error if its argument is a string', function () {
    var fn = function () { number('Ryan'); };
    assert.throws(fn, Error);
  });

  it('should throw an error if its argument is an object', function () {
    var fn = function () { number({ name: 'Ryan' }); };
    assert.throws(fn, Error);
  });

  it('should throw an error if its argument is an array', function () {
    var fn = function () { number([1, 2, 3]); };
    assert.throws(fn, Error);
  });

  it('should throw an error if its argument is Infinity', function () {
    var fn = function () { number(Infinity); };
    assert.throws(fn, Error);
  });

  it('should throw an error if its argument is -Infinity', function () {
    var fn = function () { number(-Infinity); };
    assert.throws(fn, Error);
  });

  it('should throw an error if its argument is NaN', function () {
    var fn = function () { number(NaN); };
    assert.throws(fn, Error);
  });
});

