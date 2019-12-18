export class pointNav {
  constructor(pointSelector, popupSelector, pointContent) {
    this.pointSelector = pointSelector;
    this.points = document.querySelectorAll(this.pointSelector);
    this.popup = document.querySelector(popupSelector);
    this.contents = document.querySelectorAll(pointContent);
    this.clickHandler();
  }

  clickHandler() {
    this.points.forEach((point, index) => {
      point.addEventListener("click", () => {
        if (point.classList.contains("current")) {
          point.classList.remove("current");
          this.popupClose();
          this.contentHide(index);
        } else {
          this.currentClear();
          point.classList.add("current");
          this.popupOpen();
          this.contentShow(index);
        }
      });
    });
  }

  currentClear() {
    // const parent = this.pointCurrent.parentNode;
    // const currentIndex = Array.prototype.indexOf.call(
    //   parent.children,
    //   this.pointCurrent
    // );

    document.querySelectorAll(".point-popup-content").forEach(content => {
      if (content.classList.contains("active")) {
        content.classList.remove("active");
      }
    });

    document.querySelectorAll(".point-item").forEach(item => {
      if (item.classList.contains("current")) {
        item.classList.remove("current");
      }
    });
  }

  popupOpen() {
    this.popup.classList.add("open");
  }

  popupClose() {
    this.popup.classList.remove("open");
  }

  contentShow(index) {
    this.contents[index].classList.add("active");
  }

  contentHide(index) {
    this.contents[index].classList.remove("active");
  }
}
