/*jshint esversion: 6 */

/* MODULE IMPORTS */
import { exists } from "../generic-helpers";
import { SolutionsInd } from "../solutions-ind";
import { SuperSlider } from "../super-slider";

window.addEventListener("load", function() {
  // Solution
  new SolutionsInd(true, 100);

  // Fader
  if (exists(".fader-s")) {
    new SuperSlider(".fader-s", "fader");
  }
});
