import React from 'react'
const AddSupply = React.lazy(() => import("./AddSupply"));
const SuppliesList = React.lazy(() => import("./SuppliesList"));
const SupplyProductsList = React.lazy(() => import("./SupplyProductsList"));



export default {
    "routes": [
        { path: '/inventory/supply/add', exact: true, name: 'AddSupply', component: AddSupply },
        { path: '/inventory/supply/list', exact: true, name: 'SuppliesList', component: SuppliesList },
        { path: '/inventory/supply/products/list/:id', exact: true, name: 'SupplyProductsList', component: SupplyProductsList }
    ],
    "menus": {
        name: "Supplies",
        id: "supplies",
        type: "collapse",
        class: "",
        children: [
            {
                name: "Add Supply",
                id: "add-supply",
                type: "item",
                url: "/inventory/supply/add"
            },
            {
                name: "Supplies List",
                id: "supply-list",
                type: "item",
                url: "/inventory/supply/list"
            }
        ]
    },
}