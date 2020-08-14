import React, { useState, useEffect } from 'react';
import Pagination from './components/Pagination';
import axios from 'axios';
import Routers from './routers';

function App() {
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(5);
  const [products, setProduct] = useState([]);

  useEffect(() => {
      loadProducts();
  }, []);

  const loadProducts = async () => {
      const result = await axios.get("http://localhost:8080/products");
      setProduct(result.data.reverse());
      setLoading(false);
  };
    // Get current posts
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentProduct = products.slice(indexOfFirstPost, indexOfLastPost);

  // Change page
  const paginate = pageNumber => setCurrentPage(pageNumber);
  return (
    <div className="App">
      <Routers products={currentProduct}
        postsPerPage={postsPerPage}
        totalPosts={products.length}
        paginate={paginate}
        />
    </div>
  )

}
export default App;