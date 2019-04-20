"use strict";

var metalens = function (_) {
  var baseUrl = 'https://metalens.allaboard.cash';
  var meta = document.querySelector('meta[name="bitcoin-tx"]'),
      txid = meta ? meta.getAttribute('content') : null;
  var canonical = document.querySelector('link[rel="canonical"]'),
      url = canonical ? canonical.getAttribute('href') : window.location.href;
  return {
    defaults: {
      txid: txid,
      url: url,
      autoSize: true,
      width: '100%',
      height: '600px'
    },
    embed: function embed(el, opts) {
      var $el = !!el.nodeName ? el : document.querySelector(el);
      if (!$el) return false;
      var $iframe = document.createElement('iframe'),
          options = Object.assign({}, this.defaults, $el.dataset, opts),
          href = baseUrl + (options.txid ? "/tx/".concat(options.txid) : "/url/".concat(encodeURIComponent(options.url)));
      options.autoSize = JSON.parse(options.autoSize);
      $iframe.src = href;
      $iframe.width = options.width;
      $iframe.height = options.height;
      $iframe.setAttribute('frameborder', 0);
      var embedded = {
        $el: $el,
        $iframe: $iframe,
        resize: function resize(_ref) {
          var width = _ref.width,
              height = _ref.height;
          if (width) this.$iframe.width = "".concat(width, "px");
          if (height) this.$iframe.height = "".concat(height, "px");
        },
        handleMessage: function handleMessage(e) {
          if (e.origin === baseUrl && e.data.href === href) {
            if (options.autoSize && e.data.height) {
              this.resize({
                height: e.data.height
              });
            }
          }
        }
      };
      $el.innerHTML = '';
      $el.appendChild($iframe);
      window.addEventListener('message', function (e) {
        return embedded.handleMessage(e);
      }, false);
      return embedded;
    }
  };
}();

document.addEventListener('DOMContentLoaded', function (_) {
  document.querySelectorAll('.metalens-embed').forEach(function (el) {
    return metalens.embed(el);
  });
});