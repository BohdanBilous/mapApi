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
    PageNav
} from '../page-nav-anchor';

window.addEventListener("load", function () {
    // let pageNav = new PageNav(".media-stream--container", ".terms-ans");



    // Position Drop
    const faqQustions = document.querySelectorAll(".fag-question");

    faqQustions.forEach(item => {
        item.querySelector('.fag-q-open').addEventListener("click", () => {
            // let childScroll = item.querySelector('.fag-q-open')
            let childScroll = item.querySelector('.fag-q-body');
            if (item.classList.contains("active")) {
                item.classList.remove("active");
                childScroll.style.maxHeight = null;
            } else {
                item.classList.add("active");
                childScroll.style.maxHeight = childScroll.scrollHeight + 41 + "px";
            }
        });
    });
    // Filter Mobile
    filterSidebarInit();


});