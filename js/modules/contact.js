/*jshint esversion: 6 */

/* MODULE IMPORTS */
import {
    html,
    desktop,
    mobile,
    exists,
    findParent,
    animateSwitch
} from '../generic-helpers';
import {
    customSelect
} from '../custom-select';

import {
    selectSearch
} from '../select-search';

import {
    selectSwitcher
} from '../select-switch';

const arrayOfCountrys = {
    canada: {
        countryBound: [
            [33, -53.59],
            [58.32, -140.9]
        ],
        contactListItems: [{
            img: './images/av-12.png',
            topText: 'Canada Consultant ',
            bottomText: 'Andres Jensen'
        }],
        countryPoints: [{
            lat: 43.651070,
            long: -79.347015,
            pointText: 'Canada '
        }]
    },
    usa: {
        countryBound: [
            [19, -71.59],
            [36.32, -123]
        ],
        contactListItems: [{
                img: './images/av-1.png',
                topText: 'USA: Florida President - Americas',
                bottomText: 'Chris McEwan'
            },
            {
                img: './images/av-2.png',
                topText: 'USA (North-East) Territory Manager',
                bottomText: 'Dan Moss'
            }, {
                img: './images/av-4.png',
                topText: 'USA (Mid-West)  Territory Manager',
                bottomText: 'David Thenness'
            }, {
                img: './images/ava-3.png',
                topText: 'USA (South-East)  Territory Manager',
                bottomText: 'Kelly Thompson'
            }, {
                img: './images/ava-4.png',
                topText: 'USA (South) Sales and Marketing Specialist ',
                bottomText: 'Tammy Duhaime'
            }, {
                img: './images/ava-5.png',
                topText: 'USA (West) Senior Sales Manager ',
                bottomText: 'Scott Fore'
            }
        ],
        countryPoints: [{
                lat: 27.6648,
                long: -81.5158,
                pointText: 'Florida'
            },
            {
                lat: 21.4691,
                long: -78.6569,
                pointText: 'Caribbean '
            },
            {
                lat: 40.7128,
                long: -74.0060,
                pointText: 'USA (North-East)'
            },
            {
                lat: 42.3148,
                long: -85.6024,
                pointText: 'USA (Mid-West)'
            },
            {
                lat: 40.4173,
                long: -82.9071,
                pointText: 'USA (South-East)'
            },
            {
                lat: 31.9686,
                long: -99.9018,
                pointText: 'USA (South)'
            },
            {
                lat: 36.7783,
                long: -119.4179,
                pointText: 'USA (West)'
            }
        ]
    },
    brazil: {
        countryBound: [
            [-10.38, -31.94],
            [-48.6, -70.43]
        ],
        contactListItems: [{
            img: './images/av-1.png',
            topText: 'General Manager Brazil',
            bottomText: 'Ricardo Vieira'
        }],
        countryPoints: [{
            lat: -14.235004,
            long: -51.9253,
            pointText: 'Brazil'
        }, {
            lat: -34.920345,
            long: -57.969559,
            pointText: 'Argentina'
        }, {
            lat: -32.522778,
            long: -55.765835,
            pointText: 'Uruguay'
        }, {
            lat: -23.442503,
            long: -58.443832,
            pointText: 'Paraguay'
        }]
    },
    czech: {
        countryBound: [
            [50.0536, 18.8568],
            [47.5877, 12.0782]
        ],
        contactListItems: [{
            img: './images/av-1.png',
            topText: 'Sales Manager CEE',
            bottomText: 'Zuzana Richterova'
        }],
        countryPoints: [{
            lat: 49.817493,
            long: 15.472962,
            pointText: 'Czech Republic'
        }]
    },
    sweden: {
        countryBound: [
            [64.83, 23.83],
            [50.08, 11.91]
        ],
        contactListItems: [{
            img: './images/av-12.png',
            topText: ' Business Development Director - Nordics',
            bottomText: 'Helen Öjerson'
        }],
        countryPoints: [{
            lat: 59.297098,
            long: 18.135426,
            pointText: 'Sweden'
        }]
    },
    russia: {
        countryBound: [
            [73.9, 95.3],
            [42.0, 30.3]
        ],
        contactListItems: [{
                img: './images/av-2.png',
                topText: 'Key Account Manager',
                bottomText: 'Denis Abramov'
            }, {
                img: './images/ava-3.png',
                topText: 'Sales Manager',
                bottomText: 'Anna Klimova'
            }, {
                img: './images/ava-4.png',
                topText: 'New Products Sales Manager',
                bottomText: 'Ludmila Stepanchikova'
            }, {
                img: './images/ava-2.png',
                topText: 'Quality Specialist',
                bottomText: 'Roksana Filatova'
            }, {
                img: './images/ava-5.png',
                topText: 'Office',
                bottomText: '115114, г. Москва, ул. Летниковская, д. 2, стр. 1, офис 453'
            }

        ],
        countryPoints: [{
                lat: 61.971234,
                long: 56.794679,
                pointText: 'Russia'
            },
            {
                lat: 59.879290,
                long: 30.444284,
                pointText: 'Russia'
            },
            {
                lat: 56.847658,
                long: 35.897066,
                pointText: 'Russia'
            },
            {
                lat: 57.121705,
                long: 37.690830,
                pointText: 'Russia'
            },
            {
                lat: 55.728230,
                long: 37.644810,
                pointText: 'Office'
            }
        ]
    },
    china: {
        countryBound: [
            [46.8, 134.6],
            [21.1, 76.8]
        ],
        contactListItems: [{
            img: './images/ava-8.png',
            topText: 'Head of Sales - China',
            bottomText: 'Grayson Liu'
        }],
        countryPoints: [{
            lat: 35.861660,
            long: 104.195396,
            pointText: 'China'
        }]
    },
    australia: {
        countryBound: [
            [-16.9, 156.3, ],
            [-45.2, 113.0]
        ],
        contactListItems: [{
            img: './images/av-1.png',
            topText: 'Head of Sales Australia, New Zealand and Oceania',
            bottomText: 'Troy Pixley'
        }],
        countryPoints: [{
            lat: -20.375527,
            long: 129.414827,
            pointText: 'Australia'
        }]
    }
}

window.addEventListener("load", function () {
    //Variables
    const form = document.querySelector('.contact-form-container');
    const formClose = document.querySelector('.contact-form-container .btn-close');
    const countysFly = document.querySelectorAll('.countrys ul li');
    let map;






    // Select Custom

    // if (exists(".select-custom")) {
    //     customSelect();
    //     const selectCoutry = document.querySelector(".select-custom select");
    //     const changeTitle = document.querySelector(".contact-ttl-row h2 .icon");
    //     selectCoutry.addEventListener("change", () => {
    //         const index = selectCoutry.value;
    //         setTimeout(() => {
    //             const parentEl = selectCoutry.parentElement;
    //             const value = parentEl.querySelector('.select-selected').innerHTML;
    //             const newElement = createCoutry(index, value);
    //             changeTitle.innerHTML = newElement;
    //         }, 1)
    //     });


    //     // Tabs
    //     if (exists(".contact-tabs-container")) {
    //         new selectSwitcher(".contact-tabs-container");
    //     }




    //     function createCoutry(image, value) {
    //         return image !== "all" ? `/ <img src="./images/flag-${image}.png"/>${value}` : null;
    //     };
    // }


    if (exists(".searchable")) {
        new selectSearch('.searchable', '.searchable .searcheble-close', '.notFound');
    }

    if (exists(".select-custom")) {
        customSelect();
    }

    //Only for Local test 
    let pos;
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition)
    }

    function showPosition(position) {
        pos = [position.coords.latitude, position.coords.longitude];
        setTimeout(function () {
            map.flyTo(pos[0], pos[1]); // NEED TO GET IP LOCATION 
        }, 1000);
    };

    //Only for Local test 


    const init = () => {
        map = WE.map('map', {
            center: [36.057944835, -112.18688965],
            zoom: 3,
            dragging: true,
            scrollWheelZoom: false
        });
        WE.tileLayer('https://api.maptiler.com/maps/positron/256/{z}/{x}/{y}.png?key=DV0Wcpnxa5xR0MwfweYz', {
            style: 'https://api.maptiler.com/maps/683bb469-f461-4f7b-a52e-ff4aad94b3fd/style.json?key=DV0Wcpnxa5xR0MwfweYz',
        }).addTo(map);
        animateToMap();
    }
    const addBounds = (bounds) => {
        map.panInsideBounds(bounds, {
            heading: 0,
            tilt: 15,
            duration: 2
        });
    }

    const animateToMap = () => {
        countysFly.forEach((item, i) => {
            const contactList = document.querySelector('.contacts-list');
            item.addEventListener('click', () => {
                let countryName = item.getAttribute('data-country');
                if (countryName) {
                    const {
                        countryBound,
                        countryPoints,
                        contactListItems
                    } = arrayOfCountrys[countryName];
                    contactList.classList.remove('active');
                    contactList.innerHTML = '';
                    deletePoints();
                    toogleActive(item);
                    countryBound && addBounds(countryBound);
                    countryPoints && countryPoints.map(point => addPoint(point.pointText, [point.lat, point.long]));
                    contactListItems && contactListItems.map(item => {
                        let newPersone = createPersones(item.img, item.topText, item.bottomText);
                        appendHtml(contactList, newPersone)
                    });
                    animatePersons();
                    closeForm();
                }
            })

        });
    }
    const animatePersons = () => {
        const contactList = document.querySelector('.contacts-list');
        const contactHelp = document.querySelector('.contact-help');
        const persone = document.querySelectorAll('.contacts-item');
        persone.forEach(item => {
            item.addEventListener('click', (e) => {
                openForm();
                item.classList.add('active');
                contactList.scroll(0, 0);
            });
        });
        setTimeout(function () {
            contactList.classList.add('active');
            contactHelp.classList.add('active');
        }, 500)
    }
    const appendHtml = (el, str) => {
        let element = document.createElement('li');
        element.innerHTML = str;
        element.classList.add('contacts-item');
        while (element.children.length > 0) {
            el.appendChild(element.children[0]);
        }
    }
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
                `
    }
    const openForm = () => {
        form.classList.add('active');
        document.body.classList.add('form-active');
    };
    const closeForm = () => {
        const persone = document.querySelectorAll('.contacts-item');
        form.classList.remove('active');
        document.body.classList.remove('form-active');
        persone.forEach(item => item.classList.remove('active'));
        map.removeMarker(51.507222, -0.1275)
    };
    const deletePoints = () => {
        const markers = document.querySelectorAll('.we-pm-icon');
        markers.forEach(item => item.parentNode.remove());
        map.da.P.O = {};
        map.da.P.m = [];
    }
    const addPoint = (text, position) => {

        let marker = WE.marker(position).addTo(map);
        marker.bindPopup(text, {
            maxWidth: 150,
            closeButton: true
        });
    }
    const clickHandle = () => {
        formClose.addEventListener('click', () => closeForm());

    }
    const toogleActive = (country) => {
        let countrys = country.parentNode.childNodes;
        countrys.forEach(item => {
            item.classList.add('not_active');
            item.classList.remove('active');
        })
        country.classList.remove('not_active');
        country.classList.add('active');
    }
    clickHandle();
    init();
});