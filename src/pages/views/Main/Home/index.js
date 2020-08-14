import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from 'react-router-dom';
import Pagination from "../../../../components/Pagination";



const Home = ({ postsPerPage, totalPosts, paginate }) => {
    const [products, setProduct] = useState([]);

    useEffect(() => {
        loadProducts();
        window.scrollTo(0,0)
    }, []);

    const loadProducts = async () => {
        const result = await axios.get("http://localhost:8080/products");
        setProduct(result.data.reverse());
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

    const addToCart = (id, name, image, price,sale_price, quantity= 1)=>{
        const product = products.find(product => product.id === id);
        const dsCart = {
            id: cart.length === 0 ? 1 : Number(cart[cart.length-1].id)+1,
            name: product.name,
            pro_id : product.id,
            image : product.image,
            price : product.price
        }
        cart.push(dsCart);
        // console.log(cart);
        setCart(cart);
        localStorage.setItem('cart', JSON.stringify(cart));
        loadProducts();
    }
    let cartDs = JSON.parse(localStorage.getItem('cart'));
    // const showCart = () =>{
    //     if(cartDs.length){
    //         return cartDs.length;
    //     }else{
    //         return "Không có sản phẩm";
    //     }
    // } 

    return (
        <div className="container">
            <div className="flex-w flex-sb-m p-t-52">
        <h1>Danh sách sản phẩm</h1> 
        {/* <Link className="btn btn-light" to="/shopping-cart">Go to cart ({showCart()})</Link> */}
        </div>
            <div className="row mb-3">
                {products.map(({ id, name, image, price }) => (
                    <div className="col-4">
                        <div className="card mb-2">
                            <Link to={`/detailProduct/${id}`}>
                                <img style={{ height: '300px', with: '100%' }} className="card-img-top" src={image} alt="Card image" />
                            </Link>
                            <div className="card-body">
                                <h4 className="card-title"><Link to={`/detailProduct/${id}`}>{name}</Link></h4>
                                <p className="card-text">Giá: {price}</p>
                            </div>
                            <button onClick ={() => addToCart(id, name, image, price, price)} className="btn btn-primary">Add to cart</button>
                        </div>
                    </div>
                ))}
            </div>
            <Pagination postsPerPage={postsPerPage}
            totalPosts={products.length}
            paginate={paginate}/>
           
        </div>

    )
}

Home.propTypes = {

}

export default Home
