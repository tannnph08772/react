import React from 'react'
import PropTypes from 'prop-types'

const Blog = ({ products }) => {

    return (
        <div className="container">
            <div className="flex-w flex-sb-m p-t-52">
                <h1>Danh sách sản phẩm</h1>
            </div>
            <div className="row mb-3">
                {products.map(({ id, name, image, price }) => (
                    <div className="col-4">
                        <div className="card mb-2">
                            <img style={{ height: '300px', with: '100%' }} className="card-img-top" src={image} alt="Card image" />
                            <div className="card-body">
                                <h4 className="card-title">{name}</h4>
                                <p className="card-text">{price}</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>

    )
}

Blog.propTypes = {

}

export default Home
