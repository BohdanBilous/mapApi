
export class ImageCursor {

    constructor(hoverArea, imageSelector, correctionX, correctionY) {
        this.correctionY = correctionY || 0;
        this.correctionX = correctionX || 0;
        this.hoverArea = hoverArea;
        this.imageWrap = this.hoverArea.querySelector(imageSelector);
        this.image = this.imageWrap.querySelector("img");
        this.imageWidth = 0;

        this.mouseOver();
        this.mouseLeave();
    }

    mouseOver() {
        this.hoverArea.addEventListener("mouseover", e => {
            this.image.src = this.image.dataset.src;
            this.imageWrap.classList.add("show");
            this.imageWidth = this.imageWrap.clientWidth;
        });

        this.cursorMove();
    }

    mouseLeave() {
        this.hoverArea.addEventListener("mouseleave", e => {
            this.imageWrap.classList.remove("show");
        });
    }

    cursorMove() {
        this.hoverArea.addEventListener("mousemove", e => {
       
            // console.log(e.layerX)
            // let rect = e.target.getBoundingClientRect();
            // let offsetTopOfParent = this.getElementRelativeBoundsTop(this.hoverArea, document.querySelector(".events-table"));
            // let x = e.pageX - this.imageWidth - this.correctionX - 65;
            // let y = e.pageY - this.hoverArea.offsetTop - this.correctionY + offsetTopOfParent + 50;
            // console.log(this.imageWidth);
            
            this.imageWrap.style = `top: ${e.layerY + 50 }px; left: ${e.layerX  - 65}px`;
        });
    }

    getElementRelativeBoundsTop(element, parent) {
        return parent.getBoundingClientRect().top - element.getBoundingClientRect().top;
    }
}

