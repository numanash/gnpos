import React from 'react';
const BestSales = React.lazy(() => import("./BestSales"));
const SalesReport = React.lazy(() => import("./SalesReport"));



export default {
    "routes": [
        { path: '/best-sales', exact: true, name: 'BestSales', component: BestSales },
        { path: '/sales', exact: true, name: 'SalesReport', component: SalesReport },
    ],
    "menus": {
        name: "Reports",
        id: "reports",
        type: "collapse",
        icon: "fa fa-shopping-cart",
        children: [
            {
                name: "Best Sales",
                id: "best-sales",
                type: "item",
                url: "/best-sales"
            },
            {
                name: "Sales Reports",
                id: "sales-reports",
                type: "item",
                url: "/sales"
            }
        ]
    },
}