/* MODULE IMPORTS */
import {
    animateScroll
} from "./generic-helpers";

export class selectSearch {

    constructor(selectsContainer, selectClose, emptyElement, imageIcon = false, secondList = false, callBackOnSelectChange) {
        this.selectedContainerElement = selectsContainer;
        this.selectsContainer = document.querySelector(selectsContainer);
        this.selectClose = document.querySelector(selectClose);
        this.activeElements = this.selectsContainer.querySelectorAll('ul li');
        this.callBackOnSelectChange = callBackOnSelectChange;
        this.empltyElement = document.querySelector(emptyElement);
        this.imageIcon = imageIcon;
        this.secondList = secondList && document.querySelector(secondList);
        this.selectHandler();
        this.clickHandler();



    }

    filterFunction(that) {
        let container, li, input_val;
        container = that.selectsContainer;
        input_val = container.querySelector("input").value.toUpperCase();
        li = container.querySelectorAll("ul li");
        li.forEach(element => {
            if (element.innerHTML.toUpperCase().indexOf(input_val) > -1) {
                element.classList.remove('not-active');
                element.classList.add('active');
            } else {
                element.classList.remove('active');
                element.classList.add('not-active');
            }
        });
    }
    clickHandler() {
        document.body.addEventListener('click', e => {
            this.hideWraper();

        });
        this.selectsContainer.addEventListener('click', e => {
            e.stopPropagation();
        });
        this.selectsContainer.querySelector('input').addEventListener('click', (e) => {
            this.showWraper();
            const notActive = document.querySelectorAll(`${this.selectedContainerElement} li.not-active`);
            this.activeElements.length === notActive.length ? this.empltyElement.classList.add('active') : this.empltyElement.classList.remove('active');
        })
        this.selectClose.addEventListener('click', (e) => {
            this.selectsContainer.querySelector("input").value = '';
            this.selectsContainer.classList.remove('search-active')
            if (this.imageIcon) this.selectsContainer.classList.remove('with-icon');
            this.hideWraper();
        });

    }
    showWraper() {
        this.selectsContainer.querySelector("ul").style.display = 'block';
        this.selectsContainer.querySelector(".searcheble-list").style.display = 'flex';
        var userAgent = window.navigator.userAgent;
        if (!userAgent.match(/iPad/i) || !userAgent.match(/iPhone/i)) {
            this.selectsContainer.parentNode.classList.add('active-mob');
            this.selectsContainer.parentNode.parentNode.classList.add('active-mob-p');
        }

        // animateScroll();
    }
    hideWraper() {
        this.selectsContainer.querySelector("ul").style.display = 'none';
        this.selectsContainer.querySelector(".searcheble-list").style.display = 'none';
        this.selectsContainer.parentNode.classList.remove('active-mob');
        this.selectsContainer.parentNode.parentNode.classList.remove('active-mob-p');



    }
    selectHandler() {
        this.selectsContainer.querySelector('input').addEventListener('input', (e) => {
            this.filterFunction(this, e);
            const notActive = document.querySelectorAll(`${this.selectedContainerElement} li.not-active`);
            this.activeElements.length === notActive.length ? this.empltyElement.classList.add('active') : this.empltyElement.classList.remove('active');
            (e.target.value.length >= 1) ? this.selectsContainer.classList.add('search-active'): this.selectsContainer.classList.remove('search-active');
        })
        let listElements = this.selectsContainer.querySelectorAll('.searcheble-list li');
        listElements.forEach(item => {
            item.addEventListener('click', (e) => {
                if (this.secondList) {
                    const activeCountry = this.secondList.querySelector('li.active');
                    activeCountry && activeCountry.classList.remove('active');
                    activeCountry && activeCountry.classList.add('not_active');
                }

                const searchInput = this.selectsContainer.querySelector("input");
                searchInput.value = item.querySelector('span').innerHTML;
                if (this.imageIcon) {
                    let attribute = item.querySelector('img').getAttribute('src');
                    this.selectsContainer.classList.add('with-icon');
                    this.selectsContainer.querySelector('.image-icon').style.backgroundImage = `url('${attribute}')`;
                }
                (searchInput.value.length >= 1) ? this.selectsContainer.classList.add('search-active'): this.selectsContainer.classList.remove('search-active');
                this.hideWraper();
            })
        })
    }

}