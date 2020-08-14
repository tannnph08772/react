import React, { useState, useEffect } from "react";
import axios from 'axios'
import { useHistory } from "react-router-dom";
import { useForm } from 'react-hook-form';
import swal from 'sweetalert';
import firebase from '../../../../../firebase';
import { Editor } from '@tinymce/tinymce-react';

const AddProductForm = () => {
  const [detail, setDetail] = useState([]);
  const handleEditorChange = (content, editor) => {
    setDetail(content);
  }
  const [categories, setCategory] = useState([]);
  
  let history = useHistory();
  useEffect(() => {
    loadCate();
}, []);

  const loadCate = async () => {
      const result = await axios.get("http://localhost:8080/categories");
      setCategory(result.data.reverse());
  };

  const { register, handleSubmit, errors } = useForm();
  const [product, setProduct] = useState({
    name: "",
    image: "",
    price: "",
    sale_price: "",
    detail: "",
    cateId:""
  });
  useEffect(() => {
    loadProduct();
        window.scrollTo(0,0)
}, []);

const loadProduct = async () => {
    const result = await axios.get("http://localhost:8080/products");
    setProduct(result.data.reverse());
};
  const { name, price,sale_price} = product;
  const onInputChange = e => {
    const { name, value } = e.target;
    setProduct({
        ...product,
        [name]: value
    })
};

  const onSubmit = async e => {
    const create = await swal({
      title:"Thêm sản phẩm thành công",
      icon: "success",
      dangerMode: true,
    });
     
    if (create) {
      console.log(e.image[0]);
        let file = e.image[0];
        // tạo reference chứa ảnh trên firesbase
        let storageRef = firebase.storage().ref(`images/${file.name}`);
        // đẩy ảnh lên đường dẫn trên
        storageRef.put(file).then(function () {
            storageRef.getDownloadURL().then((url) => {
                console.log(url);
                // Tạo object mới chứa toàn bộ thông tin từ input
                const newData = {
                  ...product,
                    detail,
                    image: url,
                    cateId : e.cateId
                }
            axios.post("http://localhost:8080/products",newData);
            history.push("/admin/products");
          })
        loadProduct();
      });
  }  
    
  };
  return (
    <div className="container">
      <div className="w-80 mx-auto shadow p-5">
        <h2 className="text-center mb-4">Add Product</h2>
        <form onSubmit={handleSubmit(e => onSubmit(e))}>
          <div className="form-group">
          <label for="name">Danh mục</label>
            <select className="form-control" name="cateId" ref={register}>
            <option value="0">-- Chọn danh mục sản phẩm --</option>
              {categories.map(({id,cate_name}) => (
                <option value={id}>{cate_name}</option>
              )
              )}
            </select>
          </div>
          <div className="form-group">
            <input
              type="text"
              className="form-control form-control-lg"
              placeholder="Nhập tên sản phẩm"
              name="name"
              value={name}
              ref={register({ required: true, minLength: 3, pattern:{value:/^\S/}  })}
              onChange={onInputChange}
            />
            <small id="nameHelp" className="form-text text-danger">
              {errors.name && errors.name.type === "required" && <span>Vui lòng nhập tên sản phẩm</span>}
              {errors.name && errors.name.type === "minLength" && <span>Sản phẩm tối thiểu 3 kí tự !</span>}
            </small>
          </div>
          <div className="form-group">
            <input
              type="file" name="image" ref={register({ required: true })} className="form-control"
            />
            <small id="nameHelp" className="form-text text-danger">
              {errors.image && errors.image.type === "required" && <span>Vui lòng chọn ảnh</span>}
            </small>
          </div>
          <div className="form-group">
            <input
              type="number"
              className="form-control form-control-lg"
              placeholder="Nhập giá sản phẩm"
              name="price"
              value={price}
              ref={register({ required: true })}
              onChange={onInputChange}
            />
            <small id="nameHelp" className="form-text text-danger">
              {errors.price && errors.price.type === "required" && <span>Vui lòng nhập giá</span>}
            </small>
          </div>
          <div className="form-group">
            <input
              type="number"
              className="form-control form-control-lg"
              placeholder="Nhập giá khuyến mãi"
              name="sale_price"
              value={sale_price}
              onChange={onInputChange}
            />
          </div>
          <div className="form-group">
            <Editor
                initialValue=""
                name="detail"
                init={{
                  height: 200,   
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
          <button className="btn btn-primary btn-block">Thêm sản phẩm</button>
        </form>
      </div>
    </div>
  );
};

export default AddProductForm;
