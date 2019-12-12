/*jshint esversion: 6 */

/* MODULE IMPORTS */
import {
  html,
  exists,
  scrollFromScreen,
  loadContent,
  tablet,
  disableBodyScroll
} from "../generic-helpers";

window.addEventListener("load", function() {
  // Scroll From Screen
  if (exists(".hint-from-top")) scrollFromScreen(".title-top");

  // Popup Team Open
  const teamMembers = document.querySelectorAll(".team-item");
  const popupClose = document.querySelector(".popup .btn-close");
  const popupBg = document.querySelector(".popup .popup-bg");
  const popupLoadBlock = document.querySelector(".popup .team-member-load");
  let teamMemberId;

  let loadPopupInfo = id => {
    loadContent(popupLoadBlock, `team-info/_load-team-info-${id}.html`);
  };

  teamMembers.forEach(teamMember => {
    teamMember.addEventListener("click", () => {
      teamMemberId = teamMember.getAttribute("id");
      html.classList.add("popup-open");
      html.classList.remove("popup-close");
      disableBodyScroll(true, ".popup-side");
      loadPopupInfo(teamMemberId);
    });
  });

  const closePopup = () => {
    html.classList.remove("popup-open");
    html.classList.add("popup-close");
    if (tablet) disableBodyScroll(false, ".popup-side");
    popupLoadBlock.innerHTML = "";
  };

  popupClose.addEventListener("click", () => {
    closePopup();
  });
  popupBg.addEventListener("click", () => {
    closePopup();
  });
});
