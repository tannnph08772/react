import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useParams } from 'react-router-dom';

const Cart = () => {
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
    let cartDs = JSON.parse(localStorage.getItem('cart'));

    const removeCart = (id) =>{
        const newCart = cart.filter(cart => cart.id !== id);
        setCart(newCart);
        localStorage.setItem('cart',JSON.stringify(newCart))
    }
    return (
        <form className="bg0 p-t-75 p-b-85">
            <div className="container">
                <div className="row">
                    <div className="col-lg-10 col-xl-7 m-b-50">
                        <div className="m-l-25 ">
                            <div className="wrap-table-shopping-cart">
                                <table className="table">
                                    <tbody><tr className="table_head">
                                        <th className="column-1">Product</th>
                                        <th className="column-2">Name</th>
                                        <th className="column-3">Price</th>
                                        <th className="column-4">Quantity</th>
                                        <th className="column-5">Total</th>
                                    </tr>
                                    {cartDs.map(({id,name, image, price, quantity}) => (
                                        <tr className="table_row">
                                            <td className="column-1">
                                                <div className="how-itemcart1">
                                                    <img src={image} alt="IMG" />
                                                </div>
                                            </td>
                                            <td className="column-2">{name}</td>
                                            <td className="column-3">{price}</td>
                                            <td className="column-4">
                                                <div className="">
                                                <input type="number" value={quantity} style={{width:"50px"}} id="quantity" className="border"/>
                                                </div>
                                            </td>
                                            <td className="column-3">{Number(quantity*price)}</td>
                                            <td><button onClick={() => removeCart(id)}>Remove</button></td>
                                        </tr>
                                        ))}
                                        
                                    </tbody></table>
                            </div>
                            <div className="flex-w flex-sb-m bor15 p-t-18 p-b-15 p-lr-40 p-lr-15-sm">
                                <div className="flex-w flex-m m-r-20 m-tb-5">
                                    <input className="stext-104 cl2 plh4 size-117 bor13 p-lr-20 m-r-10 m-tb-5" type="text" name="coupon" placeholder="Coupon Code" />
                                    <div className="flex-c-m stext-101 cl2 size-118 bg8 bor13 hov-btn3 p-lr-15 trans-04 pointer m-tb-5">
                                        Apply coupon
              </div>
                                </div>
                                <div className="flex-c-m stext-101 cl2 size-119 bg8 bor13 hov-btn3 p-lr-15 trans-04 pointer m-tb-10">
                                    Update Cart
            </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-sm-7 col-lg-5 col-xl-5  m-b-50">
                        <div className="bor10 p-lr-40 p-t-30 p-b-40 m-l-63 m-r-40 m-lr-0-xl p-lr-15-sm">
                            <h4 className="mtext-109 cl2 p-b-30">
                                Cart Totals
          </h4>
                            <div className="flex-w flex-t bor12 p-b-13">
                                <div className="size-208">
                                    <span className="stext-110 cl2">
                                        Subtotal:
              </span>
                                </div>
                                <div className="size-209">
                                    <span className="mtext-110 cl2">
                                        $79.65
              </span>
                                </div>
                            </div>
                            <div className="flex-w flex-t bor12 p-t-15 p-b-30">
                                <div className="size-208 w-full-ssm">
                                    <span className="stext-110 cl2">
                                        Shipping:
              </span>
                                </div>
                                <div className="size-209 p-r-18 p-r-0-sm w-full-ssm">
                                    <p className="stext-111 cl6 p-t-2">
                                        There are no shipping methods available. Please double check your address, or contact us if you need any help.
              </p>
                                    <div className="p-t-15">
                                        <span className="stext-112 cl8">
                                            Calculate Shipping
                </span>
                                        <div className="rs1-select2 rs2-select2 bor8 bg0 m-b-12 m-t-9">
                                            <select className="js-select2 select2-hidden-accessible" name="time" tabIndex={-1} aria-hidden="true">
                                                <option>Select a country...</option>
                                                <option>USA</option>
                                                <option>UK</option>
                                            </select><span className="select2 select2-container select2-container--default" dir="ltr" style={{ width: '143.333px' }}><span className="selection"><span className="select2-selection select2-selection--single" role="combobox" aria-haspopup="true" aria-expanded="false" tabIndex={0} aria-labelledby="select2-time-qc-container"><span className="select2-selection__rendered" id="select2-time-qc-container" title="Select a country...">Select a country...</span><span className="select2-selection__arrow" role="presentation"><b role="presentation" /></span></span></span><span className="dropdown-wrapper" aria-hidden="true" /></span>
                                            <div className="dropDownSelect2" />
                                        </div>
                                        <div className="bor8 bg0 m-b-12">
                                            <input className="stext-111 cl8 plh3 size-111 p-lr-15" type="text" name="state" placeholder="State /  country" />
                                        </div>
                                        <div className="bor8 bg0 m-b-22">
                                            <input className="stext-111 cl8 plh3 size-111 p-lr-15" type="text" name="postcode" placeholder="Postcode / Zip" />
                                        </div>
                                        <div className="flex-w">
                                            <div className="flex-c-m stext-101 cl2 size-115 bg8 bor13 hov-btn3 p-lr-15 trans-04 pointer">
                                                Update Totals
                  </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="flex-w flex-t p-t-27 p-b-33">
                                <div className="size-208">
                                    <span className="mtext-101 cl2">
                                        Total:
              </span>
                                </div>
                                <div className="size-209 p-t-1">
                                    <span className="mtext-110 cl2">
                                        $79.65
              </span>
                                </div>
                            </div>
                            <button className="flex-c-m stext-101 cl0 size-116 bg3 bor14 hov-btn3 p-lr-15 trans-04 pointer">
                                Proceed to Checkout
          </button>
                        </div>
                    </div>
                </div>
            </div>
        </form>

    )
}

Cart.propTypes = {

}

export default Cart
