/*jshint esversion: 6 */

/* MODULE IMPORTS */
import { exists, desktop, scrollFromScreen } from "../generic-helpers";
import { SuperSlider } from "../super-slider";

import { MediaLoader } from "../media-loader";

import { ImageCursor } from "../image-cursor";

window.addEventListener("load", function() {
  // Lazy Loader Images
  const setLazy = lazyData => {
    if (exists(lazyData.className)) {
      const elements = document.querySelectorAll(lazyData.className);
      let mediaQueris = null;

      elements.forEach(element => {
        if (
          lazyData.className === ".lazy-img" ||
          lazyData.className === ".lazy-bg"
        ) {
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

  // Mission Fader
  if (exists(".article-open-slider")) {
    new SuperSlider(".article-open-slider", "fader");
  }

  // Events Cursor Image
  if (desktop) {
    const eventsTitles = document.querySelectorAll(".events-ttl-section");

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

  // Scroll From Screen
  if (exists(".hint-from-top")) scrollFromScreen(".screen-top");
});
