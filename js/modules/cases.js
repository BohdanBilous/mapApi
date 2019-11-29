/*jshint esversion: 6 */

/* MODULE IMPORTS */
import {
  // observer,
  exists,
  scrollFromScreen,
  filterSidebarInit
} from "../generic-helpers";
import { PageNav } from "../page-nav-anchor";
import { MediaLoader } from "../media-loader";

window.addEventListener("load", function() {
  // Page Nav
  if (exists(".media-stream--container") && exists(".cases-container")) {
    const titleWrap =
      document.querySelector(".media-stream--categories-ttl-sticky") || null;
    let pageNav = new PageNav(
      ".media-stream--container",
      ".cases-container",
      changeCat
    );

    function changeCat(name, items) {
      titleWrap.querySelector(".ttl").innerHTML = name;
      titleWrap.querySelector(".items").innerHTML = items;
    }
  }

  // Lazy Top Section Background
  if (exists(".event-section-main")) {
    const topSection = document.querySelector(
      ".event-section-main .section-bg"
    );
    const mediaQueryBackgrounds = [
      { media: "screen and (min-width: 768px)", src: topSection.dataset.bg },
      { media: "screen and (max-width: 767px)", src: topSection.dataset.bgmob }
    ];

    new MediaLoader(topSection, "background", mediaQueryBackgrounds);
  }

  // Lazy Loader Images
  if (exists(".lazy-img")) {
    const images = document.querySelectorAll(".lazy-img");

    images.forEach(image => {
      const mediaQueryImages = [
        { media: "screen and (min-width: 768px)", src: image.dataset.src },
        { media: "screen and (max-width: 767px)", src: image.dataset.srcmob }
      ];

      new MediaLoader(image, "image", mediaQueryImages);
    });
  }

  // Scroll From Screen
  if (exists(".hint-from-top")) scrollFromScreen(".title-top");

  // Filter Mobile
  filterSidebarInit();

  // Sticky Block
  // observer.observe(document.querySelector(".sticky-indicator"));
});
