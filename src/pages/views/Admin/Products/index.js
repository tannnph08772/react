import React from 'react'
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import swal from 'sweetalert';

const ProductsManager = ({ products, onRemove }) => {
    const removeHandle = (id) => {
        swal({
            title: "Bạn có muốn xóa?",
            text: "Bạn muốn rời khỏi trang?",
            icon: "warning",
            dangerMode: true,
          })
          .then(willDelete => {
            if (willDelete) {
                onRemove(id)
                swal("Deleted!", "Bạn đã xóa sản phẩm!",{
                    icon: "success"
                } );
            }else{
                swal("Lưu thành công");
            }
          });
        
    }
    return (
        <div>
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h1 className="h3 mb-2 text-gray-800">Quản lý sản phẩm</h1>
                <Link to="/admin/product/add" className="btn btn-info">Thêm sản phẩm</Link>
            </div>
            <div className="card shadow mb-4">
                <div className="card-body">
                    <div className="table-responsive">
                        <table className="table table-bordered table-striped">
                            <thead>
                                <tr>
                                    <th className="text-center" scope="col">STT</th>
                                    <th className="text-center" scope="col">Tên sản phẩm</th>
                                    <th className="text-center" scope="col">Ảnh sản phẩm</th>
                                    <th className="text-center" scope="col">Giá</th>
                                    <th className="text-center" scope="col" width="150">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {products.map(({ id, name, image, price }, index) => (
                                    <tr className="text-center" key={index}>
                                        <td scope="row">{index + 1}</td>
                                        <td>{name}</td>
                                        <td><img src={image} alt="" width="50" /></td>
                                        <td>{price}</td>
                                        <td>
                                            <Link className="btn btn-warning" to={`/admin/product/${id}`}>Sửa</Link>
                                            <button className="btn btn-danger ml-3" onClick={() => removeHandle(id)}>Xóa</button>
                                        </td>
                                    </tr>
                                ))}

                            </tbody>
                        </table>

                    </div>
                </div>
            </div>
        </div>
    )
}

ProductsManager.propTypes = {
    products: PropTypes.array,
    onRemove: PropTypes.func
}

export default ProductsManager
