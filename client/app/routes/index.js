import React from 'react'
import ProductRoutes from '../pages/Inventory/products/ProductRoutes';
import CategoryRoutes from '../pages/Inventory/categories/CategoryRoutes';
import SuppliersRoutes from '../pages/suppliers/SuppliersRoutes';
import SupplyRoutes from '../pages/Inventory/supplies/SupplyRoutes';
import CustomersRoutes from '../pages/customers/CustomersRoutes';
import POSRoutes from '../pages/POS/POSRoutes';

const Dashboard = React.lazy(() => import("../pages/Dashboard"));

export default [
    ...POSRoutes.routes,
    { path: "/dashboard", exact: true, name: "Dashboard", component: Dashboard },
    ...ProductRoutes.routes,
    ...CategoryRoutes.routes,
    ...SuppliersRoutes.routes,
    ...SupplyRoutes.routes,
    ...CustomersRoutes.routes,
]