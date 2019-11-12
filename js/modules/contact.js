/*jshint esversion: 6 */

/* MODULE IMPORTS */
import {
    html,
    desktop,
    mobile,
    exists,
    findParent,
    animateSwitch
} from '../generic-helpers';
import {
    customSelect
} from '../custom-select';
import {
    selectSwitcher
} from '../select-switch';

window.addEventListener("load", function () {
    // Select Custom

    if (exists(".select-custom")) {
        customSelect();
        const selectCoutry = document.querySelector(".select-custom select");
        const changeTitle = document.querySelector(".contact-ttl-row h2 .icon");
        selectCoutry.addEventListener("change", () => {
            const index = selectCoutry.value;
            setTimeout(() => {
                const parentEl = selectCoutry.parentElement;
                const value = parentEl.querySelector('.select-selected').innerHTML;
                const newElement = createCoutry(index, value);
                changeTitle.innerHTML = newElement;
            }, 1)
        });


        // Tabs
        if (exists(".contact-tabs-container")) {
            new selectSwitcher(".contact-tabs-container");
        }




        function createCoutry(image, value) {
            return image !== "all" ? `/ <img src="./images/flag-${image}.png"/>${value}` : null;
        };





    }

});