import React from 'react';
const AddSupply = React.lazy(() => import("./AddSupply"));
const SuppliesList = React.lazy(() => import("./SuppliesList"));
const SupplyProductsList = React.lazy(() => import("./SupplyProductsList"));
const EditSupplyProduct = React.lazy(() => import("./EditSupplyProduct"));
const EditSupply = React.lazy(() => import("./EditSupply"));


export default {
    "routes": [
        { path: '/inventory/supply/add', exact: true, name: 'AddSupply', component: AddSupply },
        { path: '/inventory/supply/list', exact: true, name: 'SuppliesList', component: SuppliesList },
        { path: '/inventory/supply/products/list/:id', exact: true, name: 'SupplyProductsList', component: SupplyProductsList },
        { path: '/inventory/supply/products/edit/:id', exact: true, name: 'EditSupplyProduct', component: EditSupplyProduct },
        { path: '/inventory/supply/edit/:id', exact: true, name: 'EditSupply', component: EditSupply }
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