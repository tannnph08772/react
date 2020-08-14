import React, { useState, useEffect } from "react";
import axios from 'axios'
import { useHistory } from "react-router-dom";
import { useForm } from 'react-hook-form';
import swal from 'sweetalert';
import firebase from '../../../../../firebase';
import { Editor } from '@tinymce/tinymce-react';

const AddBlog = () => {
  const [content, setContent] = useState([]);
  const handleEditorChange = (content, editor) => {
    setContent(content);
  }
  let history = useHistory();
  const { register, handleSubmit, errors } = useForm();
  const [blog, setBlog] = useState({
    title: "",
    image: "",
    content: "",
    date: "",
    cate_id:""
  });

  const { title, date } = blog;
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

  const [cateblogs, setCateBlog] = useState([]);

    useEffect(() => {
        loadCateBlog();
            window.scrollTo(0,0)
    }, []);

    const loadCateBlog = async () => {
        const result = await axios.get("http://localhost:8080/cateblogs");
        setCateBlog(result.data.reverse());
    };

  const loadBlog = async () => {
      const result = await axios.get("http://localhost:8080/blogs");
      setBlog(result.data.reverse());
  };
  const onSubmit = async e => {
    const create = await swal({
      title:"Thêm bài viết thành công",
      icon: "success",
      dangerMode: true,
    });
     
    if (create) {
        let file = e.image[0];
        // tạo reference chứa ảnh trên firesbase
        let storageRef = firebase.storage().ref(`images/${file.name}`);
        // đẩy ảnh lên đường dẫn trên
        storageRef.put(file).then(function () {
            storageRef.getDownloadURL().then((url) => {
                console.log(url);
                // Tạo object mới chứa toàn bộ thông tin từ input
                const newData = {
                  ...blog,
                  content,
                  image: url,
                  cate_id: e.cate_id
                }
              axios.post("http://localhost:8080/blogs",newData);
              history.push("/admin/blogs");
          })
      });  
      loadBlog();
  }  
    
  };
  return (
    <div className="container">
      <div className="w-80 mx-auto shadow p-5">
        <h2 className="text-center mb-4">Add Blog</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
        <div className="form-group">
          <label for="name">Danh mục</label>
            <select className="form-control" name="cateId" ref={register}>
              {cateblogs.map(({id,name}) => (
                <option value={id}>{name}</option>
              )
              )}
            </select>
          </div>
          <div className="form-group">
            <input
              type="text"
              className="form-control form-control-lg"
              placeholder="Nhập tên bài viết"
              name="title"
              value={title}
              ref={register({ required: true, minLength: 5, pattern:{value:/^\S/}  })}
              onChange={onInputChange}
            />
            <small id="nameHelp" className="form-text text-danger">
              {errors.title && errors.title.type === "required" && <span>Vui lòng nhập tiêu đề</span>}
              {errors.title && errors.title.type === "minLength" && <span>Tiêu đề tối thiểu 5 kí tự !</span>}
            </small>
          </div>
          <div className="form-group">
          <input
              type="file" name="image" ref={register} className="form-control"
            />
          </div>
          <div className="form-group">
            <input
              type="date"
              className="form-control form-control-lg"
              placeholder="Chọn ngày đăng bài viết"
              name="date"
              value={date}
              ref={register({ required: true })}
              onChange={onInputChange}
            />
          </div>
          <div className="form-group">
          <Editor
                initialValue=""
                name="content"
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
          <button className="btn btn-primary btn-block">Thêm bài viết</button>
        </form>
      </div>
    </div>
  );
};

export default AddBlog;
