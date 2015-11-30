'use strict';

var optional = require('../../../../lib/validators/optional');
var assert = require('assert');

describe('optional validator', function () {
  it('should return its argument if it is a value', function () {
    var actual = optional(1);
    assert.equal(actual, 1);
  });

  it('should return undefined if its argument is undefined', function () {
    var actual = optional();
    assert.equal(actual, undefined);
  });
});
