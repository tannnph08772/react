import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useParams } from 'react-router-dom';

const FilterBlog = () => {
    const [blogs, setBlog] = useState([]);

    useEffect(() => {
        loadBlog();
            window.scrollTo(0,0)
    }, []);

    const loadBlog = async () => {
        const result = await axios.get("http://localhost:8080/blogs");
        setBlog(result.data.reverse());
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

    const {id} = useParams();
    const blogCate = blogs.filter(blog => blog.cate_id === id);
    return (
        <section className="bg0 p-t-62 p-b-60">
        <div className="container">
          <div className="row">
            <div className="col-md-8 col-lg-9 p-b-80">
              <div className="p-r-45 p-r-0-lg">
              {blogCate.map(({id, title, image,content, date }) => (
                <div className="p-b-63">
                    <Link to={`/detailBlog/${id}`} className="ltext-108 cl2 hov-cl1 trans-04">
                      <img width="100%" height="400px" src={image} alt="IMG-BLOG" />
                    <div className="flex-col-c-m size-123 bg9 how-pos5">
                      <span className="stext-109 cl3 txt-center">
                        {date}
                      </span>
                    </div>
                    </Link>
                  <div className="p-t-32">
                    <h4 className="p-b-15">
                      <Link to={`/detailBlog/${id}`} className="ltext-108 cl2 hov-cl1 trans-04">
                        {title}
                      </Link>
                    </h4>
                    <p className="stext-117 cl6">
                     {content}
                    </p>
                    <div className="flex-w flex-sb-m p-t-18">
                      <span className="flex-w flex-m stext-111 cl2 p-r-30 m-tb-10">
                        <span>
                          <span className="cl4">By</span> Admin  
                          <span className="cl12 m-l-4 m-r-6">|</span>
                        </span>
                        <span>
                          StreetStyle, Fashion, Couple  
                          <span className="cl12 m-l-4 m-r-6">|</span>
                        </span>
                        <span>
                          8 Comments
                        </span>
                      </span>
                      <Link to={`/detailBlog/${id}`} className="stext-101 cl2 hov-cl1 trans-04 m-tb-10">
                        Continue Reading
                        <i className="fa fa-long-arrow-right m-l-9" />
                      </Link>
                    </div>
                  </div>
                </div>
                ))}
                {/* Pagination */}
                <div className="flex-l-m flex-w w-full p-t-10 m-lr--7">
                  <a href="#" className="flex-c-m how-pagination1 trans-04 m-all-7 active-pagination1">
                    1
                  </a>
                  <a href="#" className="flex-c-m how-pagination1 trans-04 m-all-7">
                    2
                  </a>
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
                  {cateblogs.map(({name,id}) => (
                    <li className="bor18">
                      <Link to={`/filter-blog/${id}`} className="dis-block stext-115 cl6 hov-cl1 trans-04 p-tb-8 p-lr-4">
                        {name}
                      </Link>
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

FilterBlog.propTypes = {

}

export default FilterBlog
