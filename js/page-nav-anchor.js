/*

    HTML Button Navigations [active class name]:
    <li data-hash="ID" class="[active]">

    sticky = true | false - fixed nav to top, when we scrolling
    stickyHeight = height after which is fixed nav

    nav.sticky {
        position: fixed;
    }

*/

export class PageNav {

    constructor(navWrap, block, callback, sticky, stickyHeight) {
        this.navWrap = document.querySelector(navWrap);
        this.sticky = sticky || false;
        this.stickyHeight = stickyHeight || null;
        this.block = document.querySelectorAll(block);
        this.stickyTopMargin = 0;
        this.callback = callback;
        
        this.buttonClickHandler();
        this.onScreenHandler();
        this.scrollingHandler();
    }

    buttonClickHandler() {
        this.navWrap.addEventListener("click", (e) => {
            let target = e.target.closest("li[data-hash]");
           
            if (target) {
                let hash = target.getAttribute("data-hash");
                this.scrollToBlock(hash);
                this.changeActiveButton(target);
            }
        });
    }

    scrollToBlock(hash) {
        let toBlock = document.getElementById(hash);
        let blockOffsetTop = toBlock.getBoundingClientRect().top + window.scrollY;

        document.documentElement.scrollTop = blockOffsetTop - this.stickyTopMargin;
        document.body.scrollTop = blockOffsetTop - this.stickyTopMargin; // For IE
    }

    changeActiveButton(element) {
        if (!element.classList.contains("active")) {
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
        (window.pageYOffset > stickyHeight) 
            ? this.navWrap.classList.add("sticky")
            : this.navWrap.classList.remove("sticky");
    }

    onScreenHandler() {
        this.block.forEach( block => {
            let id = block.getAttribute("id");
                
            if (this.onScreenDetect(block, 0.2)) {
                let buttonNav = this.navWrap.querySelector(`[data-hash=${id}]`);
                let itemsElement, items = null;
                this.changeActiveButton(buttonNav);

                if (buttonNav.querySelector(".items") != null) {
                    itemsElement = buttonNav.querySelector(".items");
                    items = itemsElement.textContent || itemsElement.innerText;
                }
                
                if (this.callback) this.callback(id, items);
            }
        });
    }

    onScreenDetect(element, partial) {
        let scrollingElement = document.scrollingElement || document.documentElement,
            viewTop          = scrollingElement.scrollTop,
            viewBottom       = viewTop + window.innerHeight,
            _top             = element.getBoundingClientRect().top + viewTop - (window.innerHeight / 2),
            _bottom          = _top + element.offsetHeight,
            compareTop       = partial === true ? _bottom : _top,
            compareBottom    = partial === true ? _top : _bottom;
            
            return (viewTop >= _top);
            // return ((compareBottom <= viewBottom) && (compareTop >= viewTop));
    }
}