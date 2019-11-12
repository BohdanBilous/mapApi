/*
    + HTML classes for Tabs (active):

    <ul>
        <li class="tab [active] data-tab='id'"

    <div class="tab-block [active]" id="id">    


    + CSS:

    .tab-block {
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        opacity: 0;
        transition: opacity 0.6s;

        &.active {
            opacity: 1;
            z-index: 1;
        }
    }
    
*/


export class TabSwitcher {

    constructor(tabsContainer, callBackOnTabChange, tabClassName, blockClassName) {
        this.tabsContainer = document.querySelector(tabsContainer);
        this.tabClassName = tabClassName || ".tab";
        this.blockClassName = blockClassName || ".tab-block";
        this.tabs = this.tabsContainer.querySelectorAll(this.tabClassName);
        this.blocks = this.tabsContainer.querySelectorAll(this.blockClassName);
        this.IdArray = [];
        this.tabCurrentName = "";
        this.callBackOnTabChange = callBackOnTabChange;
        this.clickTabHandler();
    }

    changeTabButton(tab) {
        let tabButtonActive = this.tabsContainer.querySelector(`${this.tabClassName}.active`);
        if (tabButtonActive) tabButtonActive.classList.remove("active");
        tab.classList.add("active");
    }

    changeTabBlock(tabCurrentName, tabBlockCurrent) {

        if (tabBlockCurrent) tabBlockCurrent.classList.remove("active");
        this.tabsContainer.querySelector(`${this.blockClassName}#${tabCurrentName}`).classList.add("active");
    }

    switchTab(tab) {
        let tabBlockCurrent = this.tabsContainer.querySelector(`${this.blockClassName}.active`);
        this.tabCurrentName = tab.dataset.tab;
        this.changeTabButton(tab);
        this.changeTabBlock(this.tabCurrentName, tabBlockCurrent);

        if (this.callBackOnTabChange) {
            this.callBackOnTabChange();
        }
    }

    clickTabHandler() {
        Array.prototype.forEach.call(this.tabs, (tab) => {
            tab.addEventListener("click", () => {

                if (!tab.classList.contains("active")) {
                    this.switchTab(tab);
                }
            });
        });
    }
}