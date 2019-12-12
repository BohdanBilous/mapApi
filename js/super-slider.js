/*
    ---------- FADER ---------    

    + HTML structure:

        <ul class='slider-dots'>
            <li class=[active]>

        <div class='slides'>
            <div class='slide [active]'>

        <div class="slider-buttons">
            <button class='prev'>  
            <button class='next'>      

    + CSS:

        .slides {
            position: relative;

            .slide {
                position: absolute;
                top: 0;
                left: 0;
                height: 100%;
                visibility: hidden;
                opacity: 0;
                animation: fadeOut-l 0.4s forwards;

                &.active {
                    animation: fadeIn-l 0.4s forwards;
                }
            }
        }

    ---------- CAROUSEL ---------    

    + HTML structure:

    <div class="slider-row">
        <div class="slide-panel">
    
    + CSS:

    .slider-row {
        transition: transform 0.4s;
        white-space: nowrap;

        .slide {
            display: inline-block; 
            width: 24.5%;
            margin-right: 0.667%;
        }
    }    

*/

/**
 *
 * @param {string} sliderWrap css selector for slider container
 * @param {string} type type of slider ("fader", "carousel")
 * @param {nubmer} timer number of timer
 * @param {function} sliderCallBack callback function
 *
 **/

import {
  getStyle
} from "./generic-helpers";

export class SuperSlider {
  constructor(sliderWrap, type, timer, sliderCallBack = null, swipe) {
    this.body = document.querySelector("body");
    this.sliderWrap = document.querySelector(sliderWrap);
    this.sliderType = type;
    this.slideIndex = 0;
    this.fader = false;
    this.carousel = false;
    this.timerNumber = parseInt(timer) || null;
    this.sliderCallBack = sliderCallBack;
    this.buttonNext = this.sliderWrap.querySelector(".next");
    this.buttonPrev = this.sliderWrap.querySelector(".prev");
    this.pages = document.querySelector(`${sliderWrap} .pages`);

    if (type == "fader") {
      this.fader = true;
      this.faderInit();
    } else if (type == "carousel") {
      this.carousel = true;
      this.carouselInit();
    }

    if (this.buttonNext) this.buttonsClickHandler();
  }

  // CAROUSEL PART
  carouselInit() {
    this.sliderRow = this.sliderWrap.querySelector(".slider-row");
    this.slides = this.sliderRow.querySelectorAll(".slide");
    this.slide = this.sliderRow.querySelector(".slide");
    this.slidesItems = this.slides.length;
    this.slideWidth = 0;
    this.moveWidth = 0;
    this.carouselReset();
    this.setVisibleSlides();
    this.setInactiveButtons();
    this.touchHandler(this.sliderRow);
    this.goTo();
  }

  carouselReset() {
    this.sliderRow.setAttribute("style", "");
  }

  carouselMove(width, dir) {
    dir == "next" ? this.slideIndex++ : this.slideIndex--;
    this.sliderRow.setAttribute(
      "style",
      "transform: translateX(" + width + "px);"
    );
    this.setVisibleSlides();
  }

  carouselMoveNext() {
    this.moveWidth += -(this.slide.clientWidth + this.getMargin());
    this.carouselMove(this.moveWidth, "next");
    this.setInactiveButtons();
    if (this.sliderCallBack) this.sliderCallBack("next");
  }

  carouselMovePrev() {
    this.moveWidth -= -(this.slide.clientWidth + this.getMargin());
    this.carouselMove(this.moveWidth, "prev");
    this.setInactiveButtons();
    if (this.sliderCallBack) this.sliderCallBack("prev");
  }

  touchHandler(container) {
    this.touchMove = this.touchMove.bind(this);
    this.touchEnd = this.touchEnd.bind(this);

    container.addEventListener(
      "mousedown",
      function (e) {
        this.touchStart(e);
      }.bind(this)
    );
    container.addEventListener(
      "touchstart",
      function (e) {
        this.touchStart(e);
      }.bind(this)
    );
  }

  touchStart(e) {
    let touch = e;

    let viewAll = e.target.classList.contains(".view-all");
    let supportsTouch = "ontouchstart" in window || navigator.msMaxTouchPoints;

    if (!e.target.classList.contains(".view-all") && !supportsTouch) {
      e.preventDefault();
    }

    if (e.type == "touchstart")
      touch = e.targetTouches[0] || e.changedTouches[0];

    this.startX = touch.pageX;
    this.startY = touch.pageY;
    this.sliderWrap.classList.add("move");
    this.sliderWrap.addEventListener("mousemove", this.touchMove);
    this.sliderWrap.addEventListener("touchmove", this.touchMove);
    this.body.addEventListener("mouseup", this.touchEnd);
    this.body.addEventListener("touchend", this.touchEnd);
  }
  goTo() {
    // let lastIndex;
    // this.slides.forEach((slide, i) => {
    //   lastIndex = this.slideIndex;
    //   slide.addEventListener('click', () => {
    //     // for (let j = 0; j < this.slides.length; j++) {
    //     //   if(this.slides[j].classList.contains('visible')){
    //     //     lastIndex = j
    //     //     break;
    //     //   }
    //     // }
    //     // let lastVisibleSlideIndex =
    //     //   this.slideIndex + (this.getItemsInViewport() - 1);
    //     // console.log(i);
    //     console.log(lastIndex)
    //     this.moveWidth += -((this.slide.clientWidth * (i - this.slideIndex  )) + this.getMargin());
    //     this.carouselMove(this.moveWidth, "next");
    //   })
    // })
  }
  touchMove(e) {
    let touch = e;
    let curLeft = this.moveWidth;
    let buttonNextInactive = this.buttonNext.classList.contains("inactive");
    let buttonPrevInactive = this.buttonPrev.classList.contains("inactive");

    if (e.type == "touchmove")
      touch = e.targetTouches[0] || e.changedTouches[0];

    this.moveX = touch.pageX;
    this.moveY = touch.pageY;

    if (Math.abs(this.moveY - this.startY) < 80) return;

    // e.preventDefault();

    if (!buttonPrevInactive && !buttonNextInactive) {
      let moveValue = parseInt(curLeft + this.moveX - this.startX);
      this.sliderRow.setAttribute(
        "style",
        "transform: translateX(" + moveValue + "px);"
      );
    }
  }

  touchEnd(e) {
    const {
      fader
    } = this;
    let touch = e;
    let curLeft = this.moveWidth;
    let stayAtCurrent =
      (curLeft == 0 && this.moveX > this.startX) ||
      (this.buttonNext.classList.contains("inactive") &&
        this.moveX < this.startX) ||
      Math.abs(this.moveX - this.startX) < 40 ||
      typeof this.moveX === "undefined" ?
      true :
      false;

    if (Math.abs(this.moveX - this.startX) === 0) return;
    if (fader) {
      if (!stayAtCurrent) {
        this.moveX > this.startX ? this.faderMovePrev() : this.faderMoveNext();
      }
    } else {
      if (!stayAtCurrent) {
        this.moveX > this.startX ?
          this.carouselMovePrev() :
          this.carouselMoveNext();
      }
    }
    delete this.startX;
    delete this.startY;
    delete this.moveX;
    delete this.moveY;

    this.sliderWrap.classList.remove("move");
    this.sliderWrap.removeEventListener("mousemove", this.touchMove);
    this.sliderWrap.removeEventListener("touchmove", this.touchMove);
    this.body.removeEventListener("mouseup", this.touchEnd);
    this.body.removeEventListener("touchend", this.touchEnd);
  }

  setInactiveButtons() {
    if (this.buttonPrev.classList.contains("inactive"))
      this.buttonPrev.classList.remove("inactive");
    if (this.buttonNext.classList.contains("inactive"))
      this.buttonNext.classList.remove("inactive");

    if (this.slideIndex >= this.slidesItems - this.getItemsInViewport()) {
      this.buttonNext.classList.add("inactive");
    }

    if (this.slideIndex == 0) {
      this.buttonPrev.classList.add("inactive");
    }
  }

  getCarouselWidth() {
    return this.sliderWrap.clientWidth;
  }

  getItemsInViewport() {
    // return visible items on viewport
    return (this.sliderWrap.clientWidth / this.slide.clientWidth).toFixed();
  }

  getMargin() {
    // get CSS margin-right of slide (need import 'getStyle' function)
    let marginRight = getStyle(this.slide, "margin-right");
    return parseInt(marginRight);
  }

  setVisibleSlides() {
    let lastVisibleSlideIndex =
      this.slideIndex + (this.getItemsInViewport() - 1);

    Array.prototype.forEach.call(this.slides, (slide, index) => {
      slide.classList.remove("visible");

      if (index >= this.slideIndex && index <= lastVisibleSlideIndex)
        slide.classList.add("visible");
    });
  }

  // FADER PART
  faderInit() {
    if (this.fader) {
      this.timerInterval, (this.timerSetTimeout = null);
      this.slidesContainer = this.sliderWrap.querySelector(".slides");
      this.slides = this.slidesContainer.querySelectorAll(".slide");
      this.dots = this.sliderWrap.querySelectorAll(".slider-dots > li") || null;
      if (this.slides.length > 1) this.touchHandler(this.slidesContainer);
      if (this.timerNumber) this.setTimer(0, this.timerNumber);
      if (this.dots) this.dotsClickHandler();
    }
  }

  setTimer(startIndex, timerNumber) {
    // start from 'startIndex' through 'timerNumber'
    let slideIndex = startIndex;

    this.timerInterval = setInterval(() => {
      slideIndex = (slideIndex + 1) % this.slides.length;
      this.changeSlide(slideIndex);
      this.changeDots(slideIndex);
    }, timerNumber);
  }

  clearTimer(slideIndex) {
    // clear interval and set new timer
    clearInterval(this.timerInterval);
    clearTimeout(this.timerSetTimeout);
    this.setTimer(slideIndex, this.timerNumber);
  }

  changeSlide(slideIndex) {
    this.slideIndex = slideIndex;
    if(this.dots[this.slideIndex]){
      let childLeft = this.dots[this.slideIndex].offsetLeft
      let parentLeft= this.dots[this.slideIndex].parentElement.offsetLeft;
      this.dots[this.slideIndex].parentElement.scrollTo( { left: childLeft - parentLeft, behavior: 'smooth' });
    }
    if (slideIndex != undefined) {
      this.sliderWrap.querySelector(".slide.active").classList.remove("active");
      this.slides[slideIndex].classList.add("active");
    }
    if (this.pages)
      this.pages.querySelector(".slide-current").innerHTML = `0${slideIndex +
        1}`;
    if (this.sliderCallBack) this.sliderCallBack(this);
    if (this.dots) this.changeDots(slideIndex);
  }

  changeDots(slideIndex) {
    if (slideIndex != undefined && this.dots.length) {
      this.sliderWrap
        .querySelector(".slider-dots .active")
        .classList.remove("active");
      this.dots[slideIndex].classList.add("active");
    }
  }

  dotsClickHandler() {
    Array.prototype.forEach.call(this.dots, dot => {
      dot.addEventListener("click", () => {
        if (!dot.classList.contains("active")) {
          this.slideIndex = this.getIndex(dot);

          this.changeSlide(this.slideIndex);
          if (this.timerNumber) this.clearTimer(this.slideIndex);
        }
      });
    });
  }

  buttonsClickHandler() {
    this.buttonNext.addEventListener(
      "click",
      function (e) {
        if (!this.buttonNext.classList.contains("inactive")) {
          if (this.fader) this.faderMoveNext();
          if (this.carousel) this.carouselMoveNext();
        }
      }.bind(this)
    );

    this.buttonPrev.addEventListener(
      "click",
      function (e) {
        if (!this.buttonPrev.classList.contains("inactive")) {
          if (this.fader) this.faderMovePrev();
          if (this.carousel) this.carouselMovePrev();
        }
      }.bind(this)
    );
  }

  faderMoveNext() {
    this.slideIndex = (this.slideIndex + 1) % this.slides.length;
    this.changeSlide(this.slideIndex);
  }

  faderMovePrev() {
    this.slideIndex == 0 ?
      (this.slideIndex = this.slides.length) :
      this.slideIndex - 1;
    this.changeSlide(this.slideIndex - 1);
  }

  getIndex(element) {
    let parent = element.parentNode;
    let elementsList = parent.children;
    let index = Array.prototype.indexOf.call(elementsList, element);

    return index;
  }
}