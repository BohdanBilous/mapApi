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

  if (exists(".lazy-image")) {
    const images = document.querySelectorAll(".lazy-image");

    images.forEach(image => {
      new MediaLoader(image, "image");
    });
  }

  if (exists(".lazy-bg")) {
    const bgs = document.querySelectorAll(".lazy-bg");

    bgs.forEach(bg => {
      new MediaLoader(bg, "bg");
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

  // const setImages = type => {
  //   if (exists(`.lazy-${type}`)) {
  //     const elements = document.querySelectorAll(`.lazy-${type}`);

  //     elements.forEach(element => {
  //       new MediaLoader(element, type);
  //     });
  //   }
  // };

  // const typesArray = ["image", "bg"];

  // typesArray.forEach(itm => {
  //   setImages(itm);
  // });
});
