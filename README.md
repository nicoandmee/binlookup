# BIN/IIN look up 💳

Lookup card BIN numbers using <https://www.binlist.net>

IIN (Issuer Identification Number) is the more modern name.

Useful for querying information from a credit card such as:

- brand (Visa, MasterCard, American Express, etc.)
- expected card number length and LUHN algorithm support
- type (debit or credit)
- category (prepaid or classic)
- country
- issuing bank

## What is a BIN?

The BIN is the first digits of a card number: `0000 0000 **** ****`. You can
pass any card number prefix of 4-9 digits. More numbers will return more
information.

## Who cares about BINs?

The advent of industrial scale cybercrime has enabled bad actors to profit off of selling card information. To the criminal, the BIN is arguably
the most important component of the record in question and plays a prominent role in helping determine the price, demand, etc. For example, certain cards
issued by certain banks are extremely popular because they have a higher rate of approval.

Thankfully, the blueteam defenders have improved exponentially over the past 5 years. Although still a problem, card fraud is not nearly the menace that it was just a couple years ago,
with regular [headlines]() about massive data breaches.

## Use

Requires Node > 14, demonstrating the now standard ES6 import/export syntax.

```js
import binlookup from 'binlookup';
const lookup = binlookup()

// Use `"type": "module"` and enjoy the glorious top level await!

const bins = ['53058920', '5588320', '5572812']
await bins.forEach(async (bin) => console.log(await lookup(bin)));
```

Example `data` returned:

```js
{
 number: {
  length: 16,
  luhn: true
 },
 scheme: 'visa',
 type: 'debit',
 brand: 'Visa/Dankort',
 prepaid: false,
 country: {
  numeric: '208',
  alpha2: 'DK',
  name: 'Denmark',
  emoji: '🇩🇰',
  currency: 'DKK',
  latitude: 56,
  longitude: 10
 },
 bank: {
  name: 'Jyske Bank',
  url: 'www.jyskebank.dk',
  phone: '+4589893300',
  city: 'Hjørring'
 }
}
```

## Caching

You can cache the response using [AsyncCache](https://www.npmjs.com/package/async-cache)
or similar:

```js
var lookup = require('binlookup')();
var AsyncCache = require('async-cache');

var cache = new AsyncCache({
 load: lookup,
});

cache.get(bin, function( err, data ){
 console.log(data);
});
```
