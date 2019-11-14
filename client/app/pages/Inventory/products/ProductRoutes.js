import React from 'react'
const AddProduct = React.lazy(() => import("./AddProduct"));




export default {
    "routes": [
        { path: '/inventory/product/add', exact: true, name: 'AddProduct', component: AddProduct }
    ],
    "menus": [{
        name: "Add Product",
        id: "add-product",
        type: "item",
        url: "/inventory/product/add"
    }]
}