"use strict";

var metalens = function (_) {
  var baseUrl = 'https://metalens.allaboard.cash/';
  var meta = document.querySelector('meta[name="bitcoin-tx"]'),
      txid = meta ? meta.getAttribute('content') : null;
  var canonical = document.querySelector('link[rel="canonical"]'),
      url = canonical ? canonical.getAttribute('href') : window.location.href;
  return {
    options: {
      txid: txid,
      url: url,
      width: '100%',
      height: '400px'
    },
    $el: null,
    $iframe: null,
    embed: function embed(el, opts) {
      this.$el = !!el.nodeName ? el : document.querySelector(el);
      if (!this.$el) return false;
      Object.assign(this.options, this.$el.dataset, opts);
      this.$iframe = document.createElement('iframe');
      this.$iframe.src = baseUrl + (this.options.txid ? "tx/".concat(this.options.txid) : "url/".concat(encodeURIComponent(this.options.url)));
      this.$iframe.width = this.options.width;
      this.$iframe.height = this.options.height;
      this.$iframe.setAttribute('frameborder', 0);
      this.$iframe.setAttribute('allowtransparency', true);
      this.$el.innerHTML = this.$iframe.outerHTML;
    },
    resize: function resize(_ref) {
      var width = _ref.width,
          height = _ref.height;
      if (width) this.$iframe.width = width;
      if (height) this.$iframe.height = height;
    }
  };
}();

document.addEventListener('DOMContentLoaded', function (_) {
  document.querySelectorAll('.metalens-embed').forEach(function (el) {
    return metalens.embed(el);
  });
});