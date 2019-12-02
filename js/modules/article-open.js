/*jshint esversion: 6 */

/* MODULE IMPORTS */
import {
  exists
} from '../generic-helpers';
import {
  SuperSlider
} from '../super-slider';

import {
  MediaLoader
} from '../media-loader';


window.addEventListener("load", function () {

  // Lazy Loader Images
  if (exists(".lazy-img")) {
    const images = document.querySelectorAll(".lazy-img");

    images.forEach(image => {
      const mediaQueryImages = [{
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
      const mediaQueryBackgrounds = [{
          media: "screen and (min-width: 768px)",
          src: bg.dataset.src
        },
        {
          media: "screen and (max-width: 767px)",
          src: bg.dataset.srcmob
        }
      ];

      new MediaLoader(bg, "background", mediaQueryBackgrounds);
    });
  }

  // Mission Fader
  let missinFader = new SuperSlider(".article-open-slider", "fader");

});