/*jshint esversion: 6 */
export const isMac = navigator.platform.match("Mac") !== null;
export const isiPad = navigator.userAgent.match(/iPad/i) != null;
export const isiOS =
  !!navigator.platform && /iPad|iPhone|iPod/.test(navigator.platform);
export const isAndroid = /(android)/i.test(navigator.userAgent);
export const isSafari = /^((?!chrome|android).)*safari/i.test(
  navigator.userAgent
);
export const mobile = window.matchMedia(
  "(max-width: 767px), and (max-width: 840px) and (orientation: landscape)"
).matches;
export const tablet = window.matchMedia("(max-width: 1150px)").matches;
export const desktop = window.matchMedia("(min-width: 1151px)").matches;
export const html = document.querySelector("html");
export const body = document.querySelector("body");

// forEach for IE
(function() {
  if (typeof NodeList.prototype.forEach !== "function") {
    NodeList.prototype.forEach = Array.prototype.forEach;
  }
})();

// OS detected
if (isMac) html.classList.add("mac-os");
if (isiOS) html.classList.add("iOS");
if (isAndroid) html.classList.add("android");
if (isiPad && isiOS) html.classList.add("iPad");

export function detectIE() {
  let ua = window.navigator.userAgent;
  let msie = ua.indexOf("MSIE ");

  if (msie > 0) {
    // IE 10 or older => return version number
    return parseInt(ua.substring(msie + 5, ua.indexOf(".", msie)), 10);
  }

  let trident = ua.indexOf("Trident/");
  if (trident > 0) {
    // IE 11 => return version number
    let rv = ua.indexOf("rv:");
    return parseInt(ua.substring(rv + 3, ua.indexOf(".", rv)), 10);
  }

  let edge = ua.indexOf("Edge/");
  if (edge > 0) {
    // Edge (IE 12+) => return version number
    return parseInt(ua.substring(edge + 5, ua.indexOf(".", edge)), 10);
  }

  // other browser
  return false;
}

// Check Mobile Device
export function mobilecheck() {
  let check = false;
  (function(a) {
    if (
      /(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(
        a
      ) ||
      /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(
        a.substr(0, 4)
      )
    )
      check = true;
  })(navigator.userAgent || navigator.vendor || window.opera);
  return check;
}

export function mobileAndTabletcheck() {
  let check = false;
  (function(a) {
    if (
      /(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino|android|ipad|playbook|silk/i.test(
        a
      ) ||
      /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(
        a.substr(0, 4)
      )
    )
      check = true;
  })(navigator.userAgent || navigator.vendor || window.opera);
  return check;
}

// Get Index Child Of Parent
export function getIndexChild(element) {
  let i = 0;
  while ((element = element.previousSibling) != null) ++i;
  return i;
}

// Switch Animation
export function animateSwitch(
  elementSelector,
  switchFlag,
  delayInterval,
  delayStart
) {
  const elements = document.querySelectorAll(elementSelector);
  let delay = delayStart || 0;

  elements.forEach(element => {
    try {
      if (switchFlag === "on") {
        element.classList.add("animated");

        if (delayInterval) {
          delay = parseInt(delay + delayInterval, 10);
          element.style = `transition-delay: ${delay / 1000}s`;
        }
      } else if (switchFlag === "off") {
        element.classList.remove("animated");
        element.style = "";
      }
    } catch (error) {
      console.log(error);
    }
  });
}

// Debager Panel
export function debuggerPanel() {
  const panel = document.createElement("div");
  panel.classList.add("debugger-panel");
  body.appendChild(panel);
}

/**
 * Prepends new node before existing nodes
 * @param {HTMLElement} newChild new element to prepend
 */
Node.prototype.prependChild = function(newChild) {
  let _this = this;

  if (_this.hasChildNodes()) {
    this.insertBefore(newChild, _this.firstChild);
  } else {
    _this.appendChild(newChild);
  }
};

/**
 *
 * @param {HTMLElement} el child element which parent need to be found
 * @param {string} cls class which parent element should contain
 */

export function findParent(el, cls) {
  while ((el = el.parentElement) && !el.classList.contains(cls));
  return el;
}

/**
 *
 * @param {HTMLElement} video html5 video selector
 */

export function getVideo(video) {
  let xhr = new XMLHttpRequest();
  let videoSrc = video.getAttribute("data-src");

  xhr.open("GET", videoSrc, true); // true <=> async req
  xhr.responseType = "blob";

  xhr.onload = function() {
    if (this.status === 200) {
      let videoDuration = video.duration;
      let videoBlob = this.response;
      let videoURL = URL.createObjectURL(videoBlob);
      video.src = videoURL;
    }
  };

  xhr.onerror = function() {
    console.log("video: something went wrong");
  };

  xhr.send();
}

/**
 *
 * @param {HTMLElement} parentElement parent element
 * @param {string} childSelector css selector for children
 * @param {string} classToRemove class to remove from children
 */
export function clearClassForChildren(
  parentElement,
  childSelector,
  classToRemove
) {
  let children = parentElement.querySelectorAll(childSelector);

  Array.prototype.forEach.call(children, function(child) {
    child.classList.remove(classToRemove);
  });
}

/**
 * Retrieve the coordinates of the given event relative to the center
 * of the widget.
 *
 * @param event
 *   A mouse-related DOM event.
 * @param reference
 *   A DOM element whose position we want to transform the mouse coordinates to.
 * @return
 *    A hash containing keys 'x' and 'y'.
 */
export function getRelativeCoordinates(event, reference) {
  let x, y;
  event = event || window.event;
  let el = event.target || event.srcElement;

  if (!window.opera && typeof event.offsetX != "undefined") {
    // Use offset coordinates and find common offsetParent
    let pos = {
      x: event.offsetX,
      y: event.offsetY
    };

    // Send the coordinates upwards through the offsetParent chain.
    let e = el;
    while (e) {
      e.mouseX = pos.x;
      e.mouseY = pos.y;
      pos.x += e.offsetLeft;
      pos.y += e.offsetTop;
      e = e.offsetParent;
    }

    // Look for the coordinates starting from the reference element.
    e = reference;
    let offset = {
      x: 0,
      y: 0
    };
    while (e) {
      if (typeof e.mouseX != "undefined") {
        x = e.mouseX - offset.x;
        y = e.mouseY - offset.y;
        break;
      }
      offset.x += e.offsetLeft;
      offset.y += e.offsetTop;
      e = e.offsetParent;
    }

    // Reset stored coordinates
    e = el;
    while (e) {
      e.mouseX = undefined;
      e.mouseY = undefined;
      e = e.offsetParent;
    }
  } else {
    // Use absolute coordinates
    let pos = getAbsolutePosition(reference);
    x = event.pageX - pos.x;
    y = event.pageY - pos.y;
  }
  // Subtract distance to middle
  return {
    x: x,
    y: y
  };
}

export function defineDocumentVisibility() {
  let hidden, visibilityChange;
  if (typeof document.hidden !== "undefined") {
    // Opera 12.10 and Firefox 18 and later support
    hidden = "hidden";
    visibilityChange = "visibilitychange";
  } else if (typeof document.msHidden !== "undefined") {
    hidden = "msHidden";
    visibilityChange = "msvisibilitychange";
  } else if (typeof document.webkitHidden !== "undefined") {
    hidden = "webkitHidden";
    visibilityChange = "webkitvisibilitychange";
  }
  return [hidden, visibilityChange];
}

/**
 * Returns relative bounds of element
 * @param {HTMLElement} element for which bounds are calculated
 * @param {HTMLElement} parent parent element
 */
export function getElementRelativeBounds(element, parent) {
  let parentRect = parent.getBoundingClientRect();
  let elementRect = element.getBoundingClientRect();
  return {
    left: parentRect.left - elementRect.left,
    top: parentRect.top - elementRect.top,
    right: parentRect.right - elementRect.right,
    bottom: parentRect.bottom - elementRect.bottom
  };
}

export function splitIntoLetters(innerText, letterCallback) {
  //takes in innerText of some element, gives out transformed text
  const letters = innerText.split("");
  letters.forEach(
    function(letter) {
      if (letterCallback) {
        letterCallback(letter);
      }
    }.bind(this)
  );
}

export function inputFocus(input) {
  let inputItems = document.querySelectorAll(input);

  Array.prototype.forEach.call(inputItems, function(inputItem) {
    let inputWrap = inputItem.parentNode;
    inputItem.addEventListener("focus", function() {
      inputWrap.classList.add("focus");
    });
    inputItem.addEventListener("blur", function() {
      if (inputItem.value == "") inputWrap.classList.remove("focus");
    });
  });
}

//this function turns vertical scroll into horizontal

export function googleMapsExists() {
  return (
    typeof window.google === "object" && typeof window.google.maps === "object"
  );
}

export function clearSessionStorage(arrItems) {
  arrItems.forEach(item => {
    const sessionItem = sessionStorage.getItem(item);
    if (sessionItem) {
      sessionStorage.removeItem(item);
    }
  });
}

export const videoToPic = (vidElm, picURL) => {
  if (mobile) {
    setTimeout(function() {
      let url = vidElm.playing ? undefined : picURL;

      if (url) {
        //remove video and insert gif/photo
        const container = vidElm.parentNode;
        const image = document.createElement("img");
        vidElm.remove();
        image.src = url;
        image.alt = "illustration";
        container.appendChild(image);
      }
    }, 500);
  }
};

// Click Out
export function clickOut(element, classElement, removeClass) {
  document.addEventListener("click", function(e) {
    const closestElement = findParent(e.target, classElement);
    if (!closestElement) element.classList.remove(removeClass);
    e.stopPropagation();
  });
}

// Get Position
export function getPosition(element) {
  let yPosition = 0;

  while (element) {
    yPosition += element.offsetTop - element.scrollTop + element.clientTop;
    element = element.offsetParent;
  }

  return yPosition;
}

// Get Style
export function getStyle(e, styleName) {
  let styleValue = "";

  if (document.defaultView && document.defaultView.getComputedStyle) {
    styleValue = document.defaultView
      .getComputedStyle(e, "")
      .getPropertyValue(styleName);
  } else if (e.currentStyle) {
    styleName = styleName.replace(/\-(\w)/g, function(strMatch, p1) {
      return p1.toUpperCase();
    });
    styleValue = e.currentStyle[styleName];
  }

  return styleValue;
}

// Element Exists
export let exists = selector => {
  return document.querySelector(selector) != null;
};

// Button Animate Arrow
export let buttonArrowAnimate = () => {
  document.querySelectorAll(".btn-arrow-a").forEach(btn => {
    let arrow = btn.querySelector(".arrow") || null;
    let textSpan = btn.querySelector("span") || null;
    let textSpanWidth = textSpan.clientWidth;
    let buttonWidth = btn.clientWidth;
    let moveWidth = 0;

    btn.addEventListener("mouseover", () => {
      if (arrow) {
        moveWidth = buttonWidth - textSpanWidth - 42;
        arrow.style.transform = `translateX(-${moveWidth}px) scaleX(-1)`;
      }
    });

    btn.addEventListener("mouseleave", () => {
      if (arrow) arrow.style.cssText = "";
    });
  });
};

export function scrollFromScreen(sectionTopSelector) {
  document.querySelector(".hint-from-top").addEventListener("click", () => {
    const block = document.querySelector(sectionTopSelector);
    const scrollingElement =
      document.scrollingElement || document.documentElement;
    const blockHeight = block.clientHeight || 0;
    const blockOffsetTop = block.offsetTop;

    scrollingElement.scrollTop = blockHeight + blockOffsetTop;
  });
}

export let tags = () => {
  document.querySelectorAll(".tags-more--btn").forEach(btn => {
    btn.addEventListener("click", () => {
      btn.parentNode.classList.add("open");
    });
  });
};

// Filter Nav
export function filterSidebarInit() {
  const filterSidebar = document.querySelector(".filter-sidebar");

  if (exists(".btn-filter")) {
    document.querySelector(".btn-filter").addEventListener("click", () => {
      if (filterSidebar.classList.contains("open")) {
        filterSidebar.classList.remove("open");
        filterSidebar.classList.add("close");
      } else {
        filterSidebar.classList.add("open");
        filterSidebar.classList.remove("close", "close-search");
      }

      if (filterSidebar.classList.contains("open-search")) {
        filterSidebar.classList.remove("open-search", "open");
        filterSidebar.classList.add("close-search");
      } else if (filterSidebar.classList.contains("close-search")) {
        filterSidebar.classList.add("open-search");
        filterSidebar.classList.remove("close-search", "close");
      }
    });
  }

  if (exists(".btn-search")) {
    document.querySelector(".btn-search").addEventListener("click", () => {
      if (filterSidebar.classList.contains("open-search")) {
        filterSidebar.classList.remove("open-search");
        filterSidebar.classList.add("close-search");
      } else {
        filterSidebar.classList.add("open-search");
        filterSidebar.classList.remove("close-search", "close");

        filterSidebar.querySelector(".search-block input[type='text']").value =
          "";
        filterSidebar.querySelector(".search-block input[type='text']").focus();
      }
    });
  }

  document.querySelectorAll(".filter-item").forEach(filterItem => {
    filterItem.addEventListener("click", () => {
      if (mobile) filterSidebar.classList.remove("open");
    });
  });
}

// Load Content
export let loadContent = (blockForLoad, getFile) => {
  let xhttp = new XMLHttpRequest();

  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      blockForLoad.innerHTML = this.responseText;
    }
  };
  xhttp.open("GET", getFile, true);
  xhttp.send();
};

// Observer Sticky Element
// export const observer = new IntersectionObserver(
//   function(element) {
//     if (element[0].intersectionRatio === 0)
//       document
//         .querySelector(".media-stream--categories-ttl-sticky")
//         .classList.add("fixed");
//     else if (element[0].intersectionRatio === 1)
//       document
//         .querySelector(".media-stream--categories-ttl-sticky")
//         .classList.remove("fixed");
//   },
//   {
//     threshold: [0, 1]
//   }
// );

export const scrollXHorizontal = (el, wrapper) => {
  let element = document.querySelector(el);
  let wrap = document.querySelector(wrapper);
  element.addEventListener("wheel", function(e) {
    if (e.deltaY > 0) wrap.scrollLeft += 25;
    else wrap.scrollLeft -= 25;
  });
};
// In View
export const isInView = el => {
  const scroll = window.scrollY || window.pageYOffset;
  const boundsTop = el.getBoundingClientRect().top + scroll;

  const viewport = {
    top: scroll,
    bottom: scroll + window.innerHeight
  };

  const bounds = {
    top: boundsTop,
    bottom: boundsTop + el.clientHeight
  };

  return (
    (bounds.bottom >= viewport.top && bounds.bottom <= viewport.bottom) ||
    (bounds.top <= viewport.bottom && bounds.top >= viewport.top)
  );
};

// Hash Link Redirect
export const ssHashLink = links => {
  const hashFromStorage = sessionStorage.getItem("hash");
  let hashName = "";

  links.forEach(link => {
    link.addEventListener("click", () => {
      hashName = link.dataset.hash;
      sessionStorage.setItem("hash", hashName);
    });
  });

  if (document.querySelector(`${hashFromStorage}`)) {
    const blockOffsetTop =
      document.querySelector(`${hashFromStorage}`).getBoundingClientRect().top +
      window.scrollY;

    document.documentElement.scrollTop = blockOffsetTop;
    document.body.scrollTop = blockOffsetTop; // For IE
    sessionStorage.removeItem("hash");
  } else {
    sessionStorage.removeItem("hash");
  }
};
