(function () {
  // mobile menu
  var btn = document.querySelector('.menu-btn');
  var nav = document.querySelector('.nav');
  if (btn && nav) {
    btn.addEventListener('click', function () {
      var open = nav.classList.toggle('open');
      btn.setAttribute('aria-expanded', open);
    });
    nav.addEventListener('click', function (e) {
      if (e.target.tagName === 'A') { nav.classList.remove('open'); btn.setAttribute('aria-expanded', false); }
    });
  }

  // hero slider
  var slides = document.querySelectorAll('.slide');
  if (slides.length > 1) {
    var dotsWrap = document.querySelector('.hero-dots');
    var i = 0, timer;
    var dots = [];
    slides.forEach(function (_, n) {
      var d = document.createElement('button');
      d.setAttribute('aria-label', 'Slide ' + (n + 1));
      d.addEventListener('click', function () { go(n); start(); });
      dotsWrap.appendChild(d); dots.push(d);
    });
    function go(n) {
      slides[i].classList.remove('on'); dots[i].classList.remove('on');
      i = n; slides[i].classList.add('on'); dots[i].classList.add('on');
    }
    function start() { clearInterval(timer); timer = setInterval(function () { go((i + 1) % slides.length); }, 6000); }
    go(0); start();
  }

  // tabs
  document.querySelectorAll('.tabs').forEach(function (t) {
    t.addEventListener('click', function (e) {
      var b = e.target.closest('button'); if (!b) return;
      var root = t.parentElement;
      t.querySelectorAll('button').forEach(function (x) { x.classList.toggle('on', x === b); });
      root.querySelectorAll('.tab-panel').forEach(function (p) { p.classList.toggle('on', p.id === b.dataset.tab); });
    });
  });

  // scroll reveal
  var els = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (en) {
      en.forEach(function (x) { if (x.isIntersecting) { x.target.classList.add('in'); io.unobserve(x.target); } });
    }, { threshold: .12 });
    els.forEach(function (e) { io.observe(e); });
  } else { els.forEach(function (e) { e.classList.add('in'); }); }

  // contact form -> opens the visitor's email app with the details filled in
  var form = document.getElementById('quote-form');
  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var f = new FormData(form);
      var body = ['Name: ' + f.get('name'), 'Company: ' + f.get('company'), 'Email: ' + f.get('email'),
        'Phone: ' + f.get('phone'), 'Service: ' + f.get('service'), '', f.get('message')].join('\n');
      window.location.href = 'mailto:info@oceanfixmarine.com?subject=' +
        encodeURIComponent('Quote request: ' + f.get('service')) + '&body=' + encodeURIComponent(body);
    });
  }
})();
