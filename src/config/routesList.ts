// this file stores the routes that will appear in the navbar for each user, if you want to add a route just change the array.
let routesByUsers = {
    admin: [
        { path: "admin", name: "admin" },
        { path: "profile", name: "profile" },
        { path: "referential", name: "referential" },
    ],
    student: [
        { path: "projects?type=my", name: "my project" },
        { path: "announcements", name: "announcements" },
        { path: "profile", name: "profile" },
    ],
    teacher: [
        { path: "projects?type=my", name: "my projects" },
        { path: "projects?type=supervisor", name: "supervised projects" },
        { path: "projects?type=jury", name: "planned soutenances" },
        { path: "announcements", name: "announcements" },
        { path: "profile", name: "profile" },
    ],
    sc: [
        { path: "profile", name: "profile" },
        { path: "projects?type=sc", name: "submitted projects" }, // to validate
    ],
    rs: [
        { path: "projects?type=rs", name: "submitted projects" }, // to plan soutenance
        { path: "profile", name: "profile" },
    ],
    guest: [],
};
export default routesByUsers;
