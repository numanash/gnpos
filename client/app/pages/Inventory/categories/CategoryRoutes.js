import React from 'react'
import CategoriesList from './CategoriesList';
const AddCategory = React.lazy(() => import("./AddCategory"));




export default {
    "routes": [
        { path: '/inventory/category/add', exact: true, name: 'AddCategory', component: AddCategory },
        { path: '/inventory/categories', exact: true, name: 'CategoriesList', component: CategoriesList }
    ],
    "menus": {
        name: "Categories",
        id: "categories",
        type: "collapse",
        class: "",
        children: [
            {
                name: "Add Category",
                id: "add-category",
                type: "item",
                url: "/inventory/category/add"
            },
            {
                name: "Categories List",
                id: "categories-list",
                type: "item",
                url: "/inventory/categories"
            }
        ]
    },
}