/*jshint esversion: 6 */

/* MODULE IMPORTS */
import { html, desktop, mobile, exists, 
         findParent, animateSwitch } from '../generic-helpers';
import { TabSwitcher } from '../tab-switcher';

window.addEventListener("load", function() {

    // Tabs
    if (exists(".careers-tabs-container")) {
        new TabSwitcher(".careers-tabs-container");
    }

    // Position Drop
    if (exists(".drop-block-ttl")) {
        const positionItem = document.querySelectorAll(".drop-block-ttl");

        positionItem.forEach( item => {
            item.addEventListener("click", () => {
                const block = findParent(item, "drop-block");
                const drop = block.querySelector(".drop-block-content");

                if (block.classList.contains("open")) {
                    block.classList.remove("open");
                    drop.style.maxHeight = null;
                } else {
                    block.classList.add("open");
                    drop.style.maxHeight = drop.scrollHeight + "px";
                }
            });
        })
    }

    // Popup Open 
    const popupButtons = document.querySelectorAll(".btn-touch");
    const popupClose = document.querySelector(".popup .close");
    
    popupButtons.forEach( button => {
        button.addEventListener("click", () => {
            html.classList.add("popup-open");
            html.classList.remove("popup-close");   
            animateSwitch(".popup .fade-in", "on", 1, 800);
            animateSwitch(".popup .move-from-right", "on", 65, 250); 

            loadInfoInPopup(button);
        });
    });

    popupClose.addEventListener("click", () => {
        html.classList.remove("popup-open");
        html.classList.add("popup-close");
        animateSwitch(".popup .fade-in", "off");
        animateSwitch(".popup .move-from-right", "off");
    });

    let loadInfoInPopup = (button) => {
        const block = findParent(button, "drop-block");
        
        const positionNameElem = block.querySelector(".position-name .ttl");
        const positionCityElem = block.querySelector(".position-desc-item .city");
        const positionCity = positionCityElem.textContent || positionCityElem.innerText; 
        const positionName = positionNameElem.textContent || positionNameElem.innerText; 
        const positionDropHTML = block.querySelector(".position-drop section").innerHTML;

        const popup = document.querySelector(".careers-popup");
        const popupPosNameElem = popup.querySelector(".position-name .ttl");
        const popupPosCityElem = popup.querySelector(".position-city");
        const popupPosDropElem = popup.querySelector(".position-drop section");
       
        popupPosNameElem.innerHTML = positionName;
        popupPosCityElem.innerHTML = positionCity;
        popupPosDropElem.innerHTML = positionDropHTML;
    }
});
