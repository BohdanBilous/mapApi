/*jshint esversion: 6 */

/* MODULE IMPORTS */
import { html, desktop, mobile, exists, scrollFromScreen, tags, filterSidebarInit } from '../generic-helpers';
import { PageNav } from '../page-nav-anchor';
import { ParallaxScroll } from '../parallax-scroll';

window.addEventListener("load", function() {

    // Page Nav
    if (exists(".media-stream--container")) {
        let pageNav = new PageNav(".media-stream--container", ".checkpoint");
    }

    // Scroll From Screen
    if (exists(".hint-from-top")) scrollFromScreen(".screen-top");

    // Tags
    if (exists(".tags-more")) tags();

    // Filter Mobile
    filterSidebarInit();

    // Parallax Scroll
    if (exists(".screen-head")) {
        new ParallaxScroll(".screen-head", ".screen-bg", 200);
    }
        
});
