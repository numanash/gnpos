import ProductRoutes from "../pages/Inventory/products/ProductRoutes";
import CategoryRoutes from "../pages/Inventory/categories/CategoryRoutes";

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
        icon: "fa fa-houzz",
        id: "inventory",
        type: "collapse",
        class: "",
        children: [
            ...ProductRoutes.menus,
            CategoryRoutes.menus
        ]
    }
]