export function customSelect(height = false) {

    var x, i, j, selElmnt, a, b, c, scrollInner, icon, iconScr;
    /* Look for any elements with the class "custom-select": */
    x = document.getElementsByClassName("select-custom");
    for (i = 0; i < x.length; i++) {
        selElmnt = x[i].getElementsByTagName("select")[0];
        /* For each element, create a new DIV that will act as the selected item: */
        a = document.createElement("DIV");
        a.setAttribute("class", "select-selected");
        a.innerHTML = selElmnt.options[selElmnt.selectedIndex].innerHTML;
        x[i].appendChild(a);
        /* For each element, create a new DIV that will contain the option list: */
        b = document.createElement("DIV");
        b.setAttribute("class", "select-items select-hide");
        scrollInner = document.createElement("DIV");
        scrollInner.setAttribute("class", "select-inner");

        for (j = 0; j < selElmnt.length; j++) {
            /* For each option in the original select element,
            create a new DIV that will act as an option item: */

            c = document.createElement("DIV");
            c.setAttribute("class", "select-item");
            c.innerHTML = selElmnt.options[j].innerHTML;

            // iconScr = selElmnt.options[j].dataset.icon;
            // icon = document.createElement("IMG");
            // icon.setAttribute("class", "icon");
            // icon.src = iconScr;

            c.addEventListener("click", function (e) {

                /* When an item is clicked, update the original select box,
                and the selected item: */
                var y, i, k, s, h;

                s = this.parentNode.parentNode.parentNode.getElementsByTagName("select")[0];
                h = this.parentNode.parentNode.previousSibling;
                for (i = 0; i < s.length; i++) {
                    if (s.options[i].innerHTML == this.innerHTML) {
                        s.selectedIndex = i;
                        s.dispatchEvent(new Event('change'));

                        h.innerHTML = this.innerHTML;
                        y = this.parentNode.getElementsByClassName("same-as-selected");
                        for (k = 0; k < y.length; k++) {
                            y[k].classList.remove("same-as-selected"); 
                        }
                        this.setAttribute("class", "select-item same-as-selected");
                        this.setAttribute("class", "select-item same-as-selected");
                      
                        break;
                    }
                }
                h.click();

            });

            b.appendChild(scrollInner);
            scrollInner.appendChild(c);
            // c.prepend(icon);
        }
        scrollInner.removeChild(scrollInner.childNodes[0]);
        x[i].appendChild(b);
        a.addEventListener("click", function (e) {
            /* When the select box is clicked, close any other select boxes,
            and open/close the current select box: */
            e.stopPropagation();
            closeAllSelect(this);
            this.nextSibling.classList.toggle("select-hide");
            this.classList.toggle("select-arrow-active");
            if(height)  b.style.height = b.scrollHeight + 20 + "px";
        });


        }

    function closeAllSelect(elmnt) {
        /* A function that will close all select boxes in the document,
        except the current select box: */

        var x, y, i, arrNo = [];
        x = document.getElementsByClassName("select-items");
        y = document.getElementsByClassName("select-selected");
        for (i = 0; i < y.length; i++) {
            if (elmnt == y[i]) {
                arrNo.push(i)
            } else {
                y[i].classList.remove("select-arrow-active");
            }
        }
        for (i = 0; i < x.length; i++) {
            if (arrNo.indexOf(i)) {
                x[i].classList.add("select-hide");
            }
        }
    }

    /* If the user clicks anywhere outside the select box,
    then close all select boxes: */

    document.addEventListener("click", closeAllSelect);
}


// let sel = document.querySelector(".custom-select select");

// sel.addEventListener("change", () => {
//     console.log(sel.value);

// });