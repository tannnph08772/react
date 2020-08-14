import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import swal from 'sweetalert';

const CateBlog = () => {
    const [cateblogs, setCateBlog] = useState([]);

    useEffect(() => {
        loadCateBlog();
            window.scrollTo(0,0)
    }, []);

    const loadCateBlog = async () => {
        const result = await axios.get("http://localhost:8080/cateblogs");
        setCateBlog(result.data.reverse());
    };

    const deleteCate = async id => {
        const willDelete = await swal({
            title: "Are you sure?",
            cancelButtonColor: "red",
            icon: "warning",
            dangerMode: true,
          });
           
          if (willDelete) {
            await axios.delete(`http://localhost:8080/cateblogs/${id}`);
            swal("Deleted!", "Your imaginary file has been deleted!", "success");
            loadCateBlog();
        }  
    };
    return (
        <div>
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h1 className="h3 mb-2 text-gray-800">Quản lý danh mục</h1>
                <Link to="/admin/cate_blog/add" className="btn btn-primary">Thêm Danh mục</Link>
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
                                {cateblogs.map(({id,name,image}, index) => (
                                    <tr>
                                        <th scope="row">{index + 1}</th>
                                        <td>{name}</td>
                                        <td><img className="img-thumbnail" width="100px" src={image}/></td>
                                        <td>
                                        <Link
                                                class="btn btn-outline-primary mr-2"
                                                to={`/admin/cateblog/${id}`}
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

CateBlog.propTypes = {
}

export default CateBlog;
