import React, { useState, useEffect } from "react";
import axios from "axios";
import { useHistory, useParams } from "react-router-dom";
import { useForm } from 'react-hook-form';
import { Editor } from '@tinymce/tinymce-react';
import firebase from '../../../../../firebase';


const EditBlog = () => {
    const [image, setImg] = useState(null);
    const [desc, setDescription] = useState([]);
    const handleEditorChange = (content, editor) => {
        setDescription(content);
    }
    let history = useHistory();
    const { register, handleSubmit, errors } = useForm();
    const { id } = useParams();
    const [blog, setBlog] = useState({
        title: "",
        image: "",
        content: ""
    });

    const { title, content} = blog;
    const onInputChange = e => {
        const { name, value } = e.target;
        setBlog({
            ...blog,
            [name]: value
        })
    };

    useEffect(() => {
        loadBlog();
            window.scrollTo(0,0)
    }, []);

    const Handle = e =>{
        if (document.querySelector("#ProductImage").value==="") {            
            setImg(blog.image)
        }else{
            setImg(e.target.files[0]);
        }
    }   

    const [cateblogs, setCateBlog] = useState([]);

    useEffect(() => {
        loadCateBlog();
            window.scrollTo(0,0)
    }, []);

    const loadCateBlog = async () => {
        const result = await axios.get("http://localhost:8080/cateblogs");
        setCateBlog(result.data.reverse());
    };

    const onSubmit = (data) => {
        if(document.querySelector("#ProductImage").value===""){;
            setImg(blog.image)
            const newData = {
                id: blog.id,
                date: blog.date,
                ...data,
                content:desc ==="" ? blog.content : desc,
                image: blog.image,  
                cate_id: data.cate_id
            }
            // console.log(newData);
            axios.put(`http://localhost:8080/blogs/${id}`, newData);
            history.push("/admin/blogs");
        }else{
            let file = data.image[0];
            let storageRef = firebase.storage().ref(`images/${file.name}`);
            // đẩy ảnh lên đường dẫn trên
            storageRef.put(image).then(function () {
                storageRef.getDownloadURL().then((url) => {
                    console.log(url);
                    // Tạo object mới chứa toàn bộ thông tin từ input
                    const newData = {
                        id: blog.id,
                        date: blog.date,
                        ...data,
                        content:desc ==="" ? blog.content : desc,
                        image: url,
                        cate_id : data.cate_id
                    }
                    console.log(newData);
                    axios.put(`http://localhost:8080/blogs/${id}`, newData);
                    history.push("/admin/blogs");
                })
                loadBlog();
            });
        }
    };

    const loadBlog = async () => {
        const result = await axios.get(`http://localhost:8080/blogs/${id}`);
        setBlog(result.data);
    };
    return (
        <div className="container">
            <div className="w-80 mx-auto shadow p-5">
                <h2 className="text-center mb-4">Edit Blog</h2>
                <form onSubmit={handleSubmit(e => onSubmit(e))}>
                    <div className="form-group">
                        <label for="name">Danh mục</label> <br/>
                        <select className="form-group" name="cate_id" ref={register}>
                            {cateblogs.map(({ id, name }) => (
                                <option selected={id == blog.cate_id} value={id}>{name}</option>
                            ))}
                        </select>
                    </div>
                    <div className="form-group">
                        <label for="title">Tiêu đề bài viết</label>
                        <input
                            type="text"
                            className="form-control form-control-lg"
                            placeholder="Nhập tên sản phẩm"
                            name="title"
                            ref={register({ required: true, minLength: 5, pattern:{value:/^\S/} })}
                            value={title}
                            onChange={onInputChange}
                        />
                        <small id="nameHelp" className="form-text text-danger">
                            {errors.title && errors.title.type === "required" && <span>Vui lòng nhập title</span>}
                            {errors.title && errors.title.type === "minLength" && <span>Title tối thiểu 5 kí tự !</span>}
                        </small>
                    </div>
                    <div className="form-group">
                        <label for="image">Link ảnh sản phẩm</label>
                        <input
                            type="file"
                            className="form-control form-control-lg"
                            id="ProductImage"
                            name="image"
                            ref={register()}
                            onChange={Handle}
                        />
                        <small id="nameHelp" className="form-text text-danger">
                            {errors.image && errors.image.type === "required" && <span>Vui lòng nhập link ảnh</span>}
                        </small>
                    </div>
                    <div className="form-group">
                        <label for="content">Chi tiết sản phẩm</label>
                        <Editor
                            initialValue={content}
                            name="desc"
                            init={{
                                height: 500,
                                menubar: false,
                                plugins: [
                                    'advlist autolink lists link image charmap print preview anchor',
                                    'searchreplace visualblocks code fullscreen',
                                    'insertdatetime media table paste code help wordcount'
                                ],
                                toolbar:
                                    'undo redo | formatselect | bold italic backcolor | \
                                    alignleft aligncenter alignright alignjustify | \
                                    bullist numlist outdent indent | removeformat | help'
                            }}
                            onEditorChange={handleEditorChange}
                        />
                    </div>
                    <button className="btn btn-warning btn-block">Cập nhật</button>
                </form>
            </div>
        </div>
    );
};

export default EditBlog;
