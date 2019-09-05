/*jshint esversion: 6 */

/* MODULE IMPORTS */
import { html, desktop, mobile, exists, scrollFromScreen, tags } from '../generic-helpers';
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
    const filterSidebar = document.querySelector(".filter-sidebar");

    if (exists(".btn-filter")) {
        document.querySelector(".btn-filter").addEventListener("click", () => {
            if (filterSidebar.classList.contains("open")) {
                filterSidebar.classList.remove("open");
                filterSidebar.classList.add("close");
            } else {
                filterSidebar.classList.add("open");
                filterSidebar.classList.remove("close", "close-search");
            }

            if (filterSidebar.classList.contains("open-search")) {
                filterSidebar.classList.remove("open-search", "open");
                filterSidebar.classList.add("close-search");
            } else if (filterSidebar.classList.contains("close-search")) {
                filterSidebar.classList.add("open-search");
                filterSidebar.classList.remove("close-search", "close");
            }
        });
    }

    if (exists(".btn-search")) { 
        document.querySelector(".btn-search").addEventListener("click", () => {
            if (filterSidebar.classList.contains("open-search")) {
                filterSidebar.classList.remove("open-search");
                filterSidebar.classList.add("close-search");
            } else {
                filterSidebar.classList.add("open-search");
                filterSidebar.classList.remove("close-search", "close");
                
                filterSidebar.querySelector(".search-block input[type='text']").value = "";
                filterSidebar.querySelector(".search-block input[type='text']").focus();
            }
        }); 
    }

    document.querySelectorAll(".filter-item").forEach(filterItem => {
        filterItem.addEventListener("click", () => {
            if (mobile) filterSidebar.classList.remove("open");
        });
    });

    // Parallax Scroll
    new ParallaxScroll(".screen-head", ".screen-bg", 200);
        
});
