
export class CursorFader {

    constructor(faderWrap, correctionY) {
        this.correctionY = correctionY || 0;
        this.wrap = document.querySelector(faderWrap);
        this.buttonsArea = this.wrap.querySelector(".slider-buttons");
        this.cursorButton = this.wrap.querySelector(".cursor-button");
        this.cursorButtonText = this.cursorButton.querySelector("span");
        this.target;

        this.mouseOver();
        this.mouseLeave();
    }

    mouseOver() {
        this.cursorMove();

        this.buttonsArea.addEventListener("mouseover", e => {
            this.target = e.target;
            this.cursorButton.classList.add("show");

            if (this.target.classList.contains("next")) {
                this.cursorButton.classList.remove("button-prev");
                this.cursorButton.classList.add("button-next");
                this.cursorButtonText.innerHTML = "Next";
            } else {
                this.cursorButton.classList.remove("button-next");
                this.cursorButton.classList.add("button-prev");
                this.cursorButtonText.innerHTML = "Previous";
            }
        });
    }

    mouseLeave() {
        this.buttonsArea.addEventListener("mouseleave", e => {
            this.cursorButton.classList.remove("show", "button-prev", "button-next");
            this.cursorButtonText.innerHTML = "";
        });
    }

    cursorMove() {
        this.buttonsArea.addEventListener("mousemove", (e) => {
            let x = e.pageX;
            let y = e.pageY - this.wrap.offsetTop - this.correctionY;
            
            this.cursorButton.style.cssText = `top: ${y}px; left: ${x}px`;
        });
    }
}

