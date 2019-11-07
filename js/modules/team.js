/*jshint esversion: 6 */

/* MODULE IMPORTS */
import {
  html,
  desktop,
  mobile,
  exists,
  scrollFromScreen,
  findParent,
  animateSwitch,
  loadContent
} from "../generic-helpers";

window.addEventListener("load", function() {
  // Scroll From Screen
  if (exists(".hint-from-top")) scrollFromScreen(".title-top");

  // Popup Team Open
  const teamMembers = document.querySelectorAll(".team-item");
  const popupClose = document.querySelector(".popup .btn-close");
  const popupLoadBlock = document.querySelector(".popup .team-member-load");
  let teamMemberId;

  let loadPopupInfo = () => {
    loadContent(popupLoadBlock, `_load-team-info.html`);
    // loadContent(popupLoadBlock, `_load-team-info-${teamMemberId}.html`);
  };

  teamMembers.forEach(teamMember => {
    teamMember.addEventListener("click", () => {
      teamMemberId = teamMember.getAttribute("id");
      html.classList.add("popup-open");
      html.classList.remove("btn-close");

      loadPopupInfo(teamMemberId);
    });
  });

  popupClose.addEventListener("click", () => {
    html.classList.remove("popup-open");
    html.classList.add("btn-close");
  });
});