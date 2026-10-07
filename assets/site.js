/* HomenS.AI JobPilot — shared page script: theme switch, mobile menu and "Top" button.
   © 2026 Serhii Khomenko / HomenS.AI · https://homensai.com/ · PolyForm Noncommercial 1.0.0.
   No network requests, no external libraries. The only stored value is the chosen theme (localStorage, optional). */
(function () {
  var root = document.documentElement;

  var menuBtn = document.getElementById("menu-btn");
  var nav = document.getElementById("site-nav");
  if (menuBtn && nav) {
    menuBtn.addEventListener("click", function () {
      var open = nav.classList.toggle("open");
      menuBtn.setAttribute("aria-expanded", open ? "true" : "false");
    });
  }

  var themeBtn = document.getElementById("theme-btn");
  if (themeBtn) {
    themeBtn.addEventListener("click", function () {
      var dark = root.getAttribute("data-theme") === "dark" ||
        (!root.getAttribute("data-theme") && window.matchMedia("(prefers-color-scheme: dark)").matches);
      var next = dark ? "light" : "dark";
      root.setAttribute("data-theme", next);
      try { localStorage.setItem("homensai.theme", next); } catch (e) { /* storage unavailable */ }
    });
  }

  var top = document.getElementById("to-top");
  if (top) {
    var update = function () { top.hidden = (window.pageYOffset || root.scrollTop) < 300; };
    top.addEventListener("click", function (e) {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
    window.addEventListener("scroll", update, { passive: true });
    update();
  }
})();
