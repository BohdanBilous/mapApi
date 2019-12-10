/*jshint esversion: 6 */

/* MODULE IMPORTS */
import {
  exists,
  // observer,
  scrollFromScreen,
  tags,
  filterSidebarInit
} from "../generic-helpers";
import { PageNav } from "../page-nav-anchor";
import { MediaLoader } from "../media-loader";

window.addEventListener("load", function() {
  // Page Nav
  if (exists(".media-stream--container")) {
    const titleWrap =
      document.querySelector(".media-stream--categories-ttl-sticky") || null;
    new PageNav(
      ".media-stream--container",
      ".media-stream--cat-section",
      changeCat,
      false,
      false,
      () => {
        if (exists(".filter-sidebar")) {
          document.querySelector(".filter-sidebar").classList.remove("open");
        }
      }
    );

    function changeCat(name, items) {
      titleWrap.querySelector(".ttl").innerHTML = name;
      titleWrap.querySelector(".items").innerHTML = items;
    }
  }

  // Lazy Background Loader
  if (exists(".lazy-bg")) {
    const bgs = document.querySelectorAll(".lazy-bg");

    bgs.forEach(bg => {
      const mediaQueryBackgrounds = [
        { media: "screen and (min-width: 768px)", src: bg.dataset.bg },
        { media: "screen and (max-width: 767px)", src: bg.dataset.bgmob }
      ];

      new MediaLoader(bg, "background", mediaQueryBackgrounds);
    });
  }

  // Scroll From Screen
  if (exists(".hint-from-top")) scrollFromScreen(".title-top");

  // Tags
  if (exists(".tags-more")) tags();

  // Filter Mobile
  filterSidebarInit();

  // Sticky Block
  // observer.observe(document.querySelector(".sticky-indicator"));
});
