'use strict';

var d = require('./');
var assert = require('assert');

describe('define', function () {
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
});

describe('validators', function () {
  describe('d.optional', function () {
    it('should return its argument if it is a value', function () {
      var actual = d.optional(1);
      assert.equal(actual, 1);
    });

    it('should return undefined if its argument is undefined', function () {
      var actual = d.optional();
      assert.equal(actual, undefined);
    });
  });

  describe('d.required', function () {
    it('should return its argument if it is a value', function () {
      var actual = d.required(1);
      assert.equal(actual, 1);
    });

    it('should throw an error if its argument is undefined', function () {
      var fn = function () { d.required(); };
      assert.throws(fn, Error);
    });

    it('should throw an error if its argument is null', function () {
      var fn = function () { d.required(null); };
      assert.throws(fn, Error);
    });
  });

  describe('d.string', function () {
    it('should return its argument if it is a string', function () {
      var actual = d.string('Ryan');
      assert.equal(actual, 'Ryan');
    });

    it('should not throw an error if its argument is undefined', function () {
      var actual = d.string();
      assert.equal(actual, undefined);
    });

    it('should throw an error if its argument is a number', function () {
      var fn = function () { d.string(1); };
      assert.throws(fn, Error);
    });

    it('should throw an error if its argument is an object', function () {
      var fn = function () { d.string({}); };
      assert.throws(fn, Error);
    });
  });

  describe('d.boolean', function () {
    it('should return its argument if it is a boolean (true)', function () {
      var actual = d.boolean(true);
      assert.equal(actual, true);
    });

    it('should return its argument if it is a boolean (false)', function () {
      var actual = d.boolean(false);
      assert.equal(actual, false);
    });

    it('should throw an error if its argument is not a boolean', function () {
      var fn = function () { d.boolean(7); };
      assert.throws(fn, Error);
    });

    it('should not throw an error if its argument is undefined', function () {
      var actual = d.boolean();
      assert.equal(actual, undefined);
    });
  });

  describe('d.number', function () {
    it('should return its argument if it is a number', function () {
      var actual = d.number(1);
      assert.equal(actual, 1);
    });

    it('should not throw an error if its argument is undefined', function () {
      var actual = d.number();
      assert.equal(actual, undefined);
    });

    it('should throw an error if its argument is a string', function () {
      var fn = function () { d.number('Ryan'); };
      assert.throws(fn, Error);
    });

    it('should throw an error if its argument is an object', function () {
      var fn = function () { d.number({ name: 'Ryan' }); };
      assert.throws(fn, Error);
    });

    it('should throw an error if its argument is an array', function () {
      var fn = function () { d.number([1, 2, 3]); };
      assert.throws(fn, Error);
    });

    it('should throw an error if its argument is Infinity', function () {
      var fn = function () { d.number(Infinity); };
      assert.throws(fn, Error);
    });

    it('should throw an error if its argument is -Infinity', function () {
      var fn = function () { d.number(-Infinity); };
      assert.throws(fn, Error);
    });

    it('should throw an error if its argument is NaN', function () {
      var fn = function () { d.number(NaN); };
      assert.throws(fn, Error);
    });
  });

  describe('d.function', function () {
    it('should return its argument if it is a function', function () {
      var fn = function () { return true; };
      var actual = d.function(fn);
      assert.equal(actual, fn);
    });

    it('should throw an error if its argument is an object', function () {
      var fn = function () { d.function({ a: 1 }); };
      assert.throws(fn, Error);
    });

    it('should throw an error if its argument is a number', function () {
      var fn = function () { d.function(1); };
      assert.throws(fn, Error);
    });

    it('should now throw an error if its argument is undefined', function () {
      var actual = d.function();
      assert.equal(actual, undefined);
    });
  });

  describe('d.array', function () {
    it('should return its argument if it is an array', function () {
      var actual = d.array([1, 2, 3]);
      assert.deepEqual(actual, [1, 2, 3]);
    });

    it('should return its argument if it is an empty array', function () {
      var actual = d.array([]);
      assert.deepEqual(actual, []);
    });

    it('should not throw an error if its argument is undefined', function () {
      var actual = d.array();
      assert.equal(actual, undefined);
    });

    it('should throw an error if its argument is an object', function () {
      var fn = function () { d.array({}); };
      assert.throws(fn, Error);
    });

    it('should throw an error if its argument is a string', function () {
      var fn = function () { d.array('abc'); };
      assert.throws(fn, Error);
    });

    it('should throw an error if its argument is a boolean', function () {
      var fn = function () { d.array(true); };
      assert.throws(fn, Error);
    });
  });

  describe('d.object', function () {
    it('should return its argument if it is an object', function () {
      var actual = d.object({ a: 1 });
      assert.deepEqual(actual, { a: 1 });
    });

    it('should return its argument if it is undefined', function () {
      var actual = d.object();
      assert.deepEqual(actual, undefined);
    });

    it('should return its argument if it is null', function () {
      var actual = d.object(null);
      assert.equal(actual, null);
    });

    it('should return its argument if it is an empty object', function () {
      var actual = d.object({});
      assert.deepEqual(actual, {});
    });

    it('should throw an error if its argument is an array', function () {
      var fn = function () { d.object([]); };
      assert.throws(fn, Error);
    });

    it('should throw an error if its argument is a string', function () {
      var fn = function () { d.object('abc'); };
      assert.throws(fn, Error);
    });

    it('should throw an error if its argument is a number', function () {
      var fn = function () { d.object(1); };
      assert.throws(fn, Error);
    });

    it('should throw an error if its argument is a boolean', function () {
      var fn = function () { d.object(false); };
      assert.throws(fn, Error);
    });
  });
});
