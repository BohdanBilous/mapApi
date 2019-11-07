/*jshint esversion: 6 */

/* MODULE IMPORTS */
import {
  exists,
  scrollFromScreen,
  filterSidebarInit,
  findParent
} from "../generic-helpers";
import { MediaLoader } from "../media-loader";
import { customSelect } from "../custom-select";

import ScrollMagic from "scrollmagic"; // Or use scrollmagic-with-ssr to avoid server rendering problems
import { TweenMax, TimelineMax } from "gsap"; // Also works with TweenLite and TimelineLite
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

  // ====== Scene 3D ====== //
  let controller = new ScrollMagic.Controller();

  // document
  //   .querySelectorAll("#hybrid-top-1, #hybrid-top-2, #hybrid-mid")
  //   .forEach(elem => {
  //     const tweenCapAndBottle = TweenMax.to(elem, 1, {
  //       ease: Linear.easeNone
  //     });

  //     const scene_1 = new ScrollMagic.Scene({
  //       triggerElement: "#hybrid-top-1",
  //       duration: 450
  //     })
  //       .triggerHook(0.82)
  //       .setClassToggle(elem, "scale-in")
  //       .setTween(elem, 0.25, {})
  //       .offset(0)
  //       .addIndicators({ name: "1: Scale In" })
  //       .addTo(controller);
  //   });

  // 1: Scale In
  const scene_1_duration = 150;
  const scene_2_duration = 100;

  const scene_1_1 = new ScrollMagic.Scene({
    triggerElement: "#hybrid-top-1",
    duration: scene_1_duration
  })
    .triggerHook(0.92)
    .setTween("#hybrid-top-1", 0.25, {
      transform: "scale(1.3)"
    })
    // .addIndicators({ name: "1: Scale In" })
    .addTo(controller);

  const scene_1_2 = new ScrollMagic.Scene({
    triggerElement: "#hybrid-top-1",
    duration: scene_1_duration
  })
    .triggerHook(0.92)
    .setTween("#hybrid-top-2", 0.25, {
      transform: "scale(1.3) translate(7px,-4px)"
    })
    .addTo(controller);

  const scene_1_3 = new ScrollMagic.Scene({
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
  const scene_2_1 = new ScrollMagic.Scene({
    triggerElement: "#hybrid-mid",
    duration: scene_2_duration
  })
    .triggerHook(0.4)
    .setTween("#hybrid-top-1", 0.25, {
      transform: "scale(1)"
    })
    // .addIndicators({ name: "2: Scale Out" })
    .addTo(controller);

  const scene_2_2 = new ScrollMagic.Scene({
    triggerElement: "#hybrid-mid",
    duration: scene_2_duration
  })
    .triggerHook(0.4)
    .setTween("#hybrid-top-2", 0.25, {
      transform: "scale(1) translate(5px, 7px)"
    })
    .addTo(controller);

  const scene_2_3 = new ScrollMagic.Scene({
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
});
