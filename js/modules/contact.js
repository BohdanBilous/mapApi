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
const arrayOfBoundys = [
    [
        [33, -53.59],
        [58.32, -140.9]
    ],
    [
        [23, -71.59],
        [44.32, -123]
    ],
    [
        [-3.38, -31.94],
        [-29.6, -70.43]
    ],
    [
        [46.0536, 18.8568],
        [43.5877, 12.0782]
    ],
    [
        [64.83, 23.83],
        [50.08, 11.91]
    ],
    [
        [70.1, -164.3],
        [20.5, 49.5]
    ],
    [
        [46.8, 134.6],
        [21.1, 76.8]
    ],
    [
        [-16.9, 156.3, ],
        [-45.2, 113.0]
    ]
];
window.addEventListener("load", function () {
    //Variables
    const form = document.querySelector('.contact-form-container');
    const formClose = document.querySelector('.contact-form-container .btn-close');
    const countysFly = document.querySelectorAll('.countrys ul li');
    let map;


    const openForm = () => form.classList.add('active');
    const closeForm = () => form.classList.remove('active');

    // Select Custom

    if (exists(".select-custom")) {
        customSelect();
        const selectCoutry = document.querySelector(".select-custom select");
        const changeTitle = document.querySelector(".contact-ttl-row h2 .icon");
        selectCoutry.addEventListener("change", () => {
            const index = selectCoutry.value;
            setTimeout(() => {
                const parentEl = selectCoutry.parentElement;
                const value = parentEl.querySelector('.select-selected').innerHTML;
                const newElement = createCoutry(index, value);
                changeTitle.innerHTML = newElement;
            }, 1)
        });


        // Tabs
        if (exists(".contact-tabs-container")) {
            new selectSwitcher(".contact-tabs-container");
        }




        function createCoutry(image, value) {
            return image !== "all" ? `/ <img src="./images/flag-${image}.png"/>${value}` : null;
        };
    }


    if (exists(".searchable")) {
        new selectSearch('.searchable', '.searchable .searcheble-close', '.notFound');
    }

    if (exists(".select-custom")) {
        customSelect();
    }


    const init = () => {
        map = WE.map('map', {
            center: [36.057944835, -112.18688965],
            zoom: 3,
            dragging: true,
            scrollWheelZoom: true
        });

        WE.tileLayer('https://api.maptiler.com/maps/positron/256/{z}/{x}/{y}.png?key=DV0Wcpnxa5xR0MwfweYz', {
            style: 'https://api.maptiler.com/maps/683bb469-f461-4f7b-a52e-ff4aad94b3fd/style.json?key=DV0Wcpnxa5xR0MwfweYz',
        }).addTo(map);
        animateToMap();
        addBounds(arrayOfBoundys[0]);
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
            const persone = document.querySelectorAll('.contacts-item')[0];
            item.addEventListener('click', () => {
                let lat = item.getAttribute('data-lat');
                let long = item.getAttribute('data-long');
                toogleActive(item);
                addBounds(arrayOfBoundys[i]);
                addPoint(`<b>${item.querySelector('span').innerHTML}</b>`, [lat, long])
                persone.classList.add('active');
            })
            persone.addEventListener('click', () => openForm());
        });
    }

    const deletePoints = () => {
        const markers = document.querySelectorAll('.we-pm-icon');
        markers.forEach(item => item.parentNode.remove());
    }
    const addPoint = (text, position) => {
        deletePoints();
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
            item.classList.add('not-active');
            item.classList.remove('active');
        })
        country.classList.remove('not-active');
        country.classList.add('active');
    }
    clickHandle();
    init();
});