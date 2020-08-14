import React, { useState, useEffect } from "react";
import axios from "axios";
import { useHistory, useParams } from "react-router-dom";
import { useForm } from 'react-hook-form';
import firebase from '../../../../../firebase';

const EditCateBlog = () => {
    const [image, setImg] = useState(null);
    let history = useHistory();
    const { register, handleSubmit, errors } = useForm();
    const { id } = useParams();
    const [cateblog, setCateBlog] = useState({
        name: "",
        image: ""
    });

    const loadCate = async () => {
        const result = await axios.get(`http://localhost:8080/cateblogs/${id}`);
        setCateBlog(result.data);
    };
    useEffect(() => {
        loadCate();
            window.scrollTo(0,0)
    }, []);


    const { name} = cateblog;
    const onInputChange = e => {
        const { name, value } = e.target;
        setCateBlog({
            ...cateblog,
            [name]: value
        })
    };

    const Handle = e =>{
        if (document.querySelector("#Image").value==="") {            
            setImg(cateblog.image)
        }else{
            setImg(e.target.files[0]);
        }
    }   
    const onSubmit = (data) => {
        if(document.querySelector("#Image").value===""){;
            setImg(cateblog.image)
            console.log(data);
            const newData = {
                id: cateblog.id,
                ...data,
                image: cateblog.image,  
            }
            axios.put(`http://localhost:8080/cateblogs/${id}`, newData);
            history.push("/admin/cateblogs");
        }else{
            let file = data.image[0];
            let storageRef = firebase.storage().ref(`images/${file.name}`);
            // đẩy ảnh lên đường dẫn trên
            storageRef.put(image).then(function () {
                storageRef.getDownloadURL().then((url) => {
                    console.log(url);
                    // Tạo object mới chứa toàn bộ thông tin từ input
                    const newData = {
                        id: cateblog.id,
                        ...data,
                        image: url
                    }
                    console.log(newData);
                    // đẩy dữ liệu ra ngoài app.js thông qua props onAdd
                    axios.put(`http://localhost:8080/cateblogs/${id}`, newData);
                    history.push("/admin/cateblogs");
                })
                loadCate();
            });
        }
    }

    return (
        <div className="container">
            <div className="w-80 mx-auto shadow p-5">
                <h2 className="text-center mb-4">Edit CateBlog</h2>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="form-group">
                        <label for="name">Tên danh mục</label>
                        <input
                            type="text"
                            className="form-control form-control-lg"
                            placeholder="Nhập tên danh mục"
                            name="name"
                            ref={register({ required: true, minLength: 5 })}
                            value={name}
                            onChange={onInputChange}
                        />
                        <small id="nameHelp" className="form-text text-danger">
                            {errors.name && errors.name.type === "required" && <span>Vui lòng nhập tên danh mục</span>}
                            {errors.name && errors.name.type === "minLength" && <span>Danh mục tối thiểu 5 kí tự !</span>}
                        </small>
                    </div>
                    <div className="form-group">
                        <label for="image">Ảnh danh mục</label>
                        <input type="file" id="Image" name="image" onChange={Handle} ref={register} className="form-control"/>
                    </div>
                    <button className="btn btn-warning btn-block">Cập nhật</button>
                </form>
            </div>
        </div>
    );
};

export default EditCateBlog;
