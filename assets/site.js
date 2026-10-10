/* HomenS.AI JobPilot — shared page script: theme switch, mobile menu, "Top" button and gentle motion.
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

  /* Motion: a reading-progress line, cards that appear while scrolling, and a "scroll on" cue.
     Nothing moves when the system asks for reduced motion; the content is fully visible without this script. */
  var reduce = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var bar = document.createElement("div");
  bar.className = "scroll-progress"; bar.setAttribute("aria-hidden", "true");
  var fill = document.createElement("span"); bar.appendChild(fill); document.body.appendChild(bar);
  var progress = function () {
    var h = root.scrollHeight - root.clientHeight;
    fill.style.width = (h > 0 ? Math.min(100, (window.pageYOffset || root.scrollTop) * 100 / h) : 0) + "%";
  };
  window.addEventListener("scroll", progress, { passive: true }); progress();

  var head = document.querySelector(".page-head");
  var first = document.querySelector("main section[id]");
  if (head && first) {
    var labels = { en: "Scroll to the content", ru: "Перейти к содержанию", de: "Zum Inhalt", uk: "Перейти до змісту" };
    var cue = document.createElement("a");
    cue.className = "scroll-cue"; cue.href = "#" + first.id;
    cue.setAttribute("aria-label", labels[(root.lang || "en").slice(0, 2)] || labels.en);
    cue.innerHTML = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 5v14M5 12l7 7 7-7"/></svg>';
    head.appendChild(cue);
  }

  if (!reduce && "IntersectionObserver" in window) {
    root.classList.add("js");
    var items = document.querySelectorAll(".sec-head, .panel, .rules article, .steps li, .guide > li, .card, .widget, .notice, .tpl-block > h3, .history li");
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); } });
    }, { rootMargin: "0px 0px -8% 0px", threshold: .08 });
    Array.prototype.forEach.call(items, function (el) {
      var sib = el.parentElement ? Array.prototype.indexOf.call(el.parentElement.children, el) : 0;
      el.style.setProperty("--d", Math.min(sib, 6) * 0.07 + "s");
      el.classList.add("reveal"); io.observe(el);
    });
  }
})();
