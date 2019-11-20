export class selectSearch {

    constructor(selectsContainer, selectClose, emptyElement, callBackOnSelectChange) {
        this.selectedContainerElement = selectsContainer;
        this.selectsContainer = document.querySelector(selectsContainer);
        this.selectClose = document.querySelector(selectClose);
        this.activeElements = this.selectsContainer.querySelectorAll('ul li');
        this.callBackOnSelectChange = callBackOnSelectChange;
        this.empltyElement = document.querySelector(emptyElement);
        this.selectHandler();
        this.clickHandler();



    }

    filterFunction(that, event) {
        let container, founded, li, input_val;
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
        // document.querySelectorAll('div').forEach( el => {
        //     el.addEventListener('click', e => {
        //         alert(`Hiciste click en el id ${e.target.id}`);
        //         e.stopPropagation();
        //     });
        // });
        this.selectsContainer.querySelector('input').addEventListener('click', (e) => {
            this.showWraper();
            const  notActive =document.querySelectorAll(`${this.selectedContainerElement} li.not-active`);
            this.activeElements.length === notActive.length ? this.empltyElement.classList.add('active'): this.empltyElement.classList.remove('active');
        })
        this.selectClose.addEventListener('click', (e) => {
            this.selectsContainer.querySelector("input").value ='';
            this.hideWraper();
        });
        
    }
    showWraper() {
        this.selectsContainer.querySelector("ul").style.display = 'block';
        this.selectsContainer.querySelector(".searcheble-list").style.display = 'flex';
    }
    hideWraper() {
        this.selectsContainer.querySelector("ul").style.display = 'none';
        this.selectsContainer.querySelector(".searcheble-list").style.display = 'none';
    }
    selectHandler() {
        this.selectsContainer.querySelector('input').addEventListener('input', (e) => {
            this.filterFunction(this, e);
            const  notActive =document.querySelectorAll(`${this.selectedContainerElement} li.not-active`);
            this.activeElements.length === notActive.length ? this.empltyElement.classList.add('active'): this.empltyElement.classList.remove('active');
        })
        let listElements = this.selectsContainer.querySelectorAll('.searcheble-list li');
        listElements.forEach(item => {
            item.addEventListener('click', () => {
                this.selectsContainer.querySelector("input").value = item.querySelector('span').innerHTML;
                this.hideWraper();
            })
        })
    }

}