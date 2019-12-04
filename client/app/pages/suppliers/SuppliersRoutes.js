import React from 'react';
const AddSupplier = React.lazy(() => import("./AddSupplier"));
const SuppliersList = React.lazy(() => import("./SuppliersList"));



export default {
    "routes": [
        { path: '/suppliers', exact: true, name: 'SuppliersList', component: SuppliersList },
        { path: '/supplier/add', exact: true, name: 'AddSupplier', component: AddSupplier }
    ],
    "menus": {
        name: "Suppliers",
        id: "suppliers",
        type: "collapse",
        icon: "fa fa-truck",
        children: [
            {
                name: "Add Supplier",
                id: "add-supplier",
                type: "item",
                url: "/supplier/add"
            },
            {
                name: "Suppliers List",
                id: "suppliers-list",
                type: "item",
                url: "/suppliers"
            }
        ]
    },
}