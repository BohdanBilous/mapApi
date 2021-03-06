import { tablet } from "./generic-helpers";

export class SolutionsInd {
  constructor(typeImg, hoverDelay) {
    this.wrap = document.querySelector(".solutions-highlights");
    this.indicators = this.wrap.querySelectorAll(
      ".indicators-hightlight .indicator"
    );
    this.tares = this.wrap.querySelectorAll(".hover-mode .tare-item");
    this.typeImg = typeImg;
    this.taresArray = [];
    this.hoverDelay = hoverDelay || 0;

    this.hoverHandler();
    if (tablet) this.setIndicators();
  }

  hoverHandler() {
    let tareCompList = [];
    let timeOut;

    this.tares.forEach((tare, index) => {
      tare.addEventListener("mouseover", () => {
        tareCompList = tare.dataset.tare.split(" ");

        if (this.typeImg) {
          this.setInactiveTare(index);
          this.indicators[0].parentNode.classList.add("show");
        }

        this.indicators.forEach(ind => {
          let nameInd = ind.dataset.ind;
          timeOut = setTimeout(() => {
            ind.classList.add("eclipse"); // Show all

            if (tareCompList.includes(nameInd)) ind.classList.remove("eclipse"); // Hide Non Filtered
          }, this.hoverDelay);
        });
      });

      tare.addEventListener("mouseleave", () => {
        clearTimeout(timeOut);
        this.indicators.forEach(ind => {
          this.hoverDelay === 0
            ? ind.classList.remove("eclipse") // Show All
            : ind.classList.add("eclipse"); // Hide All
        });

        this.removeInactiveTare();
      });
    });
  }

  setInactiveTare(hoverIndex) {
    this.tares.forEach((tare, i) => {
      if (hoverIndex != i) tare.classList.add("inactive");
    });
  }

  removeInactiveTare() {
    this.tares.forEach(tare => {
      tare.classList.remove("inactive");
    });

    this.indicators[0].parentNode.classList.remove("show");
  }

  setIndicators() {
    let tareCompList = [];

    this.tares.forEach(tare => {
      tareCompList = tare.dataset.tare.split(" ");
      this.appendHTML(tare);

      this.indicators.forEach(ind => {
        let nameInd = ind.dataset.ind;
        let indClone = ind.cloneNode(true);

        if (tareCompList.includes(nameInd)) {
          tare.querySelector(".indicators").appendChild(indClone);
        }
      });
    });
  }

  appendHTML(container) {
    const indicatorsHTML = document.createElement("div");

    indicatorsHTML.classList.add("indicators");
    container.appendChild(indicatorsHTML);
  }
}
