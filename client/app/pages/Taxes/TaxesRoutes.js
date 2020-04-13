import React from 'react';
const AddTaxes = React.lazy(() => import("./AddTaxes"));
const TaxesList = React.lazy(() => import("./TaxesList"));
const EditTaxes = React.lazy(() => import("./EditTaxes"));



export default {
    "routes": [
        { path: '/taxes', exact: true, name: 'TaxesList', component: TaxesList },
        { path: '/tax/add', exact: true, name: 'AddTaxes', component: AddTaxes },
        { path: '/tax/edit/:id', exact: true, name: 'EditTax', component: EditTaxes },
        
    ],
    "menus": {
        name: "Taxes",
        id: "taxes",
        type: "collapse",
        icon: "fa fa-calculator",
        children: [
            {
                name: "Add Tax",
                id: "add-tax",
                type: "item",
                url: "/tax/add"
            },
            {
                name: "Taxes List",
                id: "taxes-list",
                type: "item",
                url: "/taxes"
            }
        ]
    },
}