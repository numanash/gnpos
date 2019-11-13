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
        name: "Main Menu",
        icon: "fa fa-gift",
        id: "main-menu2s",
        type: "collapse",
        class: "",
        children: [
            {
                name: "Categories",
                id: "categories",
                type: "item",
                url: "/dashboard/categories"
            },
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