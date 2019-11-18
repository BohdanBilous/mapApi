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
    selectSwitcher
} from '../select-switch';

window.addEventListener("load", function () {
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






    var map;

    function init() {
        map = WE.map('map', {
            center: [36.057944835, -112.18688965],
            zoom: 0,
            dragging: true,
            scrollWheelZoom: true
        });

        var baselayer = WE.tileLayer('https://webglearth.github.io/webglearth2-offline/{z}/{x}/{y}.jpg', {
            tileSize: 256,
            bounds: [
                [-85, -180],
                [85, 180]
            ],
            minZoom: 0,
            maxZoom: 16,
            attribution: 'WebGLEarth example',
            tms: true
        }).addTo(map);

        //Add TileJSON layer
        var json = {
            "profile": "mercator",
            "name": "Grand Canyon USGS",
            "format": "png",
            "bounds": [-112.26379395, 35.98245136, -112.10998535, 36.13343831],
            "minzoom": 10,
            "version": "1.0.0",
            "maxzoom": 16,
            "center": [-112.18688965, 36.057944835, 13],
            "type": "overlay",
            "description": "",
            "basename": "grandcanyon",
            "tilejson": "2.0.0",
            "sheme": "xyz",
            "tiles": ["http://tileserver.maptiler.com/cassini-terrestrial/{z}/{x}/{y}.jpg'"]
        };
        var grandcanyon = WE.tileLayerJSON(json);
        grandcanyon.addTo(map);

        grandcanyon.setOpacity(0.7);
        document.getElementById('opacity2').addEventListener('change', function (e) {
            grandcanyon.setOpacity(e.target.value);
        });
        WE.marker([json.center[1], json.center[0]]).addTo(map);


        //Print coordinates of the mouse
        map.on('mousemove', function (e) {
            document.getElementById('coords').innerHTML = e.latlng.lat + ', ' + e.latlng.lng;
        });
    }


    function setZoom(zoom) {
        map.setZoom(zoom);
    }

    function getZoomLevel() {
        alert('Current zoom is: ' + Math.round(map.getZoom()));
    }

    function setPositionToEverest() {
        map.setView([27.988056, 86.925278]);
    }

    function getCurrentCenter() {
        alert(map.getCenter());
    }

    function flyToJapan() {
        map.fitBounds([
            [22, 122],
            [48, 154]
        ]);
        map.panInsideBounds([
            [22, 122],
            [48, 154]
        ], {
            heading: 90,
            tilt: 25,
            duration: 1
        });
    }

    function panTo(coords) {
        map.panTo(coords);
    }


    const countysFly = document.querySelectorAll('.countrys ul li');

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
    ]
    countysFly.forEach((item, i) => {
        item.addEventListener('click', () => {
            let lat = item.getAttribute('data-lat');
            let long = item.getAttribute('data-long');
            map.panInsideBounds(arrayOfBoundys[i], {
                heading: 0,
                tilt: 15, 
                duration: 2
            });
            // map.setView([lat,long],1)
            var marker = WE.marker([lat, long]).addTo(map);
            marker.bindPopup("<b>Hello world!</b><br>I am a popup.<br /><span style='font-size:10px;color:#999'>Tip: Another popup is hidden in Cairo..</span>", {
                maxWidth: 150,
                closeButton: true
            }).openPopup();
        })
    });


    init();
});