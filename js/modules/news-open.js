/*jshint esversion: 6 */

/* MODULE IMPORTS */
import {
  html,
  desktop,
  mobile,
  exists,
  scrollFromScreen
} from '../generic-helpers';
import {
  SuperSlider
} from '../super-slider';

window.addEventListener("load", function () {

  // Lazy Loader Images
  if (exists(".lazy-img")) {
    const images = document.querySelectorAll(".lazy-img");

    images.forEach(image => {
      const mediaQueryImages = [{
          media: "screen and (min-width: 768px)",
          src: image.dataset.bg
        },
        {
          media: "screen and (max-width: 767px)",
          src: image.dataset.bgmob
        }
      ];

      new MediaLoader(image, "image", mediaQueryImages);
    });
  }

  if (exists(".lazy-bg")) {
    const bgs = document.querySelectorAll(".lazy-bg");

    bgs.forEach(bg => {
      const mediaQueryBackgrounds = [{
          media: "screen and (min-width: 768px)",
          src: bg.dataset.bg
        },
        {
          media: "screen and (max-width: 767px)",
          src: bg.dataset.bgmob
        }
      ];

      new MediaLoader(bg, "background", mediaQueryBackgrounds);
    });
  }

  // Mission Fader
  let missinFader = new SuperSlider(".news-open-slider", "fader");

});