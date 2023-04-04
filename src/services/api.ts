import axios from "axios";

const baseURL = import.meta.env.VITE_baseURL;

// Create an instance of axios to use the same base url.
const axiosAPI = axios.create({
    baseURL: baseURL,
});

const apiRequest = (method, url, body, params?) => {
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
        params,
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

// function to execute the http get request with query parameters
const getWithQuery = (url, params) => {
    return apiRequest("get", url, {}, params); // passed {} for body because usually get requests don't have a body
};

// function to execute the http delete request
const deleteRequest = (url) => apiRequest("delete", url, {}); // passed {} for body because usually delete requests don't have a body

// function to execute the http post request
const post = (url, body) => apiRequest("post", url, body);

// function to execute the http put request
const put = (url, body) => apiRequest("put", url, body);

// function to execute the http patch request
const patch = (url, body) => apiRequest("patch", url, body);

// making an axios interceptor to return all responses (including error responses)
axiosAPI.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        return error.response;
    }
);

// expose your method to other services or actions
const api = {
    get,
    getWithQuery,
    delete: deleteRequest,
    post,
    put,
    patch,
};

export default api;
