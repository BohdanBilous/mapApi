export class selectSwitcher {

    constructor(selectsContainer, callBackOnSelectChange, selectClassName, blockClassName) {
        this.selectsContainer = document.querySelector(selectsContainer);
        this.selectClassName = selectClassName || ".select-item";
        this.selectValues = ".select-custom option";
        this.selectValuesArray = [];
        this.blockClassName = blockClassName || ".select-block";
        this.selects = this.selectsContainer.querySelectorAll(this.selectClassName);
        this.blocks = this.selectsContainer.querySelectorAll(this.blockClassName);
        this.selectCurrentName = "";
        this.onInit();
        this.clickSelectHandler();

    }
    changeSelectBlock(selectCurrentName, selectBlockCurrent) {
        if (selectBlockCurrent) selectBlockCurrent.classList.remove("active");
        this.selectsContainer.querySelector(`${this.blockClassName}#${selectCurrentName}`).classList.add("active");
    }
    switchSelect(select) {
        let selectBlockCurrent = this.selectsContainer.querySelector(`${this.blockClassName}.active`);
        this.changeSelectBlock(select, selectBlockCurrent);

    }
    onInit() {
        const selectValuesArr = [];
        document.querySelectorAll(this.selectValues).forEach(item => {
            selectValuesArr.push(item.value)
        })
        this.selectValuesArray = selectValuesArr;
    }

    clickSelectHandler() {
        this.selects.forEach((select, i) => {
            select.addEventListener("click", () => {
                this.switchSelect(this.selectValuesArray[i]);
            });
        });
    }
}