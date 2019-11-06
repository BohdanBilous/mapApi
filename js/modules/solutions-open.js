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
  var controller = new ScrollMagic.Controller();

  // Scale In
  document
    .querySelectorAll("#hybrid-top-1, #hybrid-top-2, #hybrid-mid")
    .forEach(elem => {
      const tweenCapAndBottle = TweenMax.to(elem, 1, {
        ease: Linear.easeNone
      });

      const scene_1 = new ScrollMagic.Scene({
        triggerElement: "#hybrid-top-1",
        duration: 450
      })
        .triggerHook(0.82)
        .setClassToggle(elem, "scale-in")
        .setTween(tweenCapAndBottle)
        // .setPin(elem, { pushFollowers: false })
        .addIndicators()
        .addTo(controller);
    });

  // Departure
  // document.querySelectorAll("#hybrid-top-1, #hybrid-top-2").forEach(elem => {
  //   const tweenCap = TweenMax.to(elem, 1, {
  //     ease: Linear.easeNone
  //   });

  //   const scene_2 = new ScrollMagic.Scene({
  //     triggerElement: "#hybrid-top-1",
  //     duration: 600
  //   })
  //     .setTween(tweenCap)
  //     .setPin(elem, { pushFollowers: false })
  //     .addIndicators()
  //     .addTo(controller);
  // });

  const tweenBottle = TweenMax.to("#hybrid-top-3", 1, {
    ease: Linear.easeNone
  });

  const scene_3 = new ScrollMagic.Scene({
    triggerElement: "#hybrid-top-1",
    duration: 1200
  })
    .setTween(tweenBottle)
    .setPin("#hybrid-mid", { pushFollowers: false })
    .addIndicators()
    .addTo(controller);
});
