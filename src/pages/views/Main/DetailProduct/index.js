import React, { useState, useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import axios from "axios";

const DetailProduct = () => {
    const history = useHistory();
    const { id } = useParams();
    const [product, setProduct] = useState({
        name: "",
        image: "",
        price: "",
        sale_price: "",
        detail: ""
    });
    
    useEffect(() => {
        loadProduct();
        window.scrollTo(0,0)
    }, []);
    const loadProduct = async () => {
        const res = await axios.get(`http://localhost:8080/products/${id}`);
        setProduct(res.data);
    };

    const [cart, setCart] = useState([]);
    useEffect(() => {
        localStorage.getItem('cart')
        setCart(JSON.parse(localStorage.getItem('cart')));
        loadCart();
        window.scrollTo(0,10)
    }, []);

    const loadCart = async () => {
        const result = await axios.get("http://localhost:8080/cart");
        setCart(result.data.reverse());
    };

    const addToCart = ()=>{
        const dsCart = {
            id: cart.length === 0 ? 1 : Number(cart[cart.length-1].id)+1,
            name: product.name,
            pro_id : product.id,
            image : product.image,
            price : product.price,
            quantity: Number(document.querySelector("#quantity").value)
        }
        cart.push(dsCart);
        // console.log(cart);
        setCart(cart);
        localStorage.setItem('cart', JSON.stringify(cart));
        history.push("/shopping-cart");
    }
    return (
        <section className="sec-product-detail bg0 p-t-65 p-b-60">
            <div className="container">
                <div className="row">
                    <div className="col-md-6 col-lg-7 p-b-30">
                        <div className="p-l-25 p-r-30 p-lr-0-lg">
                            <div className="wrap-slick3 flex-sb flex-w">
                                <div className="wrap-slick3-arrows flex-sb-m flex-w"><button className="arrow-slick3 prev-slick3 slick-arrow" style={{}}><i className="fa fa-angle-left" aria-hidden="true" /></button><button className="arrow-slick3 next-slick3 slick-arrow" style={{}}><i className="fa fa-angle-right" aria-hidden="true" /></button></div>
                                <div className="slick3 gallery-lb slick-initialized slick-slider slick-dotted">
                                    <div className="slick-list draggable"><div className="slick-track" style={{ opacity: 1, width: '1539px' }}><div className="item-slick3 slick-slide slick-current slick-active" data-thumb="images/product-detail-01.jpg" data-slick-index={0} aria-hidden="false" tabIndex={0} role="tabpanel" id="slick-slide10" aria-describedby="slick-slide-control10" style={{ width: '513px', position: 'relative', left: '0px', top: '0px', zIndex: 999, opacity: 1 }}>
                                        <div className="wrap-pic-w pos-relative">
                                            <img src={product.image} alt="IMG-PRODUCT" />
                                            <a className="flex-c-m size-108 how-pos1 bor0 fs-16 cl10 bg0 hov-btn3 trans-04" href={product.image} tabIndex={0}>
                                                <i className="fa fa-expand" />
                                            </a>
                                        </div>
                                    </div>
                                        
                                    </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-6 col-lg-5 p-b-30">
                        <div className="p-r-50 p-t-5 p-lr-0-lg">
                            <h4 className="mtext-105 cl2 js-name-detail p-b-14">
                                {product.name}
                            </h4>
                            <span className="mtext-106 cl2">
                                ${product.price}
                            </span>
                            <p className="stext-102 cl3 p-t-23">
                                {product.detail}
                            </p>
                            <div className="flex-w flex-m p-l-100 p-t-40 respon7">
                                <div className="flex-m bor9 p-r-10 m-r-11">
                                    <a href="#" className="fs-14 cl3 hov-cl1 trans-04 lh-10 p-lr-5 p-tb-2 js-addwish-detail tooltip100" data-tooltip="Add to Wishlist">
                                        <i className="zmdi zmdi-favorite" />
                                    </a>
                                </div>
                                <a href="#" className="fs-14 cl3 hov-cl1 trans-04 lh-10 p-lr-5 p-tb-2 m-r-8 tooltip100" data-tooltip="Facebook">
                                    <i className="fa fa-facebook" />
                                </a>
                                <a href="#" className="fs-14 cl3 hov-cl1 trans-04 lh-10 p-lr-5 p-tb-2 m-r-8 tooltip100" data-tooltip="Twitter">
                                    <i className="fa fa-twitter" />
                                </a>
                                <a href="#" className="fs-14 cl3 hov-cl1 trans-04 lh-10 p-lr-5 p-tb-2 m-r-8 tooltip100" data-tooltip="Google Plus">
                                    <i className="fa fa-google-plus" />
                                </a>
                            </div>
                            <div className="d-flex">
                               
                                    <input type="number" id="quantity" className="border"/>
                                
                                <button onClick={() => addToCart()} className="btn btn-primary">Add to Cart</button>
                            </div>
                           
                        </div>
                    </div>
                </div>
               
            </div>
            <div className="bg6 flex-c-m flex-w size-302 m-t-73 p-tb-15">
                <span className="stext-107 cl6 p-lr-25">
                    SKU: JAK-01
    </span>
                <span className="stext-107 cl6 p-lr-25">
                    Categories: Jacket, Men
    </span>
            </div>
        </section>

    )
}

DetailProduct.propTypes = {

}

export default DetailProduct;
