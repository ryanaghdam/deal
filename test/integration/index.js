'use strict';

var d = require('../../');
var assert = require('assert');

describe('happy path', function () {
  it('should return a function', function () {
    var actual = d.define();
    assert(typeof actual === 'function');
  });

  it('should return a function that returns its argument', function () {
    var creator = d.define({name: []});

    var result = creator({ name: 'Ryan' });
    assert.deepEqual(result, { name: 'Ryan' });
  });

  it('should validate a required string', function () {
    var creator = d.define({ name: [d.required, d.string]});

    var result = creator({ name: 'Ryan' });
    assert.deepEqual(result, { name: 'Ryan' });
  });
});

describe('unhappy path', function () {
  it('should throw an error if all fields are invalid', function () {
    var creator = d.define({ name: [d.required, d.string] });
    var fn = function () { creator({ name: undefined }); };
    assert.throws(fn, Error);
  });

  it('should throw an error if one field is invalid', function () {
    var creator = d.define({
      name: [d.required, d.string],
        age: [d.required]
    });

    var fn = function () { creator({ name: undefined }); };
    assert.throws(fn, Error);
  });
});
