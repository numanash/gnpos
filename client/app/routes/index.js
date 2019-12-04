import React from 'react'
import ProductRoutes from '../pages/Inventory/products/ProductRoutes';
import CategoryRoutes from '../pages/Inventory/categories/CategoryRoutes';
import SuppliersRoutes from '../pages/suppliers/SuppliersRoutes';
import SupplyRoutes from '../pages/Inventory/supplies/SupplyRoutes';

const Dashboard = React.lazy(() => import("../pages/Dashboard"));

export default [
    { path: "/dashboard", exact: true, name: "Dashboard", component: Dashboard },
    ...ProductRoutes.routes,
    ...CategoryRoutes.routes,
    ...SuppliersRoutes.routes,
    ...SupplyRoutes.routes
]