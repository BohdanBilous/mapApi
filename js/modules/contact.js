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
                lat: 45.424539,
                long: -75.695914,
                allatitude: 6000000 // how far from the planet in meters
            },
            contactListItems: [{
                // Percone block
                img: "./images/av-12.png",
                topText: "Consultant",
                bottomText: "Andres Jensen",
                email:'Andres.jensen@petainer.com',
                office: false // When true must be 2 selects
            }],
            countryPoints: [{
                // List of markers
                lat: 45.424539,
                long: -75.695914,
                pointText: `
                <span data-pop-country="canada">Canada</span>
                ` // Text in marker popup
            }]
        }
    },
    {
        name: "usa-florida",
        body: {
            countryBound: {
                lat: 31.9686,
                long: -99.9018,
                allatitude: 6000000
            },
            contactListItems: [{
                    img: "./images/av-1.png",
                    topText: "President - Americas",
                    bottomText: "Chris McEwan",
                    email:'Chris.mcewan@petainer.com',
                    office: false
                }
            ],
            countryPoints: [{
                lat: 25.992076,
                long: -80.299311,
                    pointText: '<span data-pop-country="usa-florida">Florida</span>'
                }
            ]
        }
    },
    {
        name: "usa-north-east",
        body: {
            countryBound: {
                lat: -23.548468, 
                long: -46.631040,
                allatitude: 6000000
            },
            contactListItems: [
                {
                    img: "./images/av-2.png",
                    topText: "USA (North-East) Territory Manager",
                    bottomText: "Daniel Moss",
                    email:'Daniel.Moss@petainer.com',
                    office: false
                }],
            countryPoints: [  {
                lat:40.716142,
                long: -73.992048,
                pointText: '<span data-pop-country="usa-north-east">USA (North-East)</span>'
            }
            ]
        }
    },
    {
        name: "usa-mid-west",
        body: {
            countryBound: {
                lat: -23.548468, 
                long: -46.631040,
                allatitude: 6000000
            },
            contactListItems: [,
                {
                    img: "./images/av-4.png",
                    topText: "USA (Mid-West)  Territory Manager",
                    bottomText: "David Thenness",
                    email:'David.Thennes@petainer.com',
                    office: false
                },
                ],
            countryPoints: [,
                {
                    lat: 41.878236, 
                    long: -87.629799,
                    pointText: '<span data-pop-country="usa-mid-west">USA (Mid-West)</span>'
                }
            ]
        }
    },
    {
        name: "usa-south-east",
        body: {
            countryBound: {
                lat: -23.548468, 
                long: -46.631040,
                allatitude: 6000000
            },
            contactListItems: [{
                img: "./images/ava-3.png",
                topText: "USA (South-East)  Territory Manager",
                bottomText: "Kelly Thompson",
                email:'Kelly.Thompson@petainer.com',
                office: false
            },
            ],
            countryPoints: [
                {
                    lat: 30.331285,
                    long: -81.667322,
                    pointText: '<span data-pop-country="usa-south-east">USA (South-East)</span>'
                }
                
            ]
        }
    },
    {
        name: "usa-south",
        body: {
            countryBound: {
                lat: -23.548468, 
                long: -46.631040,
                allatitude: 6000000
            },
            contactListItems: [{
                img: "./images/ava-4.png",
                topText: "USA (South) Sales and Marketing Specialist ",
                bottomText: "Tammy Duhaime",
                email:'Tammy.Duhaime@petainer.com',
                office: false
            }
           ],
            countryPoints: [{
                lat: 31.9686,
                long: -99.9018,
                pointText: '<span data-pop-country="usa-south">USA (South)"</span>'
            }
            ]
        }
    },
    {
        name: "usa-west",
        body: {
            countryBound: {
                lat: 34.050888,
                long:  -118.237356,
                allatitude: 6000000
            },
            contactListItems: [ {
                img: "./images/ava-5.png",
                topText: "President - Americas",
                bottomText: "Chris McEwan",
                office: false
            }],
            countryPoints: [
                {
                    lat: 34.050888,
                    long:  -118.237356,
                    pointText: '<span data-pop-country="usa-west">USA (West)"</span>'
                }
            ]
        }
    },
    
    {
        name: "brazil",
        body: {
            countryBound: {
                lat: -23.548468, 
                long: -46.631040,
                allatitude: 6000000
            },
            contactListItems: [{
                img: "./images/av-1.png",
                topText: "General Manager Brazil",
                bottomText: "Ricardo Vieira",
                email:'Ricardo.vieira@petainer.com',
                office: false
            }],
            countryPoints: [{
                lat: -23.548468, 
                long: -46.631040,
                    pointText: '<span data-pop-country="brazil">Brazil</span>'
                }
            ]
        }
    },
    {
        name: "czech",
        body: {
            countryBound: {
                lat: 50.076334,
                long: 14.441585,
                allatitude: 600000
            },
            contactListItems: [{
                img: "./images/av-1.png",
                topText: "Sales Manager CEE",
                bottomText: "Zuzana Richterova",
                email:'zuzana.richterova@petainer.com',
                office: false
            }],
            countryPoints: [{
                lat: 50.076334,
                long: 14.441585,
                pointText: '<span data-pop-country="czech">Czech Republic</span>'
            }]
        }
    },
    {
        name: "sweden",
        body: {
            countryBound: {
                lat: 58.504078, 
                long: 13.156982,
                allatitude: 1200000
            },
            contactListItems: [{
                img: "./images/av-12.png",
                topText: "Office ",
                bottomText: "Petainer Lidkoping ",
                email:'List of contacts tbc',
                office: true
            }],
            countryPoints: [{
                lat: 58.504078, 
                long: 13.156982,
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
                img: "./images/ava-2.png",
                topText: "Head of Sales - China",
                bottomText: "Grayson Liu",
                email:'grayson.liu@petainer.com',
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
                lat: -35.307735, 
                long: 149.124969,
                allatitude: 7000000
            },
            contactListItems: [{
                img: "./images/av-1.png",
                topText: "Head of Sales Australia, New Zealand and Oceania",
                bottomText: "Troy Pixley",
                email:'troy.pixley@petainer.com',
                office: false
            }],
            countryPoints: [{
                lat: -35.307735, 
                long: 149.124969,
                pointText: '<span data-pop-country="australia">Australia</span>'
            }]
        }
    },
    {
        name: "albania",
        body: {
            countryBound: {
                lat: 41.327625, 
                long: 19.819539,
                allatitude: 7000000
            },
            contactListItems: [{
                img: "./images/av-1.png",
                topText: "Sales Director CEE",
                bottomText: "Pawel Kaleta",
                email:'kaleta.pawel@petainer.com',
                office: false
            }],
            countryPoints: [{
                lat: 41.327625, 
                long: 19.819539,
                pointText: '<span data-pop-country="albania">Albania</span>'
            }]
        }
    },


    {
        name: "argentina",
        body: {
            countryBound: {
                lat: -34.575955, 
                long: -58.418881,
                allatitude: 7000000
            },
            contactListItems: [{
                img: "./images/av-1.png",
                topText: "General Manager Brazil",
                bottomText: "Ricardo Vieira",
                email:'Ricardo.vieira@petainer.com',
                office: false
            }],
            countryPoints: [{
                lat: -34.575955, 
                long: -58.418881,
                pointText: '<span data-pop-country="argentina">Argentina</span>'
            }]
        }
    },
    {
        name: "belgium",
        body: {
            countryBound: {
                lat: 50.851053,
                long: 4.349983,
                allatitude: 7000000
            },
            contactListItems: [{
                img: "./images/av-1.png",
                topText: "Sales Director Northern Europe",
                bottomText: "Arjen Van Zurch ",
                email:'arjen.vanzurk@petainer.com',
                office: false
            }],
            countryPoints: [{
                lat: 50.851053,
                long: 4.349983,
                pointText: '<span data-pop-country="belgium">Belgium</span>'
            }]
        }
    },
    {
        name: "bosnia",
        body: {
            countryBound: {
                lat: 43.856084, 
                long: 18.412172,
                allatitude: 7000000
            },
            contactListItems: [{
                img: "./images/av-1.png",
                topText: "Sales Director CEE",
                bottomText: "Pawel Kaleta",
                email:'kaleta.pawel@petainer.com',
                office: false
            }],
            countryPoints: [{
                lat: 43.856084, 
                long: 18.412172,
                pointText: '<span data-pop-country="bosnia">Bosnia</span>'
            }]
        }
    },
    {
        name: "bulgaria",
        body: {
            countryBound: {
                lat: 42.700457,
                long:  23.320168,
                allatitude: 7000000
            },
            contactListItems: [{
                img: "./images/av-1.png",
                topText: "Sales Director CEE",
                bottomText: "Pawel Kaleta",
                email:'kaleta.pawel@petainer.com',
                office: false
            }],
            countryPoints: [{
                lat: 42.700457,
                long:  23.320168,
                pointText: '<span data-pop-country="bulgaria">Bulgaria</span>'
            }]
        }
    },
    {
        name: "caledonia",
        body: {
            countryBound: {
                lat: -22.273250, 
                long: 166.446583,
                allatitude: 7000000
            },
            contactListItems: [{
                img: "./images/av-1.png",
                topText: "Head of Sales Australia, New Zealand and Oceania",
                bottomText: "Troy Pixley",
                email:'troy.pixley@petainer.com',
                office: false
            }],
            countryPoints: [{
                lat: -22.273250, 
                long: 166.446583,
                pointText: '<span data-pop-country="caledonia">New Caledonia</span>'
            }]
        }
    },
    {
        name: "chile",
        body: {
            countryBound: {
                lat: -33.449796, 
                long: -70.669665,
                allatitude: 7000000
            },
            contactListItems: [{
                img: "./images/av-1.png",
                topText: "President - Americas",
                bottomText: "Chris McEwan",
                email:'Chris.mcewan@petainer.com',
                office: false
            }],
            countryPoints: [{
                lat: -33.449796, 
                long: -70.669665,
                pointText: '<span data-pop-country="chile">Chile</span>'

            }]
        }
    },
    {
        name: "costarica",
        body: {
            countryBound: {
                lat: 9.929525,
                long: -84.088111,
                allatitude: 7000000
            },
            contactListItems: [{
                img: "./images/av-1.png",
                topText: "President - Americas",
                bottomText: "Chris McEwan",
                email:'Chris.mcewan@petainer.com',
                office: false
            }],
            countryPoints: [{
                lat: 9.929525,
                long: -84.088111,
                pointText: '<span data-pop-country="costarica">Costa rica</span>'
            }]
        }
    },
    {
        name: "croatia",
        body: {
            countryBound: {
                lat: 45.815534,
                long: 15.981496,
                allatitude: 7000000
            },
            contactListItems: [{
                img: "./images/av-1.png",
                topText: "Sales Manager CEE",
                bottomText: "Zuzana Richterova",
                email:'zuzana.richterova@petainer.com',
                office: false
            }],
            countryPoints: [{
                lat: 45.815534,
                long: 15.981496,
                pointText: '<span data-pop-country="croatia">Croatia</span>'
            }]
        }
    },
    {
        name: "denmark",
        body: {
            countryBound: {
                lat: 55.676281, 
                long:12.569103,
                allatitude: 7000000
            },
            contactListItems: [{
                img: "./images/av-1.png",
                topText: "Business Development Director Nordics ",
                bottomText: "Helen Öjerson",
                email:'helen.ojerson@petainer.com',
                office: false
            }],
            countryPoints: [{
                lat: 55.676281, 
                long:12.569103,
                pointText: '<span data-pop-country="denmark">Denmark</span>'
            }]
        }
    },
    {
        name: "estonia",
        body: {
            countryBound: {
                lat: 59.438816, 
                long:24.751283,
                allatitude: 7000000
            },
            contactListItems: [{
                img: "./images/av-1.png",
                topText: "Sales Director CEE",
                bottomText: "Pawel Kaleta",
                email:'kaleta.pawel@petainer.com',
                office: false
            }],
            countryPoints: [{
                lat: 59.438816, 
                long:24.751283,
                pointText: '<span data-pop-country="estonia">Estonia</span>'
            }]
        }
    },
    {
        name: "finland",
        body: {
            countryBound: {
                lat: 60.170037, 
                long:24.940384,
                allatitude: 7000000
            },
            contactListItems: [{
                img: "./images/av-1.png",
                topText: "Business Development Director Nordics ",
                bottomText: "Helen Öjerson",
                email:'helen.ojerson@petainer.com',
                office: false
            }],
            countryPoints: [{
                lat: 60.170037, 
                long:24.940384,
                pointText: '<span data-pop-country="finland">Finland</span>'
            }]
        }
    },
    {
        name: "france",
        body: {
            countryBound: {
                lat: 48.869134,
                long: 2.312077,
                allatitude: 7000000
            },
            contactListItems: [{
                img: "./images/av-1.png",
                topText: "Sales Director Northern Europe",
                bottomText: "Arjen Van Zurch ",
                email:'arjen.vanzurk@petainer.com',
                office: false
            }],
            countryPoints: [{
                lat: 48.869134,
                long: 2.312077,
                pointText: '<span data-pop-country="france">France</span>'
            }]
        }
    },
    {
        name: "germany",
        body: {
            countryBound: {
                lat: 50.222551, 
                long: 11.931001,
                allatitude: 7000000
            },
            contactListItems: [{
                img: "./images/av-1.png",
                topText: "Sales Director CEE",
                bottomText: "Pawel Kaleta",
                email:'kaleta.pawel@petainer.com',
                office: false
            },
            {
                img: "./images/av-1.png",
                topText: "Key Account Manager Ref Pet",
                bottomText: "Anna Schoon ",
                email:'anna.schoon@petainer.com',
                office: false
            }
        ],
            countryPoints: [{
                lat: 51.165691,
                long: 10.451526,
                pointText: '<span data-pop-country="germany">Germany</span>'
            },
            {
                lat: 50.222551, 
                long: 11.931001,
                pointText: '<span data-pop-country="germany">Germany</span>'
            }]
        }
    },
    {
        name: "greece",
        body: {
            countryBound: {
                lat: 37.986097, 
                long: 23.730271,
                allatitude: 7000000
            },
            contactListItems: [{
                img: "./images/av-1.png",
                topText: "Sales Director CEE",
                bottomText: "Pawel Kaleta",
                email:'kaleta.pawel@petainer.com',
                office: false
            }],
            countryPoints: [{
                lat: 37.986097, 
                long: 23.730271,
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
                topText: "Sales Director CEE",
                bottomText: "Pawel Kaleta",
                email:'kaleta.pawel@petainer.com',
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
                lat: 47.497368, 
                long: 19.042406,
                allatitude: 7000000
            },
            contactListItems: [{
                img: "./images/av-1.png",
                topText: "Sales Manager CEE",
                bottomText: "Zuzana Richterova",
                email:'zuzana.richterova@petainer.com',
                office: false
            }],
            countryPoints: [{
                lat: 47.497368, 
                long: 19.042406,
                pointText: '<span data-pop-country="hungary">Hungary</span>'
            }]
        }
    },
    {
        name: "iceland",
        body: {
            countryBound: {
                lat: 64.146651, 
                long: -21.944111,
                allatitude: 7000000
            },
            contactListItems: [{
                img: "./images/av-1.png",
                topText: "Business Development Director Nordics ",
                bottomText: "Helen Öjerson",
                email:'helen.ojerson@petainer.com',
                office: false
            }],
            countryPoints: [{
                lat: 64.146651, 
                long: -21.944111,
                pointText: '<span data-pop-country="iceland">Iceland</span>'
            }]
        }
    },
    {
        name: "indonesia",
        body: {
            countryBound: {
                lat: -6.207216,
                long:  106.842562,
                allatitude: 7000000
            },
            contactListItems: [{
                img: "./images/av-1.png",
                topText: "Commercial Director Asia",
                bottomText: "Mathieu Raphat",
                email:'mathieu.raphat@petainer.com',
                office: false
            }],
            countryPoints: [{
                lat: -6.207216,
                long:  106.842562,
                pointText: '<span data-pop-country="indonesia">Indonesia</span>'
            }]
        }
    },
    {
        name: "ireland",
        body: {
            countryBound: {
                lat: 53.349580, 
                long: -6.259968,
                allatitude: 7000000
            },
            contactListItems: [{
                img: "./images/av-1.png",
                topText: "Sales Manager UK and Ireland",
                bottomText: "Phil Waters",
                email:'phil.waters@petainer.com',
                office: false
            }],
            countryPoints: [{
                lat: 53.349580, 
                long: -6.259968,
                pointText: '<span data-pop-country="ireland">Ireland</span>'
            }]
        }
    },
    {
        name: "japan",
        body: {
            countryBound: {
                lat: 35.755736,
                long:  139.761449,
                allatitude: 7000000
            },
            contactListItems: [{
                img: "./images/av-1.png",
                topText: "Commercial Director Asia",
                bottomText: "Mathieu Raphat",
                email:'mathieu.raphat@petainer.com',
                office: false
            }],
            countryPoints: [{
                lat: 35.755736,
                long:  139.761449,
                pointText: '<span data-pop-country="japan">Japan</span>'
            }]
        }
    },
    {
        name: "korea",
        body: {
            countryBound: {
                lat: 37.557397, 
                long: 126.990916,
                allatitude: 7000000
            },
            contactListItems: [{
                img: "./images/av-1.png",
                topText: "Commercial Director Asia",
                bottomText: "Mathieu Raphat",
                email:'mathieu.raphat@petainer.com',
                office: false
            }],
            countryPoints: [{
                lat: 37.557397, 
                long: 126.990916,
                pointText: '<span data-pop-country="korea">Korea</span>'
            }]
        }
    },
    {
        name: "kosovo",
        body: {
            countryBound: {
                lat: 42.664481, 
                long: 21.165937,
                allatitude: 7000000
            },
            contactListItems: [{
                img: "./images/av-1.png",
                topText: "Sales Director CEE",
                bottomText: "Pawel Kaleta",
                email:'kaleta.pawel@petainer.com',
                office: false
            }],
            countryPoints: [{
                lat: 42.664481, 
                long: 21.165937,
                pointText: '<span data-pop-country="kosovo">Kosovo</span>'
            }]
        }
    },
    {
        name: "latvia",
        body: {
            countryBound: {
                lat: 56.948559, 
                long:24.101691,
                allatitude: 7000000
            },
            contactListItems: [{
                img: "./images/av-1.png",
                topText: "Sales Director CEE",
                bottomText: "Pawel Kaleta",
                email:'kaleta.pawel@petainer.com',
                office: false
            }],
            countryPoints: [{
                lat: 56.948559, 
                long:24.101691,
                pointText: '<span data-pop-country="latvia">Latvia</span>'
            }]
        }
    },
    {
        name: "lithuania",
        body: {
            countryBound: {
                lat: 54.688979, 
                long: 25.276959,
                allatitude: 7000000
            },
            contactListItems: [{
                img: "./images/av-1.png",
                topText: "Sales Director CEE",
                bottomText: "Pawel Kaleta",
                email:'kaleta.pawel@petainer.com',
                office: false
            }],
            countryPoints: [{
                lat: 54.688979, 
                long: 25.276959,
                pointText: '<span data-pop-country="lithuania">Lithuania</span>'
            }]
        }
    },
    {
        name: "luxembourg",
        body: {
            countryBound: {
                lat: 49.611938,
                long:  6.130891,
                allatitude: 7000000
            },
            contactListItems: [{
                img: "./images/av-1.png",
                topText: "Sales Director Northern Europe",
                bottomText: "Arjen Van Zurch ",
                email:'arjen.vanzurk@petainer.com',
                office: false
            }],
            countryPoints: [{
                lat: 49.611938,
                long:  6.130891,
                pointText: '<span data-pop-country="luxembourg">Luxembourg</span>'
            }]
        }
    },
    {
        name: "macedonia",
        body: {
            countryBound: {
                lat: 42.006994,
                long: 21.442399,
                allatitude: 7000000
            },
            contactListItems: [{
                img: "./images/av-1.png",
                topText: "Sales Director CEE",
                bottomText: "Pawel Kaleta",
                email:'kaleta.pawel@petainer.com',
                office: false
            }],
            countryPoints: [{
                lat: 42.006994,
                long: 21.442399,
                pointText: '<span data-pop-country="macedonia">Macedonia</span>'
            }]
        }
    },
    {
        name: "malaysia",
        body: {
            countryBound: {
                lat:3.137818, 
                long: 101.686301,
                allatitude: 7000000
            },
            contactListItems: [{
                img: "./images/av-1.png",
                topText: "Commercial Director Asia",
                bottomText: "Mathieu Raphat",
                email:'mathieu.raphat@petainer.com',
                office: false
            }],
            countryPoints: [{
                lat:3.137818, 
                long: 101.686301,
                pointText: '<span data-pop-country="malaysia">Malaysia</span>'
            }]
        }
    },
    {
        name: "mexico",
        body: {
            countryBound: {
                lat: 19.437955, 
                long: -99.145682,
                allatitude: 7000000
            },
            contactListItems: [{
                img: "./images/av-1.png",
                topText: "President - Americas",
                bottomText: "Chris McEwan",
                email:'Chris.mcewan@petainer.com',
                office: false
            }],
            countryPoints: [{
                lat: 19.437955, 
                long: -99.145682,
                pointText: '<span data-pop-country="mexico">Mexico</span>'
            }]
        }
    },
    {
        name: "moldavia",
        body: {
            countryBound: {
                lat: 47.010851,
                long: 28.864698,
                allatitude: 7000000
            },
            contactListItems: [{
                img: "./images/av-1.png",
                topText: "Sales Director CEE",
                bottomText: "Pawel Kaleta",
                email:'kaleta.pawel@petainer.com',
                office: false
            }],
            countryPoints: [{
                lat: 47.010851,
                long: 28.864698,
                pointText: '<span data-pop-country="moldavia">Moldavia</span>'
            }]
        }
    },
    {
        name: "montenegro",
        body: {
            countryBound: {
                lat: 42.428939, 
                long:19.266863,
                allatitude: 7000000
            },
            contactListItems: [{
                img: "./images/av-1.png",
                topText: "Sales Director CEE",
                bottomText: "Pawel Kaleta",
                email:'kaleta.pawel@petainer.com',
                office: false
            }],
            countryPoints: [{
                lat: 42.428939, 
                long:19.266863,
                pointText: '<span data-pop-country="montenegro">Montenegro</span>'
            }]
        }
    },
    {
        name: "netherlands",
        body: {
            countryBound: {
                lat: 52.335302,
                long: 4.863103,
                allatitude: 7000000
            },
            contactListItems: [{
                img: "./images/av-1.png",
                topText: "Sales Director Northern Europe",
                bottomText: "Arjen Van Zurch ",
                email:'arjen.vanzurk@petainer.com',
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
                lat: 59.912719, 
                long: 10.761079,
                allatitude: 7000000
            },
            contactListItems: [{
                img: "./images/av-1.png",
                topText: "Business Development Director Nordics ",
                bottomText: "Helen Öjerson",
                email:'helen.ojerson@petainer.comf',
                office: false
            }],
            countryPoints: [{
                lat: 59.912719, 
                long: 10.761079,
                pointText: '<span data-pop-country="norway">Norway</span>'
            }]
        }
    },
    {
        name: "paraguay",
        body: {
            countryBound: {
                lat: -25.263308, 
                long: -57.580582,
                allatitude: 7000000
            },
            contactListItems: [{
                img: "./images/av-1.png",
                topText: "General Manager Brazil",
                bottomText: "Ricardo Vieira",
                email:'Ricardo.vieira@petainer.com',
                office: false
            }],
            countryPoints: [{
                lat: -25.263308, 
                long: -57.580582,
                pointText: '<span data-pop-country="paraguay">Paraguay</span>'
            }]
        }
    },
    {
        name: "poland",
        body: {
            countryBound: {
                lat: 52.231593, 
                long:21.015870,
                allatitude: 7000000
            },
            contactListItems: [{
                img: "./images/av-1.png",
                topText: "Sales Director CEE",
                bottomText: "Pawel Kaleta",
                email:'kaleta.pawel@petainer.com',
                office: false
            }],
            countryPoints: [{
                lat: 52.231593, 
                long:21.015870,
                pointText: '<span data-pop-country="poland">Poland</span>'
            }]
        }
    },
    {
        name: "portugal",
        body: {
            countryBound: {
                lat:38.721928, 
                long: -9.139433,
                allatitude: 7000000
            },
            contactListItems: [{
                img: "./images/av-1.png",
                topText: "Sales Director Northern Europe",
                bottomText: "Arjen Van Zurch ",
                email:'arjen.vanzurk@petainer.com',
                office: false
            }],
            countryPoints: [{
                lat:38.721928, 
                long: -9.139433,
                pointText: '<span data-pop-country="portugal">Portugal</span>'
            }]
        }
    },
    {
        name: "romania",
        body: {
            countryBound: {
                lat: 44.427508, 
                long: 26.101159,
                allatitude: 7000000
            },
            contactListItems: [{
                img: "./images/av-1.png",
                topText: "Sales Manager CEE",
                bottomText: "Zuzana Richterova",
                email:'zuzana.richterova@petainer.com',
                office: false
            }],
            countryPoints: [{
                lat: 44.427508, 
                long: 26.101159,
                pointText: '<span data-pop-country="romania">Romania</span>'
            }]
        }
    },
    {
        name: "serbia",
        body: {
            countryBound: {
                lat: 44.791287, 
                long: 20.454863,
                allatitude: 7000000
            },
            contactListItems: [{
                img: "./images/av-1.png",
                topText: "Sales Director CEE",
                bottomText: "Pawel Kaleta",
                email:'kaleta.pawel@petainer.com',
                office: false
            }],
            countryPoints: [{
                lat: 44.791287, 
                long: 20.454863,
                pointText: '<span data-pop-country="serbia">Serbia</span>'
            }]
        }
    },
    {
        name: "singapore",
        body: {
            countryBound: {
                lat: 1.357930,
                long:  103.863467,
                allatitude: 7000000
            },
            contactListItems: [{
                img: "./images/av-1.png",
                topText: "Commercial Director Asia",
                bottomText: "Mathieu Raphat",
                email:'mathieu.raphat@petainer.com',
                office: false
            }],
            countryPoints: [{
                lat: 1.357930,
                long:  103.863467,
                pointText: '<span data-pop-country="singapore">Singapore</span>'
            }]
        }
    },
    {
        name: "slovakia",
        body: {
            countryBound: {
                lat: 48.146692, 
                long:17.112477,
                allatitude: 7000000
            },
            contactListItems: [{
                img: "./images/av-1.png",
                topText: "Sales Manager CEE",
                bottomText: "Zuzana Richterova",
                email:'zuzana.richterova@petainer.com',
                office: false
            }],
            countryPoints: [{
                lat: 48.146692, 
                long:17.112477,
                pointText: '<span data-pop-country="slovakia">Slovakia</span>'
            }]
        }
    },
    {
        name: "slovenia",
        body: {
            countryBound: {
                lat: 46.056567, 
                long: 14.503945,
                allatitude: 7000000
            },
            contactListItems: [{
                img: "./images/av-1.png",
                topText: "Sales Manager CEE",
                bottomText: "Zuzana Richterova",
                email:'zuzana.richterova@petainer.com',
                office: false
            }],
            countryPoints: [{
                lat: 46.056567, 
                long: 14.503945,
                pointText: '<span data-pop-country="slovenia">Slovenia</span>'
            }]
        }
    },
    {
        name: "spain",
        body: {
            countryBound: {
                lat: 41.384208, 
                long: 2.176919,
                allatitude: 7000000
            },
            contactListItems: [{
                img: "./images/av-1.png",
                topText: "Sales Director Northern Europe",
                bottomText: "Arjen Van Zurch ",
                email:'arjen.vanzurk@petainer.com',
                office: false
            }],
            countryPoints: [{
                lat: 41.384208, 
                long: 2.176919,
                pointText: '<span data-pop-country="spain">Spain</span>'
            }]
        }
    },
    {
        name: "switzerland",
        body: {
            countryBound: {
                lat: 46.948103, 
                long:7.447055,
                allatitude: 7000000
            },
            contactListItems: [{
                img: "./images/av-1.png",
                topText: "Sales Director CEE",
                bottomText: "Pawel Kaleta",
                email:'kaleta.pawel@petainer.com',
                office: false
            }],
            countryPoints: [{
                lat: 46.948103, 
                long:7.447055,
                pointText: '<span data-pop-country="switzerland">Switzerland</span>'
            }]
        }
    },
    {
        name: "thailand",
        body: {
            countryBound: {
                lat: 13.754242, 
                long:100.501266,
                allatitude: 7000000
            },
            contactListItems: [{
                img: "./images/av-1.png",
                topText: "Commercial Director Asia",
                bottomText: "Mathieu Raphat",
                email:'mathieu.raphat@petainer.com',
                office: false
            }],
            countryPoints: [{
                lat: 13.754242, 
                long:100.501266,
                pointText: '<span data-pop-country="thailand">Thailand</span>'
            }]
        }
    },
    {
        name: "turkey",
        body: {
            countryBound: {
                lat: 41.013009, 
                long: 28.986080,
                allatitude: 7000000
            },
            contactListItems: [{
                img: "./images/av-1.png",
                topText: "Sales Director CEE",
                bottomText: "Pawel Kaleta",
                email:'kaleta.pawel@petainer.com',
                office: false
            }],
            countryPoints: [{
                lat: 41.013009, 
                long: 28.986080,
                pointText: '<span data-pop-country="turkey">Turkey</span>'
            }]
        }
    },
    {
        name: "uk",
        body: {
            countryBound: {
                lat: 51.526236, 
                long: -0.128970,
                allatitude: 7000000
            },
            contactListItems: [{
                img: "./images/av-1.png",
                topText: "Sales Manager UK and Ireland",
                bottomText: "Phil Waters",
                email:'phil.waters@petainer.com',
                office: false
            }],
            countryPoints: [{
                lat: 51.526236, 
                long: -0.128970,
                pointText: '<span data-pop-country="uk">UK</span>'
            }]
        }
    },
    {
        name: "ukraine",
        body: {
            countryBound: {
                lat: 50.447010, 
                long: 30.518951,
                allatitude: 7000000
            },
            contactListItems: [{
                img: "./images/av-1.png",
                topText: "Sales Director CEE",
                bottomText: "Pawel Kaleta",
                email:'kaleta.pawel@petainer.com',
                office: false
            }],
            countryPoints: [{
                lat: 50.447010, 
                long: 30.518951,
                pointText: '<span data-pop-country="ukraine">Ukraine</span>'
            }]
        }
    },
    {
        name: "uruguay",
        body: {
            countryBound: {
                lat: -34.902236, 
                long: -56.147967,
                allatitude: 7000000
            },
            contactListItems: [{
                img: "./images/av-1.png",
                topText: "General Manager Brazil",
                bottomText: "Ricardo Vieira",
                email:'Ricardo.vieira@petainer.com',
                office: false
            }],
            countryPoints: [{
                lat: -34.902236, 
                long: -56.147967,
                pointText: '<span data-pop-country="uruguay">Uruguay</span>'
            }]
        }
    },
    {
        name: "newzealand",
        body: {
            countryBound: {
                lat: -41.287123, 
                long: 174.773521,
                allatitude: 7000000
            },
            contactListItems: [{
                img: "./images/av-1.png",
                topText: "Head of Sales Australia, New Zealand and Oceania",
                bottomText: "Troy Pixley",
                email:'troy.pixley@petainer.com',
                office: false
            }],
            countryPoints: [{
                lat: -41.287123, 
                long: 174.773521,
                pointText: '<span data-pop-country="newzealand">New zealand</span>'
            }]
        }
    },
    {
        name: "paraguay",
        body: {
            countryBound: {
                lat: -25.263308, 
                long: -57.580582,
                allatitude: 7000000
            },
            contactListItems: [{
                img: "./images/av-1.png",
                topText: "General Manager Brazil",
                bottomText: "Ricardo Vieira",
                email:'Ricardo.vieira@petainer.com',
                office: false
            }],
            countryPoints: [{
                lat: -25.263308, 
                long: -57.580582,
                pointText: '<span data-pop-country="paraguay">Paraguay</span>'
            }]
        }
    },
    {
        name: "belize",
        body: {
            countryBound: {
                lat: 17.250905,
                long:  -88.758395, 
                allatitude: 7000000
            },
            contactListItems: [{
                img: "./images/av-1.png",
                topText: "General Manager Brazil",
                bottomText: "Ricardo Vieira",
                email:'Ricardo.vieira@petainer.com',
                office: false
            }],
            countryPoints: [{
                lat: 17.250905,
                long:  -88.758395, 
                pointText: '<span data-pop-country="belize">Belize</span>'
            }]
        }
    },
    {
        name: "elsalvador ",
        body: {
            countryBound: {
                lat: 13.693144, 
                long: -89.218514, 
                allatitude: 7000000
            },
            contactListItems: [{
                img: "./images/av-1.png",
                topText: "General Manager Brazil",
                bottomText: "Ricardo Vieira",
                email:'Ricardo.vieira@petainer.com',
                office: false
            }],
            countryPoints: [{
                lat: 13.693144, 
                long: -89.218514, 
                pointText: '<span data-pop-country="elsalvador">El Salvador </span>'
            }]
        }
    },
    {
        name: "guatemala",
        body: {
            countryBound: {
                lat: 14.634847,  
                long: -90.510759,
                allatitude: 7000000
            },
            contactListItems: [{
                img: "./images/av-1.png",
                topText: "General Manager Brazil",
                bottomText: "Ricardo Vieira",
                email:'Ricardo.vieira@petainer.com',
                office: false
            }],
            countryPoints: [{
                lat: 14.634847,  
                long: -90.510759,
                pointText: '<span data-pop-country="guatemala">Guatemala</span>'
            }]
        }
    },
    {
        name: "honduras",
        body: {
            countryBound: {
                lat: 14.065431, 
                long: -87.170298, 
                allatitude: 7000000
            },
            contactListItems: [{
                img: "./images/av-1.png",
                topText: "General Manager Brazil",
                bottomText: "Ricardo Vieira",
                email:'Ricardo.vieira@petainer.com',
                office: false
            }],
            countryPoints: [{
                lat: 14.065431, 
                long: -87.170298, 
                pointText: '<span data-pop-country="honduras">Honduras</span>'
            }]
        }
    },
    {
        name: "nicaragua",
        body: {
            countryBound: {
                lat: 12.113763,  
                long: -86.233744,
                allatitude: 7000000
            },
            contactListItems: [{
                img: "./images/av-1.png",
                topText: "General Manager Brazil",
                bottomText: "Ricardo Vieira",
                email:'Ricardo.vieira@petainer.com',
                office: false
            }],
            countryPoints: [{
                lat: 12.113763,  
                long: -86.233744,
                pointText: '<span data-pop-country="nicaragua">Nicaragua</span>'
            }]
        }
    },
    {
        name: "panama",
        body: {
            countryBound: {
                lat: 8.985772,
                long: -79.514944, 
                allatitude: 7000000
            },
            contactListItems: [{
                img: "./images/av-1.png",
                topText: "General Manager Brazil",
                bottomText: "Ricardo Vieira",
                email:'Ricardo.vieira@petainer.com',
                office: false
            }],
            countryPoints: [{
                lat: 8.985772,
                long: -79.514944, 
                pointText: '<span data-pop-country="panama">Panama</span>'
            }]
        }
    },
    {
        name: "bolivia",
        body: {
            countryBound: {
                lat: -19.035252, 
                long:-65.258419, 
                allatitude: 7000000
            },
            contactListItems: [{
                img: "./images/av-1.png",
                topText: "General Manager Brazil",
                bottomText: "Ricardo Vieira",
                email:'Ricardo.vieira@petainer.com',
                office: false
            }],
            countryPoints: [{
                lat: -19.035252, 
                long:-65.258419, 
                pointText: '<span data-pop-country="bolivia">Bolivia</span>'
            }]
        }
    },
    {
        name: "colombia",
        body: {
            countryBound: {
                lat: 4.713982, 
                long: -74.077604, 
                allatitude: 7000000
            },
            contactListItems: [{
                img: "./images/av-1.png",
                topText: "General Manager Brazil",
                bottomText: "Ricardo Vieira",
                email:'Ricardo.vieira@petainer.com',
                office: false
            }],
            countryPoints: [{
                lat: 4.713982, 
                long: -74.077604, 
                pointText: '<span data-pop-country="colombia">Colombia</span>'
            }]
        }
    },
    {
        name: "ecuador",
        body: {
            countryBound: {
                lat: -0.180414, 
                long: -78.468313, 
                allatitude: 7000000
            },
            contactListItems: [{
                img: "./images/av-1.png",
                topText: "General Manager Brazil",
                bottomText: "Ricardo Vieira",
                email:'Ricardo.vieira@petainer.com',
                office: false
            }],
            countryPoints: [{
                lat: -0.180414, 
                long: -78.468313, 
                pointText: '<span data-pop-country="ecuador">Ecuador</span>'
            }]
        }
    },
    {
        name: "guyana",
        body: {
            countryBound: {
                lat: 6.807741, 
                long:-58.146899, 
                allatitude: 7000000
            },
            contactListItems: [{
                img: "./images/av-1.png",
                topText: "General Manager Brazil",
                bottomText: "Ricardo Vieira",
                email:'Ricardo.vieira@petainer.com',
                office: false
            }],
            countryPoints: [{
                lat: 6.807741, 
                long:-58.146899, 
                pointText: '<span data-pop-country="guyana">Guyana</span>'
            }]
        }
    },
    {
        name: "peru",
        body: {
            countryBound: {
                lat: -12.045407, 
                long: -77.046153, 
                allatitude: 7000000
            },
            contactListItems: [{
                img: "./images/av-1.png",
                topText: "General Manager Brazil",
                bottomText: "Ricardo Vieira",
                email:'Ricardo.vieira@petainer.com',
                office: false
            }],
            countryPoints: [{
                lat: -12.045407, 
                long: -77.046153, 
                pointText: '<span data-pop-country="peru">Peru</span>'
            }]
        }
    },
    {
        name: "venezuela",
        body: {
            countryBound: {
                lat: 10.482226,  
                long: -66.896548,
                allatitude: 7000000
            },
            contactListItems: [{
                img: "./images/av-1.png",
                topText: "General Manager Brazil",
                bottomText: "Ricardo Vieira",
                email:'Ricardo.vieira@petainer.com',
                office: false
            }],
            countryPoints: [{
                lat: 10.482226,  
                long: -66.896548,
                pointText: '<span data-pop-country="venezuela">Venezuela</span>'
            }]
        }
    },
    {
        name: "italy",
        body: {
            countryBound: {
                lat: 41.901570,  
                long: 12.491536, 
                allatitude: 7000000
            },
            contactListItems: [{
                img: "./images/av-1.png",
                topText: "Sales Manager ",
                bottomText: "Phil Waters",
                email:'phil.waters@petainer.com',
                office: false
            }],
            countryPoints: [{
                lat: 41.901570,  
                long: 12.491536, 
                pointText: '<span data-pop-country="italy">Italy</span>'
            }]
        }
    },
    {
        name: "austria",
        body: {
            countryBound: {
                lat: 48.208768, 
                long: 16.369072,  
                allatitude: 7000000
            },
            contactListItems: [{
                img: "./images/av-1.png",
                topText: "Sales Director CEE",
                bottomText: "Pawel Kaleta",
                email:'kaleta.pawel@petainer.com',
                office: false
            }],
            countryPoints: [{
                lat: 48.208768, 
                long: 16.369072,  
                pointText: '<span data-pop-country="austria">Austria</span>'
            }]
        }
    },
    {
        name: "philippines",
        body: {
            countryBound: {
                lat: 14.600980, 
                long: 120.986989,  
                allatitude: 7000000
            },
            contactListItems: [{
                img: "./images/av-1.png",
                topText: "Commercial Director Asia",
                bottomText: "Mathieu Raphat",
                email:'mathieu.raphat@petainer.com',
                office: false
            }],
            countryPoints: [{
                lat: 14.600980, 
                long: 120.986989,  
                pointText: '<span data-pop-country="philippines">Philippines</span>'
            }]
        }
    },
    {
        name: "vietnam",
        body: {
            countryBound: {
                lat: 21.029857,
                long:  105.832542,  
                allatitude: 7000000
            },
            contactListItems: [{
                img: "./images/av-1.png",
                topText: "Commercial Director Asia",
                bottomText: "Mathieu Raphat",
                email:'mathieu.raphat@petainer.com',
                office: false
            }],
            countryPoints: [{
                lat: 21.029857,
                long:  105.832542,  
                pointText: '<span data-pop-country="vietnam">Vietnam</span>'
            }]
        }
    },
    {
        name: "india",
        body: {
            countryBound: {
                lat: 28.619232, 
                long: 77.213103,  
                allatitude: 7000000
            },
            contactListItems: [{
                img: "./images/av-1.png",
                topText: "Commercial Director Asia",
                bottomText: "Mathieu Raphat",
                email:'mathieu.raphat@petainer.com',
                office: false
            }],
            countryPoints: [{
                lat: 28.619232, 
                long: 77.213103,  
                pointText: '<span data-pop-country="india">India</span>'
            }]
        }
    },
    {
        name: "laos",
        body: {
            countryBound: {
                lat: 17.981001,  
                long:  102.634259,
                allatitude: 7000000
            },
            contactListItems: [{
                img: "./images/av-1.png",
                topText: "Commercial Director Asia",
                bottomText: "Mathieu Raphat",
                email:'mathieu.raphat@petainer.com',
                office: false
            }],
            countryPoints: [{
                lat: 17.981001,  
                long:  102.634259,
                pointText: '<span data-pop-country="laos">Laos</span>'
            }]
        }
    },
    {
        name: "srilanka",
        body: {
            countryBound: {
                lat: 6.927120,  
                long:  79.861011,
                allatitude: 7000000
            },
            contactListItems: [{
                img: "./images/av-1.png",
                topText: "Commercial Director Asia",
                bottomText: "Mathieu Raphat",
                email:'mathieu.raphat@petainer.com',
                office: false
            }],
            countryPoints: [{
                lat: 6.927120,  
                long:  79.861011,
                pointText: '<span data-pop-country="srilanka">Sri Lanka</span>'
            }]
        }
    },
    {
        name: "myanmar",
        body: {
            countryBound: {
                lat: 19.764286, 
                long: 96.078710,  
                allatitude: 7000000
            },
            contactListItems: [{
                img: "./images/av-1.png",
                topText: "Commercial Director Asia",
                bottomText: "Mathieu Raphat",
                email:'mathieu.raphat@petainer.com',
                office: false
            }],
            countryPoints: [{
                lat: 19.764286, 
                long: 96.078710,  
                pointText: '<span data-pop-country="myanmar">Myanmar</span>'
            }]
        }
    },
    {
        name: "taiwan",
        body: {
            countryBound: {
                lat: 25.042047,  
                long:121.565421, 
                allatitude: 7000000
            },
            contactListItems: [{
                img: "./images/av-1.png",
                topText: "Commercial Director Asia",
                bottomText: "Mathieu Raphat",
                email:'mathieu.raphat@petainer.com',
                office: false
            }],
            countryPoints: [{
                lat: 25.042047,  
                long:121.565421,
                pointText: '<span data-pop-country="taiwan">Taiwan</span>'
            }]
        }
    },
    {
        name: "cambodia",
        body: {
            countryBound: {
                lat: 11.555786, 
                long: 104.932063,  
                allatitude: 7000000
            },
            contactListItems: [{
                img: "./images/av-1.png",
                topText: "Commercial Director Asia",
                bottomText: "Mathieu Raphat",
                email:'mathieu.raphat@petainer.com',
                office: false
            }],
            countryPoints: [{
                lat: 11.555786, 
                long: 104.932063,  
                pointText: '<span data-pop-country="cambodia">Cambodia</span>'
            }]
        }
    },
    {
        name: "southafrica",
        body: {
            countryBound: {
                lat: -33.925477, 
                long: 18.404719,  
                allatitude: 7000000
            },
            contactListItems: [{
                img: "./images/av-1.png",
                topText: "Sales Manager",
                bottomText: "Phil Waters",
                email:'phil.waters@petainer.com',
                office: false
            }],
            countryPoints: [{
                lat: -33.925477, 
                long: 18.404719,  
                pointText: '<span data-pop-country="southafrica">South Africa</span>'
            }]
        }
    },
    {
        name: "caribbean",
        body: {
            countryBound: {
                lat: 23.151931, 
                long: -82.348143, 
                allatitude: 7000000
            },
            contactListItems: [{
                img: "./images/av-1.png",
                topText: "President - Americas",
                bottomText: "Chris McEwan",
                email:'Chris.mcewan@petainer.com',
                office: false
            }],
            countryPoints: [{
                lat: 23.151931, 
                long: -82.348143, 
                pointText: '<span data-pop-country="caribbean">Caribbean</span>'
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
    let dotsInitial = [];
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
                        createPersones(item.img, item.topText, item.bottomText,item.email)
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
    const createPersones = (img, top, bottom,email) => {
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
        document.querySelector('.select-custom.aditional-question').querySelector('select').addEventListener('change', function () {
            const additionalInput = document.querySelector('.additional-input');
            if (this.value == 'Other') {
                additionalInput.classList.add('active');
            } else {
                additionalInput.classList.remove('active');
                additionalInput.querySelector('input').value = "";
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
            inputExist.type = '';
            inputExist.type = 'file';
            label.querySelector("span").innerHTML = "Attach file";
        });
    });

    init();
    clickHandle();
    dotsTrigger();
    scrollXHorizontal(".scroll-x-block");

    if (navigator.userAgent.indexOf('Safari') != -1 && 
    navigator.userAgent.indexOf('Chrome') == -1) {
        document.body.className += " safari";
    }
});

