/*jshint esversion: 6 */

/* MODULE IMPORTS */
import { html, desktop, mobile, exists, scrollFromScreen, imageLazy, filterSidebarInit } from '../generic-helpers';
import { PageNav } from '../page-nav-anchor';
import { MediaLoader } from '../media-loader';

window.addEventListener("load", function() {

    // Page Nav
    if (exists(".media-stream--container") && exists(".cases-container")) {
        const titleWrap = document.querySelector(".media-stream--categories-ttl-sticky") || null;
        let pageNav = new PageNav(".media-stream--container", ".cases-container", changeMonth);

        function changeMonth(name, items) {
            titleWrap.querySelector(".ttl").innerHTML = name;
            titleWrap.querySelector(".items").innerHTML = items;
        }
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

    // Scroll From Screen
    if (exists(".hint-from-top")) scrollFromScreen(".title-top");

    // Filter Mobile
    filterSidebarInit();

        
});
