// Small helper to offset anchor scrolling by the nav height and provide smooth behavior
(function () {
  function scrollToHash(hash, smooth = true) {
    if (!hash) return;
    const id = hash.replace(/^#/, "");
    const target = document.getElementById(id);
    if (!target) return;
    const nav = document.querySelector(".top-nav");
    const navHeight = nav ? nav.offsetHeight : 0;
    const offset = 8; // small gap from top
    const top =
      target.getBoundingClientRect().top + window.scrollY - navHeight - offset;
    if (smooth) {
      window.scrollTo({ top, behavior: "smooth" });
    } else {
      window.scrollTo(0, top);
    }
  }

  // Attach click handler to in-page anchors
  document.addEventListener(
    "click",
    function (e) {
      const a = e.target.closest('a[href^="#"]');
      if (!a) return;
      // allow default for links that are just '#'
      if (a.getAttribute("href") === "#") return;
      // internal same-page link only
      const href = a.getAttribute("href");
      if (href && href.startsWith("#")) {
        e.preventDefault();
        scrollToHash(href, true);
        // update the hash without jumping
        history.replaceState(null, "", href);
      }
    },
    false
  );

  // If the page loads with a hash, scroll to it with offset
  window.addEventListener("DOMContentLoaded", function () {
    if (location.hash) {
      // small timeout to allow layout to settle
      setTimeout(function () {
        scrollToHash(location.hash, false);
      }, 30);
    }
  });
})();
