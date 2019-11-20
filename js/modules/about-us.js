/*jshint esversion: 6 */

/* MODULE IMPORTS */
import {
    html,
    desktop,
    mobile,
    exists,
    findParent,
    animateSwitch,
    filterSidebarInit
} from '../generic-helpers';
import {
    SuperSlider
} from '../super-slider';


window.addEventListener("load", function () {
    // let pageNav = new PageNav(".media-stream--container", ".terms-ans");

    new SuperSlider(`.about-us-fader`, "fader");
    new SuperSlider(`.team-carosuel`, "carousel");

});