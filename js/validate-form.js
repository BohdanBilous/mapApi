

export class ValidateForm {

    constructor(formWrap, objectClasses, objectErrors) {
        this.errorClassName = objectClasses.errorClassName;
        this.formWrap = formWrap;
        this.submitBtn = this.formWrap.querySelector("[type='submit']");
        this.inputsWrapList  = this.formWrap.querySelectorAll(`.${objectClasses.inputWrapClassName}`);
        this.selectsWrapList = this.formWrap.querySelectorAll(`.${objectClasses.selectWrapClassName}`);

        this.msgFormat = objectErrors.errorFormat;
        this.msgEmpty  = objectErrors.errorEmpty;
        this.msgSelect = objectErrors.errorSelect;

        this.requiredArray = [];

        this.createRequiredArray();
        // this.formBubblesSuppress();
        this.submitHandler();
    }

    createError(text) {
        let span = document.createElement("span");

        span.classList.add(this.errorClassName);
        span.innerHTML = text;
        return span;
    }

    createRequiredArray() {
        this.formWrap.querySelectorAll("[required]").forEach( (requiredItem) => {
            let requiredObject = {};
            let requiredItemName = requiredItem.name;

            requiredObject.name = requiredItemName;
            (requiredItem.checked) ? requiredObject.check = true : requiredObject.check = false;
            
            this.requiredArray.push(requiredObject);
        });
    }

    insertError(element, text) {
        if (!element.querySelector(`.${this.errorClassName}`)) {
            element.appendChild(this.createError(text));
        }
    }

    clearError(element) {
        if (element != null) element.remove();
    }

    validate() {
        
        this.inputsWrapList.forEach( (inputWrap, index) => {
            let input = inputWrap.querySelector("input");
            let textarea = inputWrap.querySelector("textarea");
            
            if (input) { // INPUT
                this.checkEmptyField(input);
                
                if (input.getAttribute("pattern")) { // PATTERN
                    this.checkPattern(input);
                } 
            } 

            if (textarea) { // TEXTAREA
                this.checkEmptyField(textarea);
            }
        });

        this.selectsWrapList.forEach( (selectWrap) => { // SELECT
            let select = selectWrap.querySelector("select");
            
            if (select) { 
                this.checkSelect(select);
            }
        });
    }

    requiredArrayAddCheck(fieldName) {
        for (let i = 0; i < this.requiredArray.length; i++) {
            if (this.requiredArray[i].name === fieldName) {
                this.requiredArray[i].check = true;
            }
        }
    }

    checkEmptyField(input) {
        let inputName = input.name;
        this.clearError(input.parentNode.querySelector(`.${this.errorClassName}`));

        if (input.value === "") {
            this.insertError(input.parentNode, this.msgEmpty);
        } else {
            if (!input.getAttribute("pattern")) {
                this.requiredArrayAddCheck(inputName);
            }
        }
    }

    checkPattern(input) {
        let inputName = input.name;
        let textMessage = "";
        let value = input.value;
        let pattern = new RegExp(input.getAttribute("pattern"));
       
        if (pattern.test(value)) {
            this.requiredArrayAddCheck(inputName);
        } else {
            (input.getAttribute("title")) ? textMessage = input.title : textMessage = this.msgFormat;
            this.insertError(input.parentNode, textMessage);
        }
    }

    checkSelect(select) {
        let selectName = select.name;
        this.clearError(select.parentNode.querySelector(`.${this.errorClassName}`));

        if (select.selectedIndex == 0) {
            this.insertError(select.parentNode, this.msgSelect);
        } else {
            this.requiredArrayAddCheck(selectName);
        }
    }

    formBubblesSuppress() {
        document.addEventListener("invalid", (e) => {
            e.preventDefault();
        });
    }

    submitHandler() {
        this.submitBtn.addEventListener("click", (e) => {
            if (!this.submitBtn.classList.contains("inactive")) {
                this.validate();
                // e.preventDefault();
            }
        });
    }
}