/*jshint esversion: 6 */

/* MODULE IMPORTS */
import {
  // observer,
  exists,
  scrollFromScreen,
  tags,
  filterSidebarInit
} from "../generic-helpers";

import { MediaLoader } from "../media-loader";
import { PageNav } from "../page-nav-anchor";

window.addEventListener("load", function() {
  // Lazy Loader Images
  const setLazy = lazyData => {
    if (exists(lazyData.className)) {
      const elements = document.querySelectorAll(lazyData.className);

      elements.forEach(element => {
        new MediaLoader(element, lazyData.type);
      });
    }
  };

  let lazyData = [
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
  if (exists(".media-stream--container") && exists(".event-month-container")) {
    const titleWrap =
      document.querySelector(".media-stream--categories-ttl-sticky") || null;
    new PageNav(
      ".media-stream--container",
      ".event-month-container",
      changeMonth,
      false,
      false,
      () => {
        if (exists(".filter-sidebar")) {
          document.querySelector(".filter-sidebar").classList.remove("open");
        }
      }
    );

    function changeMonth(name, items) {
      titleWrap.querySelector(".ttl").innerHTML = name;
      titleWrap.querySelector(".items").innerHTML = items;
    }

    // function firstLetterToUpperCase(word) {
    //     let monthNameFirstLetter  = word.charAt(0);
    //     let idWithoutFirstLetter  = word.substring(1, word.length);
    //     let monthNameFirstLetterB = monthNameFirstLetter.toUpperCase();
    //     word = monthNameFirstLetterB + idWithoutFirstLetter;

    //     return word;
    // }
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
