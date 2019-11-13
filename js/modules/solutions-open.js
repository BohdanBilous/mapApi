/*jshint esversion: 6 */

/* MODULE IMPORTS */
import {
  exists,
  scrollFromScreen,
  filterSidebarInit,
  findParent
} from "../generic-helpers";
import { MediaLoader } from "../media-loader";
import { customSelect } from "../custom-select";
import { SuperSlider } from "../super-slider";
import { ContentSwitcher } from "../content-switcher";

window.addEventListener("load", function() {
  // Content Switcher
  new ContentSwitcher("data-switch");

  // Filter Mobile
  filterSidebarInit();

  // Lazy Loader Images
  if (exists(".lazy-img")) {
    const images = document.querySelectorAll(".lazy-img");

    images.forEach(image => {
      const mediaQueryImages = [
        { media: "screen and (min-width: 768px)", src: image.dataset.bg },
        { media: "screen and (max-width: 767px)", src: image.dataset.bgmob }
      ];

      new MediaLoader(image, "image", mediaQueryImages);
    });
  }

  // Spec
  if (exists(".spec-button")) {
    const specButton = document.querySelector(".spec-button");

    specButton.addEventListener("click", () => {
      const specBlock = findParent(specButton, "specs-section");

      specBlock.classList.toggle("open");
      specButton.classList.toggle("active");
    });
  }

  // Select Custom
  if (exists(".select-custom")) customSelect();

  // Scroll From Screen
  if (exists(".hint-from-top")) scrollFromScreen(".specs-section");

  // Fader Prod
  new SuperSlider(".prod-fader", "fader");

  // Fader Par
  if (exists(".fader-par")) {
    const faderPar = new SuperSlider(".fader-par", "fader", null, change);
    const slideCurrent = document.querySelector(".fader-par .slide-current");
    const slideItems = document.querySelector(".fader-par .slide-items");

    slideItems.innerHTML = `0${faderPar.slides.length}`;

    function change() {
      console.log(slideCurrent);
      slideCurrent.innerHTML = `0${faderPar.slideIndex + 1}`;
    }
  }

  // Tech Spec Drop
  if (exists(".btn-tech-spec-open")) {
    const btnTechOpen = document.querySelector(".btn-tech-spec-open");
    const btnTechHide = document.querySelector(".btn-tech-spec-hide");
    const techSpecDrop = document.querySelector(".tech-spec-drop");
    const techSpecWrap = document.querySelector(".tech-spec-wrap");

    btnTechOpen.addEventListener("click", () => {
      techSpecWrap.classList.add("open");
      techSpecDrop.style.maxHeight = techSpecDrop.scrollHeight + "px";
    });

    btnTechHide.addEventListener("click", () => {
      techSpecWrap.classList.remove("open");
      techSpecDrop.style.maxHeight = null;
    });
  }

  // Types
  if (exists(".prod-types-wrap")) {
    const typesItem = document.querySelectorAll(".tare-wrap-t .tare-item");
    const typesParList = document.querySelectorAll(
      ".prod-types-wrap .prod-types-par"
    );

    typesItem.forEach((item, index) => {
      item.addEventListener("click", () => {
        document
          .querySelector(".prod-types-wrap .prod-types-par.show")
          .classList.remove("show");

        document
          .querySelector(".tare-wrap-t .tare-item.active")
          .classList.remove("active");
        item.classList.add("active");
        typesParList[index].classList.add("show");
      });
    });
  }
});
