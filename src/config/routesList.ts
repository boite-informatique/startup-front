// this file stores the routes that will appear in the navbar for each user, if you want to add a route just change the array.
let routesByUsers = {
    admin: [
        { path: "admin", index: 0 },
        { path: "projects", index: 1 },
        // { path: "announcements", index: 2 },
        { path: "profile", index: 3 },
    ],
    student: [
        { path: "my project", index: 0 },
        // { path: "announcements", index: 1 },
        { path: "profile", index: 2 },
    ],
    teacher: [
        { path: "my project", index: 0 },
        // { path: "announcements", index: 1 },
        { path: "profile", index: 2 },
        { path: "supervised projects", index: 3 },
    ],
    sc: [
        { path: "profile", index: 0 },
        { path: "validate projects", index: 1 },
    ],
    guest: [],
};
export default routesByUsers;
