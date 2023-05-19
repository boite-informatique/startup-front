// this file stores the elements that will appear in the sidebar for each user, if you want to add an element just change the array.
let elementsByUsers = {
    admin: [
        { path: "users", index: 0 },
        { path: "roles", index: 1 },
        { path: "periods", index: 2 },
    ],
    student: [
        { path: "student1", index: 0 },
        { path: "student2", index: 1 },
        { path: "student3", index: 2 },
    ],
    teacher: [
        { path: "teacher1", index: 0 },
        { path: "teacher2", index: 1 },
        { path: "teacher3", index: 2 },
    ],
};
export default elementsByUsers;
