import http from "./axiosHttp";

const getAll = () => {
    return http.get("/products");
};

const get = id => {
    return http.get(`/products/${id}`);
};

const create = data => {
    return http.post("/products", data);
};

const update = (id, data) => {
    return http.put(`/products/${id}`, data);
};

const remove = id => {
    console.log(id);
    return http.delete(`/products/${id}`);
};


export default {
    getAll,
    get,
    create,
    update,
    remove,
};