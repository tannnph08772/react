import React, { useState, useEffect } from "react";
import axios from "axios";
import {Link, useParams} from 'react-router-dom'

const FiterProduct = ({ }) => {
    const [products, setProduct] = useState([]);

    useEffect(() => {
        loadProducts();
    }, []);

    const loadProducts = async () => {
        const result = await axios.get("http://localhost:8080/products");
        setProduct(result.data);
    };

    const [categories, setCategory] = useState([]);

    useEffect(() => {
        loadCategory();
            window.scrollTo(0,0)
    }, []);

    const loadCategory = async () => {
        const result = await axios.get("http://localhost:8080/categories");
        setCategory(result.data.reverse());
    };

    const {id} = useParams();
    const productCates = products.filter(product => product.cateId === id);

    return (
        <div className="container">
            <div className="row">
                <div className="col-lg-8">
                    <h4 className="mtext-112 cl2 p-b-33 p-t-55">
                        Danh sách các sản phẩm
                    </h4>
                    <div className="row mb-3">
                        {productCates.map(({ id, name, image, price,sale_price }) => (
                            <div className="col-4">
                                <div className="card mb-2">
                                    <Link to={`/detailProduct/${id}`}>
                                        <img style={{ height: '200px', with: '100%' }} className="card-img-top" src={image} alt="Card image" />
                                    </Link>
                                    <div className="card-body" style={{ height: '200px' }}>
                                        <h4 className="card-title">
                                            <Link 
                                              className="text-decoration-none text-dark"
                                              to={`/detailProduct/${id}`}
                                              >
                                              {name}
                                              </Link>
                                        </h4>
                                        <div className="wapper-content">
                                            <p className="card-text ">Giá: ${price}</p>  
                                            <p className="text-dark">Giá KM: ${sale_price}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
                <div className="col-lg-4">
                    <div className="p-t-55">
                    <h4 className="mtext-112 cl2 p-b-33">
                        Categories
                    </h4>
                    <ul>
                    {categories.map(({cate_name,id}, index) => (
                        <li className="bor18" key={index}>
                        <Link to={`/filter-product/${id}`} className="dis-block stext-115 cl6 hov-cl1 trans-04 p-tb-8 p-lr-4">
                            {cate_name}
                        </Link>
                        </li>
                    ))}
                    </ul>
                    </div>
                </div>
            </div>

        </div>

    )
}

FiterProduct.propTypes = {

}

export default FiterProduct;
