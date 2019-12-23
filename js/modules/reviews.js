/*jshint esversion: 6 */

/* MODULE IMPORTS */
import { exists } from "../generic-helpers";
import { MediaLoader } from "../media-loader";

window.addEventListener("load", function() {
  // Lazy Loader Images
  const images = document.querySelectorAll(".lazy-image");
  images.forEach(image => {
    new MediaLoader(image, "image");
  });

  // const reviewsOpen = document.querySelectorAll(".reviews-opener");
  // reviewsOpen.forEach(item => {
  //     let closeItm = item.parentNode.querySelector('.reviews-wrap')
  //     closeItm.style.maxHeight = closeItm.scrollHeight + 41 + "px";
  //     item.addEventListener("click", () => {
  //         let childScroll = closeItm;
  //         if (item.classList.contains("active")) {
  //             item.classList.remove("active");
  //             childScroll.style.maxHeight = childScroll.scrollHeight + 41 + "px";
  //         } else {
  //             item.classList.add("active");
  //             childScroll.style.maxHeight = 0;
  //         }
  //     });
  // });
});
