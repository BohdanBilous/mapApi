/*jshint esversion: 6 */

/* MODULE IMPORTS */
import { html, desktop, mobile, exists, scrollFromScreen,
         findParent, animateSwitch } from '../generic-helpers';

window.addEventListener("load", function() {

    // Scroll From Screen
    if (exists(".hint-from-top")) scrollFromScreen(".title-top");

    // Popup Open 
    // const teamMembers = document.querySelectorAll(".team-member");
    // const popupClose = document.querySelector(".popup .close");
    
    // teamMembers.forEach( teamMember => {
    //     button.addEventListener("click", () => {
    //         html.classList.add("popup-open");
    //         html.classList.remove("popup-close");   
    //         animateSwitch(".popup .fade-in", "on", 1, 800);
    //         animateSwitch(".popup .move-from-right", "on", 65, 250); 

    //     });
    // });

    // popupClose.addEventListener("click", () => {
    //     html.classList.remove("popup-open");
    //     html.classList.add("popup-close");
    //     animateSwitch(".popup .fade-in", "off");
    //     animateSwitch(".popup .move-from-right", "off");
    // });

});
