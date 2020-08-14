import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom';

const Home = ({ products }) => {

    return (
        <div className="container">
            <div className="flex-w flex-sb-m p-t-52">
                <h1>Danh sách sản phẩm</h1>
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
                                <p className="card-text">{price}</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>

    )
}

Home.propTypes = {

}

export default Home
