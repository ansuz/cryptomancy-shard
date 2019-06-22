var Util = require("cryptomancy-util");
var Shard = module.exports;

Shard.split = function (source, secret, n) {
    // secret should be a Uint8Array
    if (!(secret instanceof Uint8Array)) { throw new Error("expected Uint8Array"); }
    // n should be a positive integer, let's just call it a Uint8
    if (!Util.isUint8(n)) { throw new Error("Expected Uint8"); }
    if (n < 2) { throw new Error("Cannot split into fewer than two shards"); }

    // generate secrets and xor them against the original
    // until you have enough shares
    var L = secret.length;
    var temp;
    var shards = [];
    while (n-- > 1) {
        temp = source(L);
        secret = Util.xor.array(secret, temp);
        shards.push(temp);
    }
    shards.push(secret);
    return shards;
};

Shard.join = function (shards) {
    // shards should be an array
    if (!Array.isArray(shards)) { throw new Error("Expected Array"); }
    if (shards.length < 2) { throw new Error("Two or more shards are required"); }

    // xor it all back together
    return shards.reduce(function (A, B) {
        return Util.xor.array(A, B);
    });
};

