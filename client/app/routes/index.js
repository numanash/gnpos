import React from 'react'
import ProductRoutes from '../pages/Inventory/products/ProductRoutes';

const Dashboard = React.lazy(() => import("../pages/Dashboard"));

export default [
    { path: "/dashboard", exact: true, name: "Dashboard", component: Dashboard },
    ...ProductRoutes.routes
]