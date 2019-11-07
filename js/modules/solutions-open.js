/*jshint esversion: 6 */

/* MODULE IMPORTS */
import {
  desktop,
  exists,
  scrollFromScreen,
  filterSidebarInit,
  findParent
} from "../generic-helpers";
import { MediaLoader } from "../media-loader";
import { customSelect } from "../custom-select";
import { SuperSlider } from "../super-slider";

import ScrollMagic from "scrollmagic";
import { TweenMax, TimelineMax } from "gsap";
import { ScrollMagicPluginGsap } from "scrollmagic-plugin-gsap";
import "scrollmagic/scrollmagic/uncompressed/plugins/debug.addIndicators";

ScrollMagicPluginGsap(ScrollMagic, TweenMax, TimelineMax);

window.addEventListener("load", function() {
  // Filter Mobile
  filterSidebarInit();

  // Lazy Loader Images
  if (exists(".lazy-img")) {
    const images = document.querySelectorAll(".lazy-img");

    images.forEach(image => {
      const mediaQueryImages = [
        { media: "screen and (min-width: 768px)", src: image.dataset.bg },
        { media: "screen and (max-width: 767px)", src: image.dataset.bgmob }
      ];

      new MediaLoader(image, "image", mediaQueryImages);
    });
  }

  // Spec
  const specButton = document.querySelector(".spec-button");

  specButton.addEventListener("click", () => {
    const specBlock = findParent(specButton, "specs-section");
    console.log(specBlock);
    specBlock.classList.toggle("open");
    specButton.classList.toggle("active");
  });

  // Select Custom
  if (exists(".select-custom")) customSelect();

  // Scroll From Screen
  if (exists(".hint-from-top")) scrollFromScreen(".specs-section");

  // Fader
  new SuperSlider(".prod-fader", "fader");

  // Tech Spec Drop
  if (exists(".tech-spec-wrap")) {
    const btnTechOpen = document.querySelector(".btn-tech-spec-open");
    const btnTechHide = document.querySelector(".btn-tech-spec-hide");
    const techSpecDrop = document.querySelector(".tech-spec-drop");
    const techSpecWrap = document.querySelector(".tech-spec-wrap");

    btnTechOpen.addEventListener("click", () => {
      techSpecWrap.classList.add("open");
      techSpecDrop.style.maxHeight = techSpecDrop.scrollHeight + "px";
    });

    btnTechHide.addEventListener("click", () => {
      techSpecWrap.classList.remove("open");
      techSpecDrop.style.maxHeight = null;
    });
  }

  // ====== Object Animation ====== //
  if (desktop) {
    let controller = new ScrollMagic.Controller();
    const scene_1_duration = 150;
    const scene_2_duration = 100;

    // 1: Scale In
    new ScrollMagic.Scene({
      triggerElement: "#hybrid-top-1",
      duration: scene_1_duration
    })
      .triggerHook(0.92)
      .setTween("#hybrid-top-1", 0.25, {
        transform: "scale(1.3)"
      })
      // .addIndicators({ name: "1: Scale In" })
      .addTo(controller);

    new ScrollMagic.Scene({
      triggerElement: "#hybrid-top-1",
      duration: scene_1_duration
    })
      .triggerHook(0.92)
      .setTween("#hybrid-top-2", 0.25, {
        transform: "scale(1.3) translate(7px,-4px)"
      })
      .addTo(controller);

    new ScrollMagic.Scene({
      triggerElement: "#hybrid-top-1",
      duration: scene_1_duration
    })
      .triggerHook(0.92)
      .setTween("#hybrid-mid", 0.25, {
        transform: "scale(1.3) translate(0,65px)"
      })
      .addTo(controller);

    // 1.1: Parameter Fade In
    new ScrollMagic.Scene({
      triggerElement: "#hybrid-top-1",
      duration: 500
    })
      .setClassToggle("#parameters", "show")
      .triggerHook(0.8)
      .setTween("#parameters")
      // .addIndicators({ name: "1.1: Par Fade In" })
      .addTo(controller);

    // 2: Scale Out
    new ScrollMagic.Scene({
      triggerElement: "#hybrid-mid",
      duration: scene_2_duration
    })
      .triggerHook(0.4)
      .setTween("#hybrid-top-1", 0.25, {
        transform: "scale(1)"
      })
      // .addIndicators({ name: "2: Scale Out" })
      .addTo(controller);

    new ScrollMagic.Scene({
      triggerElement: "#hybrid-mid",
      duration: scene_2_duration
    })
      .triggerHook(0.4)
      .setTween("#hybrid-top-2", 0.25, {
        transform: "scale(1) translate(5px, 7px)"
      })
      .addTo(controller);

    new ScrollMagic.Scene({
      triggerElement: "#hybrid-mid",
      duration: scene_2_duration
    })
      .triggerHook(0.4)
      .setTween("#hybrid-mid", 0.25, {
        transform: "scale(1) translateX(-6px)"
      })
      .addTo(controller);

    // 3: Departure
    const tweenBottle = TweenMax.to("#hybrid-mid", 1, {
      ease: Linear.easeNone
    });

    new ScrollMagic.Scene({
      triggerElement: "#hybrid-mid",
      duration: 300
    })
      .setTween(tweenBottle, 0.25, { scale: 1 })
      .setPin("#hybrid-mid", { pushFollowers: false })
      // .addIndicators({ name: "2: Departure" })
      .addTo(controller);

    new ScrollMagic.Scene({
      triggerElement: "#section-1",
      duration: 700,
      offset: 100
    })
      .setClassToggle("#section-1", "show")
      .setTween("#section-1")
      .addTo(controller);

    new ScrollMagic.Scene({
      triggerElement: "#section-2",
      duration: 700
    })
      .setClassToggle("#section-2", "show")
      .setTween("#section-2")
      .addTo(controller);

    // 4: Connect
    document.querySelectorAll(".hybrid-top").forEach(elem => {
      const tweenElement = TweenMax.to(elem, 1, {
        ease: Linear.easeNone
      });

      new ScrollMagic.Scene({
        triggerElement: "#hybrid-mid",
        // duration: 300,
        duration: 500,
        offset: 250
      })
        .setTween(tweenElement)
        .setPin(elem, { pushFollowers: false })
        // .addIndicators({ name: "4: Connect" })
        .addTo(controller);
    });

    new ScrollMagic.Scene({
      triggerElement: "#hybrid-mid",
      duration: 200,
      offset: 550
    })
      .setTween("#hybrid-mid")
      .setPin("#hybrid-mid", { pushFollowers: false })
      // .addIndicators({ name: "4: Connect Bottom" })
      .addTo(controller);
  } else {
    const distFromTop = 121;
    const distFromBtm = 134;
    const steps = 3;
    const btnDir = document.querySelectorAll(".btn-dir");
    const elementTop = document.querySelectorAll(".hybrid-top");
    const elementBtm = document.querySelector("#hybrid-btm");
    let stepCount = 0;
    let distCurTop = 0;
    let distCurBtm = 0;

    btnDir.forEach(btn => {
      btn.addEventListener("click", e => {
        const target = e.target;
        const stepFromTop = distFromTop / steps;
        const stepFromBtm = distFromBtm / steps;

        if (target.classList.contains("down")) {
          if (stepCount < 3) {
            stepCount++;
            // From Top
            distCurTop = distCurTop + stepFromTop;
            elementTop.forEach(elem => {
              elem.style.transform = `translateY(${distCurTop}px)`;
            });
            // From Bottom
            distCurBtm = distCurBtm - stepFromBtm;
            elementBtm.style.transform = `translateY(${distCurBtm}px)`;
          }
        } else if (target.classList.contains("up")) {
          if (stepCount != 0) {
            stepCount--;
            // To Top
            distCurTop = distCurTop - stepFromTop;
            elementTop.forEach(elem => {
              elem.style.transform = `translateY(${distCurTop}px)`;
            });
            // To Bottom
            distCurBtm = distCurBtm + stepFromBtm;
            elementBtm.style.transform = `translateY(${distCurBtm}px)`;
          }
        }
      });
    });
  }
});
