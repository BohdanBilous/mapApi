/*

*/

export class ParallaxScroll {

    constructor(sectionSelector, parallaxBgSelector, distance) {
        this.section = document.querySelector(sectionSelector);
        this.parallaxBg = document.querySelector(parallaxBgSelector);
        this.scrollingElement = document.scrollingElement || document.documentElement;
        this.sectionHeight = this.section.clientHeight;
        this.distance = distance;

        this.scrollingHandler();
    }

    scrollingHandler() {
        let bgPosition, scrollTop = 0;
        
        window.addEventListener("scroll", e => {
            scrollTop = this.scrollingElement.scrollTop;
            bgPosition =+ -((this.distance / this.sectionHeight) * scrollTop);
    
            this.parallaxBg.style.transform = `translateY(${bgPosition}px)`;
        });
    }
}