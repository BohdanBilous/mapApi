/*jshint esversion: 6 */

/* MODULE IMPORTS */
import {
    html,
    isInView,
    loadContent
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

    // new VideoLoad(".recycling-video.bg-img", false, false, true, true, true, function (props) {
    const videoElement = document.querySelector('.recycling-video video');
    const videoElementPlay = document.querySelector('.recycling-video .play-button-wrap')

    const playVideo = (e) => {
        isInView(videoElement) ? videoElement.play() : videoElement.pause();
    }
    videoElement.pause();
    if (window.innerWidth <= 768) {
        window.addEventListener('touchmove', (e) => playVideo(e));
    } else {
        window.addEventListener('scroll', (e) => playVideo(e));
    }
    videoElementPlay.addEventListener('click',function(){
        this.classList.add('active')
        videoElement.play()
    });
    // let simulateClick = function (elem) {
    //     // Create our event (with options)
    //     var evt = new MouseEvent('click', {
    //         bubbles: true,
    //         cancelable: true,
    //         view: window
    //     });

    //     // If cancelled, don't dispatch our event
    //     var canceled = !elem.dispatchEvent(evt);
    // };
    // simulateClick('')
    videoElementPlay.click();
    // });

    const teamMembers = document.querySelectorAll(".team-item");
    const popupClose = document.querySelector(".popup .btn-close");
    const popupBg = document.querySelector(".popup .popup-bg");
    const popupLoadBlock = document.querySelector(".popup .team-member-load");
    let teamMemberId;

    let loadPopupInfo = () => {
        loadContent(popupLoadBlock, `_load-team-info.html`);
        // loadContent(popupLoadBlock, `_load-team-info-${teamMemberId}.html`);
    };

    teamMembers.forEach(teamMember => {
        teamMember.addEventListener("click", () => {
            teamMemberId = teamMember.getAttribute("id");
            html.classList.add("popup-open", "popup-open-about");
            html.classList.remove("popup-close");

            loadPopupInfo(teamMemberId);
        });
    });

    const closePopup = () => {
        html.classList.remove("popup-open", "popup-open-about");
        html.classList.add("popup-close");
    }
    popupClose.addEventListener("click", () => {
        closePopup();
    });
    popupBg.addEventListener("click", () => {
        closePopup();
    });

});