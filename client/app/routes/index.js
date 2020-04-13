import React from 'react'
import ProductRoutes from '../pages/Inventory/products/ProductRoutes';
import CategoryRoutes from '../pages/Inventory/categories/CategoryRoutes';
import SuppliersRoutes from '../pages/suppliers/SuppliersRoutes';
import SupplyRoutes from '../pages/Inventory/supplies/SupplyRoutes';
import CustomersRoutes from '../pages/customers/CustomersRoutes';
import POSRoutes from '../pages/POS/POSRoutes';
import OrdersRoutes from '../pages/Orders/OrdersRoutes';
import ReportsRoutes from '../pages/Reports/ReportsRoutes';
import TaxesRoutes from '../pages/Taxes/TaxesRoutes';

const Dashboard = React.lazy(() => import("../pages/Dashboard"));

export default [
    ...POSRoutes.routes,
    { path: "/dashboard", exact: true, name: "Dashboard", component: Dashboard },
    ...OrdersRoutes.routes,
    ...ProductRoutes.routes,
    ...CategoryRoutes.routes,
    ...SuppliersRoutes.routes,
    ...SupplyRoutes.routes,
    ...CustomersRoutes.routes,
    ...ReportsRoutes.routes,
    ...TaxesRoutes.routes
]