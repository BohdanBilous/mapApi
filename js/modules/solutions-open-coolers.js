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
    const bottle = "#cooler-bottle";
    const box = "#cooler-box";

    // 1: Scale In
    new ScrollMagic.Scene({
      triggerElement: bottle,
      duration: 150
    })
      .triggerHook(0.92)
      .setTween("#cooler-bottle", 0.15, {
        transform: "scale(1.3)"
      })
      // .addIndicators({ name: "1: Scale In" })
      .addTo(controller);

    // 1.1: Parameter Fade In
    new ScrollMagic.Scene({
      triggerElement: bottle,
      duration: 500
    })
      .setClassToggle("#parameters", "show")
      .triggerHook(0.8)
      .setTween("#parameters")
      // .addIndicators({ name: "1.1: Par Fade In" })
      .addTo(controller);

    // 2: Scale Out
    new ScrollMagic.Scene({
      triggerElement: bottle,
      duration: 40,
      offset: 340
    })
      .setTween(bottle, 0.25, {
        transform: "scale(1)"
      })
      // .addIndicators({ name: "2: Scale Out" })
      .addTo(controller);

    // 3: Fixed Bottle
    new ScrollMagic.Scene({
      triggerElement: bottle,
      duration: 720,
      offset: 240
    })
      .setTween(bottle)
      .setPin(bottle, { pushFollowers: false })
      // .addIndicators({ name: "3: Fixed" })
      .addTo(controller);

    // 4: Rotate Bottle
    const tweenRotate = TweenMax.to(bottle, 1, {
      rotation: 180,
      ease: Power3.easeIn
    });

    new ScrollMagic.Scene({
      triggerElement: bottle,
      duration: 30,
      offset: 350
    })
      .setTween(tweenRotate)
      // .addIndicators({ name: "4: Rotate" })
      .addTo(controller);

    // 5: Change Grad
    new ScrollMagic.Scene({
      triggerElement: bottle,
      duration: 1300,
      offset: 350
    })
      .setClassToggle(bottle, "change-grad")
      .setTween(bottle)
      // .addIndicators({ name: "5: Grad" })
      .addTo(controller);

    // Bubbles
    new ScrollMagic.Scene({
      triggerElement: box,
      duration: 700,
      offset: -100
    })
      .setClassToggle(bottle, "show-bubbles")
      .setTween(box)
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
      offset: -150
    })
      .setClassToggle("#section-2", "show")
      .setTween("#section-2")
      .addTo(controller);
  } else {
    const distFromTop = 121;
    const steps = 3;
    const btnDir = document.querySelectorAll(".btn-dir");
    const elementTop = document.querySelector("#cooler-bottle");
    let stepCount = 0;
    let distCurTop = 0;

    btnDir.forEach(btn => {
      btn.addEventListener("click", e => {
        const target = e.target;
        const stepFromTop = distFromTop / steps;

        if (target.classList.contains("down")) {
          if (stepCount < 3) {
            stepCount++;
            distCurTop = distCurTop + stepFromTop;
            elementTop.style.transform = `translateY(${distCurTop}px) rotate(180deg)`;
          }
        } else if (target.classList.contains("up")) {
          if (stepCount != 0) {
            stepCount--;
            distCurTop = distCurTop - stepFromTop;
            elementTop.style.transform = `translateY(${distCurTop}px) rotate(180deg)`;
          }
        }
      });
    });
  }
});
