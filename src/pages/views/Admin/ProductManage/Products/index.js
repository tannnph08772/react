import React, { useState, useEffect, useParams } from "react";
import axios from "axios";
import { Link, useHistory } from "react-router-dom";
import swal from 'sweetalert';

const Products = () => {
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

    const deleteProduct = async id => {
        const willDelete = await swal({
            title: "Are you sure?",
            text: "Are you sure that you want to delete this file?",
            cancelButtonColor: "red",
            icon: "warning",
            dangerMode: true,
        });

        if (willDelete) {
            await axios.delete(`http://localhost:8080/products/${id}`);
            swal("Deleted!", "Your imaginary file has been deleted!", "success");
            loadProducts();
        }
    };

    const nameCate = products.map(product =>{
        return categories.find(cate => Number(cate.id) === Number(product.cateId));
    })

    return (
        <div>
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h1 className="h3 mb-2 text-gray-800">Quản lý sản phẩm</h1>
                <Link to="/admin/product/add" className="btn btn-primary">Thêm sản phẩm</Link>
            </div>
            <div className="card shadow mb-4">
                <div className="card-body">
                    <div className="table-responsive">
                        <table class="table table-bordered table-striped text-center shadow">
                            <thead class="thead-dark">
                                <tr>
                                    <th>#</th>
                                    <th>Name</th>
                                    <th>Price</th>
                                    <th>Sale Price</th>
                                    <th>Cate</th>
                                    <th>Image</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {products.map(({ id, name, image, price, sale_price }, index) => (
                                    <tr>
                                        <th>{index + 1}</th>
                                        <td>{name}</td>
                                        <td>{price}</td>
                                        <td>{sale_price}</td>
                                        <td>{nameCate[index].cate_name}</td>
                                        <td><img className="img-thumbnail" width="100px" src={image} /></td>
                                        <td>
                                            <Link
                                                class="btn btn-outline-primary" width="100px"
                                                to={`/admin/product/${id}`}
                                            >
                                                Edit
                                            </Link>
                                            <Link
                                            width="100px"
                                                class="btn btn-danger"
                                                onClick={() => deleteProduct(id)}
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

Products.propTypes = {
}

export default Products
