import React from 'react';
const AddCustomer = React.lazy(() => import("./AddCustomer"));
const EditCustomer = React.lazy(() => import("./EditCustomer"));
const CustomersList = React.lazy(() => import("./CustomersList"));



export default {
    "routes": [
        { path: '/customer/add', exact: true, name: 'AddCustomer', component: AddCustomer },
        { path: '/customer/edit/:id', exact: true, name: 'EditCustomer', component: EditCustomer },
        { path: '/customer/list', exact: true, name: 'CustomersList', component: CustomersList },

    ],
    "menus": {
        name: "Customers",
        id: "customers",
        type: "collapse",
        icon: "fa fa-users",
        class: "",
        children: [
            {
                name: "Customers List",
                id: "customer-list",
                type: "item",
                url: "/customer/list"
            }, {
                name: "Add Customer",
                id: "add-customer",
                type: "item",
                url: "/customer/add"
            }
        ]
    },
}