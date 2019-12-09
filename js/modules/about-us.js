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

    new VideoLoad(".recycling-video.bg-img", false, false, null, false, true, function (props) {
        const {
            videoElement
        } = props
        const playVideo = (e)=>{
            isInView(videoElement) ?            alert('fired') : videoElement.pause();

        }

        if(window.innerWidth <= 768){
            window.addEventListener('touchmove', (e)=> playVideo(e));
        }else{
            window.addEventListener('scroll',  (e)=> playVideo(e));
        }
      
       
    });

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
        html.classList.add("popup-open","popup-open-about");
        html.classList.remove("popup-close");
  
        loadPopupInfo(teamMemberId);
      });
    });
  
    const closePopup = ()=>{
      html.classList.remove("popup-open","popup-open-about");
      html.classList.add("popup-close");
    }
    popupClose.addEventListener("click", () => {
      closePopup();
    });
    popupBg.addEventListener("click", () => {
      closePopup();
    });

});