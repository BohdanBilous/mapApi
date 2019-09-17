
export class SectionScroll {

    constructor() {
        this.sectionOne = document.querySelector(".section-one");
        this.sectionTwo = document.querySelector(".section-two");
        this.sectionEclipse = document.querySelector(".section-eclipse");
        this.sectionOneHeight = this.sectionOne.clientHeight;
        this.scrollTop = 0;
        this.eclipseValue = 0;

        this.setSectionPosition();
        this.scrollHandler();
    }

    scrollHandler() {

        window.addEventListener("scroll", (e) => {
            this.scrollTop = window.pageYOffset || document.documentElement.scrollTop;
           
            if (this.scrollTop >= this.sectionOneHeight - window.innerHeight + 50) {
                this.eclipseValue = Math.abs(1 - (this.scrollTop / ( this.sectionOneHeight - window.innerHeight)));
               
                this.sectionOne.classList.add("fixed");
                this.sectionEclipse.classList.add("show");
                this.sectionEclipse.style = `opacity: ${this.eclipseValue}`;
            } else {
                this.sectionOne.classList.remove("fixed");
                this.sectionEclipse.classList.remove("show");
            }
        });
    }

    setSectionPosition() {
        this.sectionTwo.style = `top: ${this.sectionOneHeight}px`;
        this.sectionTwo.querySelector(".ttl-2").innerHTML = this.sectionOneHeight;
    }
}

