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
    SuperSlider
} from '../super-slider';

import {
    TabSwitcher
} from '../tab-switcher';
import {
    ParallaxScroll
}
from "../parallax-scroll";
import {
    ImageCursor
} from "../image-cursor";
import {
    MediaLoader
} from "../media-loader";
window.addEventListener("load", function () {
    // Parallax Scroll
    if (exists(".screen-head")) {
        new ParallaxScroll(".screen-head", ".screen-bg", 200);
    }

    // Lazy Loader Images
    if (exists(".lazy-img")) {
        const images = document.querySelectorAll(".lazy-img");

        images.forEach(image => {
            const mediaQueryImages = [{
                    media: "screen and (min-width: 768px)",
                    src: image.dataset.bg
                },
                {
                    media: "screen and (max-width: 767px)",
                    src: image.dataset.bgmob
                }
            ];

            new MediaLoader(image, "image", mediaQueryImages);
        });
    }

    if (exists(".lazy-bg")) {
        const bgs = document.querySelectorAll(".lazy-bg");

        bgs.forEach(bg => {
            const mediaQueryBackgrounds = [{
                    media: "screen and (min-width: 768px)",
                    src: bg.dataset.bg
                },
                {
                    media: "screen and (max-width: 767px)",
                    src: bg.dataset.bgmob
                }
            ];

            new MediaLoader(bg, "background", mediaQueryBackgrounds);
        });
    }
    // Tabs
    if (exists(".sites-tabs-container")) {
        new TabSwitcher(".sites-tabs-container");
    }

    // Mission Fader
    let sitesFader = new SuperSlider(".sites-fader", "fader");
    let chartCarosuel = new SuperSlider(".chart-carosuel", "carousel", null, function (arg) {
        const index = this.slideIndex;
        // Tabs
        if (exists(".carosuel-text-inner")) {
            let elemetns = document.querySelectorAll('.sites-chart .carosuel-text-inner');
            elemetns.forEach((item, i) => {
                item.classList.remove('active', 'prevAnim', 'nextAnim');
                if (item.getAttribute('data-index') == index) {
                    item.classList.add('active');
                    arg === 'next' ? item.classList.add('nextAnim') : item.classList.add('prevAnim')
                }
            })
        }
        return;


    });


});