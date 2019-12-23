/*jshint esversion: 6 */

/* MODULE IMPORTS */
import {
  desktop,
  tablet,
  mobile,
  exists,
  scrollFromScreen
} from "../generic-helpers";
import { SolutionsInd } from "../solutions-ind";
import { SuperSlider } from "../super-slider";
import { CursorFader } from "../fader-cursor";
import { SectionScroll } from "../section-scroll";
import { ImageCursor } from "../image-cursor";
// import { VideoLoad } from "../video-lazy-load";
import { MediaLoader } from "../media-loader";

window.addEventListener("load", function() {
  // Lazy Load Video Screen
  // new VideoLoad(".screen-main .bg-img", false, true, false, false, false);

  // Lazy Loader Images
  const setLazy = lazyData => {
    if (exists(lazyData.className)) {
      const elements = document.querySelectorAll(lazyData.className);
      let videoControls = null;

      elements.forEach(element => {
        if (lazyData.className === ".screen-main-video") {
          videoControls = {
            autoplay: true,
            muted: true,
            loop: false,
            poster: element.dataset.poster,
            playsinline: true
          };
        }
        new MediaLoader(element, lazyData.type, null, videoControls);
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
    // {
    //   className: ".screen-main-video",
    //   type: "video"
    // }
  ];

  lazyData.forEach(lazyItem => {
    setLazy(lazyItem);
  });

  // Main Screen Height Tablet
  if (tablet && exists(".screen-main")) {
    let lastOrientation = -1;

    const setScreenHeight = () => {
      console.log(window.orientation, lastOrientation);
      if (window.orientation != lastOrientation) {
        console.log(window.innerHeight);
        document.querySelector(
          ".screen-main"
        ).style.height = `${window.innerHeight}px`;
        lastOrientation = window.orientation;
      }
    };

    setScreenHeight();

    window.addEventListener("orientationchange", function() {
      setTimeout(setScreenHeight, 200);
    });
  }

  // Solutions
  new SolutionsInd();

  // Scrolling
  let sectionScroll = new SectionScroll();

  // Mission Fader
  new SuperSlider(".mission-fader", "fader");

  // Feedback Fader
  if (exists(".feedback-fader")) {
    const parallaxBox = document.querySelector(".feedback-fader");
    let imgOffsetLeft =
      document.querySelector(".feedback-img").offsetLeft * 0.01;
    let imgList = document.querySelectorAll(".feedback-img img");
    let x;

    imgList.forEach(img => {
      parallaxBox.addEventListener("mousemove", event => {
        event = event || window.event;
        x = event.clientX - parallaxBox.offsetLeft;

        mouseParallax(parallaxBox, img, imgOffsetLeft, x, 30);
      });
    });

    function mouseParallax(container, obj, left, mouseX, speed) {
      let containerWidth = parseInt(container.clientWidth);
      let moveValue =
        left -
        ((mouseX - (parseInt(obj.offsetWidth) / 1 + left)) / containerWidth) *
          speed;

      obj.style.cssText = "transform: translateX(" + moveValue + "px)";
    }

    new SuperSlider(".feedback-fader", "fader");

    if (desktop) {
      new CursorFader(".feedback-fader", sectionScroll.sectionOneHeight);
    }
  }

  // Graph
  if (mobile && exists(".graph-scroll")) {
    document.querySelector(".graph-scroll").scrollLeft = window.innerWidth / 4;
  }

  // Events Cursor Image
  if (desktop) {
    const eventsTitles = document.querySelectorAll(
      ".events-table-row .events-ttl-section"
    );

    eventsTitles.forEach(eventsTitle => {
      let eventsWrapOffsetTop = document.querySelector(".events-wrap")
        .offsetTop;
      let eventsWrapOffsetLeft = document.querySelector(
        ".events-wrap .layout-col-r"
      ).offsetLeft;
      new ImageCursor(
        eventsTitle,
        ".events-img",
        eventsWrapOffsetLeft,
        eventsWrapOffsetTop + sectionScroll.sectionOneHeight
      );
    });
  }

  // Scroll From Screen
  if (exists(".hint-from-top")) scrollFromScreen(".screen-top");
});
