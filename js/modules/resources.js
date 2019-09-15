/*jshint esversion: 6 */

/* MODULE IMPORTS */
import { html, desktop, mobile, exists, scrollFromScreen, filterSidebarInit } from '../generic-helpers';
import { PageNav } from '../page-nav-anchor';
import { ParallaxScroll } from '../parallax-scroll';
import { customSelect } from '../custom-select';

window.addEventListener("load", function() {

    // Page Nav
    if (exists(".media-stream--container") && exists(".media-stream--section")) {
        let pageNav = new PageNav(".media-stream--container", ".media-stream--section");
    }

    // Scroll From Screen
    if (exists(".hint-from-top")) scrollFromScreen(".screen-top");

    // Parallax Scroll
    if (exists(".screen-head")) {
        new ParallaxScroll(".screen-head", ".screen-bg", 200);
    }

    // Select Custom
    if (exists(".select-custom")) {
        customSelect();
        const selectIndustriesIcon = document.querySelector(".select-industries-icon img");
        const selectIndustries =  document.querySelector(".select-custom select");
        
        selectIndustries.addEventListener("change", () => {
            let index = selectIndustries.value;
            selectIndustriesIcon.src = `images/ind-${index}.svg`;
            
            loadContent(index);
            changeFileList(index);
        });

        let loadContent = (index) => {
            let xhttp = new XMLHttpRequest();
            xhttp.onreadystatechange = function() {
                if (this.readyState == 4 && this.status == 200) {
                    document.getElementById("content-load").innerHTML = this.responseText;
                }
            };
            xhttp.open("GET", `_res-content-${index}.html`, true);
            xhttp.send();
        }

        let changeFileList = (index) => {
            if (exists(".file-list")) {
                document.querySelector(".file-list.show").classList.remove("show");
                document.querySelector(`#file-list-${index}`).classList.add("show");
            }
        }
    }

    // Filter Mobile
    filterSidebarInit();
    
});
