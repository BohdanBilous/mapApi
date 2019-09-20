/*jshint esversion: 6 */

/* MODULE IMPORTS */
import { html, desktop, mobile, exists, scrollFromScreen, tags, imageLazy, filterSidebarInit } from '../generic-helpers';
import { PageNav } from '../page-nav-anchor';
import { ParallaxScroll } from '../parallax-scroll';
import { ImageCursor } from '../image-cursor';
import { MediaLoader } from '../media-loader';

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

    // Lazy Loader Images
    const images = document.querySelectorAll(".lazy-img");

    images.forEach( image => {
        const mediaQueryImages = [
            { media: "screen and (min-width: 768px)", src: image.dataset.src }, 
            { media: "screen and (max-width: 767px)", src: image.dataset.srcmob }
        ];

        new MediaLoader(image, "image", mediaQueryImages);
    });

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
