// © 2026 Serhii Khomenko / HomenS.AI · https://homensai.com/ · PolyForm Noncommercial 1.0.0
// Author page: starts the author's robot (assets/robot.js) and the replay button.
(function () {
  "use strict";
  var H = window.HomenS || {};
  var host = document.getElementById("robo");
  if (!host || !H.robot) return;
  var robot = H.robot.tvRobot(host);
  var again = function () { robot.play(); };
  host.addEventListener("click", again);
  var btn = document.getElementById("robo-replay");
  if (btn) btn.addEventListener("click", again);
  robot.play();
})();
