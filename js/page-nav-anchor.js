/*
    HTML Button Navigations [active class name]:
    <li data-hash="ID" class="[active]">

    sticky = true | false - fixed nav to top, when we scrolling
    stickyHeight = height after which is fixed nav

    nav.sticky {
      position: fixed;
    }

*/

import { desktop } from "./generic-helpers";

export class PageNav {
  constructor(navWrap, block, callback, sticky, stickyHeight, clickCallBack) {
    this.navWrap = document.querySelector(navWrap);
    this.sticky = sticky || false;
    this.stickyHeight = stickyHeight || null;
    this.block = document.querySelectorAll(block);
    this.stickyTopMargin = 0;
    this.callback = callback;
    this.clickCallBack = clickCallBack;

    this.buttonClickHandler();
    this.onScreenHandler();
    this.scrollingHandler();
  }

  buttonClickHandler() {
    this.navWrap.addEventListener("click", e => {
      let target = e.target.closest("li[data-hash]");

      if (target) {
        let hash = target.getAttribute("data-hash");
        this.scrollToBlock(hash);
        this.changeActiveButton(target);
        if (this.clickCallBack) this.clickCallBack();
      }
    });
  }

  scrollToBlock(hash) {
    let toBlock = document.getElementById(hash);
    toBlock.scrollIntoView();
  }

  changeActiveButton(element) {
    if (desktop && !element.classList.contains("active")) {
      this.navWrap.querySelector("li.active").classList.remove("active");
      element.classList.add("active");
    }
  }

  scrollingHandler() {
    window.addEventListener("scroll", e => {
      this.onScreenHandler();

      if (this.sticky) this.stickyNav(this.stickyHeight);
    });
  }

  stickyNav(stickyHeight) {
    window.pageYOffset > stickyHeight
      ? this.navWrap.classList.add("sticky")
      : this.navWrap.classList.remove("sticky");
  }

  onScreenHandler() {
    this.block.forEach(block => {
      let id = block.getAttribute("id");

      if (this.onScreenDetect(block, 0.2)) {
        let buttonNav = this.navWrap.querySelector(`[data-hash=${id}]`);
        let itemsElement,
          items = null;
        let buttonNavName =
          buttonNav.querySelector("span").textContent ||
          buttonNav.querySelector("span").innerText;

        if (desktop) this.changeActiveButton(buttonNav);

        if (buttonNav.querySelector(".items") != null) {
          itemsElement = buttonNav.querySelector(".items");
          items = itemsElement.textContent || itemsElement.innerText;
        }

        if (this.callback) this.callback(buttonNavName, items);
      }
    });
  }

  onScreenDetect(element) {
    let scrollingElement =
        document.scrollingElement || document.documentElement,
      viewTop = scrollingElement.scrollTop,
      _top =
        element.getBoundingClientRect().top + viewTop - window.innerHeight / 2;

    return viewTop >= _top;
  }
}
