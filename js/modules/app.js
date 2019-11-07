/*jshint esversion: 6 */

/* MODULE IMPORTS */
import "../../vendor/modernizr-custom";
import {
  html,
  desktop,
  exists,
  animateSwitch,
  buttonArrowAnimate
} from "../generic-helpers";

console.log("== Begin executing app.js ==");

document.documentElement.className = document.documentElement.className.replace(
  /\bno-js\b/g,
  ""
);

window.addEventListener("load", function() {
  /* ------------------
        Header
    --------------------- */

  // Drop Down
  if (exists(".drop-down-element")) {
    document.querySelectorAll(".drop-down-element").forEach(dropDownElement => {
      dropDownElement
        .querySelector(".drop-down-sel")
        .addEventListener("click", e => {
          e.stopPropagation();
          dropDownElement.classList.contains("open")
            ? dropDownElement.classList.remove("open")
            : dropDownElement.classList.add("open");
          if (dropDownElement.classList.contains("open")) {
            window.addEventListener("click", () => {
              dropDownElement.classList.remove("open");
            });
          }
        });
    });
  }

  // Menu
  const menuSwitcher = document.querySelector(".menu-switcher");

  menuSwitcher.addEventListener("click", () => {
    if (html.classList.contains("menu-open")) {
      html.classList.remove("menu-open");
      html.classList.add("menu-close");
      animateSwitch(".menu .fade-in", "off");
      animateSwitch(".menu .move-from-right", "off");
    } else {
      html.classList.add("menu-open");
      html.classList.remove("menu-close");
      animateSwitch(".menu .fade-in", "on", 1, 800);
      animateSwitch(".menu .move-from-right", "on", 65, 250);
    }
  });

  /* ------------------
        Buttons
    --------------------- */

  // Button Animate
  if (desktop) buttonArrowAnimate();

  // Button Change Text
  if (exists(".btn-change-text")) {
    const btnChangeText = document.querySelectorAll(".btn-change-text");
    let btnText, btnDataText, btnMedia;

    btnChangeText.forEach(btn => {
      btnDataText = btn.dataset.text;
      btnText = btn.querySelector("span").innerHTML;
      btnMedia = btn.dataset.media;

      if (window.matchMedia(btnMedia).matches) {
        btn.querySelector("span").innerHTML = btnDataText;
        btn.setAttribute("data-text", btnText);
      }
    });
  }

  // Links Locking
  const hrefArray = ["case-open.html", "event-open.html"];

  document.querySelectorAll("a").forEach(link => {
    if (hrefArray.includes(link.getAttribute("href"))) {
      link.addEventListener("click", e => e.preventDefault());
    }
  });
});

Object.defineProperty(HTMLMediaElement.prototype, "playing", {
  get: function() {
    return this.currentTime > 0 && !this.paused;
  }
});

console.log("== end executing app.js ==");
