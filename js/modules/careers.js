/*jshint esversion: 6 */

/* MODULE IMPORTS */
import {
  html,
  exists,
  tablet,
  findParent,
  disableBodyScroll,
  animateSwitch
} from "../generic-helpers";
import { TabSwitcher } from "../tab-switcher";
import { MediaLoader } from "../media-loader";

window.addEventListener("load", function() {
  // Lazy Loader Images
  const images = document.querySelectorAll(".lazy-image");
  images.forEach(image => {
    new MediaLoader(image, "image");
  });

  // Tabs
  if (exists(".careers-tabs-container")) {
    new TabSwitcher(".careers-tabs-container");
  }

  // Position Drop
  if (exists(".drop-block-ttl")) {
    const positionItem = document.querySelectorAll(".drop-block-ttl");

    positionItem.forEach(item => {
      item.addEventListener("click", () => {
        const block = findParent(item, "drop-block");
        const drop = block.querySelector(".drop-block-content");

        if (block.classList.contains("open")) {
          block.classList.remove("open");
          drop.style.maxHeight = null;
        } else {
          block.classList.add("open");
          drop.style.maxHeight = drop.scrollHeight + "px";
        }
      });
    });
  }

  // Popup Open
  const popupButtons = document.querySelectorAll(".btn-touch");
  const popupClose = document.querySelector(".popup .btn-close");
  const popupBg = document.querySelector(".popup .popup-bg");

  popupButtons.forEach(button => {
    button.addEventListener("click", () => {
      html.classList.add("popup-open");
      html.classList.remove("popup-close");
      animateSwitch(".popup .fade-in", "on", 1, 800);
      animateSwitch(".popup .move-from-right", "on", 65, 250);
      if (tablet) disableBodyScroll(true, ".popup-side");

      loadInfoInPopup(button);
    });
  });

  const closePopup = () => {
    html.classList.remove("popup-open");
    html.classList.add("popup-close");
    animateSwitch(".popup .fade-in", "off");
    animateSwitch(".popup .move-from-right", "off");
    if (tablet) disableBodyScroll(false, ".popup-side");
  };

  popupClose.addEventListener("click", () => {
    closePopup();
  });

  popupBg.addEventListener("click", () => {
    closePopup();
  });

  let loadInfoInPopup = button => {
    const block = findParent(button, "drop-block");

    const positionNameElem = block.querySelector(".position-name .ttl");
    const positionCityElem = block.querySelector(".position-desc-item .city");
    const positionCity =
      positionCityElem.textContent || positionCityElem.innerText;
    const positionName =
      positionNameElem.textContent || positionNameElem.innerText;
    const positionDropHTML = block.querySelector(".position-drop section")
      .innerHTML;

    const popup = document.querySelector(".careers-popup");
    const popupPosNameElem = popup.querySelector(".position-name .ttl");
    const popupPosCityElem = popup.querySelector(".position-city");
    const popupPosDropElem = popup.querySelector(".position-drop section");

    popupPosNameElem.innerHTML = positionName;
    popupPosCityElem.innerHTML = positionCity;
    popupPosDropElem.innerHTML = positionDropHTML;
  };
});
