import React from 'react';
const OrdersList = React.lazy(() => import("./OrdersList"));



export default {
    "routes": [
        { path: '/orders', exact: true, name: 'SuppliersList', component: OrdersList },
    ],
    "menus": {
        name: "Orders",
        id: "orders",
        type: "collapse",
        icon: "fa fa-shopping-cart",
        children: [
            {
                name: "Orders List",
                id: "orders-list",
                type: "item",
                url: "/orders"
            }
        ]
    },
}