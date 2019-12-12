/*jshint esversion: 6 */

/* MODULE IMPORTS */
import {
    exists,
    scrollXHorizontal,
    detectIE
} from "../generic-helpers";
import {
    customSelect
} from "../custom-select";

import {
    selectSearch
} from "../select-search";

import {
    arrayOfCountrys
} from "../static-data";

window.addEventListener("load", function () {
    //Variables
    const form = document.querySelector(".contact-form-container");
    const formClose = document.querySelector(
        ".contact-form-container .btn-close"
    );
    const countysFly = document.querySelectorAll(".countrys ul li");
    const pageHeader = document.querySelector("header");
    const toStart = document.querySelectorAll(".addMarkers");
    const contactList = document.querySelector(".contacts-list");
    const countysList = document.querySelectorAll(".countrys .countrys-list li");
    const contactHelp = document.querySelector(".contact-help");
    const inputContact = document.querySelector(".countrys .searchable");
    const contactInput = document.querySelector(".countrys .searchable input");
    const searchClose = document.querySelector(".countrys .searcheble-close");
    const inputFiles = document.querySelectorAll(".attach-file");
    let markersList = [];
    let map;
    if (detectIE() == "11") {
        console.log("sa");
        document
            .querySelector(".contact-main")
            .appendChild(document.querySelector(".countrys .contact-form-container"));
    }

    if (exists(".searchable")) {
        new selectSearch(
            ".searchable",
            ".searchable .searcheble-close",
            ".notFound",
            true,
            ".countrys-list"
        );
    }

    if (exists(".select-custom")) {
        customSelect(true);
    }

    //Only for Local test
    const getCountryPosition = () => {
        let pos;
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(showPosition);
        }

        function showPosition(position) {
            pos = [position.coords.latitude, position.coords.longitude];
            map.flyTo(pos[0], pos[1], 8000000, 0, 10, 1000, 1); // NEED TO GET IP LOCATION
        }
    };

    // Init map , styles for map and initital animations
    const init = () => {
        map = WE.map("map", {
            center: [36.057944835, -112.18688965],
            zoom: 4,
            minAltitude: 100000,
            maxAltitude: 8000000,
            dragging: true,
            tilting: false,
            zooming: true,
            scrollWheelZoom: true,
            unconstrainedRotation: false
        });
        map.setTilt(15);
        WE.tileLayer(
            "https://api.maptiler.com/maps/7f0acca8-9511-4c78-99ea-48749d5a2686/{z}/{x}/{y}@2x.jpg?key=8wff5LXJUubraQE9wuIp", {
                minZoom: 0,
                maxZoom: 16,
                tileSize: 512,
                style: "https://api.maptiler.com/maps/7f0acca8-9511-4c78-99ea-48749d5a2686/tiles.json?key=8wff5LXJUubraQE9wuIp"
            }
        ).addTo(map);

        animateToMap();
        initialPoins();
        getCountryPosition();
    };

    // Add all point to map
    const initialPoins = () => {
        deletePoints();
        arrayOfCountrys.map(item => {
            const {
                countryPoints
            } = item.body;
            countryPoints &&
                countryPoints.map(point => {
                    addPoint(point.pointText, [point.lat, point.long]);
                });
        });
        tooglPopUpList();
    };

    const animateToMap = () => {
        // countysFly - Wrapper for list of items in ".countrys-list"  and ".searcheble-list"

        countysFly.forEach((item, i) => {
            item.addEventListener("click", () => {
                let countryName = item.getAttribute("data-country");
                mainFunc(item, countryName, item);
            });
        });
    };
    const mainFunc = (item, countryName, toogle = null) => {
        let arrayOfCountrysExist = arrayOfCountrys.find(
            obj => obj.name === countryName
        );
        if (arrayOfCountrysExist) {
            const {
                countryBound,
                countryPoints,
                contactListItems
            } = arrayOfCountrysExist.body;
            contactList.classList.remove("active");
            contactList.innerHTML = "";

            toogle && deletePoints();
            toogle && toogleActive(item);
            addBounds(countryBound);
            if (toogle && countryPoints) {
                countryPoints.map(point =>
                    addPoint(point.pointText, [point.lat, point.long])
                );
            }
            contactListItems &&
                contactListItems.map(item =>
                    appendHtml(
                        contactList,
                        createPersones(item.img, item.topText, item.bottomText, item.email)
                    )
                );
            animatePersons(contactListItems);
            closeForm();

            markersList.map(item => {
                item.on("click", e => {
                    markersList.map(item => item.element.classList.remove("mainPopup"));
                    item.element.classList.add("mainPopup");
                    markersList.map(items => {
                        items.closePopup();
                    });
                    item.openPopup();
                });
                item.element
                    .querySelector(".we-pp-close")
                    .addEventListener("click", function (e) {
                        e.stopPropagation();
                        item.closePopup();
                    });
            });
        }
    };

    const animatePersons = list => {
        const persone = document.querySelectorAll(".contacts-item");
        contactList.classList.remove("non_active");

        persone.forEach((item, i) => {
            item.addEventListener("click", e => {
                const {
                    office
                } = list[i];
                openForm(office);
                item.classList.add("active");
                item.parentNode.classList.add("off-scroll");
                contactList.scroll(0, 0);
                pageHeader.scrollIntoView();
            });
        });
        setTimeout(function () {
            persone.forEach(item => {
                item.addEventListener("click", () => {
                    contactList.classList.add("non_active");
                });
            });
            contactList.classList.add("active");
            contactHelp.classList.add("active");
        }, 250);
    };

    // Add templete to exist block
    const appendHtml = (el, str) => {
        let element = document.createElement("li");
        element.innerHTML = str;
        element.classList.add("contacts-item");
        while (element.children.length > 0) {
            el.appendChild(element.children[0]);
        }
    };

    // Templete for persones which get from arrayOfCountrys -> body -> contactListItems -> [0]
    const createPersones = (img, top, bottom, email) => {
        return `
                <li class="contacts-item" data-email="${email}">
                <img src="${img}" alt="">
                <div class="text">
                    <div class="top">
                        ${top}
                    </div>
                    <div class="bottom">
                        ${bottom}
                    </div>
                </div>
            </li>
                `;
    };

    // openForm and closeForm toogle active form
    const openForm = office => {
        const officeList = form.querySelector(".office-close");
        form.classList.add("active");
        office
            ?
            officeList.classList.add("active") :
            officeList.classList.remove("active");
        document.body.classList.add("form-active");
    };
    const closeForm = () => {
        const persone = document.querySelectorAll(".contacts-item");
        form.classList.remove("active");
        document.body.classList.remove("form-active");
        persone.forEach(item => item.classList.remove("active"));
        form.querySelectorAll("input , textarea, select").forEach(item => {
            item.value = "";
        });
        form.querySelector(".attach-file span").innerHTML = "Attach file";
        form.querySelectorAll(".select-custom").forEach(item => {
            item.querySelector(".select-selected").innerText = item.querySelector(
                "select option"
            ).innerText;
        });
        contactList.classList.remove("off-scroll");
        // contactInput.parentNode.classList.remove("with-icon");
        // contactInput.value = "";
    };

    // Hide all persones
    const closePersones = () => {
        const contactList = document.querySelector(".contacts-list");
        contactList.classList.remove("active");
        contactList.classList.remove("off-scroll");
    };
    // Remove all markers
    const deletePoints = () => {
        markersList.forEach(marker => map.removeMarker(marker));
        markersList = [];
    };

    // Create Bounds add fly to that bound
    const addBounds = bounds => {
        map.flyTo(bounds.lat, bounds.long, bounds.allatitude, 1, 10, 10000, 2);
    };

    // Create markers
    const addPoint = (text, position) => {
        let marker = WE.marker(position).addTo(map);
        marker.bindPopup(text, {
            maxWidth: 150,
            closeButton: true
        });
        markersList.push(marker);
    };
    const clickHandle = () => {
        // Button for close form
        formClose.addEventListener("click", () => closeForm());
        contactInput.addEventListener("click", () => {
            function fireEvents() {
                return new Promise(function (resolve, reject) {
                    inputContact.parentNode.parentNode.classList.add("active-mob-p");
                    inputContact.parentNode.classList.add("active-mob");
                    resolve();
                });
            }

            function second() {
                setTimeout(function () {
                    pageHeader.scrollIntoView();
                }, 200);
                setTimeout(function () {
                    pageHeader.scrollIntoView();
                }, 300);
                setTimeout(function () {
                    pageHeader.scrollIntoView();
                }, 400);
                setTimeout(function () {
                    pageHeader.scrollIntoView();
                }, 500);
            }
            var userAgent = window.navigator.userAgent;
            if (userAgent.match(/iPad/i) || userAgent.match(/iPhone/i)) {
                fireEvents().then(second);
            }
        });
        contactInput.addEventListener("click", e => {
            e.preventDefault();
            closePersones();
            return false;
        });
        searchClose.addEventListener("click", () => closePersones());

        //Close all opened Popups
        map.on("click", () => {
            closeForm();
            markersList.map(item => item.closePopup());
        });
        document
            .querySelector(".select-custom.aditional-question")
            .querySelector("select")
            .addEventListener("change", function () {
                const additionalInput = document.querySelector(".additional-input");
                if (this.value == "Other") {
                    additionalInput.classList.add("active");
                } else {
                    additionalInput.classList.remove("active");
                    additionalInput.querySelector("input").value = "";
                }
            });
    };
    const dotsTrigger = () => {
        // Button All countrys to started position
        toStart.forEach(start => {
            start.addEventListener("click", () => {
                initialPoins();
                // console.log(dotsInitial)
                // mainFunc('all', 'all');
                getCountryPosition();
                toogleActive(countysFly[0]);
                contactHelp.classList.remove("active");

                closePersones();
                closeForm();
            });
        });

        countysList.forEach(item =>
            item.addEventListener("click", () => {
                contactInput.parentNode.classList.remove("with-icon");
                contactInput.value = "";
            })
        );
    };

    //Toogle Popups
    const tooglPopUpList = () => {
        markersList.map(item => {
            item.on("click", e => {
                markersList.map(item => item.element.classList.remove("mainPopup"));
                let textMarker = item.element
                    .querySelector(".we-pp-wrapper .we-pp-content")
                    .childNodes[0].getAttribute("data-pop-country");
                textMarker = textMarker.toLowerCase();
                // deletePoints();
                mainFunc(textMarker, textMarker);
                item.element.classList.add("mainPopup");
                markersList.map(items => {
                    items.closePopup();
                });

                item.openPopup();
            });
            item.element
                .querySelector(".we-pp-close")
                .addEventListener("click", function (e) {
                    e.stopPropagation();
                    item.closePopup();
                });
        });
    };

    // Toogle styles for countrys block
    const toogleActive = country => {
        let countrys = country.parentNode.childNodes;
        countrys.forEach(item => {
            item.classList.add("not_active");
            item.classList.remove("active");
        });
        // deletePoints();
        country.classList.remove("not_active");
        country.classList.add("active");
    };
    //Change input file name
    inputFiles.forEach(input => {
        let label = input.querySelector("label"),
            inputExist = input.querySelector("input"),
            removeData = input.querySelector(".attach-close");
        inputExist.addEventListener("change", function (e) {
            if (e.target.files[0])
                label.querySelector("span").innerHTML = e.target.files[0].name;
        });
        removeData.addEventListener("click", function (e) {
            e.stopPropagation();
            inputExist.value = "";
            inputExist.type = "";
            inputExist.type = "file";
            label.querySelector("span").innerHTML = "Attach file";
        });
    });

    init();
    clickHandle();
    dotsTrigger();
    scrollXHorizontal(".scroll-x-block");

    if (
        navigator.userAgent.indexOf("Safari") != -1 &&
        navigator.userAgent.indexOf("Chrome") == -1
    ) {
        document.body.className += " safari";
    }
});