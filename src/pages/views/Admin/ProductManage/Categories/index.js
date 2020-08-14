import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import swal from 'sweetalert';

const Category = () => {
    const [categories, setCategory] = useState([]);

    useEffect(() => {
        loadCategory();
            window.scrollTo(0,0)
    }, []);

    const loadCategory = async () => {
        const result = await axios.get("http://localhost:8080/categories");
        setCategory(result.data.reverse());
    };

    const [products, setProduct] = useState([]);

    useEffect(() => {
        loadProducts();
         window.scrollTo(0,0)
    }, []);

    const loadProducts = async () => {
        const result = await axios.get("http://localhost:8080/products");
        setProduct(result.data.reverse());
    };

    const deleteCate = async id => {
        const willDelete = await swal({
            title: "Are you sure?",
            cancelButtonColor: "red",
            icon: "warning",
            dangerMode: true,
          });
           
          if (willDelete) {
            await axios.delete(`http://localhost:8080/categories/${id}`);
            swal("Deleted!", "Your imaginary file has been deleted!", "success");
            loadCategory();
        }  
    };
    return (
        <div>
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h1 className="h3 mb-2 text-gray-800">Quản lý danh mục sản phẩm</h1>
                <Link to="/admin/category/add" className="btn btn-primary">Thêm Danh mục</Link>
            </div>
            <div className="card shadow mb-4">
                <div className="card-body">
                    <div className="table-responsive">
                        <table class="table table-bordered table-striped text-center shadow">
                            <thead class="thead-dark">
                                <tr>
                                    <th scope="col">#</th>
                                    <th scope="col">Cate Name</th>
                                    <th scope="col">Image</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {categories.map(({id,cate_name,image}, index) => (
                                    <tr>
                                        <th scope="row">{index + 1}</th>
                                        <td>{cate_name}</td>
                                        <td><img className="img-thumbnail" width="100px" src={image}/></td>
                                        <td>
                                        <Link
                                                class="btn btn-outline-primary mr-2"
                                                to={`/admin/category/${id}`}
                                            >
                                                Edit
                                            </Link>
                                            <Link
                                                class="btn btn-danger"
                                                onClick={() => deleteCate(id)}
                                            >
                                                Delete
                                            </Link>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    )
}

Category.propTypes = {
}

export default Category;
