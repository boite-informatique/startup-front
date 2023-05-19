// this file stores the elements that will appear in the sidebar for each user, if you want to add an element just change the array.
export const sidebarLists = {
    admin: [
        { path: "users", name: "users" },
        { path: "roles", name: "roles" },
        { path: "periods", name: "periods" },
    ],
    project: [
        { path: "", name: "general information" },
        { path: "tasks", name: "tasks" },
        { path: "soutenance", name: "defense" },
    ],
};
