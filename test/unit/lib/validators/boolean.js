'use strict';

var boolean = require('../../../../lib/validators/boolean');
var assert = require('assert');

describe('boolean validator', function () {
  it('should return its argument if it is a boolean (true)', function () {
    var actual = boolean(true);
    assert.equal(actual, true);
  });

  it('should return its argument if it is a boolean (false)', function () {
    var actual = boolean(false);
    assert.equal(actual, false);
  });

  it('should throw an error if its argument is not a boolean', function () {
    var fn = function () { boolean(7); };
    assert.throws(fn, Error);
  });

  it('should not throw an error if its argument is undefined', function () {
    var actual = boolean();
    assert.equal(actual, undefined);
  });
});
