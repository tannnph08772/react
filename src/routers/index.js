import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import LayoutMain from '../pages/layouts/LayoutMain'
import LayoutAdmin from '../pages/layouts/LayoutAdmin'
//Admin
import Dashboard from '../pages/views/Admin/Dashboard'
import Products from '../pages/views/Admin/ProductManage/Products'

//Views
import Home from '../pages/views/Main/Home'
import EditProductForm from '../pages/views/Admin/ProductManage/EditProductForm';
import AddProductForm from '../pages/views/Admin/ProductManage/AddProductForm';
import DetailProduct from '../pages/views/Main/DetailProduct';
import Blog from '../pages/views/Admin/BlogManage/Blog';
import EditBlog from '../pages/views/Admin/BlogManage/EditBlog';
import AddBlog from '../pages/views/Admin/BlogManage/AddBlog';
import BlogClient from '../pages/views/Main/BlogClient';
import Category from '../pages/views/Admin/ProductManage/Categories';
import DetailBlog from '../pages/views/Main/DetailBlog';
import AddCate from '../pages/views/Admin/ProductManage/AddCate';
import CateBlog from '../pages/views/Admin/BlogManage/CateBlog';
import EditCategory from '../pages/views/Admin/ProductManage/Categories/EditCategory';
import AddCateBlog from '../pages/views/Admin/BlogManage/AddCateBlog';
import EditCateBlog from '../pages/views/Admin/BlogManage/EditCateBlog';
import About from '../pages/views/Main/About';
import Shop from '../pages/views/Main/Shop';
import Contact from '../pages/views/Main/Contact';
import FiterProduct from '../pages/views/Main/FiterProduct';
import FilterBlog from '../pages/views/Main/FilterBlog';
import Contacts from '../pages/views/Admin/Contact';
import Cart from '../pages/views/Main/Cart/Cart';


const Routers = ({products,currentProduct,postsPerPage,totalPosts,paginate}) => {
    return (
        <Router>
            <Switch>
                <Route path="/admin/:path?/:path?/:path?" exact>
                    <LayoutAdmin>
                        <Switch>
                            <Route path='/admin' exact>
                                <Dashboard />
                            </Route>
                            <Route path="/admin/products">
                                <Products  products={currentProduct} postsPerPage={postsPerPage}
                                    totalPosts={products.length}
                                    paginate={paginate}/>
                            </Route>
                            <Route path="/admin/product/add">
                                <AddProductForm products={products}/>
                            </Route>
                            <Route path="/admin/product/:id">
                                <EditProductForm products={products}/>
                            </Route>
                            <Route path="/admin/blogs">
                                 <Blog/>
                            </Route>
                            <Route path="/admin/blog/add">
                                 <AddBlog/>
                            </Route>
                            <Route path="/admin/blog/:id">
                                 <EditBlog/>
                            </Route>
                            <Route path="/admin/categories">
                                 <Category/>
                            </Route>
                            <Route path="/admin/category/add">
                                 <AddCate/>
                            </Route>
                            <Route path="/admin/cateblogs">
                                 <CateBlog/>
                            </Route>
                            <Route path="/admin/cate_blog/add">
                                <AddCateBlog/>
                            </Route>
                            <Route path="/admin/category/:id">
                                 <EditCategory/>
                            </Route>
                            <Route path="/admin/cateblog/:id">
                                 <EditCateBlog/>
                            </Route>
                            <Route path="/admin/contact">
                                 <Contacts/>
                            </Route>
                        </Switch>
                    </LayoutAdmin>
                </Route>
                <Route>
                    <LayoutMain>
                        <Switch>
                            <Route path="/" exact>
                                <Home />
                            </Route>
                            <Route path="/shop">
                               <Shop/>
                            </Route>
                            <Route path="/blog">
                                <BlogClient/>
                            </Route>
                            <Route path="/detailProduct/:id">
                               <DetailProduct/>
                            </Route>
                            <Route path="/detailBlog/:id">
                               <DetailBlog/>
                            </Route>
                            <Route path="/about">
                               <About/>
                            </Route>
                            <Route path="/contact">
                               <Contact/>
                            </Route>
                            <Route path="/filter-product/:id">
                               <FiterProduct/>
                            </Route>
                            <Route path="/filter-blog/:id">
                               <FilterBlog/>
                            </Route>
                            <Route path="/shopping-cart">
                               <Cart/>
                            </Route>
                        </Switch>
                    </LayoutMain>
                </Route>
            </Switch>
        </Router>
    )
}

Routers.propTypes = {

}

export default Routers
