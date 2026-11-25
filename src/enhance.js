/* Complete HTML is immediately visible. On a web host the original React
   components take over navigation, controlled fields, and image fallback.
   For a file opened directly, native HTML keeps all content browsable. */
// Protect the visible form before the client bundle is ready, including when
// a network failure leaves the static page in place. React replaces this node.
document.querySelector('form')?.addEventListener('submit', event => {
  event.preventDefault();
  alert('感谢您的留言！我们会尽快与您联系。');
  event.currentTarget.reset();
});

if (location.protocol === 'file:') {
  document.querySelectorAll('a[href]').forEach(link => {
    const target = new URL(link.getAttribute('href'), location.href);
    if (target.protocol === 'file:' && target.pathname.endsWith('/')) {
      target.pathname += 'index.html';
      link.href = target.href;
    }
  });
} else {
  const source = document.querySelector('meta[name="app-module"]')?.content;
  if (source) {
    const script = document.createElement('script');
    script.type = 'module';
    script.src = source;
    document.head.append(script);
  }
}
