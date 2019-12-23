/*jshint esversion: 6 */

/* MODULE IMPORTS */
import {
  exists,
  loadContent,
  findParent,
  scrollFromScreen,
  filterSidebarInit
} from "../generic-helpers";

import { MediaLoader } from "../media-loader";
import { PageNav } from "../page-nav-anchor";
import { ParallaxScroll } from "../parallax-scroll";
import { customSelect } from "../custom-select";

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

  // Page Nav
  if (exists(".media-stream--container") && exists(".media-stream--section")) {
    new PageNav(
      ".media-stream--container",
      ".media-stream--section",
      null,
      false,
      false,
      () => {
        if (exists(".filter-sidebar")) {
          document.querySelector(".filter-sidebar").classList.remove("open");
        }
      }
    );
  }

  // Scroll From Screen
  if (exists(".hint-from-top")) scrollFromScreen(".screen-top");

  // Parallax Scroll
  if (exists(".screen-head")) {
    new ParallaxScroll(".screen-head", ".screen-bg", 200);
  }

  // Select Custom
  if (exists(".select-custom")) {
    customSelect();
    const selectIndustriesIcon = document.querySelector(
      ".select-industries-icon img"
    );
    const selectIndustries = document.querySelector(".select-custom select");

    selectIndustries.addEventListener("change", () => {
      let index = selectIndustries.value;
      selectIndustriesIcon.src = `images/ind-${index}.svg`;
      changeFileList(index);

      // temporarily

      // let getFileName = `_res-content-${index}.html`;
      // const blockForLoad = document.getElementById("content-load");
      loadContent(
        document.querySelector("#getting-started"),
        "_res-content-getting-started.html"
      );
      loadContent(document.querySelector("#usage"), "_res-content-usage.html");
      // end temporarily
    });

    let changeFileList = index => {
      if (exists(".file-list")) {
        document.querySelector(".file-list.show").classList.remove("show");
        document.querySelector(`#file-list-${index}`).classList.add("show");
      }
    };
  }

  // Load More
  const buttonsMore = document.querySelectorAll(".btn-show-more");

  buttonsMore.forEach(button => {
    button.addEventListener("click", () => {
      let parentBlock = findParent(button, "media-stream--section");
      let loadPlace = parentBlock.querySelector(
        ".media-stream--load-place .media-stream--cols"
      );

      loadContent(loadPlace, "_load-more-resources.html"); // temporarily
      button.parentNode.classList.add("hide");
    });
  });

  // Filter Mobile
  filterSidebarInit();
});
