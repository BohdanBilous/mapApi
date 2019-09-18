/*jshint esversion: 6 */

/* MODULE IMPORTS */
import { html, desktop, mobile, exists, scrollFromScreen, tags, filterSidebarInit } from '../generic-helpers';
import { PageNav } from '../page-nav-anchor';
import { ParallaxScroll } from '../parallax-scroll';
import { ImageCursor } from '../image-cursor';

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

    // Events Cursor Image
    if (desktop) {
        const eventsTitles = document.querySelectorAll(".events-table-row .events-ttl-section");

        eventsTitles.forEach( eventsTitle => {
            let eventsWrapOffsetTop  = document.querySelector(".events-table").offsetTop;
            let eventsWrapOffsetLeft = document.querySelector(".events-table-cell-m").offsetLeft;

            new ImageCursor(
                eventsTitle, 
                ".events-img", 
                eventsWrapOffsetLeft, 
                (eventsWrapOffsetTop + window.innerHeight)
            );
        });
    }
        
});
