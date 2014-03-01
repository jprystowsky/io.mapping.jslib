# io.mapping.jslib: A helpful JavaScript library for AngularJS applications [![Build Status](https://travis-ci.org/jprystowsky/io.mapping.jslib.png?branch=master)](https://travis-ci.org/jprystowsky/io.mapping.jslib)

Nota bene: This is heavily under development!

## Installation

```
// TODO :)
```

## Usage

```
// TODO!
```

* Something about bower
* Something about including the script

The library exposes a global variable named `iojs`, which is the entry point for all library features.

## Lambda (higher-order) functions

Lambda methods are accessed by initializing a new Lambda object using `Lambda()`:

```
var lambda = iojs.Lambda(input);
```

where `input` can be an array or any other valid input (primitives, objects, etc.). Internally, `input` is copied
(deeply) into an internal state before manipulation, so it is safe to pass data without worrying about it being
destroyed.

Every lambda method tries to return something useful, whether it be an aggregate value (e.g., in `fold` or `sum`) or
the object itself (in the case of `map`, among others), where further lambda operations may be desired). It's worth
noting that lambda methods are generally non-idempotent, as methods manipulate the internal state.

For the purposes of example, assume:

```
var items = [
	{
		id: 2319,
		name: "Widget A",
		manufacturer: "Acme, Inc.",
		price: 50
	},
	{
		id: 2712,
		name: "Widget B",
		manufacturer: "Acme, Inc.",
		price: 75
	},
	{
		id: 4309,
		name: "Dongle A",
		manufacturer: "Beta Co.",
		price: 20
	},
	{
		id: 4310,
		name: "Dongle B",
		manufacturer: "Beta Co..",
		price: 40
	},
	{
		id: 53,
		name: "Part 1",
		manufacturer: "PartSoft",
		price: 0.99
	}
];

var lmda = iojs.Lambda(items);
```

### Lambda(input)

Initialize a new `Lambda` whose state is copied from `input`. `input` is the preimage of `f`, where `f` is the
composition of the method calls to this `Lambda`. If `input` is a singleton (primitive value), then the input will
be cloned and wrapped by an array; otherwise, the input will be cloned.

Think of `Lambda` as C#'s `IEnumerable`.

### toArray()

Return \[the state of\] `lmda` under `f`, the composition of the calls to `lmda`.

```
// dupItems will be equal to items (but a deep copy of it)
var dupItems = lmda.toArray();
```

### map(callback\[, args\])

Perform a projection, `callback`, on `lmda`, optionally passing in an additional argument `args` to `callback` (which
will be `call`ed).

`callback` should resemble `function (object[, arg1, arg2, ..., argn])` where each `argi` is in `args`.
`object` will be the current fiber of `lmda` prior to the projection, i.e., an element of `lmda`. `callback` should
return the projection of `object`.

```
// justPrices will look like: [ 50, 75, 20, 40, 0.99 ]
var justPrices = lmda.map(function (product) {
	return product.price;
});
```

### filter(filterFunction\[, args\])

Filter `lmda` by removing elements that fail to return `true` when `filterFunction(element[, args])` is called for each
`element` in `lmda` (optionally passing along `args` additionally).

```
// justAcme will look like:
// [{
    	id: 2319,
    	name: "Widget A",
    	manufacturer: "Acme, Inc.",
    	price: 50
    },
    {
    	id: 2712,
    	name: "Widget B",
    	manufacturer: "Acme, Inc.",
    	price: 75
    }]
var justAcme  = lmda.filter(function (product) {
	return product.manufacturer == "Acme, Inc.";
});
```

## Contributing

I welcome contributions! Please ensure that any changes you submit are adequately covered by unit tests. See the
existing codebase for examples of how this should be done.