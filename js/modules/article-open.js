/*jshint esversion: 6 */

/* MODULE IMPORTS */
import { exists, desktop, scrollFromScreen } from "../generic-helpers";
import { SuperSlider } from "../super-slider";

import { MediaLoader } from "../media-loader";

import { ImageCursor } from "../image-cursor";

window.addEventListener("load", function() {
  // Lazy Loader Images
  if (exists(".lazy-img")) {
    const images = document.querySelectorAll(".lazy-img");

    images.forEach(image => {
      const mediaQueryImages = [
        {
          media: "screen and (min-width: 768px)",
          src: image.dataset.src
        },
        {
          media: "screen and (max-width: 767px)",
          src: image.dataset.srcmob
        }
      ];

      new MediaLoader(image, "image", mediaQueryImages);
    });
  }

  if (exists(".lazy-bg")) {
    const bgs = document.querySelectorAll(".lazy-bg");

    bgs.forEach(bg => {
      const mediaQueryBackgrounds = [
        {
          media: "screen and (min-width: 768px)",
          src: bg.dataset.src
        },
        {
          media: "screen and (max-width: 767px)",
          src: bg.dataset.srcmob
        }
      ];

      new MediaLoader(bg, "bg", mediaQueryBackgrounds);
    });
  }

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
