/*jshint esversion: 6 */

/* MODULE IMPORTS */
import { html, desktop, mobile, exists, findParent } from '../generic-helpers';

window.addEventListener("load", function() {

    // Position Drop
    if (exists(".position-name")) {
        const positionItem = document.querySelectorAll(".position-name");

        positionItem.forEach( item => {
            item.addEventListener("click", () => {
                const row = findParent(item, "careers-row");
                const drop = row.querySelector(".position-drop");

                if (row.classList.contains("open")) {
                    row.classList.remove("open");
                    drop.style.maxHeight = null;
                } else {
                    row.classList.add("open");
                    drop.style.maxHeight = drop.scrollHeight + "px";
                }
            });
        })
    }
});
