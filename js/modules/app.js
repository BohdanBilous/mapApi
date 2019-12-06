/*jshint esversion: 6 */

/* MODULE IMPORTS */
import "../../vendor/modernizr-custom";
import {
  html,
  desktop,
  exists,
  animateSwitch,
  buttonArrowAnimate,
  ssHashLink,
  debuggerPanel,
  detectIE
} from "../generic-helpers";
import { MediaLoader } from "../media-loader";
console.log("== Begin executing app.js ==");

document.documentElement.className = document.documentElement.className.replace(
  /\bno-js\b/g,
  ""
);

// For IE 11 ONLoad not work corectly
// if (detectIE() == "11") {
//   (function () {
//     if (window.localStorage) {
//       if (!localStorage.getItem('firstLoad')) {
//         localStorage['firstLoad'] = true;
//         window.location.reload();
//       } else
//         localStorage.removeItem('firstLoad');
//     }
//   })();
// }

window.addEventListener("load", function() {
  /* ------------------
      Header
    --------------------- */

  // hide-activate header
  // let lastScrollTop = 0;

  // window.addEventListener(
  //   "scroll",
  //   function() {
  //     var st = window.pageYOffset || document.documentElement.scrollTop;
  //     if (st > lastScrollTop) {
  //       document.querySelector(".header").classList.add("hide-header");
  //     } else {
  //       document.querySelector(".header").classList.remove("hide-header");
  //     }
  //     lastScrollTop = st;
  //   },
  //   false
  // );

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
  const menuBg = document.querySelector(".menu-bg");

  menuBg.addEventListener("click", () => {
    if (html.classList.contains("menu-open")) {
      html.classList.remove("menu-open");
      html.classList.add("menu-close");
      animateSwitch(".menu .fade-in", "off");
      animateSwitch(".menu .move-from-right", "off");
      disableBodyScroll(false, ".menu-wrap");
    }
  });
  menuSwitcher.addEventListener("click", () => {
    if (html.classList.contains("menu-open")) {
      html.classList.remove("menu-open");
      html.classList.add("menu-close");
      animateSwitch(".menu .fade-in", "off");
      animateSwitch(".menu .move-from-right", "off");
      disableBodyScroll(false, ".menu-wrap");
    } else {
      html.classList.add("menu-open");
      html.classList.remove("menu-close");
      animateSwitch(".menu .fade-in", "on", 1, 800);
      animateSwitch(".menu .move-from-right", "on", 65, 250);
      disableBodyScroll(true, ".menu-wrap");
    }
  });

  // document.body.addEventListener(
  //   "touchmove",
  //   e => {
  //     // if (e.target.classList.contains("menu-open")) e.preventDefault();

  //     e = e || window.event;
  //     let target = e.target || e.srcElement;
  //     if (
  //       !target.className.match(/\bmenu-inner\b/) &&
  //       html.classList.contains("menu-open")
  //     ) {
  //       e.returnValue = false;
  //       e.cancelBubble = true;

  //       if (e.preventDefault) {
  //         e.preventDefault();
  //         e.stopPropagation();
  //       }

  //       return false;
  //     }
  //   },
  //   false
  // );

  var disableBodyScroll = (function() {
    /**
     * Private variables
     */
    var _selector = false,
      _element = false,
      _clientY;

    /**
     * Polyfills for Element.matches and Element.closest
     */
    if (!Element.prototype.matches)
      Element.prototype.matches =
        Element.prototype.msMatchesSelector ||
        Element.prototype.webkitMatchesSelector;

    if (!Element.prototype.closest)
      Element.prototype.closest = function(s) {
        var ancestor = this;
        if (!document.documentElement.contains(el)) return null;
        do {
          if (ancestor.matches(s)) return ancestor;
          ancestor = ancestor.parentElement;
        } while (ancestor !== null);
        return el;
      };

    /**
     * Prevent default unless within _selector
     *
     * @param  event object event
     * @return void
     */
    var preventBodyScroll = function(event) {
      if (false === _element || !event.target.closest(_selector)) {
        event.preventDefault();
      }
    };

    /**
     * Cache the clientY co-ordinates for
     * comparison
     *
     * @param  event object event
     * @return void
     */
    var captureClientY = function(event) {
      // only respond to a single touch
      if (event.targetTouches.length === 1) {
        _clientY = event.targetTouches[0].clientY;
      }
    };

    /**
     * Detect whether the element is at the top
     * or the bottom of their scroll and prevent
     * the user from scrolling beyond
     *
     * @param  event object event
     * @return void
     */
    var preventOverscroll = function(event) {
      // only respond to a single touch
      if (event.targetTouches.length !== 1) {
        return;
      }

      var clientY = event.targetTouches[0].clientY - _clientY;

      // The element at the top of its scroll,
      // and the user scrolls down
      if (_element.scrollTop === 0 && clientY > 0) {
        event.preventDefault();
      }

      // The element at the bottom of its scroll,
      // and the user scrolls up
      // https://developer.mozilla.org/en-US/docs/Web/API/Element/scrollHeight#Problems_and_solutions
      if (
        _element.scrollHeight - _element.scrollTop <= _element.clientHeight &&
        clientY < 0
      ) {
        event.preventDefault();
      }
    };

    /**
     * Disable body scroll. Scrolling with the selector is
     * allowed if a selector is porvided.
     *
     * @param  boolean allow
     * @param  string selector Selector to element to change scroll permission
     * @return void
     */
    return function(allow, selector) {
      if (typeof selector !== "undefined") {
        _selector = selector;
        _element = document.querySelector(selector);
      }

      if (true === allow) {
        if (false !== _element) {
          _element.addEventListener("touchstart", captureClientY, false);
          _element.addEventListener("touchmove", preventOverscroll, false);
        }
        document.body.addEventListener("touchmove", preventBodyScroll, false);
      } else {
        if (false !== _element) {
          _element.removeEventListener("touchstart", captureClientY, false);
          _element.removeEventListener("touchmove", preventOverscroll, false);
        }
        document.body.removeEventListener(
          "touchmove",
          preventBodyScroll,
          false
        );
      }
    };
  })();

  /**
   * modalEffects.js v1.0.0
   * http://www.codrops.com
   *
   * Licensed under the MIT license.
   * http://www.opensource.org/licenses/mit-license.php
   *
   * Copyright 2013, Codrops
   * http://www.codrops.com
   */

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

  // Links Hash Redirect
  ssHashLink(document.querySelectorAll(".btn-hash"));

  //SEARCH
  let inputSearch = document.getElementById("serach-input-form");
  let searchForm = document.querySelector(".search-form");
  let clearInput = inputSearch.parentNode.querySelector(".clear-input");
  inputSearch.focus();
  clearInput.style.left = `${inputSearch.value.length * 40 + 40}px`;
  inputSearch.selectionStart = inputSearch.selectionEnd =
    inputSearch.value.length;
  inputSearch.value.length === 0 && clearInput.classList.add("hide");
  clearInput.addEventListener("click", () => {
    inputSearch.value = "";
    inputSearch.focus();
    clearInput.classList.add("hide");
  });
  inputSearch.addEventListener("input", () => {
    let hiddenElement = document.querySelector(".hidden-width");
    inputSearch.value.length === 0
      ? clearInput.classList.add("hide")
      : clearInput.classList.remove("hide");
    let valyeInput = inputSearch.value.replace(/\s/g, "|");
    hiddenElement.innerHTML = valyeInput;
    let hiddenElementWidth = hiddenElement.offsetWidth;
    clearInput.style.left = `${hiddenElementWidth + 15}px`;
  });
  searchForm.addEventListener("submit", e => {
    const data = e.target.querySelector("input").value;
    document
      .querySelector(".search-socket")
      .classList.remove("search-find", "search-not-find");
    if (data.length > 0) {
      document.querySelector(".search-socket").classList.add("search-find");
    } else {
      document.querySelector(".search-socket").classList.add("search-not-find");
    }
  });
  // search-find
  // Seach Modal

  const searchOpen = document.querySelector(".search-switcher");
  const searchClose = document.querySelector(".search-close");
  const searchModal = document.querySelector(".search-modal");
  searchClose.addEventListener("click", () => {
    html.classList.remove("search-open");
    searchModal.classList.remove("open");
    animateSwitch(".search .fade-in", "off");
    animateSwitch(".search .move-from-right", "off");
  });
  searchOpen.addEventListener("click", () => {
    html.classList.add("search-open");
    searchModal.classList.add("open");
    animateSwitch(".search .fade-in", "on", 1, 800);
    animateSwitch(".search .move-from-right", "on", 65, 250);
  });

  if (exists(".search .lazy-img")) {
    const images = document.querySelectorAll(".lazy-img");

    images.forEach(image => {
      new MediaLoader(image, "image");
    });
  }

  // Debugger
  debuggerPanel();

  // window.addEventListener("scroll", () => {
  //   document.querySelector(".debugger-panel").innerHTML = window.innerHeight;
  // });
});

Object.defineProperty(HTMLMediaElement.prototype, "playing", {
  get: function() {
    return this.currentTime > 0 && !this.paused;
  }
});

console.log("== end executing app.js ==");
