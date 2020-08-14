import React from 'react'
import PropTypes from 'prop-types'
import { useParams } from "react-router-dom";

const DetailProduct = ({ products }) => {
    let { id } = useParams();
    const product = products.find(product => product.id === id)
    return (
        <section className="sec-product-detail bg0 p-t-65 p-b-60">
            <div className="container">
                <div className="row">
                    <div className="col-md-6 col-lg-7 p-b-30">
                        <div className="p-l-25 p-r-30 p-lr-0-lg">
                            <div className="wrap-slick3 flex-sb flex-w">
                                <div className="wrap-slick3-dots"><ul className="slick3-dots" role="tablist" style={{}}><li className="slick-active" role="presentation"><img src=" images/product-detail-01.jpg " /><div className="slick3-dot-overlay" /></li><li role="presentation"><img src=" images/product-detail-02.jpg " /><div className="slick3-dot-overlay" /></li><li role="presentation"><img src=" images/product-detail-03.jpg " /><div className="slick3-dot-overlay" /></li></ul></div>
                                <div className="wrap-slick3-arrows flex-sb-m flex-w"><button className="arrow-slick3 prev-slick3 slick-arrow" style={{}}><i className="fa fa-angle-left" aria-hidden="true" /></button><button className="arrow-slick3 next-slick3 slick-arrow" style={{}}><i className="fa fa-angle-right" aria-hidden="true" /></button></div>
                                <div className="slick3 gallery-lb slick-initialized slick-slider slick-dotted">
                                    <div className="slick-list draggable"><div className="slick-track" style={{ opacity: 1, width: '1539px' }}><div className="item-slick3 slick-slide slick-current slick-active" data-thumb="images/product-detail-01.jpg" data-slick-index={0} aria-hidden="false" tabIndex={0} role="tabpanel" id="slick-slide10" aria-describedby="slick-slide-control10" style={{ width: '513px', position: 'relative', left: '0px', top: '0px', zIndex: 999, opacity: 1 }}>
                                        <div className="wrap-pic-w pos-relative">
                                            <img src={product.image} alt="IMG-PRODUCT" />
                                            <a className="flex-c-m size-108 how-pos1 bor0 fs-16 cl10 bg0 hov-btn3 trans-04" href={product.image} tabIndex={0}>
                                                <i className="fa fa-expand" />
                                            </a>
                                        </div>
                                    </div><div className="item-slick3 slick-slide" data-thumb="images/product-detail-02.jpg" data-slick-index={1} aria-hidden="true" tabIndex={-1} role="tabpanel" id="slick-slide11" aria-describedby="slick-slide-control11" style={{ width: '513px', position: 'relative', left: '-513px', top: '0px', zIndex: 998, opacity: 0 }}>
                                            <div className="wrap-pic-w pos-relative">
                                                <img src="images/product-detail-02.jpg" alt="IMG-PRODUCT" />
                                                <a className="flex-c-m size-108 how-pos1 bor0 fs-16 cl10 bg0 hov-btn3 trans-04" href="images/product-detail-02.jpg" tabIndex={-1}>
                                                    <i className="fa fa-expand" />
                                                </a>
                                            </div>
                                        </div><div className="item-slick3 slick-slide" data-thumb="images/product-detail-03.jpg" data-slick-index={2} aria-hidden="true" tabIndex={-1} role="tabpanel" id="slick-slide12" aria-describedby="slick-slide-control12" style={{ width: '513px', position: 'relative', left: '-1026px', top: '0px', zIndex: 998, opacity: 0 }}>
                                            <div className="wrap-pic-w pos-relative">
                                                <img src="images/product-detail-03.jpg" alt="IMG-PRODUCT" />
                                                <a className="flex-c-m size-108 how-pos1 bor0 fs-16 cl10 bg0 hov-btn3 trans-04" href="images/product-detail-03.jpg" tabIndex={-1}>
                                                    <i className="fa fa-expand" />
                                                </a>
                                            </div>
                                        </div></div></div>
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
                                Nulla eget sem vitae eros pharetra viverra. Nam vitae luctus ligula. Mauris consequat ornare feugiat.
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
                        </div>
                    </div>
                </div>
                <div className="bor10 m-t-50 p-t-43 p-b-40">
                    {/* Tab01 */}
                    <div className="tab01">
                        {/* Nav tabs */}
                        <ul className="nav nav-tabs" role="tablist">
                            <li className="nav-item p-b-10">
                                <a className="nav-link active" data-toggle="tab" href="#description" role="tab">Description</a>
                            </li>
                            <li className="nav-item p-b-10">
                                <a className="nav-link" data-toggle="tab" href="#information" role="tab">Additional information</a>
                            </li>
                            <li className="nav-item p-b-10">
                                <a className="nav-link" data-toggle="tab" href="#reviews" role="tab">Reviews (1)</a>
                            </li>
                        </ul>
                        {/* Tab panes */}
                        <div className="tab-content p-t-43">
                            {/* - */}
                            <div className="tab-pane fade show active" id="description" role="tabpanel">
                                <div className="how-pos2 p-lr-15-md">
                                    <p className="stext-102 cl6">
                                        Aenean sit amet gravida nisi. Nam fermentum est felis, quis feugiat nunc fringilla sit amet. Ut in blandit ipsum. Quisque luctus dui at ante aliquet, in hendrerit lectus interdum. Morbi elementum sapien rhoncus pretium maximus. Nulla lectus enim, cursus et elementum sed, sodales vitae eros. Ut ex quam, porta consequat interdum in, faucibus eu velit. Quisque rhoncus ex ac libero varius molestie. Aenean tempor sit amet orci nec iaculis. Cras sit amet nulla libero. Curabitur dignissim, nunc nec laoreet consequat, purus nunc porta lacus, vel efficitur tellus augue in ipsum. Cras in arcu sed metus rutrum iaculis. Nulla non tempor erat. Duis in egestas nunc.
              </p>
                                </div>
                            </div>
                            {/* - */}
                            <div className="tab-pane fade" id="information" role="tabpanel">
                                <div className="row">
                                    <div className="col-sm-10 col-md-8 col-lg-6 m-lr-auto">
                                        <ul className="p-lr-28 p-lr-15-sm">
                                            <li className="flex-w flex-t p-b-7">
                                                <span className="stext-102 cl3 size-205">
                                                    Weight
                    </span>
                                                <span className="stext-102 cl6 size-206">
                                                    0.79 kg
                    </span>
                                            </li>
                                            <li className="flex-w flex-t p-b-7">
                                                <span className="stext-102 cl3 size-205">
                                                    Dimensions
                    </span>
                                                <span className="stext-102 cl6 size-206">
                                                    110 x 33 x 100 cm
                    </span>
                                            </li>
                                            <li className="flex-w flex-t p-b-7">
                                                <span className="stext-102 cl3 size-205">
                                                    Materials
                    </span>
                                                <span className="stext-102 cl6 size-206">
                                                    60% cotton
                    </span>
                                            </li>
                                            <li className="flex-w flex-t p-b-7">
                                                <span className="stext-102 cl3 size-205">
                                                    Color
                    </span>
                                                <span className="stext-102 cl6 size-206">
                                                    Black, Blue, Grey, Green, Red, White
                    </span>
                                            </li>
                                            <li className="flex-w flex-t p-b-7">
                                                <span className="stext-102 cl3 size-205">
                                                    Size
                    </span>
                                                <span className="stext-102 cl6 size-206">
                                                    XL, L, M, S
                    </span>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                            {/* - */}
                            <div className="tab-pane fade" id="reviews" role="tabpanel">
                                <div className="row">
                                    <div className="col-sm-10 col-md-8 col-lg-6 m-lr-auto">
                                        <div className="p-b-30 m-lr-15-sm">
                                            {/* Review */}
                                            <div className="flex-w flex-t p-b-68">
                                                <div className="wrap-pic-s size-109 bor0 of-hidden m-r-18 m-t-6">
                                                    <img src="images/avatar-01.jpg" alt="AVATAR" />
                                                </div>
                                                <div className="size-207">
                                                    <div className="flex-w flex-sb-m p-b-17">
                                                        <span className="mtext-107 cl2 p-r-20">
                                                            Ariana Grande
                        </span>
                                                        <span className="fs-18 cl11">
                                                            <i className="zmdi zmdi-star" />
                                                            <i className="zmdi zmdi-star" />
                                                            <i className="zmdi zmdi-star" />
                                                            <i className="zmdi zmdi-star" />
                                                            <i className="zmdi zmdi-star-half" />
                                                        </span>
                                                    </div>
                                                    <p className="stext-102 cl6">
                                                        Quod autem in homine praestantissimum atque optimum est, id deseruit. Apud ceteros autem philosophos
                      </p>
                                                </div>
                                            </div>
                                            {/* Add review */}
                                            <form className="w-full">
                                                <h5 className="mtext-108 cl2 p-b-7">
                                                    Add a review
                    </h5>
                                                <p className="stext-102 cl6">
                                                    Your email address will not be published. Required fields are marked *
                    </p>
                                                <div className="flex-w flex-m p-t-50 p-b-23">
                                                    <span className="stext-102 cl3 m-r-16">
                                                        Your Rating
                      </span>
                                                    <span className="wrap-rating fs-18 cl11 pointer">
                                                        <i className="item-rating pointer zmdi zmdi-star-outline" />
                                                        <i className="item-rating pointer zmdi zmdi-star-outline" />
                                                        <i className="item-rating pointer zmdi zmdi-star-outline" />
                                                        <i className="item-rating pointer zmdi zmdi-star-outline" />
                                                        <i className="item-rating pointer zmdi zmdi-star-outline" />
                                                        <input className="dis-none" type="number" name="rating" />
                                                    </span>
                                                </div>
                                                <div className="row p-b-25">
                                                    <div className="col-12 p-b-5">
                                                        <label className="stext-102 cl3" htmlFor="review">Your review</label>
                                                        <textarea className="size-110 bor8 stext-102 cl2 p-lr-20 p-tb-10" id="review" name="review" defaultValue={""} />
                                                    </div>
                                                    <div className="col-sm-6 p-b-5">
                                                        <label className="stext-102 cl3" htmlFor="name">Name</label>
                                                        <input className="size-111 bor8 stext-102 cl2 p-lr-20" id="name" type="text" name="name" />
                                                    </div>
                                                    <div className="col-sm-6 p-b-5">
                                                        <label className="stext-102 cl3" htmlFor="email">Email</label>
                                                        <input className="size-111 bor8 stext-102 cl2 p-lr-20" id="email" type="text" name="email" />
                                                    </div>
                                                </div>
                                                <button className="flex-c-m stext-101 cl0 size-112 bg7 bor11 hov-btn3 p-lr-15 trans-04 m-b-10">
                                                    Submit
                    </button>
                                            </form>
                                        </div>
                                    </div>
                                </div>
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
