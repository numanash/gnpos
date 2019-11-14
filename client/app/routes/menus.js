import ProductRoutes from "../pages/Inventory/products/ProductRoutes";

export default [
    {
        name: "Dashboard",
        icon: "fa fa-dashboard",
        id: "dashboard",
        type: "item",
        url: "/dashboard",
        class: ""
    },
    {
        name: "Inventory",
        icon: " fa fa-houzz",
        id: "inventory",
        type: "collapse",
        class: "",
        children: [
            ...ProductRoutes.menus
        ]
    },
    {
        name: "New Menu",
        icon: "fa fa-dashboard",
        id: "new-menu",
        type: "item",
        url: "/dashboard/item"
    }
]