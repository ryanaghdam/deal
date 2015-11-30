'use strict';

var string = require('../../../../lib/validators/string');
var assert = require('assert');

describe('string validator', function () {
  it('should return its argument if it is a string', function () {
    var actual = string('Ryan');
    assert.equal(actual, 'Ryan');
  });

  it('should not throw an error if its argument is undefined', function () {
    var actual = string();
    assert.equal(actual, undefined);
  });

  it('should throw an error if its argument is a number', function () {
    var fn = function () { string(1); };
    assert.throws(fn, Error);
  });

  it('should throw an error if its argument is an object', function () {
    var fn = function () { string({}); };
    assert.throws(fn, Error);
  });
});

