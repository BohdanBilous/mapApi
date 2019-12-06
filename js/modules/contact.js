/*jshint esversion: 6 */

/* MODULE IMPORTS */
import {
    exists,
    scrollXHorizontal,
    detectIE,
    animateScroll
} from "../generic-helpers";
import {
    customSelect
} from "../custom-select";

import {
    selectSearch
} from "../select-search";

import {
    selectSwitcher
} from "../select-switch";

const arrayOfCountrys = [{
        // List off all countrys
        name: "canada", // Name of country must be similar with " <li data-country="canada" class="not_active">"
        body: {
            countryBound: {
                // Set center of map when changed country
                lat: 43.65107,
                long: -79.347015,
                allatitude: 6000000 // how far from the planet in meters
            },
            contactListItems: [{
                // Percone block
                img: "./images/av-12.png",
                topText: "Canada Consultant ",
                bottomText: "Andres Jensen",
                office: false // When true must be 2 selects
            }],
            countryPoints: [{
                // List of markers
                lat: 43.65107,
                long: -79.347015,
                pointText: "Canada " // Text in marker popup
            }]
        }
    },
    {
        name: "usa",
        body: {
            countryBound: {
                lat: 31.9686,
                long: -99.9018,
                allatitude: 6000000
            },
            contactListItems: [{
                    img: "./images/av-1.png",
                    topText: "USA: Florida President - Americas",
                    bottomText: "Chris McEwan",
                    office: false
                },
                {
                    img: "./images/av-2.png",
                    topText: "USA (North-East) Territory Manager",
                    bottomText: "Dan Moss",
                    office: false
                },
                {
                    img: "./images/av-4.png",
                    topText: "USA (Mid-West)  Territory Manager",
                    bottomText: "David Thenness",
                    office: false
                },
                {
                    img: "./images/ava-3.png",
                    topText: "USA (South-East)  Territory Manager",
                    bottomText: "Kelly Thompson",
                    office: false
                },
                {
                    img: "./images/ava-4.png",
                    topText: "USA (South) Sales and Marketing Specialist ",
                    bottomText: "Tammy Duhaime",
                    office: false
                },
                {
                    img: "./images/ava-5.png",
                    topText: "USA (West) Senior Sales Manager ",
                    bottomText: "Scott Fore",
                    office: false
                }
            ],
            countryPoints: [{
                    lat: 27.6648,
                    long: -81.5158,
                    pointText: "Florida"
                },
                {
                    lat: 21.4691,
                    long: -78.6569,
                    pointText: "Caribbean "
                },
                {
                    lat: 40.7128,
                    long: -74.006,
                    pointText: "USA (North-East)"
                },
                {
                    lat: 42.3148,
                    long: -85.6024,
                    pointText: "USA (Mid-West)"
                },
                {
                    lat: 40.4173,
                    long: -82.9071,
                    pointText: "USA (South-East)"
                },
                {
                    lat: 31.9686,
                    long: -99.9018,
                    pointText: "USA (South)"
                },
                {
                    lat: 36.7783,
                    long: -119.4179,
                    pointText: "USA (West)"
                }
            ]
        }
    },
    {
        name: "brazil",
        body: {
            countryBound: {
                lat: -23.442503,
                long: -58.443832,
                allatitude: 6000000
            },
            contactListItems: [{
                img: "./images/av-1.png",
                topText: "General Manager Brazil",
                bottomText: "Ricardo Vieira",
                office: false
            }],
            countryPoints: [{
                    lat: -14.235004,
                    long: -51.9253,
                    pointText: "Brazil"
                },
                {
                    lat: -34.920345,
                    long: -57.969559,
                    pointText: "Argentina"
                },
                {
                    lat: -32.522778,
                    long: -55.765835,
                    pointText: "Uruguay"
                },
                {
                    lat: -23.442503,
                    long: -58.443832,
                    pointText: "Paraguay"
                }
            ]
        }
    },
    {
        name: "czech",
        body: {
            countryBound: {
                lat: 49.817493,
                long: 15.472962,
                allatitude: 600000
            },
            contactListItems: [{
                img: "./images/av-1.png",
                topText: "Sales Manager CEE",
                bottomText: "Zuzana Richterova",
                office: false
            }],
            countryPoints: [{
                lat: 49.817493,
                long: 15.472962,
                pointText: "Czech Republic"
            }]
        }
    },
    {
        name: "sweden",
        body: {
            countryBound: {
                lat: 59.297098,
                long: 18.135426,
                allatitude: 1200000
            },
            contactListItems: [{
                img: "./images/av-12.png",
                topText: " Business Development Director - Nordics",
                bottomText: "Helen Öjerson",
                office: false
            }],
            countryPoints: [{
                lat: 59.297098,
                long: 18.135426,
                pointText: "Sweden"
            }]
        }
    },
    {
        name: "russia",
        body: {
            countryBound: {
                lat: 63.920473,
                long: 78.801193,
                allatitude: 7200000
            },
            contactListItems: [{
                    img: "./images/av-2.png",
                    topText: "Key Account Manager",
                    bottomText: "Denis Abramov",
                    office: false
                },
                {
                    img: "./images/ava-3.png",
                    topText: "Sales Manager",
                    bottomText: "Anna Klimova",
                    office: false
                },
                {
                    img: "./images/ava-4.png",
                    topText: "New Products Sales Manager",
                    bottomText: "Ludmila Stepanchikova",
                    office: false
                },
                {
                    img: "./images/ava-2.png",
                    topText: "Quality Specialist",
                    bottomText: "Roksana Filatova",
                    office: false
                },
                {
                    img: "./images/ava-5.png",
                    topText: "Office",
                    bottomText: "115114, г. Москва, ул. Летниковская, д. 2, стр. 1, офис 453",
                    office: true
                }
            ],
            countryPoints: [{
                    lat: 53.971234,
                    long: 36.794679,
                    pointText: "Russia"
                },
                {
                    lat: 59.87929,
                    long: 30.444284,
                    pointText: "Russia"
                },
                {
                    lat: 56.847658,
                    long: 35.897066,
                    pointText: "Russia"
                },
                {
                    lat: 57.121705,
                    long: 37.69083,
                    pointText: "Russia"
                },
                {
                    lat: 55.72823,
                    long: 37.64481,
                    pointText: "Office"
                }
            ]
        }
    },
    {
        name: "china",
        body: {
            countryBound: {
                lat: 35.86166,
                long: 104.195396,
                allatitude: 9000000
            },
            contactListItems: [{
                img: "./images/ava-8.png",
                topText: "Head of Sales - China",
                bottomText: "Grayson Liu",
                office: false
            }],
            countryPoints: [{
                lat: 35.86166,
                long: 104.195396,
                pointText: "China"
            }]
        }
    },
    {
        name: "australia",
        body: {
            countryBound: {
                lat: -20.375527,
                long: 129.414827,
                allatitude: 7000000
            },
            contactListItems: [{
                img: "./images/av-1.png",
                topText: "Head of Sales Australia, New Zealand and Oceania",
                bottomText: "Troy Pixley",
                office: false
            }],
            countryPoints: [{
                lat: -20.375527,
                long: 129.414827,
                pointText: "Australia"
            }]
        }
    }
];

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
    const countrys = document.querySelector(".countrys");
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
        customSelect();
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
            tilting: true,
            zooming: true,
            scrollWheelZoom: true
            // unconstrainedRotation:true
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
                countryPoints.map(point =>
                    addPoint(point.pointText, [point.lat, point.long])
                );
        });
    };

    const animateToMap = () => {
        // countysFly - Wrapper for list of items in ".countrys-list"  and ".searcheble-list"
        countysFly.forEach((item, i) => {
            const contactList = document.querySelector(".contacts-list");
            item.addEventListener("click", () => {
                let countryName = item.getAttribute("data-country");
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

                    deletePoints();
                    toogleActive(item);
                    addBounds(countryBound);
                    countryPoints &&
                        countryPoints.map(point =>
                            addPoint(point.pointText, [point.lat, point.long])
                        );
                    contactListItems &&
                        contactListItems.map(item =>
                            appendHtml(
                                contactList,
                                createPersones(item.img, item.topText, item.bottomText)
                            )
                        );
                    animatePersons(contactListItems);
                    closeForm();
                }
            });
        });
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
                // contactList.scroll(0, 0);
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
    const createPersones = (img, top, bottom) => {
        return `
                <li class="contacts-item">
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

        // contactInput.parentNode.classList.remove("with-icon");
        // contactInput.value = "";
    };

    // Hide all persones
    const closePersones = () => {
        const contactList = document.querySelector(".contacts-list");
        contactList.classList.remove("active");
    };
    // Remove all markers
    const deletePoints = () => {
        markersList.forEach(marker => map.removeMarker(marker));
        markersList = [];
    };

    // Create Bounds add fly to that bound
    const addBounds = bounds => {
        map.flyTo(bounds.lat, bounds.long, bounds.allatitude, 0, 10, 1000, 2);
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
        inputContact.addEventListener('click', () => {
            var userAgent = window.navigator.userAgent;

            if ((userAgent.match(/iPad/i) || userAgent.match(/iPhone/i))) {
                setTimeout(function () {
                    window.scrollTo(0, 0);
                    document.body.scrollTop = 0;
                    inputContact.parentNode.parentNode.classList.add('active-mob-p');
                    inputContact.parentNode.classList.add('active-mob');
                    // pageHeader.scrollIntoView({
                    //     alignToTop: true,
                    //     behavior: 'smooth'
                    // });
                }, 350);
            }
           
        });
        contactInput.addEventListener("click", (e) => {
            e.preventDefault();
            // pageHeader.scrollIntoView({ 
            //     alignToTop:true,
            //     behavior: 'smooth' 
            //   });
            // console.log(contactInput.parentNode.parentNode.parentNode)
            // contactInput.parentNode.parentNode.parentNode.classList.add('active-mob-p');
            // pageHeader.scrollIntoView({
            //     alignToTop: true,
            //     behavior: 'smooth'
            // });

            // setTimeout(function(){
            //     pageHeader.scrollIntoView({ 
            //         alignToTop:true,
            //         behavior: 'smooth' 
            //       });
            // },150)
            closePersones();
            // animateScroll() ;
            return false;
        });
        searchClose.addEventListener("click", () => closePersones());



        // Button All countrys to started position
        toStart.forEach(start => {
            start.addEventListener("click", () => {
                initialPoins();
                closeForm();
                getCountryPosition();
                toogleActive(countysFly[0]);
                contactHelp.classList.remove("active");
                closePersones();
            });
        });

        //Close all opened Popups
        map.on("click", () => {
            closeForm();
            markersList.map(item => item.closePopup());
        });

        //Toogle Popups
        markersList.map(item =>
            item.on("click", e => {
                markersList.map(items => items.closePopup());
                item.openPopup();
            })
        );
        countysList.forEach(item =>
            item.addEventListener("click", () => {
                contactInput.parentNode.classList.remove("with-icon");
                contactInput.value = "";
            })
        );
    };
    // Toogle styles for countrys block
    const toogleActive = country => {
        let countrys = country.parentNode.childNodes;
        countrys.forEach(item => {
            item.classList.add("not_active");
            item.classList.remove("active");
        });
        country.classList.remove("not_active");
        country.classList.add("active");
    };
    //Change input file name
    inputFiles.forEach(input => {
        let label = input.querySelector("label"),
            inputExist = input.querySelector("input");
        inputExist.addEventListener("change", function (e) {
            if (e.target.files[0])
                label.querySelector("span").innerHTML = e.target.files[0].name;
        });
    });

    init();
    clickHandle();
    scrollXHorizontal(".contacts-list", ".scroll-x-block");
});