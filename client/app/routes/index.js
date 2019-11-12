import React from 'react'

const Dashboard = React.lazy(() => import("../pages/Dashboard"));

export default [
    { path: "/dashboard", exact: true, name: "Dashboard", component: Dashboard }
]