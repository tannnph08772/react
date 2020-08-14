import React, { useState,useEffect } from "react";
import axios from 'axios'
import { useHistory } from "react-router-dom";
import { useForm } from 'react-hook-form';
import swal from 'sweetalert';
import firebase from '../../../../../firebase';

const AddCate = () => {
  let history = useHistory();
  const { register, handleSubmit, errors } = useForm();
  const [category, setCategory] = useState({
    cate_name: "",
    image: ""
  });

  const { cate_name} = category;
  const onInputChange = e => {
    const { name, value } = e.target;
    setCategory({
        ...category,
        [name]: value
    })
  }
    useEffect(() => {
      loadCategory();
          window.scrollTo(0,0)
  }, []);

  const loadCategory = async () => {
      const result = await axios.get("http://localhost:8080/categories");
      setCategory(result.data.reverse());
  };

  const onSubmit = async e => {
    const create = await swal({
      title:"Thêm danh mục thành công",
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
                  ...category,
                    image: url
                }
             axios.post("http://localhost:8080/categories",newData);
             history.push("/admin/categories");
          })
          loadCategory();
      });  
  }  
    
  };
  return (
    <div className="container">
      <div className="w-80 mx-auto shadow p-5">
        <h2 className="text-center mb-4">Add Category</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="form-group">
            <input
              type="text"
              className="form-control form-control-lg"
              placeholder="Nhập tên danh mục"
              name="cate_name"
              value={cate_name}
              ref={register({ required: true, minLength: 5, pattern:{value:/^\S/}  })}
              onChange={onInputChange}
            />
            <small id="nameHelp" className="form-text text-danger">
              {errors.cate_name && errors.cate_name.type === "required" && <span>Vui lòng nhập tên danh mục</span>}
              {errors.cate_name && errors.cate_name.type === "minLength" && <span>tên danh mục tối thiểu 5 kí tự !</span>}
            </small>
          </div>
          <div className="form-group">
          <input
              type="file" name="image" ref={register} className="form-control"
            />
          </div>
          <button className="btn btn-primary btn-block">Thêm danh mục</button>
        </form>
      </div>
    </div>
  );
};

export default AddCate
