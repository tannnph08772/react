import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import swal from 'sweetalert';

const Blog = () => {
    const [cateblogs, setCateBlog] = useState([]);
    useEffect(() => {
        loadCateBlog();
            window.scrollTo(0,0)
    }, []);

    const loadCateBlog = async () => {
        const result = await axios.get("http://localhost:8080/cateblogs");
        setCateBlog(result.data.reverse());
    };

    const [blogs, setBlog] = useState([]);
    useEffect(() => {
        loadBlog();
            window.scrollTo(0,0)
    }, []);

    const loadBlog = async () => {
        const result = await axios.get("http://localhost:8080/blogs");
        setBlog(result.data.reverse());
    };

    const cateName = blogs.map(blog =>{
        return cateblogs.find(cate => Number(cate.id) === Number(blog.cate_id));
    })

    const deleteBlog = async id => {
        const willDelete = await swal({
            title: "Are you sure?",
            text: "Are you sure that you want to delete this file?",
            cancelButtonColor: "red",
            icon: "warning",
            dangerMode: true,
          });
           
          if (willDelete) {
            await axios.delete(`http://localhost:8080/blogs/${id}`);
            swal("Deleted!", "Your imaginary file has been deleted!", "success");
            loadBlog();
        }  
    };
    return (
        <div>
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h1 className="h3 mb-2 text-gray-800">Quản lý bài viết</h1>
                <Link to="/admin/blog/add" className="btn btn-primary">Thêm bài viết</Link>
            </div>
            <div className="card shadow mb-4">
                <div className="card-body">
                    <div className="table-responsive">
                        <table class="table table-bordered table-striped text-center shadow">
                            <thead class="thead-dark">
                                <tr>
                                    <th scope="col">#</th>
                                    <th scope="col">Title</th>
                                    <th scope="col">Date</th>
                                    <th scope="col">Category Blog</th>
                                    <th scope="col">Image</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {blogs.map(({id,title,image, date}, index) => (
                                    <tr>
                                        <th scope="row">{index + 1}</th>
                                        <td>{title}</td>
                                        <td>{date}</td>
                                        <td>{cateName[index].name}</td>
                                        <td><img className="img-thumbnail" width="100px" src={image}/></td>
                                        <td>
                                            <Link
                                                class="btn btn-outline-primary mr-2"
                                                to={`/admin/blog/${id}`}
                                            >
                                                Edit
                                            </Link>
                                            <Link
                                                class="btn btn-danger"
                                                onClick={() => deleteBlog(id)}
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

Blog.propTypes = {
}

export default Blog;
