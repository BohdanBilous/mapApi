/*
    - CSS for Drop Block (let body):

    max-height: 0;
    overflow: hidden;
    transition: max-height 0.2s ease-out;
*/


export class Accord {

    constructor(accrodWrap, accordHead, toggle) {
        this.toggleMode = toggle;
        this.accrodWrap = document.querySelector(accrodWrap);
        this.head = document.querySelectorAll(accordHead);
        this.clickEvent(this.head);
    }

    clickEvent(heads) {

        for (let i = 0; i < heads.length; i++) {
            let accordItem = heads[i].parentNode;

            heads[i].addEventListener("click", (e) => {
                e.preventDefault();

                let accordItemClicked = heads[i].parentNode;
                let body = heads[i].nextElementSibling;
                
                if (this.toggleMode) { // Toggle Mode
                    
                    if (accordItemClicked.classList.contains("open")) {
                        accordItemClicked.classList.remove("open") 
                        this.bodySlideDown(body);
                    } else {
                        // let accordItemOpened = accordItemClicked.parentNode.querySelector(".open");
                        let accordItemOpened = this.accrodWrap.querySelector(".open");

                        if (accordItemOpened != null) {
                            accordItemOpened.classList.remove("open");
                            this.bodySlideDown(accordItemOpened.querySelector("[style]"));
                        }

                        accordItemClicked.classList.add("open");
                        this.bodySlideUp(body);
                    }

                } else { // Normal Mode

                    (accordItemClicked.classList.contains("open")) 
                        ? accordItemClicked.classList.remove("open") 
                        : accordItemClicked.classList.add("open");

                    body.style.maxHeight ? this.bodySlideDown(body) : this.bodySlideUp(body);
                }
            });

            this.setBodyMaxHeight(accordItem, heads[i]);
        }
    }

    setBodyMaxHeight(accordItem, head) {
        if (accordItem.classList.contains("open")) {
            let body = head.nextElementSibling;
            this.bodySlideUp(body);
        }
    }

    bodySlideUp(body) {
        body.style.maxHeight = body.scrollHeight + "px";
    }

    bodySlideDown(body) {
        body.style.maxHeight = null;
    }
}