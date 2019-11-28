import { tablet } from "./generic-helpers";

export class SolutionsInd {
  constructor(typeImg) {
    this.wrap = document.querySelector(".solutions-highlights");
    this.indicators = this.wrap.querySelectorAll(
      ".indicators-hightlight .indicator"
    );
    this.tares = this.wrap.querySelectorAll(".hover-mode .tare-item");
    this.typeImg = typeImg;
    this.taresArray = [];

    this.hoverHandler();
    if (tablet) this.setIndicators();
  }

  hoverHandler() {
    let tareCompList = [];
    let timeOut;

    ind.classList.remove("eclipse"); // Show all

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
            if (!tareCompList.includes(nameInd)) {
              ind.classList.add("eclipse"); // Hide Non Filtered
            }
          }, 100);
        });
      });

      tare.addEventListener("mouseleave", () => {
        clearTimeout(timeOut);
        this.indicators.forEach(ind => {
          ind.classList.add("eclipse"); // Hide All
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
