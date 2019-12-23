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
  // Lazy Loader Images
  const setLazy = lazyData => {
    if (exists(lazyData.className)) {
      const elements = document.querySelectorAll(lazyData.className);
      let mediaQueris = null;

      elements.forEach(element => {
        if (lazyData.className === ".lazy-img") {
          mediaQueris = [
            {
              media: "screen and (min-width: 768px)",
              src: element.dataset.src
            },
            {
              media: "screen and (max-width: 767px)",
              src: element.dataset.srcmob
            }
          ];
        }

        new MediaLoader(element, lazyData.type, mediaQueris);
      });
    }
  };

  let lazyData = [
    {
      className: ".lazy-img",
      type: "image"
    },
    {
      className: ".lazy-image",
      type: "image"
    },
    {
      className: ".lazy-bg",
      type: "bg"
    }
  ];

  lazyData.forEach(lazyItem => {
    setLazy(lazyItem);
  });

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
