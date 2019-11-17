import React from 'react'
import CategoriesList from './CategoriesList';
const AddCategory = React.lazy(() => import("./AddCategory"));




export default {
    "routes": [
        { path: '/inventory/category/add', exact: true, name: 'AddCategory', component: AddCategory },
        { path: '/inventory/categories', exact: true, name: 'CategoriesList', component: CategoriesList }
    ],
    "menus": [{
        name: "Add Category",
        id: "add-category",
        type: "item",
        url: "/inventory/category/add"
    }]
}