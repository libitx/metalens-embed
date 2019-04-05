# Metalens Embed

A simple JavaScript wrapper to embed Metalens comments into any web page.

## Simple usage

On page load, any elements with the class `.metalens-embed` will automatically be embedded with Metalens comments.

By default, the page URL will be used as the topic identifier. Alternatively, if the page follows the [Bitcoin Sticker Protocol](https://sticker.planaria.network/), and a `bitcoin-tx` meta tag is present, the `txid` will be used as the topic identifier.

Data attributes can also be used to define options.

```html
<div class="metalens-embed"
  data-url="http://www.example.com"
  data-txid="abcdef..."
  data-height="600px" />
```

## Custom usage

Using JavaScript, the `metalens.embed()` function can be used to embed Metalens into any HTML element. The first argument must be an HTML element or query selector. The second argument is an object of options, which take precedence over data attributes defined on the element.

```javascript
metalens.embed('.comments', {
  url: 'http://www.example.com',
  txid: 'abcdef...',
  height: '600px'
})
```