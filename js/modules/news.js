/*jshint esversion: 6 */

/* MODULE IMPORTS */
import {
  desktop,
  exists,
  scrollFromScreen,
  tags,
  filterSidebarInit
} from "../generic-helpers";
import { PageNav } from "../page-nav-anchor";
import { ParallaxScroll } from "../parallax-scroll";
import { ImageCursor } from "../image-cursor";
import { MediaLoader } from "../media-loader";

window.addEventListener("load", function() {
  // Page Nav
  if (exists(".media-stream--container")) {
    new PageNav(
      ".media-stream--container",
      ".checkpoint",
      null,
      false,
      false,
      () => {
        if (exists(".filter-sidebar")) {
          document.querySelector(".filter-sidebar").classList.remove("open");
        }
      }
    );
  }

  // Scroll From Screen
  if (exists(".hint-from-top")) scrollFromScreen(".screen-top");

  // Tags
  if (exists(".tags-more")) tags();

  // Filter Mobile
  filterSidebarInit();

  // Parallax Scroll
  if (exists(".screen-head")) {
    new ParallaxScroll(".screen-head", ".screen-bg", 200);
  }

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

  // Events Cursor Image
  if (desktop) {
    const eventsTitles = document.querySelectorAll(
      ".events-table-row .events-ttl-section"
    );

    eventsTitles.forEach(eventsTitle => {
      let eventsWrapOffsetTop = document.querySelector(".events-table")
        .offsetTop;
      let eventsWrapOffsetLeft = document.querySelector(".events-table-cell-m")
        .offsetLeft;

      new ImageCursor(
        eventsTitle,
        ".events-img",
        eventsWrapOffsetLeft,
        eventsWrapOffsetTop + window.innerHeight
      );
    });
  }
});
