import React from 'react'
const AddProduct = React.lazy(() => import("./AddProduct"));
const EditProduct = React.lazy(() => import("./EditProduct"));
const ProductsList = React.lazy(() => import("./ProductsList"));






export default {
    "routes": [
        { path: '/inventory/product/add', exact: true, name: 'AddProduct', component: AddProduct },
        { path: '/inventory/product/edit/:id', exact: true, name: 'EditProduct', component: EditProduct },
        { path: '/inventory/product/list', exact: true, name: 'ProductList', component: ProductsList }

    ],
    "menus": {
        name: "Products",
        id: "products",
        type: "collapse",
        class: "",
        children: [
            {
                name: "Add Product",
                id: "add-product",
                type: "item",
                url: "/inventory/product/add"
            },
            {
                name: "Product List",
                id: "product-list",
                type: "item",
                url: "/inventory/product/list"
            }
        ]
    },
}