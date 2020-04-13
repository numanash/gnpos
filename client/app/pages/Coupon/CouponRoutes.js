import React from 'react';
const AddCoupon = React.lazy(() => import("./AddCoupon"));



export default {
    "routes": [
        
    ],
    "menus": {
        name: "Coupons",
        id: "coupons",
        type: "collapse",
        icon: "fa fa-gift",
        children: [
            {
                name: "Add Coupon",
                id: "add-coupon",
                type: "item",
                url: "/coupon/add"
            },
            {
                name: "Taxes List",
                id: "coupons-list",
                type: "item",
                url: "/coupons"
            }
        ]
    },
}