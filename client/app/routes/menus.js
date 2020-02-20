import ProductRoutes from "../pages/Inventory/products/ProductRoutes";
import CategoryRoutes from "../pages/Inventory/categories/CategoryRoutes";
import SuppliersRoutes from "../pages/suppliers/SuppliersRoutes";
import SupplyRoutes from "../pages/Inventory/supplies/SupplyRoutes";
import CustomersRoutes from "../pages/customers/CustomersRoutes";
import POSRoutes from "../pages/POS/POSRoutes";
import OrdersRoutes from "../pages/Orders/OrdersRoutes";
import ReportsRoutes from "../pages/Reports/ReportsRoutes";

export default [
    POSRoutes.menus,
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
            ProductRoutes.menus,
            CategoryRoutes.menus,
            SupplyRoutes.menus,
        ]
    },
    OrdersRoutes.menus,
    SuppliersRoutes.menus,
    CustomersRoutes.menus,
    ReportsRoutes.menus
]