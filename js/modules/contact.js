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
                pointText: `
                <span data-pop-country="canada">Canada</span>
                ` // Text in marker popup
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
                    pointText: '<span data-pop-country="usa">Florida</span>'
                },
                {
                    lat: 21.4691,
                    long: -78.6569,
                    pointText: '<span data-pop-country="usa">Caribbean</span>'
                },
                {
                    lat: 40.7128,
                    long: -74.006,
                    pointText: '<span data-pop-country="usa">USA (North-East)</span>'
                },
                {
                    lat: 42.3148,
                    long: -85.6024,
                    pointText: '<span data-pop-country="usa">USA (Mid-West)</span>'
                },
                {
                    lat: 40.4173,
                    long: -82.9071,
                    pointText: '<span data-pop-country="usa">USA (South-East)</span>'
                },
                {
                    lat: 31.9686,
                    long: -99.9018,
                    pointText: '<span data-pop-country="usa">USA (South)"</span>'
                },
                {
                    lat: 36.7783,
                    long: -119.4179,
                    pointText: '<span data-pop-country="usa">USA (West)"</span>'
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
                    pointText: '<span data-pop-country="brazil">Brazil</span>'
                },
                {
                    lat: -34.920345,
                    long: -57.969559,
                    pointText: '<span data-pop-country="brazil">Brazil</span>'
                },
                {
                    lat: -32.522778,
                    long: -55.765835,
                    pointText: '<span data-pop-country="brazil">Brazil</span>'
                },
                {
                    lat: -23.442503,
                    long: -58.443832,
                    pointText: '<span data-pop-country="brazil">Brazil</span>'
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
                pointText: '<span data-pop-country="czechrepublic">Czech Republic</span>'
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
                pointText: '<span data-pop-country="sweden">Sweden</span>'
            }]
        }
    },
    {
        name: "russia",
        body: {
            countryBound: {
                lat: 63.920473,
                long: 78.801193,
                allatitude: 8200000
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
                    pointText: '<span data-pop-country="russia">Russia</span>'
                },
                {
                    lat: 59.87929,
                    long: 30.444284,
                    pointText: '<span data-pop-country="russia">Russia</span>'
                },
                {
                    lat: 56.847658,
                    long: 35.897066,
                    pointText: '<span data-pop-country="russia">Russia</span>'
                },
                {
                    lat: 57.121705,
                    long: 37.69083,
                    pointText: '<span data-pop-country="russia">Russia</span>'
                },
                {
                    lat: 55.72823,
                    long: 37.64481,
                    pointText: '<span data-pop-country="russia">Office</span>'
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
                pointText: '<span data-pop-country="china">China</span>'
            }]
        }
    },
    {
        name: "australia",
        body: {
            countryBound: {
                lat: -33.856159,
                long: 151.215256,
                allatitude: 7000000
            },
            contactListItems: [{
                img: "./images/av-1.png",
                topText: "Head of Sales Australia, New Zealand and Oceania",
                bottomText: "Troy Pixley",
                office: false
            }],
            countryPoints: [{
                lat: -33.856159,
                long: 151.215256,
                pointText: '<span data-pop-country="australia">Australia</span>'
            }]
        }
    },
    {
        name: "albania",
        body: {
            countryBound: {
                lat: 41.153332,
                long: 20.168331,
                allatitude: 7000000
            },
            contactListItems: [{
                img: "./images/av-1.png",
                topText: "Maneger",
                bottomText: "Troy Pixley",
                office: false
            }],
            countryPoints: [{
                lat: 41.153332,
                long: 20.168331,
                pointText: '<span data-pop-country="albania">Albania</span>'
            }]
        }
    },


    {
        name: "argentina",
        body: {
            countryBound: {
                lat: -38.416096,
                long: -63.616673,
                allatitude: 7000000
            },
            contactListItems: [{
                img: "./images/av-1.png",
                topText: "Maneger",
                bottomText: "Troy Pixley",
                office: false
            }],
            countryPoints: [{
                lat: -38.416096,
                long: -63.616673,
                pointText: '<span data-pop-country="argentina">Argentina</span>'
            }]
        }
    },
    {
        name: "belgium",
        body: {
            countryBound: {
                lat: 50.503887,
                long: 4.469936,
                allatitude: 7000000
            },
            contactListItems: [{
                img: "./images/av-1.png",
                topText: "Maneger",
                bottomText: "Troy Pixley",
                office: false
            }],
            countryPoints: [{
                lat: 50.503887,
                long: 4.469936,
                pointText: '<span data-pop-country="belgium">Belgium</span>'
            }]
        }
    },
    {
        name: "bosnia",
        body: {
            countryBound: {
                lat: 43.858181,
                long: 18.412340,
                allatitude: 7000000
            },
            contactListItems: [{
                img: "./images/av-1.png",
                topText: "Maneger",
                bottomText: "Troy Pixley",
                office: false
            }],
            countryPoints: [{
                lat: 43.858181,
                long: 18.412340,
                pointText: '<span data-pop-country="bosnia">Bosnia</span>'
            }]
        }
    },
    {
        name: "bulgaria",
        body: {
            countryBound: {
                lat: 42.733883,
                long: 25.485830,
                allatitude: 7000000
            },
            contactListItems: [{
                img: "./images/av-1.png",
                topText: "Maneger",
                bottomText: "Troy Pixley",
                office: false
            }],
            countryPoints: [{
                lat: 42.733883,
                long: 25.485830,
                pointText: '<span data-pop-country="bulgaria">Bulgaria</span>'
            }]
        }
    },
    {
        name: "cee",
        body: {
            countryBound: {
                lat: 42.955410,
                long: -9.189750,
                allatitude: 7000000
            },
            contactListItems: [{
                img: "./images/av-1.png",
                topText: "Maneger",
                bottomText: "Troy Pixley",
                office: false
            }],
            countryPoints: [{
                lat: 42.955410,
                long: -9.189750,
                pointText: '<span data-pop-country="cee">Cee</span>'
            }]
        }
    },
    {
        name: "caledonia",
        body: {
            countryBound: {
                lat: -22.262529,
                long: 166.444275,
                allatitude: 7000000
            },
            contactListItems: [{
                img: "./images/av-1.png",
                topText: "Maneger",
                bottomText: "Troy Pixley",
                office: false
            }],
            countryPoints: [{
                lat: -22.262529,
                long: 166.444275,
                pointText: '<span data-pop-country="caledonia">Caledonia</span>'
            }]
        }
    },
    {
        name: "chile",
        body: {
            countryBound: {
                lat: -35.675148,
                long: -71.542969,
                allatitude: 7000000
            },
            contactListItems: [{
                img: "./images/av-1.png",
                topText: "Maneger",
                bottomText: "Troy Pixley",
                office: false
            }],
            countryPoints: [{
                lat: -35.675148,
                long: -71.542969,
                pointText: '<span data-pop-country="chile">Chile</span>'

            }]
        }
    },
    {
        name: "costarica",
        body: {
            countryBound: {
                lat: 9.748917,
                long: -83.753426,
                allatitude: 7000000
            },
            contactListItems: [{
                img: "./images/av-1.png",
                topText: "Maneger",
                bottomText: "Troy Pixley",
                office: false
            }],
            countryPoints: [{
                lat: 9.748917,
                long: -83.753426,
                pointText: '<span data-pop-country="costarica">Costa rica</span>'
            }]
        }
    },
    {
        name: "croatia",
        body: {
            countryBound: {
                lat: 45.099998,
                long: 15.2,
                allatitude: 7000000
            },
            contactListItems: [{
                img: "./images/av-1.png",
                topText: "Maneger",
                bottomText: "Troy Pixley",
                office: false
            }],
            countryPoints: [{
                lat: 45.099998,
                long: 15.2,
                pointText: '<span data-pop-country="croatia">Croatia</span>'
            }]
        }
    },
    {
        name: "denmark",
        body: {
            countryBound: {
                lat: 56.263920,
                long: 9.501785,
                allatitude: 7000000
            },
            contactListItems: [{
                img: "./images/av-1.png",
                topText: "Maneger",
                bottomText: "Troy Pixley",
                office: false
            }],
            countryPoints: [{
                lat: 56.263920,
                long: 9.501785,
                pointText: '<span data-pop-country="denmark">Denmark</span>'
            }]
        }
    },
    {
        name: "estonia",
        body: {
            countryBound: {
                lat: 58.595272,
                long: 25.013607,
                allatitude: 7000000
            },
            contactListItems: [{
                img: "./images/av-1.png",
                topText: "Maneger",
                bottomText: "Troy Pixley",
                office: false
            }],
            countryPoints: [{
                lat: 58.595272,
                long: 25.013607,
                pointText: '<span data-pop-country="estonia">Estonia</span>'
            }]
        }
    },
    {
        name: "finland",
        body: {
            countryBound: {
                lat: 61.924110,
                long: 25.748152,
                allatitude: 7000000
            },
            contactListItems: [{
                img: "./images/av-1.png",
                topText: "Maneger",
                bottomText: "Troy Pixley",
                office: false
            }],
            countryPoints: [{
                lat: 61.924110,
                long: 25.748152,
                pointText: '<span data-pop-country="finland">Finland</span>'
            }]
        }
    },
    {
        name: "france",
        body: {
            countryBound: {
                lat: 46.227638,
                long: 2.213749,
                allatitude: 7000000
            },
            contactListItems: [{
                img: "./images/av-1.png",
                topText: "Maneger",
                bottomText: "Troy Pixley",
                office: false
            }],
            countryPoints: [{
                lat: 46.227638,
                long: 2.213749,
                pointText: '<span data-pop-country="france">France</span>'
            }]
        }
    },
    {
        name: "germany",
        body: {
            countryBound: {
                lat: 51.165691,
                long: 10.451526,
                allatitude: 7000000
            },
            contactListItems: [{
                img: "./images/av-1.png",
                topText: "Maneger",
                bottomText: "Troy Pixley",
                office: false
            }],
            countryPoints: [{
                lat: 51.165691,
                long: 10.451526,
                pointText: '<span data-pop-country="germany">Germany</span>'
            }]
        }
    },
    {
        name: "greece",
        body: {
            countryBound: {
                lat: 39.074207,
                long: 21.824312,
                allatitude: 7000000
            },
            contactListItems: [{
                img: "./images/av-1.png",
                topText: "Maneger",
                bottomText: "Troy Pixley",
                office: false
            }],
            countryPoints: [{
                lat: 39.074207,
                long: 21.824312,
                pointText: '<span data-pop-country="greece">Greece</span>'
            }]
        }
    },
    {
        name: "herzegovina",
        body: {
            countryBound: {
                lat: 43.858181,
                long: 18.412340,
                allatitude: 7000000
            },
            contactListItems: [{
                img: "./images/av-1.png",
                topText: "Maneger",
                bottomText: "Troy Pixley",
                office: false
            }],
            countryPoints: [{
                lat: 43.858181,
                long: 18.412340,
                pointText: '<span data-pop-country="herzegovina">Herzegovina</span>'
            }]
        }
    },
    {
        name: "hungary",
        body: {
            countryBound: {
                lat: 47.162495,
                long: 19.503304,
                allatitude: 7000000
            },
            contactListItems: [{
                img: "./images/av-1.png",
                topText: "Maneger",
                bottomText: "Troy Pixley",
                office: false
            }],
            countryPoints: [{
                lat: 47.162495,
                long: 19.503304,
                pointText: '<span data-pop-country="hungary">Hungary</span>'
            }]
        }
    },
    {
        name: "iceland",
        body: {
            countryBound: {
                lat: 64.963051,
                long: -19.020836,
                allatitude: 7000000
            },
            contactListItems: [{
                img: "./images/av-1.png",
                topText: "Maneger",
                bottomText: "Troy Pixley",
                office: false
            }],
            countryPoints: [{
                lat: 64.963051,
                long: -19.020836,
                pointText: '<span data-pop-country="iceland">Iceland</span>'
            }]
        }
    },
    {
        name: "indonesia",
        body: {
            countryBound: {
                lat: -0.789275,
                long: 113.921326,
                allatitude: 7000000
            },
            contactListItems: [{
                img: "./images/av-1.png",
                topText: "Maneger",
                bottomText: "Troy Pixley",
                office: false
            }],
            countryPoints: [{
                lat: -0.789275,
                long: 113.921326,
                pointText: '<span data-pop-country="indonesia">Indonesia</span>'
            }]
        }
    },
    {
        name: "ireland",
        body: {
            countryBound: {
                lat: 53.412910,
                long: -8.243890,
                allatitude: 7000000
            },
            contactListItems: [{
                img: "./images/av-1.png",
                topText: "Maneger",
                bottomText: "Troy Pixley",
                office: false
            }],
            countryPoints: [{
                lat: 53.412910,
                long: -8.243890,
                pointText: '<span data-pop-country="ireland">Ireland</span>'
            }]
        }
    },
    {
        name: "japan",
        body: {
            countryBound: {
                lat: 36.204823,
                long: 138.252930,
                allatitude: 7000000
            },
            contactListItems: [{
                img: "./images/av-1.png",
                topText: "Maneger",
                bottomText: "Troy Pixley",
                office: false
            }],
            countryPoints: [{
                lat: 36.204823,
                long: 138.252930,
                pointText: '<span data-pop-country="japan">Japan</span>'
            }]
        }
    },
    {
        name: "korea",
        body: {
            countryBound: {
                lat: 37.663998,
                long: 127.978462,
                allatitude: 7000000
            },
            contactListItems: [{
                img: "./images/av-1.png",
                topText: "Maneger",
                bottomText: "Troy Pixley",
                office: false
            }],
            countryPoints: [{
                lat: 37.663998,
                long: 127.978462,
                pointText: '<span data-pop-country="korea">Korea</span>'
            }]
        }
    },
    {
        name: "kosovo",
        body: {
            countryBound: {
                lat: 42.602634,
                long: 20.902977,
                allatitude: 7000000
            },
            contactListItems: [{
                img: "./images/av-1.png",
                topText: "Maneger",
                bottomText: "Troy Pixley",
                office: false
            }],
            countryPoints: [{
                lat: 42.602634,
                long: 20.902977,
                pointText: '<span data-pop-country="kosovo">Kosovo</span>'
            }]
        }
    },
    {
        name: "latvia",
        body: {
            countryBound: {
                lat: 56.879635,
                long: 24.603189,
                allatitude: 7000000
            },
            contactListItems: [{
                img: "./images/av-1.png",
                topText: "Maneger",
                bottomText: "Troy Pixley",
                office: false
            }],
            countryPoints: [{
                lat: 56.879635,
                long: 24.603189,
                pointText: '<span data-pop-country="latvia">Latvia</span>'
            }]
        }
    },
    {
        name: "lithuania",
        body: {
            countryBound: {
                lat: 55.169437,
                long: 23.881275,
                allatitude: 7000000
            },
            contactListItems: [{
                img: "./images/av-1.png",
                topText: "Maneger",
                bottomText: "Troy Pixley",
                office: false
            }],
            countryPoints: [{
                lat: 55.169437,
                long: 23.881275,
                pointText: '<span data-pop-country="lithuania">Lithuania</span>'
            }]
        }
    },
    {
        name: "luxembourg",
        body: {
            countryBound: {
                lat: 49.815273,
                long: 6.129583,
                allatitude: 7000000
            },
            contactListItems: [{
                img: "./images/av-1.png",
                topText: "Maneger",
                bottomText: "Troy Pixley",
                office: false
            }],
            countryPoints: [{
                lat: 49.815273,
                long: 6.129583,
                pointText: '<span data-pop-country="luxembourg">Luxembourg</span>'
            }]
        }
    },
    {
        name: "macedonia",
        body: {
            countryBound: {
                lat: 41.608635,
                long: 21.745275,
                allatitude: 7000000
            },
            contactListItems: [{
                img: "./images/av-1.png",
                topText: "Maneger",
                bottomText: "Troy Pixley",
                office: false
            }],
            countryPoints: [{
                lat: 41.608635,
                long: 21.745275,
                pointText: '<span data-pop-country="macedonia">Macedonia</span>'
            }]
        }
    },
    {
        name: "malaysia",
        body: {
            countryBound: {
                lat: 4.2105,
                long: 101.9758,
                allatitude: 7000000
            },
            contactListItems: [{
                img: "./images/av-1.png",
                topText: "Maneger",
                bottomText: "Troy Pixley",
                office: false
            }],
            countryPoints: [{
                lat: 4.2105,
                long: 101.9758,
                pointText: '<span data-pop-country="malaysia">Malaysia</span>'
            }]
        }
    },
    {
        name: "mexico",
        body: {
            countryBound: {
                lat: 19.400000,
                long: -98.988892,
                allatitude: 7000000
            },
            contactListItems: [{
                img: "./images/av-1.png",
                topText: "Maneger",
                bottomText: "Troy Pixley",
                office: false
            }],
            countryPoints: [{
                lat: 19.400000,
                long: -98.988892,
                pointText: '<span data-pop-country="mexico">Mexico</span>'
            }]
        }
    },
    {
        name: "moldavia",
        body: {
            countryBound: {
                lat: 47.003670,
                long: 28.907089,
                allatitude: 7000000
            },
            contactListItems: [{
                img: "./images/av-1.png",
                topText: "Maneger",
                bottomText: "Troy Pixley",
                office: false
            }],
            countryPoints: [{
                lat: 47.003670,
                long: 28.907089,
                pointText: '<span data-pop-country="moldavia">Moldavia</span>'
            }]
        }
    },
    {
        name: "montenegro",
        body: {
            countryBound: {
                lat: 42.099998,
                long: 19.1,
                allatitude: 7000000
            },
            contactListItems: [{
                img: "./images/av-1.png",
                topText: "Maneger",
                bottomText: "Troy Pixley",
                office: false
            }],
            countryPoints: [{
                lat: 42.099998,
                long: 19.1,
                pointText: '<span data-pop-country="montenegro">Montenegro</span>'
            }]
        }
    },
    {
        name: "netherlands",
        body: {
            countryBound: {
                lat: 52.379189,
                long: 4.899431,
                allatitude: 7000000
            },
            contactListItems: [{
                img: "./images/av-1.png",
                topText: "Maneger",
                bottomText: "Troy Pixley",
                office: false
            }],
            countryPoints: [{
                lat: 52.379189,
                long: 4.899431,
                pointText: '<span data-pop-country="netherlands">Netherlands</span>'
            }]
        }
    },
    {
        name: "norway",
        body: {
            countryBound: {
                lat: 59.911491,
                long: 10.757933,
                allatitude: 7000000
            },
            contactListItems: [{
                img: "./images/av-1.png",
                topText: "Maneger",
                bottomText: "Troy Pixley",
                office: false
            }],
            countryPoints: [{
                lat: 59.911491,
                long: 10.757933,
                pointText: '<span data-pop-country="norway">Norway</span>'
            }]
        }
    },
    {
        name: "paraguay",
        body: {
            countryBound: {
                lat: -25.513475,
                long: -54.615440,
                allatitude: 7000000
            },
            contactListItems: [{
                img: "./images/av-1.png",
                topText: "Maneger",
                bottomText: "Troy Pixley",
                office: false
            }],
            countryPoints: [{
                lat: -25.513475,
                long: -54.615440,
                pointText: '<span data-pop-country="paraguay">Paraguay</span>'
            }]
        }
    },
    {
        name: "poland",
        body: {
            countryBound: {
                lat: 52.237049,
                long: 21.017532,
                allatitude: 7000000
            },
            contactListItems: [{
                img: "./images/av-1.png",
                topText: "Maneger",
                bottomText: "Troy Pixley",
                office: false
            }],
            countryPoints: [{
                lat: 52.237049,
                long: 21.017532,
                pointText: '<span data-pop-country="poland">Poland</span>'
            }]
        }
    },
    {
        name: "portugal",
        body: {
            countryBound: {
                lat: 38.736946,
                long: -9.142685,
                allatitude: 7000000
            },
            contactListItems: [{
                img: "./images/av-1.png",
                topText: "Maneger",
                bottomText: "Troy Pixley",
                office: false
            }],
            countryPoints: [{
                lat: 38.736946,
                long: -9.142685,
                pointText: '<span data-pop-country="portugal">Portugal</span>'
            }]
        }
    },
    {
        name: "romania",
        body: {
            countryBound: {
                lat: 44.439663,
                long: 26.096306,
                allatitude: 7000000
            },
            contactListItems: [{
                img: "./images/av-1.png",
                topText: "Maneger",
                bottomText: "Troy Pixley",
                office: false
            }],
            countryPoints: [{
                lat: 44.439663,
                long: 26.096306,
                pointText: '<span data-pop-country="romania">Romania</span>'
            }]
        }
    },
    {
        name: "serbia",
        body: {
            countryBound: {
                lat: 44.787197,
                long: 20.457273,
                allatitude: 7000000
            },
            contactListItems: [{
                img: "./images/av-1.png",
                topText: "Maneger",
                bottomText: "Troy Pixley",
                office: false
            }],
            countryPoints: [{
                lat: 44.787197,
                long: 20.457273,
                pointText: '<span data-pop-country="serbia">Serbia</span>'
            }]
        }
    },
    {
        name: "singapore",
        body: {
            countryBound: {
                lat: 1.290270,
                long: 103.851959,
                allatitude: 7000000
            },
            contactListItems: [{
                img: "./images/av-1.png",
                topText: "Maneger",
                bottomText: "Troy Pixley",
                office: false
            }],
            countryPoints: [{
                lat: 1.290270,
                long: 103.851959,
                pointText: '<span data-pop-country="singapore">Singapore</span>'
            }]
        }
    },
    {
        name: "slovakia",
        body: {
            countryBound: {
                lat: 48.148598,
                long: 17.107748,
                allatitude: 7000000
            },
            contactListItems: [{
                img: "./images/av-1.png",
                topText: "Maneger",
                bottomText: "Troy Pixley",
                office: false
            }],
            countryPoints: [{
                lat: 48.148598,
                long: 17.107748,
                pointText: '<span data-pop-country="slovakia">Slovakia</span>'
            }]
        }
    },
    {
        name: "slovenia",
        body: {
            countryBound: {
                lat: 46.056946,
                long: 14.505751,
                allatitude: 7000000
            },
            contactListItems: [{
                img: "./images/av-1.png",
                topText: "Maneger",
                bottomText: "Troy Pixley",
                office: false
            }],
            countryPoints: [{
                lat: 46.056946,
                long: 14.505751,
                pointText: '<span data-pop-country="slovenia">Slovenia</span>'
            }]
        }
    },
    {
        name: "spain",
        body: {
            countryBound: {
                lat: 40.416775,
                long: -3.703790,
                allatitude: 7000000
            },
            contactListItems: [{
                img: "./images/av-1.png",
                topText: "Maneger",
                bottomText: "Troy Pixley",
                office: false
            }],
            countryPoints: [{
                lat: 40.416775,
                long: -3.703790,
                pointText: '<span data-pop-country="spain">Spain</span>'
            }]
        }
    },
    {
        name: "switzerland",
        body: {
            countryBound: {
                lat: 46.204391,
                long: 6.143158,
                allatitude: 7000000
            },
            contactListItems: [{
                img: "./images/av-1.png",
                topText: "Maneger",
                bottomText: "Troy Pixley",
                office: false
            }],
            countryPoints: [{
                lat: 46.204391,
                long: 6.143158,
                pointText: '<span data-pop-country="switzerland">Switzerland</span>'
            }]
        }
    },
    {
        name: "thailand",
        body: {
            countryBound: {
                lat: 13.736717,
                long: 100.523186,
                allatitude: 7000000
            },
            contactListItems: [{
                img: "./images/av-1.png",
                topText: "Maneger",
                bottomText: "Troy Pixley",
                office: false
            }],
            countryPoints: [{
                lat: 13.736717,
                long: 100.523186,
                pointText: '<span data-pop-country="thailand">Thailand</span>'
            }]
        }
    },
    {
        name: "turkey",
        body: {
            countryBound: {
                lat: 41.015137,
                long: 28.979530,
                allatitude: 7000000
            },
            contactListItems: [{
                img: "./images/av-1.png",
                topText: "Maneger",
                bottomText: "Troy Pixley",
                office: false
            }],
            countryPoints: [{
                lat: 41.015137,
                long: 28.979530,
                pointText: '<span data-pop-country="turkey">Turkey</span>'
            }]
        }
    },
    {
        name: "uk",
        body: {
            countryBound: {
                lat: 51.509865,
                long: -0.118092,
                allatitude: 7000000
            },
            contactListItems: [{
                img: "./images/av-1.png",
                topText: "Maneger",
                bottomText: "Troy Pixley",
                office: false
            }],
            countryPoints: [{
                lat: 51.509865,
                long: -0.118092,
                pointText: '<span data-pop-country="uk">UK</span>'
            }]
        }
    },
    {
        name: "ukraine",
        body: {
            countryBound: {
                lat: 50.446945,
                long: 30.539722,
                allatitude: 7000000
            },
            contactListItems: [{
                img: "./images/av-1.png",
                topText: "Maneger",
                bottomText: "Troy Pixley",
                office: false
            }],
            countryPoints: [{
                lat: 50.446945,
                long: 30.539722,
                pointText: '<span data-pop-country="ukraine">Ukraine</span>'
            }]
        }
    },
    {
        name: "uruguay",
        body: {
            countryBound: {
                lat: -34.901112,
                long: -56.164532,
                allatitude: 7000000
            },
            contactListItems: [{
                img: "./images/av-1.png",
                topText: "Maneger",
                bottomText: "Troy Pixley",
                office: false
            }],
            countryPoints: [{
                lat: -34.901112,
                long: -56.164532,
                pointText: '<span data-pop-country="uruguay">Uruguay</span>'
            }]
        }
    },
    {
        name: "newzealand",
        body: {
            countryBound: {
                lat: -36.848461,
                long: 174.763336,
                allatitude: 7000000
            },
            contactListItems: [{
                img: "./images/av-1.png",
                topText: "Maneger",
                bottomText: "Troy Pixley",
                office: false
            }],
            countryPoints: [{
                lat: -36.848461,
                long: 174.763336,
                pointText: '<span data-pop-country="newzealand">New zealand</span>'
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
            countryPoints && countryPoints.map(point => {
                addPoint(point.pointText, [point.lat, point.long])
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

            markersList.map(item => {
                item.on("click", e => {
                    markersList.map(item => item.element.classList.remove('mainPopup'));
                    item.element.classList.add('mainPopup');
                    markersList.map(items => {
                        items.closePopup();
                    });
                    item.openPopup();
                });
                item.element.querySelector('.we-pp-close').addEventListener('click', function (e) {
                    e.stopPropagation();
                    item.closePopup();
                })
            });

        }
    }

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
        contactList.classList.remove('off-scroll');
        // contactInput.parentNode.classList.remove("with-icon");
        // contactInput.value = "";
    };

    // Hide all persones
    const closePersones = () => {
        const contactList = document.querySelector(".contacts-list");
        contactList.classList.remove("active");
        contactList.classList.remove('off-scroll');
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
        contactInput.addEventListener('click', () => {
            function fireEvents() {
                return new Promise(function (resolve, reject) {
                    inputContact.parentNode.parentNode.classList.add('active-mob-p');
                    inputContact.parentNode.classList.add('active-mob');
                    resolve();
                });
            }

            function second() {
                setTimeout((function () {
                    pageHeader.scrollIntoView();
                }), 200);
                setTimeout((function () {
                    pageHeader.scrollIntoView();
                }), 300);
                setTimeout((function () {
                    pageHeader.scrollIntoView();
                }), 400);
                setTimeout((function () {
                    pageHeader.scrollIntoView();
                }), 500);
            }
            var userAgent = window.navigator.userAgent;
            if (userAgent.match(/iPad/i) || userAgent.match(/iPhone/i)) {
                fireEvents().then(second);
            }
        });
        contactInput.addEventListener("click", (e) => {
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
        document.querySelectorAll('.select-custom')[0].querySelector('select').addEventListener('change', function () {
            console.log(this.value)
            if (this.value == 'Other') {
                document.querySelector('.additional-input').classList.add('active');
            }else{
                document.querySelector('.additional-input').classList.remove('active');
            }
        })

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
    }

    //Toogle Popups
    const tooglPopUpList = () => {
        markersList.map(item => {
            item.on("click", e => {
                markersList.map(item => item.element.classList.remove('mainPopup'));
                let textMarker = item.element.querySelector('.we-pp-wrapper .we-pp-content').childNodes[0].getAttribute('data-pop-country');
                textMarker = textMarker.toLowerCase();
                // deletePoints();
                mainFunc(textMarker, textMarker);
                item.element.classList.add('mainPopup');
                markersList.map(items => {
                    items.closePopup();
                });

                item.openPopup();
            });
            item.element.querySelector('.we-pp-close').addEventListener('click', function (e) {
                e.stopPropagation();
                item.closePopup();
            })
        });
    }

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
            removeData = input.querySelector('.attach-close');
        inputExist.addEventListener("change", function (e) {
            if (e.target.files[0])
                label.querySelector("span").innerHTML = e.target.files[0].name;
        });
        removeData.addEventListener("click", function (e) {
            e.stopPropagation();
            inputExist.value = "";
            if (!/safari/i.test(navigator.userAgent)) {
                inputExist.type = ''
                inputExist.type = 'file'
            }
            label.querySelector("span").innerHTML = "Attach file";
        });
    });

    init();
    clickHandle();
    dotsTrigger();
    scrollXHorizontal(".scroll-x-block");
});