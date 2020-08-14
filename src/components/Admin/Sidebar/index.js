import React from 'react'
import { Link } from 'react-router-dom';
const Sidebar = props => {
    return (
        <ul className="navbar-nav bg-gradient-dark sidebar sidebar-dark accordion" id="accordionSidebar">
            {/* Sidebar - Brand */}
            <Link className="sidebar-brand d-flex align-items-center justify-content-center" to="/admin">
                <div className="sidebar-brand-icon rotate-n-15">
                    <i className="fas fa-laugh-wink" />
                </div>
                <div className="sidebar-brand-text mx-3">SB Admin <sup>2</sup></div>
            </Link>
            <hr className="sidebar-divider my-0" />
            <li className="nav-item border-bottom">
                <Link className="nav-link" to="/admin">
                    <i className="fas fa-fw fa-tachometer-alt" />
                    <span>Bảng điều khiển</span></Link>
            </li>
            <li className="nav-item border-bottom">
                <Link className="nav-link" to="/admin/products">
                    <i className="fas fa-fw fa-tachometer-alt" />
                    <span>Quản lý sản phẩm</span></Link>
            </li>
            <li className="nav-item border-bottom">
                <Link className="nav-link" to="/admin/blogs">
                    <i className="fas fa-fw fa-tachometer-alt" />
                    <span>Quản lý bài viết</span></Link>
            </li>
            <li className="nav-item border-bottom">
                <Link className="nav-link" to="/admin/categories">
                    <i className="fas fa-fw fa-tachometer-alt" />
                    <span>Quản lý danh mục sản phẩm</span></Link>
            </li>
            <li className="nav-item border-bottom">
                <Link className="nav-link" to="/admin/cateblogs">
                    <i className="fas fa-fw fa-tachometer-alt" />
                    <span>Quản lý danh mục bài viết</span></Link>
            </li>
            <li className="nav-item border-bottom">
                <Link className="nav-link" to="/admin/contact">
                    <i className="fas fa-fw fa-tachometer-alt" />
                    <span>Quản lý phản hồi của khách hàng</span></Link>
            </li>

        </ul>
    )
}

export default Sidebar
