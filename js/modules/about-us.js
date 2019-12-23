/*jshint esversion: 6 */

/* MODULE IMPORTS */
import { html, isInView, loadContent, exists } from "../generic-helpers";
import { SuperSlider } from "../super-slider";
import { MediaLoader } from "../media-loader";

window.addEventListener("load", function() {
  // Set Lazy Images
  const setLazy = lazyData => {
    if (exists(lazyData.className)) {
      const elements = document.querySelectorAll(lazyData.className);
      let mediaQueris = null;

      elements.forEach(element => {
        new MediaLoader(element, lazyData.type, mediaQueris);
      });
    }
  };

  let lazyData = [
    {
      className: ".lazy-image",
      type: "image"
    },
    {
      className: ".lazy-bg",
      type: "bg"
    }
  ];

  lazyData.forEach(lazyItem => {
    setLazy(lazyItem);
  });

  // let pageNav = new PageNav(".media-stream--container", ".terms-ans");

  new SuperSlider(`.about-us-fader`, "fader");
  new SuperSlider(`.years-slider-socket`, "fader", null, function(props) {
    const { slideIndex, sliderWrap, dots } = props;
    const line = sliderWrap.querySelector(".line");
    line.style.left = `${slideIndex * 25}%`;
    dots.forEach(item => item.classList.remove("last-active"));
    if (dots[slideIndex - 1]) {
      dots[slideIndex - 1].classList.add("last-active");
    }
  });
  new SuperSlider(`.fader-recycling`, "fader");
  new SuperSlider(`.fader-saving`, "fader");
  new SuperSlider(`.team-carosuel`, "carousel");

  const videoControls = { autoplay: true, muted: true, loop: true };
  const videoBlock = document.querySelector(".recycling-video");
  new MediaLoader(videoBlock, "video", null, videoControls, () => {
    const videoElement = document.querySelector(".recycling-video video");
    const videoElementPlay = document.querySelector(
      ".recycling-video .play-button-wrap"
    );

    const playVideo = e => {
      isInView(videoElement) ? videoElement.play() : videoElement.pause();
    };
    videoElement.pause();
    if (window.innerWidth <= 768) {
      window.addEventListener("touchmove", e => playVideo(e));
    } else {
      window.addEventListener("scroll", e => playVideo(e));
    }
    videoElementPlay.addEventListener("click", function() {
      this.classList.add("active");
      videoElement.play();
    });
    videoElementPlay.click();
  });

  // Team Popup Open
  const teamMembers = document.querySelectorAll(".team-item");
  const popupClose = document.querySelectorAll(".popup .btn-close");
  const popupBg = document.querySelectorAll(".popup .popup-bg");
  const popupLoadBlock = document.querySelector(".popup .team-member-load");
  let teamMemberId;

  let loadPopupInfo = id => {
    loadContent(popupLoadBlock, `team-info/_load-team-info-${id}.html`);
  };

  teamMembers.forEach(teamMember => {
    teamMember.addEventListener("click", () => {
      teamMemberId = teamMember.getAttribute("id");
      html.classList.add("popup-open", "popup-open-about");
      html.classList.remove("popup-close");
      loadPopupInfo(teamMemberId);
    });
  });

  const openAboutPdf = document.querySelector(".openAboutPdf");
  openAboutPdf.addEventListener("click", () => {
    html.classList.add("popup-open", "popup-open-abouu-us");
    html.classList.remove("popup-close");
  });
  const closePopup = () => {
    html.classList.remove(
      "popup-open",
      "popup-open-about",
      "popup-open-abouu-us"
    );
    html.classList.add("popup-close");
  };
  popupClose.forEach(item =>
    item.addEventListener("click", () => {
      closePopup();
    })
  );
  popupBg.forEach(item =>
    item.addEventListener("click", () => {
      closePopup();
    })
  );
});
