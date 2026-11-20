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

  // Mobile menu toggle
  var toggle = document.querySelector('.nav-toggle');
  var nav = document.querySelector('.nav');
  if (toggle && nav) {
    toggle.addEventListener('click', function () {
      var open = nav.classList.toggle('open');
      toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
    nav.querySelectorAll('a').forEach(function (a) {
      a.addEventListener('click', function () { nav.classList.remove('open'); });
    });
  }

  // Current year in the footer
  document.querySelectorAll('.year').forEach(function (el) {
    el.textContent = new Date().getFullYear();
  });
});
