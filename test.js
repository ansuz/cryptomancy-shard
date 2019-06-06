var Format = require("cryptomancy-format");
var Shard = require(".");
var Assert = require("assert");
var Source = require("cryptomancy-source");

(function () {
    var secret = 'pewpewpew';
    var u8_secret = Format.decodeUTF8(secret);

    var shards = Shard.create(Source.bytes.secure(), u8_secret, 5);

    var serialized = shards.map(Format.encode64);
    console.log(serialized);

    var combined = Shard.combine(shards);

    var recovered = Format.encodeUTF8(combined);

    Assert.equal(recovered, secret);
}());
