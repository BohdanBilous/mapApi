/*jshint esversion: 6 */

/* MODULE IMPORTS */
import { exists } from "../generic-helpers";
import { SolutionsInd } from "../solutions-ind";
import { SuperSlider } from "../super-slider";
import { MediaLoader } from "../media-loader";

window.addEventListener("load", function() {
  // Lazy Loader Images
  const images = document.querySelectorAll(".lazy-image");
  images.forEach(image => {
    new MediaLoader(image, "image");
  });

  // Solution
  new SolutionsInd(true, 100);

  // Fader
  if (exists(".fader-s")) {
    new SuperSlider(".fader-s", "fader");
  }
});
