// Metricool website analytics. Kept in its own file because the site's
// Content-Security-Policy blocks inline <script> code.
// Allowed in the CSP on every page: https://tracker.metricool.com
(function () {
  var s = document.createElement('script');
  s.src = 'https://tracker.metricool.com/resources/be.js';
  s.async = true;
  s.onload = function () {
    if (window.beTracker) {
      window.beTracker.t({ hash: '36092edbc7c3bdeef262c6f2b9f1317' });
    }
  };
  document.head.appendChild(s);
})();
