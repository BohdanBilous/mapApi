/*jshint esversion: 6 */

/* MODULE IMPORTS */
import { html, desktop, mobile, exists, scrollFromScreen, filterSidebarInit } from '../generic-helpers';
import { PageNav } from '../page-nav-anchor';
import { ParallaxScroll } from '../parallax-scroll';

window.addEventListener("load", function() {

    // Page Nav
    if (exists(".media-stream--container") && exists(".resources-container")) {
        const titleWrap = document.querySelector(".media-stream--categories-ttl-sticky") || null;
        let pageNav = new PageNav(".media-stream--container", ".resources-container");
    }

    // Scroll From Screen
    if (exists(".hint-from-top")) scrollFromScreen(".title-top");

    // Parallax Scroll
    if (exists(".screen-head")) {
        new ParallaxScroll(".screen-head", ".screen-bg", 200);
    }

    // Filter Mobile
    filterSidebarInit();
    
});
