Deal
====

An object validator for domain-driven design.

Named after [Deal][annotated], a Grateful Dead song first performed in 1971.
Its about an experienced gambler, but (and this is a stretch) its first verse
could apply to domain-driven design.

> Since it cost a lot to win  
> and even more to lose  
> You and me bound to spend some time  
> wondring what to choose

My favorite performance was on [February 26, 1977][1977-02-26] at the Swing
Auditorium in San Bernardino, CA.

[annotated]: http://artsites.ucsc.edu/GDead/agdl/deal.html
[1977-02-26]: https://archive.org/details/gd77-02-26.sbd.alphadog.9752.sbeok.shnf


Example Usage
-------------

```javascript

var d = require('deal-validator');

> var createSong = d.define({
  artist: [d.required, d.string],
  title: [d.required, d.string],
  year: [d.optional, d.number]
});

// Given valid input, a valid object is returned
> createSong({
  artist: 'Grateful Dead',
  title: 'Deal'
});
{ artist: 'Grateful Dead', title: 'Deal' }

// If any of the validations fail, an error is thrown
> createSong({ title: 'Deal' });
Error: value cannot be undefined
    at required (/Users/ryanaghdam/Desktop/deal/index.js:28:13)
    at /Users/ryanaghdam/Desktop/deal/node_modules/ramda/dist/ramda.js:6122:33
    at f1 (/Users/ryanaghdam/Desktop/deal/node_modules/ramda/dist/ramda.js:166:27)
    at XWrap.reducer [as f] (/Users/ryanaghdam/Desktop/deal/index.js:9:45)
    at XWrap.@@transducer/step (/Users/ryanaghdam/Desktop/deal/node_modules/ramda/dist/ramda.js:701:25)
    at _arrayReduce (/Users/ryanaghdam/Desktop/deal/node_modules/ramda/dist/ramda.js:4148:46)
    at _reduce (/Users/ryanaghdam/Desktop/deal/node_modules/ramda/dist/ramda.js:4178:24)
    at Object.f3 [as reduce] (/Users/ryanaghdam/Desktop/deal/node_modules/ramda/dist/ramda.js:266:24)
    at /Users/ryanaghdam/Desktop/deal/index.js:18:16
    at repl:1:1

// Any attributes not defined in the schema are ignored
> createSong({
  artist: 'Grateful Dead',
  title: 'Playing in the Band',
  ruinedByDonna: true
});
{ artist: 'Grateful Dead', title: 'Playing in the Band' }

// Custom validator
var nonEmptyArray = function (value) {
  // validate that the input is an array
  value = d.array(value);

  if (value.length === 0) {
    throw new Error('array cannot be empty');
  }

  return value;
}

// Custom validators, using composition
var nonEmpty = function (value) {
  if (value.length === 0) {
    throw new Error('cannot be empty');
  }

  return value;
}

var nonEmptyArray = R.compose(nonEmpty, d.array);

var creator = d.define({
  p: [nonEmptyArray, d.required]
});
```


API
---

The following is a list of exported functions.

### `define(schema)`

Returns a function that validates against the given `schema`.

### Validators

Validators accept a single value and return it if it passes the validator.  If
it fails, an error is thrown.

#### `optional(value)`

Returns the given value.  This function is purely syntactic; it allows for
optional fields to be explicitly defined as such.

#### `required(value)`

Returns the given value if it is not undefined.  Throws an error if it is
undefined.

#### `string(value)`

Returns the given value if it is a string.  An empty string is considered valid
input.

#### `boolean(value)`

Returns the given value if it is a boolean or undefined.  An error is thrown
if the input is not a boolean.

#### `number(value)`

Returns the given value if it is a number or undefined.  `Infinity`,
`-Infinity`, and `NaN` are not considered valid input.

#### `function(value)`

Returns the given value if it is function or undefined.

#### `array(value)`

Returns the given value if it is an array or undefined.  An empty object is
considered valid input.

#### `object(value)`

Returns the given value if it is an object or undefined.  An empty object is
considered valid input.

Planned Enhancements
--------------------

- Support schemas with nested objects
- Support custom error messages
