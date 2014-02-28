# io.mapping.jslib: A helpful JavaScript library for AngularJS applications

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

## Contributing

I welcome contributions! Please ensure that any changes you submit are adequately covered by unit tests. See the
existing codebase for examples of how this should be done.