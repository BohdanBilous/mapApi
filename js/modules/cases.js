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
  // Lazy Loader Images
  const setLazy = lazyData => {
    if (exists(lazyData.className)) {
      const elements = document.querySelectorAll(lazyData.className);
      let mediaQueries = null;

      elements.forEach(element => {
        if (
          lazyData.className === ".lazy-img" ||
          lazyData.className === ".event-section-main .section-bg"
        ) {
          mediaQueries = [
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

        new MediaLoader(element, lazyData.type, mediaQueries);
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
      className: ".event-section-main .section-bg",
      type: "bg"
    }
  ];

  lazyData.forEach(lazyItem => {
    setLazy(lazyItem);
  });

  // Lazy Top Section Background
  if (exists(".event-section-main")) {
    const topSection = document.querySelector(
      ".event-section-main .section-bg"
    );
    const mediaQueryBackgrounds = [
      { media: "screen and (min-width: 768px)", src: topSection.dataset.bg },
      { media: "screen and (max-width: 767px)", src: topSection.dataset.bgmob }
    ];

    new MediaLoader(topSection, "bg", mediaQueryBackgrounds);
  }

  // Page Nav
  if (exists(".media-stream--container") && exists(".cases-container")) {
    const titleWrap =
      document.querySelector(".media-stream--categories-ttl-sticky") || null;

    new PageNav(
      ".media-stream--container",
      ".cases-container",
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

  // Filter Mobile
  filterSidebarInit();

  // Sticky Block
  // observer.observe(document.querySelector(".sticky-indicator"));
});
