/*jshint esversion: 6 */

/* MODULE IMPORTS */
import { exists, scrollFromScreen } from "../generic-helpers";
import { SuperSlider } from "../super-slider";

import { TabSwitcher } from "../tab-switcher";
import { ParallaxScroll } from "../parallax-scroll";
import { ImageCursor } from "../image-cursor";
import { MediaLoader } from "../media-loader";
window.addEventListener("load", function() {
  // Lazy Loader Images
  const setLazy = lazyData => {
    if (exists(lazyData.className)) {
      const elements = document.querySelectorAll(lazyData.className);
      let mediaQueris = null;

      elements.forEach(element => {
        if (lazyData.className === ".lazy-img") {
          mediaQueris = [
            {
              media: "screen and (min-width: 768px)",
              src: element.dataset.src
            },
            {
              media: "screen and (max-width: 767px)",
              src: element.dataset.srcmob
            }
          ];
        }

        new MediaLoader(element, lazyData.type, mediaQueris);
      });
    }
  };

  let lazyData = [
    {
      className: ".lazy-img",
      type: "image"
    },
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

  //Add empty slide
  const w = window.innerWidth;
  if (exists(".chart-wrap")) {
    const charts = document.querySelectorAll(".chart-wrap .slider-row");
    const createChild = () => {
      const cliseEl = document.createElement("div");
      cliseEl.classList.add("slide", "slide-empty");
      return cliseEl;
    };
    charts.forEach(item => {
      let n = 0;
      while (n < 5) {
        if (n > 3 && w < 768) break;
        item.appendChild(createChild());
        n++;
      }
    });
  }

  // Parallax Scroll
  if (exists(".screen-head")) {
    new ParallaxScroll(".screen-head", ".screen-bg", 200);
  }

  //ScrollFromScreen
  if (exists(".hint-from-top")) scrollFromScreen(".screen-top");

  // Tabs
  if (exists(".sites-tabs-container")) {
    new TabSwitcher(".sites-tabs-container");
  }
  const allTabs = this.document.querySelectorAll(
    ".sites-tabs-container .tab-block"
  );
  allTabs.forEach(item => {
    const currentTab = item.getAttribute("id");
    // Mission Fader
    new SuperSlider(`#${currentTab} .sites-fader`, "fader");
    new SuperSlider(
      `#${currentTab} .chart-carosuel`,
      "carousel",
      null,
      function(arg) {
        const index = this.slideIndex;
        // Tabs
        if (exists(`#${currentTab} .carosuel-text-inner`)) {
          let elemetns = document.querySelectorAll(
            `#${currentTab}  .sites-chart .carosuel-text-inner`
          );
          elemetns.forEach((item, i) => {
            item.classList.remove("active", "prevAnim", "nextAnim");
            if (i == index) {
              item.classList.add("active");
              arg === "next"
                ? item.classList.add("nextAnim")
                : item.classList.add("prevAnim");
            }
          });
        }
        return;
      }
    );
  });
});
