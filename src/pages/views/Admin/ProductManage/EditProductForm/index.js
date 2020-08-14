import React, { useState, useEffect } from "react";
import axios from "axios";
import { useHistory, useParams } from "react-router-dom";
import { useForm } from 'react-hook-form';
import { Editor } from '@tinymce/tinymce-react';
import firebase from '../../../../../firebase';
import swal from 'sweetalert';

const EditProductForm = () => {
    const [image, setImg] = useState(null);
    const [desc, setDescription] = useState([]);
    const handleEditorChange = (content, editor) => {
        setDescription(content);
    }
    let history = useHistory();
    const [categories, setCategory] = useState([]);
    const { register, handleSubmit, errors } = useForm();
    const { id } = useParams();
    const [product, setProduct] = useState({
        name: "",
        image: "",
        price: "",
        sale_price: "",
        detail: "",
        cateId: ""
    });

    const loadCate = async () => {
        const result = await axios.get("http://localhost:8080/categories");
        setCategory(result.data.reverse());
    };
    useEffect(() => {
        loadCate();
            window.scrollTo(0,0)
    }, []);


    const { name, price, sale_price,detail} = product;
    const onInputChange = e => {
        const { name, value } = e.target;
        setProduct({
            ...product,
            [name]: value
        })
    };

    const loadProduct = async () => {
        const result = await axios.get(`http://localhost:8080/products/${id}`);
        setProduct(result.data);
    };
    useEffect(() => {
        loadProduct();
            window.scrollTo(0,0)
    }, []);

    const Handle = e =>{
        if (document.querySelector("#ProductImage").value==="") {            
            setImg(product.image)
        }else{
            setImg(e.target.files[0]);
        }
    }   
    const onSubmit = (data) => {
        if(document.querySelector("#ProductImage").value===""){
            setImg(product.image)
            console.log(data);
            const newData = {
                id: product.id,
                ...data,
                detail:desc ==="" ? product.detail : desc,
                image: product.image,  
                cateId: data.cateId
            }
            // console.log(newData);
            // đẩy dữ liệu ra ngoài app.js thông qua props onAdd
            axios.put(`http://localhost:8080/products/${id}`, newData);
            history.push("/admin/products");
        }else{
            let file = data.image[0];
            let storageRef = firebase.storage().ref(`images/${file.name}`);
            // đẩy ảnh lên đường dẫn trên
            storageRef.put(image).then(function () {
                storageRef.getDownloadURL().then((url) => {
                    console.log(url);
                    // Tạo object mới chứa toàn bộ thông tin từ input
                    const newData = {
                        id: product.id,
                        ...data,
                        detail:desc ==="" ? product.detail : desc,
                        image: url
                    }
                    console.log(newData);
                    axios.put(`http://localhost:8080/products/${id}`, newData);
                    history.push("/admin/products");
                })
            });
            loadProduct();
        }
    }

    return (
        <div className="container">
            <div className="w-80 mx-auto shadow p-5">
                <h2 className="text-center mb-4">Edit Product</h2>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="form-group">
                        <label for="name">Danh mục</label> <br/>
                        <select className="form-group" name="cateId" ref={register}>
                            {categories.map(({ id, cate_name }) => (
                                <option selected={id == product.cateId} value={id}>{cate_name}</option>
                            ))}
                        </select>
                    </div>
                    <div className="form-group">
                        <label for="name">Tên sản phẩm</label>
                        <input
                            type="text"
                            className="form-control form-control-lg"
                            placeholder="Nhập tên sản phẩm"
                            name="name"
                            ref={register({ required: true, minLength: 5 })}
                            value={name}
                            onChange={onInputChange}
                        />
                        <small id="nameHelp" className="form-text text-danger">
                            {errors.name && errors.name.type === "required" && <span>Vui lòng nhập tên sản phẩm</span>}
                            {errors.name && errors.name.type === "minLength" && <span>Sản phẩm tối thiểu 5 kí tự !</span>}
                        </small>
                    </div>
                    <div className="form-group">
                        <label for="price">Giá sản phẩm</label>
                        <input
                            type="number"
                            className="form-control form-control-lg"
                            placeholder="Vui lòng nhập giá"
                            name="price"
                            ref={register({ required: true })}
                            value={price}
                            onChange={onInputChange}
                        />
                        {errors.price && errors.price.type === "required" && <span>Vui lòng nhập giá</span>}
                    </div>
                    <div className="form-group">
                        <label for="sale_price">Giá khuyến mãi</label>
                        <input
                            type="number"
                            className="form-control form-control-lg"
                            placeholder="Nhập giá khuyến mãi"
                            name="sale_price"
                            ref={register()}
                            value={sale_price}
                            onChange={onInputChange}
                        />
                    </div>
                    <div className="form-group">
                        <label for="image">Link ảnh sản phẩm</label>
                        <input type="file" id="ProductImage" name="image" onChange={Handle} ref={register} className="form-control"/>
                    </div>
                    <div className="form-group">
                        <Editor
                            initialValue={detail}
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

export default EditProductForm;
