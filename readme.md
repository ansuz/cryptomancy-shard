# Cryptomancy-shard

For secret-sharing schemes which need support for threshold recombination there's [cryptomancy-secret](https://github.com/ansuz/cryptomancy-secret).
If your needs are _incredibly simple_, this module may provide a simpler option.

Its goal is to be:

* small
* fast
* flexible
* readable
* secure

It's missing:

* threshold support
* authentication
* padding bytes

## Use

```javascript
// the API takes and outputs Uint8Arrays
// so you'll probably want to convert between that and different formats 
var Format = require("cryptomancy-format");

// it expects you to supply your own randomness
// so it can be deterministic if that suits your needs
// otherwise use a cryptographically secure source of random bytes
var Source = require("cryptomancy-source");

var plaintext = "PEW PEW PEW";
var u8_message = Format.decodeUTF8(plaintext);

// load the library
var Shard = require("cryptomancy-shard");

// break the plaintext up into 5 shards
// all of which are necessary to reproduce the original value
var shards = Shard.create(u8_message, 5);

// print out your shards in whatever format you like
// I like base64 because they're probably not valid UTF8
// and I don't like hex
console.log(shards.map(Format.encode64));

// recombine the shards
// order doesn't matter because internally it's just xor'ing the values
var recovered = Format.encodeUTF8(Shards.combine(shards));
```

