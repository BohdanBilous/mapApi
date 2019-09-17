/*jshint esversion: 6 */

/* MODULE IMPORTS */
import { html, desktop, mobile, exists, scrollFromScreen } from '../generic-helpers';
import { SolutionsInd } from '../solutions-ind';
import { SuperSlider } from '../super-slider';
import { CursorFader } from '../fader-cursor';
import { SectionScroll } from '../section-scroll';



window.addEventListener("load", function() {

    // Solutions
    let solutionInd = new SolutionsInd();

    // Scrolling
    let sectionScroll = new SectionScroll();
    
    // Mission Fader
    let missinFader = new SuperSlider(".mission-fader", "fader");

    const parallaxBox = document.querySelector(".feedback-fader");
    let imgOffsetLeft = document.querySelector(".feedback-img").offsetLeft * 0.01;
    let imgList = document.querySelectorAll(".feedback-img img");
    let x;

    imgList.forEach( (img) => {
        parallaxBox.addEventListener("mousemove", (event) => {
            event = event || window.event;
            x = event.clientX - parallaxBox.offsetLeft;

            mouseParallax(parallaxBox, img, imgOffsetLeft, x, 30);
        });
    });

    function mouseParallax(container, obj, left, mouseX, speed) {
        let containerWidth = parseInt(container.clientWidth);
        let moveValue = left - ( ( ( mouseX - ( parseInt( obj.offsetWidth ) / 1 + left ) ) / containerWidth ) * speed );
        console.log();
        obj.style = "transform: translateX(" + moveValue + "px)";
    }    

    // Feedback Fader
    let feedbackFader = new SuperSlider(".feedback-fader", "fader");
    if (desktop) new CursorFader(".feedback-fader", sectionScroll.sectionOneHeight);

    // Graph
    if (mobile && exists(".graph-scroll")) {
        document.querySelector(".graph-scroll").scrollLeft = (window.innerWidth / 4);
    }

    // Scroll From Screen
    if (exists(".hint-from-top")) scrollFromScreen(".screen-top");
});
