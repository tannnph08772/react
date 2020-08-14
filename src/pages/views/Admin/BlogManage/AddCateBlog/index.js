import React, { useState, useEffect } from "react";
import axios from 'axios'
import { useHistory } from "react-router-dom";
import { useForm } from 'react-hook-form';
import swal from 'sweetalert';
import firebase from '../../../../../firebase';

const AddCateBlog = () => {
  let history = useHistory();
  const { register, handleSubmit, errors } = useForm();
  const [cateblog, setCateBlog] = useState({
    name: "",
    image: "",
  });

  const onInputChange = e => {
    const { name, value } = e.target;
    setCateBlog({
        ...cateblog,
        [name]: value
    })
  }
  useEffect(() => {
    loadCateBlog();
        window.scrollTo(0,0)
  }, []);

  const loadCateBlog = async () => {
      const result = await axios.get("http://localhost:8080/cateblogs");
      setCateBlog(result.data.reverse());
  };
  const onSubmit = async e => {
    const create = await swal({
      title:"Thêm bài viết thành công",
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
                  ...cateblog,
                    image: url
                }
             axios.post("http://localhost:8080/cateblogs",newData);
             history.push("/admin/cateblogs");
          })
          loadCateBlog();
      });  
  }  
    
  };
  return (
    <div className="container">
      <div className="w-80 mx-auto shadow p-5">
        <h2 className="text-center mb-4">Add Cateblog</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="form-group">
            <input
              type="text"
              className="form-control form-control-lg"
              placeholder="Nhập tên danh mục"
              name="name"
              ref={register({ required: true, minLength: 5, pattern:{value:/^\S/}  })}
              onChange={onInputChange}
            />
            <small id="nameHelp" className="form-text text-danger">
              {errors.name && errors.name.type === "required" && <span>Vui lòng nhập tên danh mục</span>}
              {errors.name && errors.name.type === "minLength" && <span>tên danh mục tối thiểu 5 kí tự !</span>}
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

export default AddCateBlog;
