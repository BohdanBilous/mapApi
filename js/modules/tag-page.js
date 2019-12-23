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
  // Lazy Loader Images
  const setLazy = lazyData => {
    if (exists(lazyData.className)) {
      const elements = document.querySelectorAll(lazyData.className);
      let mediaQueris = null;

      elements.forEach(element => {
        if (lazyData.className === ".event-section-main") {
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
      className: ".lazy-image",
      type: "image"
    },
    {
      className: ".event-section-main",
      type: "bg"
    }
  ];

  lazyData.forEach(lazyItem => {
    setLazy(lazyItem);
  });

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

  // Scroll From Screen
  if (exists(".hint-from-top")) scrollFromScreen(".title-top");

  // Tags
  if (exists(".tags-more")) tags();

  // Filter Mobile
  filterSidebarInit();

  // Sticky Block
  // observer.observe(document.querySelector(".sticky-indicator"));
});
