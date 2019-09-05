/*jshint esversion: 6 */

/* MODULE IMPORTS */
import { html, desktop, mobile, exists } from '../generic-helpers';
import { SolutionsInd } from '../solutions-ind';
import { SuperSlider } from '../super-slider';

window.addEventListener("load", function() {

    // Solution
    let solutionInd = new SolutionsInd(true);

    // Fader
    if (exists(".fader-s")) {
        let fader = new SuperSlider(".fader-s", "fader");
    }
    
});
