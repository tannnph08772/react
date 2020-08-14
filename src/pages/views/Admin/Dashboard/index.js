import React, { useState, useEffect } from "react";
import axios from "axios";
import {Link} from "react-router-dom";

const Dashboard = () => {
    const [products, setProduct] = useState([]);
    useEffect(() => {
        loadProducts();
        window.scrollTo(0,0)
    }, []);
    const loadProducts = async () => {
        const result = await axios.get("http://localhost:8080/products");
        setProduct(result.data.reverse());
    };

    //cate
    const [categories, setCategory] = useState([]);

    useEffect(() => {
        loadCategory();
            window.scrollTo(0,0)
    }, []);

    const loadCategory = async () => {
        const result = await axios.get("http://localhost:8080/categories");
        setCategory(result.data.reverse());
    };
    // cate blog
    const [cateblogs, setCateBlog] = useState([]);
    useEffect(() => {
        loadCateBlog();
            window.scrollTo(0,0)
    }, []);
    const loadCateBlog = async () => {
        const result = await axios.get("http://localhost:8080/cateblogs");
        setCateBlog(result.data.reverse());
    };
    //blog
    const [blogs, setBlog] = useState([]);
    useEffect(() => {
        loadBlog();
            window.scrollTo(0,0)
    }, []);
    const loadBlog = async () => {
        const result = await axios.get("http://localhost:8080/blogs");
        setBlog(result.data.reverse());
    };

    return (
        <div className="row">
            {/* Earnings (Monthly) Card Example */}
            <div className="col-xl-3 col-md-6 mb-4">
                <div className="card border-left-primary shadow h-100 py-2">
                    <div className="card-body">
                        <div className="row no-gutters align-items-center">
                            <div className="col mr-2">
                                <div className="text-xs font-weight-bold text-primary text-uppercase"><Link to="/admin/products">Products</Link></div>
                                <div className="h5 mb-0 font-weight-bold text-gray-800">Số lượng: {products.length}</div>
                            </div>
                            <div className="col-auto">
                                <i className="fas fa-calendar fa-2x text-gray-300" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* Earnings (Monthly) Card Example */}
            <div className="col-xl-3 col-md-6 mb-4">
                <div className="card border-left-success shadow h-100 py-2">
                    <div className="card-body">
                        <div className="row no-gutters align-items-center">
                            <div className="col mr-2">
                                <div className="text-xs font-weight-bold text-success text-uppercase"><Link to="/admin/categories">Category</Link></div>
                                <div className="h5 mb-0 font-weight-bold text-gray-800">Số lượng: {categories.length}</div>
                            </div>
                            <div className="col-auto">
                                <i className="fas fa-dollar-sign fa-2x text-gray-300" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="col-xl-3 col-md-6 mb-4">
                <div className="card border-left-success shadow h-100 py-2">
                    <div className="card-body">
                        <div className="row no-gutters align-items-center">
                            <div className="col mr-2">
                                <div className="text-xs font-weight-bold text-success text-uppercase"><Link to="/admin/cateblogs">CateBlog</Link></div>
                                <div className="h5 mb-0 font-weight-bold text-gray-800">Số lượng: {cateblogs.length}</div>
                            </div>
                            <div className="col-auto">
                                <i className="fas fa-dollar-sign fa-2x text-gray-300" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="col-xl-3 col-md-6 mb-4">
                <div className="card border-left-success shadow h-100 py-2">
                    <div className="card-body">
                        <div className="row no-gutters align-items-center">
                            <div className="col mr-2">
                                <div className="text-xs font-weight-bold text-success text-uppercase"><Link to="/admin/blogs">Blog</Link></div>
                                <div className="h5 mb-0 font-weight-bold text-gray-800">Số lượng: {blogs.length}</div>
                            </div>
                            <div className="col-auto">
                                <i className="fas fa-dollar-sign fa-2x text-gray-300" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

Dashboard.propTypes = {

}

export default Dashboard
