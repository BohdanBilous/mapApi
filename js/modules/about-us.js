/*jshint esversion: 6 */

/* MODULE IMPORTS */
import {
    // isInView    
} from '../generic-helpers';
import {
    SuperSlider
} from '../super-slider';
import {
    VideoLoad
} from "../video-lazy-load";



window.addEventListener("load", function () {
    // let pageNav = new PageNav(".media-stream--container", ".terms-ans");

    new SuperSlider(`.about-us-fader`, "fader");
    new SuperSlider(`.years-slider-socket`, "fader", null, function (props) {
        const {
            slideIndex,
            sliderWrap,
            dots
        } = props;
        const line = sliderWrap.querySelector('.line');
        line.style.left = `${(slideIndex) * 25}%`;
        dots.forEach(item => item.classList.remove('last-active'));
        if (dots[slideIndex - 1]) {
            dots[slideIndex - 1].classList.add('last-active');
        }
    });
    new SuperSlider(`.fader-recycling`, "fader");
    new SuperSlider(`.fader-saving`, "fader");
    new SuperSlider(`.team-carosuel`, "carousel");

    new VideoLoad(".recycling-video.bg-img", false, false, null, false, true, function (props) {
        const {
            videoElement
        } = props
        // window.addEventListener('scroll', () => (isInView(videoElement)) ? videoElement.play() : videoElement.pause())
    });


}); 