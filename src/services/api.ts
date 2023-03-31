import axios from "axios";

// Create an instance of axios to use the same base url.
const axiosAPI = axios.create({
    baseURL: "http://localhost:3001/",
});

const apiRequest = (method, url, body) => {
    // get authorization token from localstorage
    let token = localStorage.getItem("token");

    // get it from sessionStorage if not found in localStorage
    if (!token) {
        token = sessionStorage.getItem("token");
    }

    const headers = {
        authorization: token ? `Bearer ${token}` : "",
    };

    // using the axios instance to perform the request
    return axiosAPI({
        method,
        url,
        data: body,
        headers,
    })
        .then((res) => {
            return Promise.resolve(res);
        })
        .catch((err) => {
            return Promise.reject(err);
        });
};

// function to execute the http get request
const get = (url) => apiRequest("get", url, {}); // passed {} for body because usually get requests don't have a body

// function to execute the http delete request
const deleteRequest = (url) => apiRequest("delete", url, {}); // passed {} for body because usually delete requests don't have a body

// function to execute the http post request
const post = (url, body) => apiRequest("post", url, body);

// function to execute the http put request
const put = (url, body) => apiRequest("put", url, body);

// function to execute the http patch request
const patch = (url, body) => apiRequest("patch", url, body);

// expose your method to other services or actions
const api = {
    get,
    delete: deleteRequest,
    post,
    put,
    patch,
};

export default api;
