/* ============================================================
   VEGAM LINKS — edit these in one place and every page updates.

   waitlist:  paste your Google Form link here.
              While it's empty, "Join the waitlist" opens WhatsApp instead.
   instagram: paste your Instagram profile link here,
              e.g. "https://www.instagram.com/vegam.official/"
              While it's empty, the Instagram links stay hidden.
   ============================================================ */
var VEGAM_LINKS = {
  waitlist: "",
  instagram: "https://www.instagram.com/vegam.services/"
};

// Anti-clickjacking: GitHub Pages can't send the X-Frame-Options header, so if
// another site loads Vegam inside a hidden frame, break out of it.
if (window.top !== window.self) {
  try { window.top.location = window.self.location.href; }
  catch (e) { document.documentElement.style.display = 'none'; }
}

// Safety check: only accept https links to the expected sites, so a typo or a
// tampered value can never turn a button into a "javascript:" or phishing link.
function safeUrl(value, allowedHosts) {
  try {
    var u = new URL(value);
    if (u.protocol !== 'https:') return '';
    var host = u.hostname.toLowerCase();
    var ok = allowedHosts.some(function (h) { return host === h || host.slice(-(h.length + 1)) === '.' + h; });
    return ok ? u.href : '';
  } catch (e) { return ''; }
}
VEGAM_LINKS.waitlist = safeUrl(VEGAM_LINKS.waitlist, ['docs.google.com', 'forms.gle', 'forms.office.com', 'wa.me']);
VEGAM_LINKS.instagram = safeUrl(VEGAM_LINKS.instagram, ['instagram.com']);

document.addEventListener('DOMContentLoaded', function () {
  // Apply the links above
  if (VEGAM_LINKS.waitlist) {
    document.querySelectorAll('[data-link="waitlist"]').forEach(function (a) { a.href = VEGAM_LINKS.waitlist; });
  }
  if (VEGAM_LINKS.instagram) {
    var handle = VEGAM_LINKS.instagram.replace(/\/+$/, '').split('/').pop();
    document.querySelectorAll('[data-link="instagram"]').forEach(function (a) {
      a.href = VEGAM_LINKS.instagram;
      if (a.hasAttribute('data-show-handle') && handle) a.textContent = '@' + handle;
    });
  } else {
    document.querySelectorAll('[data-link="instagram"]').forEach(function (a) {
      var li = a.closest('li');
      (li || a).style.display = 'none';
    });
    document.querySelectorAll('[data-hide-if-empty="instagram"]').forEach(function (el) { el.style.display = 'none'; });
  }

  // Mobile menu: drop-down sheet under the header with a dimmed backdrop.
  // Closes with the X button, the Escape key, a tap on the backdrop, a tap on
  // a link, or when the screen gets wide enough for the desktop menu.
  var toggle = document.querySelector('.nav-toggle');
  var nav = document.querySelector('.nav');
  var header = document.querySelector('.site-header');
  if (toggle && nav && header) {
    var root = document.documentElement;
    var mobile = window.matchMedia('(max-width: 860px)');
    var backdrop = document.createElement('div');
    backdrop.className = 'nav-backdrop';
    backdrop.setAttribute('aria-hidden', 'true');
    document.body.appendChild(backdrop);

    var setHeaderHeight = function () {
      root.style.setProperty('--header-h', Math.round(header.getBoundingClientRect().height) + 'px');
    };
    var isOpen = function () { return nav.classList.contains('open'); };

    var openMenu = function () {
      setHeaderHeight();
      nav.classList.add('open');
      root.classList.add('menu-open');
      toggle.setAttribute('aria-expanded', 'true');
      toggle.setAttribute('aria-label', 'Close menu');
      var first = nav.querySelector('a');
      if (first) setTimeout(function () { first.focus({ preventScroll: true }); }, 50);
    };
    var closeMenu = function (returnFocus) {
      if (!isOpen()) return;
      nav.classList.remove('open');
      root.classList.remove('menu-open');
      toggle.setAttribute('aria-expanded', 'false');
      toggle.setAttribute('aria-label', 'Open menu');
      if (returnFocus) toggle.focus({ preventScroll: true });
    };

    toggle.addEventListener('click', function () {
      if (isOpen()) closeMenu(false); else openMenu();
    });
    backdrop.addEventListener('click', function () { closeMenu(false); });
    nav.querySelectorAll('a').forEach(function (a) {
      a.addEventListener('click', function () { closeMenu(false); });
    });
    document.addEventListener('keydown', function (e) {
      if (!isOpen()) return;
      if (e.key === 'Escape') { closeMenu(true); return; }
      // keep Tab inside the header (menu, button, logo, CTA) while open
      if (e.key === 'Tab' && !header.contains(document.activeElement)) {
        e.preventDefault();
        toggle.focus();
      }
    });
    var onBreakpoint = function () { if (!mobile.matches) closeMenu(false); };
    if (mobile.addEventListener) mobile.addEventListener('change', onBreakpoint);
    else if (mobile.addListener) mobile.addListener(onBreakpoint);
    // resize fallback: some browsers don't fire the media-query change event
    window.addEventListener('resize', function () {
      if (!isOpen()) return;
      if (!mobile.matches) closeMenu(false); else setHeaderHeight();
    });
    setHeaderHeight();
  }

  // Current year in the footer
  document.querySelectorAll('.year').forEach(function (el) {
    el.textContent = new Date().getFullYear();
  });
});
