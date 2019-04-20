const metalens = (_ => {
  const baseUrl = 'https://metalens.allaboard.cash';

  const meta = document.querySelector('meta[name="bitcoin-tx"]'),
        txid = meta ? meta.getAttribute('content') : null;

  const canonical = document.querySelector('link[rel="canonical"]'),
        url = canonical ? canonical.getAttribute('href') : window.location.href;

  return {
    defaults: {
      txid,
      url,

      autoSize: true,
      width: '100%',
      height: '600px',
    },

    embed(el, opts) {
      const $el = !!el.nodeName ? el : document.querySelector(el);
      if ( !$el ) return false;

      const $iframe = document.createElement('iframe'),
            options = Object.assign({}, this.defaults, $el.dataset, opts),
            href    = baseUrl + ( options.txid ?
              `/tx/${ options.txid }` :
              `/url/${ encodeURIComponent(options.url) }` );

      options.autoSize = JSON.parse(options.autoSize);

      $iframe.src     = href;
      $iframe.width   = options.width;
      $iframe.height  = options.height;
      $iframe.setAttribute('frameborder', 0);

      const embedded = {
        $el,
        $iframe,

        resize({ width, height }) {
          if (width)  this.$iframe.width  = `${ width }px`;
          if (height) this.$iframe.height = `${ height }px`;
        },

        handleMessage(e) {
          //console.log('🔍', e)
          if (e.origin === baseUrl && e.data.href === href) {
            if (options.autoSize && e.data.height) {
              this.resize({ height: e.data.height })
            }
          }
        }
      }

      $el.innerHTML = '';
      $el.appendChild($iframe);
      window.addEventListener('message', e => embedded.handleMessage(e), false);

      return embedded;
    }
  }
})()

document.addEventListener('DOMContentLoaded', _ => {
  document.querySelectorAll('.metalens-embed')
    .forEach(el => metalens.embed(el))
})
