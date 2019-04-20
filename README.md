# Metalens Embed

A simple JavaScript wrapper to embed Metalens comments into any web page.

## Getting started

Include the JavaScript on your page, either by downloading the file from this repo, or be referencing the `b://` or `c://` URI within metanet.

```html
<script src="/dist/metalens-embed.js"></script>
```

```text
b://9bbe7e5f867d1830477e126de632734c7d9c82ee384eca9f5a771df14c316940
c://3d704672869a539b1ef3c1658d04a4d50423a92a4f5813c3f31b35b3b5ea781c
```

## Simple usage

On page load, any elements with the class `.metalens-embed` will automatically be embedded with Metalens comments.

By default, the page URL will be used as the topic identifier. Alternatively, if the page follows the [Bitcoin Sticker Protocol](https://sticker.planaria.network/), and a `bitcoin-tx` meta tag is present, the `txid` will be used as the topic identifier.

Data attributes can also be used to define options.

```html
<div class="metalens-embed"
  data-url="http://www.example.com"
  data-auto-size="true" />
```

## Custom usage

Using JavaScript, the `metalens.embed()` function can be used to embed Metalens into any HTML element. The first argument must be an HTML element or query selector. The second argument is an object of options, which take precedence over data attributes defined on the element.

```javascript
metalens.embed('.comments', {
  txid: 'abcdef...',
  autoSize: true
})
```

## Options

Options can either be defined on the element as data attributes, or passed to `metalens.embed()` as an options hash.

* `url` - Topic identifier - full URL of topic
* `txid` - Topic identifier - Bitcoin transaction ID
* `autoSize` - Automatically resize the height of the Metalens iframe *(default **true**)*
* `height` - the initial height of the Metalens iframe *(default **600px**)*
* `width` - the initial width of the Metalens iframe *(default **100%**)*

* [ ] Automatic iframe resizing