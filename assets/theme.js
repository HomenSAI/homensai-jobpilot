// HomenS.AI JobPilot · © 2026 Serhii Khomenko · https://homensai.com/
// Applies the saved light/dark choice before the page is drawn (no flash). Falls back to the system theme.
(function () {
  try {
    var saved = localStorage.getItem("homensai.theme");
    if (saved === "light" || saved === "dark") document.documentElement.setAttribute("data-theme", saved);
  } catch (e) { /* storage unavailable: system theme stays */ }
})();
