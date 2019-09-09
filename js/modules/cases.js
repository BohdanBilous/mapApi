/*jshint esversion: 6 */

/* MODULE IMPORTS */
import { html, desktop, mobile, exists, scrollFromScreen, filterSidebarInit } from '../generic-helpers';
import { PageNav } from '../page-nav-anchor';

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

    // Scroll From Screen
    if (exists(".hint-from-top")) scrollFromScreen(".title-top");

    // Filter Mobile
    filterSidebarInit();

        
});
