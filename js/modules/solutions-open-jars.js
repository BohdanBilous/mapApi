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
    const elementTop = "#jars-top";
    const elementBottle = "#jars-bottle";

    // 1: Scale In / Out
    [elementTop, elementBottle].forEach(element => {
      new ScrollMagic.Scene({
        triggerElement: element,
        duration: 200
      })
        .triggerHook(0.75)
        .setTween(element, 0.15, {
          transform: "scale(1.3)"
        })
        // .addIndicators({ name: "1: Scale In" })
        .addTo(controller);

      new ScrollMagic.Scene({
        triggerElement: element,
        duration: 200,
        offset: 250
      })
        .setTween(element, 0.25, {
          transform: "scale(1)"
        })
        // .addIndicators({ name: "1: Scale Out" })
        .addTo(controller);
    });

    // 2: Fixed Top
    new ScrollMagic.Scene({
      triggerElement: elementBottle,
      duration: 500,
      offset: 200
    })
      .setTween(elementBottle)
      .setPin(elementBottle, { pushFollowers: false })
      // .addIndicators({ name: "2: Fixed" })
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
  } else {
    const distFromTop = 121;
    const distFromBtm = 134;
    const steps = 3;
    const btnDir = document.querySelectorAll(".btn-dir");
    const elementTop = document.querySelector("#jars-top");
    const elementBtm = document.querySelector("#jars-bottle");
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
            elementTop.style.transform = `translateY(${distCurTop}px)`;
            // From Bottom
            distCurBtm = distCurBtm - stepFromBtm;
            elementBtm.style.transform = `translateY(${distCurBtm}px)`;
          }
        } else if (target.classList.contains("up")) {
          if (stepCount != 0) {
            stepCount--;
            // To Top
            distCurTop = distCurTop - stepFromTop;
            elementTop.style.transform = `translateY(${distCurTop}px)`;
            // To Bottom
            distCurBtm = distCurBtm + stepFromBtm;
            elementBtm.style.transform = `translateY(${distCurBtm}px)`;
          }
        }
      });
    });
  }
});
