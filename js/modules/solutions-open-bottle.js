import { desktop, html } from "../generic-helpers";
import ScrollMagic from "scrollmagic";
import { TweenMax, TimelineMax } from "gsap";
import { ScrollMagicPluginGsap } from "scrollmagic-plugin-gsap";
import "scrollmagic/scrollmagic/uncompressed/plugins/debug.addIndicators";

ScrollMagicPluginGsap(ScrollMagic, TweenMax, TimelineMax);

window.addEventListener("load", function() {
  const iPadProLand =
    window.matchMedia(
      "(min-width: 1365px) and (max-width: 1366px) and (-webkit-min-device-pixel-ratio: 1.5)"
    ).matches && html.classList.contains("touchevents");

  if (desktop && !iPadProLand) {
    let controller = new ScrollMagic.Controller();
    const bottle = "#bottle-oneway";
    const waterAnimate = TweenMax.to("#square", 0.25, {
      attr: { y: 115 }
    });

    // Scale In
    new ScrollMagic.Scene({
      triggerElement: bottle,
      duration: 100
    })
      .triggerHook(0.92)
      .setTween(bottle, 0.15, {
        transform: "scale(1.5)"
      })
      // .addIndicators({ name: "1: Scale In" })
      .addTo(controller);

    // Scale Out
    new ScrollMagic.Scene({
      triggerElement: bottle,
      duration: 100,
      offset: 100
    })
      .setTween(bottle, 0.25, {
        transform: "scale(1)"
      })
      // .addIndicators({ name: "2: Scale Out" })
      .addTo(controller);

    // Fixed Bottle
    new ScrollMagic.Scene({
      triggerElement: bottle,
      duration: 350,
      offset: 340
    })
      .setTween(bottle)
      .setPin(bottle, { pushFollowers: false })
      //.addIndicators({ name: "Fixed" })
      .addTo(controller);

    // Water Height Animate
    new ScrollMagic.Scene({
      triggerElement: bottle,
      duration: 300,
      offset: 280
    })
      .setTween(waterAnimate)
      //.addIndicators({ name: "Water Animate" })
      .addTo(controller);

    // Texts
    new ScrollMagic.Scene({
      triggerElement: "#section-1",
      duration: 700,
      offset: 50
    })
      .setClassToggle("#section-1", "show")
      .setTween("#section-1")
      .addTo(controller);

    new ScrollMagic.Scene({
      triggerElement: "#section-2",
      duration: 700,
      offset: 50
    })
      .setClassToggle("#section-2", "show")
      .setTween("#section-2")
      .addTo(controller);
  }
});
