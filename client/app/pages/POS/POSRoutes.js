import React from 'react';
const PointOfSale = React.lazy(() => import("."));



export default {
    "routes": [
        { path: '/pos', exact: true, name: 'PointOfSale', component: PointOfSale }
    ],
    "menus": {
        name: "PointOfSale",
        id: "pos",
        type: "item",
        icon: "fa fa-th-large",
        url: "/pos",
        class: ""

    },
}