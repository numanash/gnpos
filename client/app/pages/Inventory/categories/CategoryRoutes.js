import React from "react";
import CategoriesList from "./CategoriesList";
const AddCategory = React.lazy(() => import("./AddCategory"));
const EditCategory = React.lazy(() => import("./EditCategory"));

export default {
  routes: [
    {
      path: "/inventory/category/add",
      exact: true,
      name: "AddCategory",
      component: AddCategory
    },
    {
      path: "/inventory/category/edit/:id",
      exact: true,
      name: "EditCategory",
      component: EditCategory
    },
    {
      path: "/inventory/categories",
      exact: true,
      name: "CategoriesList",
      component: CategoriesList
    }
  ],
  menus: {
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
  }
};
