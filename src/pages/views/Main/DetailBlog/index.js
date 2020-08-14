import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";

const DetailBlog = () => {
    const { id } = useParams();
    const [blog, setBlog] = useState({
        title: "",
        image: "",
        content: "",
        date: ""
    });

    useEffect(() => {
        loadBlog();
        window.scrollTo(0, 0)
    }, []);
    const loadBlog = async () => {
        const res = await axios.get(`http://localhost:8080/blogs/${id}`);
        setBlog(res.data);
    };

    const [cateblogs, setCateBlog] = useState([]);

    useEffect(() => {
        loadCateBlog();
            window.scrollTo(0,0)
    }, []);

    const loadCateBlog = async () => {
        const result = await axios.get("http://localhost:8080/cateblogs");
        setCateBlog(result.data.reverse());
    };
    return (
        <section className="bg0 p-t-52 p-b-20">
            <div className="container">
                <div className="row">
                    <div className="col-md-8 col-lg-9 p-b-80">
                        <div className="p-r-45 p-r-0-lg">
                            {/*  */}
                            <div className="wrap-pic-w how-pos5-parent">
                                <img src={blog.image} alt="IMG-BLOG" />
                                <div className="flex-col-c-m size-123 bg9 how-pos5">
                                    <span className="stext-109 cl3 txt-center">
                                       {blog.date}
              </span>
                                </div>
                            </div>
                            <div className="p-t-32">
                                <span className="flex-w flex-m stext-111 cl2 p-b-19">
                                    <span>
                                        <span className="cl4">By</span> Admin
                                    </span>
                                </span>
                                <h4 className="ltext-109 cl2 p-b-28">
                                    {blog.title}
                                </h4>
                                <p className="stext-117 cl6 p-b-26">
                                    {blog.content}
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-4 col-lg-3 p-b-80">
                        <div className="side-menu">
                            <div className="bor17 of-hidden pos-relative">
                                <input className="stext-103 cl2 plh4 size-116 p-l-28 p-r-55" type="text" name="search" placeholder="Search" />
                                <button className="flex-c-m size-122 ab-t-r fs-18 cl4 hov-cl1 trans-04">
                                    <i className="zmdi zmdi-search" />
                                </button>
                            </div>
                            <div className="p-t-55">
                                <h4 className="mtext-112 cl2 p-b-33">
                                    Categories
                                </h4>
                                <ul>
                                    {cateblogs.map(({id,name,image}, index) => (
                                        <li className="bor18">
                                        <a href="#" className="dis-block stext-115 cl6 hov-cl1 trans-04 p-tb-8 p-lr-4">
                                            {name}
                                        </a>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                           
                            <div className="p-t-50">
                                <h4 className="mtext-112 cl2 p-b-27">
                                    Tags
                                </h4>
                                <div className="flex-w m-r--5">
                                    {cateblogs.map(({name,id}) => (
                                        <Link to={`/filter-blog/${id}`} className="flex-c-m stext-107 cl6 size-301 bor7 p-lr-15 hov-tag1 trans-04 m-b-5">
                                            {name}
                                        </Link>
                                    ))}
                                   
                                    
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

DetailBlog.propTypes = {

}

export default DetailBlog;
