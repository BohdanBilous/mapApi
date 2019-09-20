/*jshint esversion: 6 */

/* MODULE IMPORTS */
import { html, desktop, mobile, exists, loadContent, findParent, 
         scrollFromScreen, imageLazy, filterSidebarInit } from '../generic-helpers';
import { PageNav } from '../page-nav-anchor';
import { ParallaxScroll } from '../parallax-scroll';
import { customSelect } from '../custom-select';
import { MediaLoader } from '../media-loader';

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
        const blockForLoad = document.getElementById("content-load");

        selectIndustries.addEventListener("change", () => {
            let index = selectIndustries.value;
            let getFileName = `_res-content-${index}.html`;
            selectIndustriesIcon.src = `images/ind-${index}.svg`;
            
            loadContent(blockForLoad, getFileName);
            changeFileList(index);
        });

        

        let changeFileList = (index) => {
            if (exists(".file-list")) {
                document.querySelector(".file-list.show").classList.remove("show");
                document.querySelector(`#file-list-${index}`).classList.add("show");
            }
        }
    }

    // Load More
    const buttonsMore = document.querySelectorAll(".btn-show-more");

    buttonsMore.forEach( button => {
        button.addEventListener("click", () => {
            let parentBlock = findParent(button, "media-stream--section");
            let loadPlace = parentBlock.querySelector(".media-stream--load-place .media-stream--cols");

            loadContent(loadPlace, "_load-more-resources.html");
            button.parentNode.classList.add("hide");
        });
    })

    // Lazy Loader Images
    const images = document.querySelectorAll(".lazy-img");

    images.forEach( image => {
        const mediaQueryImages = [
            { media: "screen and (min-width: 768px)", src: image.dataset.src }, 
            { media: "screen and (max-width: 767px)", src: image.dataset.srcmob }
        ];

        new MediaLoader(image, "image", mediaQueryImages);
    });

    // Filter Mobile
    filterSidebarInit();
    
});
