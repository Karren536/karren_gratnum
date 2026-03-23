import { useState, useEffect } from "react";
import axios from "axios";

const SearchProductComponent = () => {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState("");
  const [error, setError] = useState("");

  const getProducts = async () => {
    setError("");
    setLoading("Loading products...");
    try {
      const response = await axios.get(
        "https://karren.alwaysdata.net/api/products/"
      );
      setProducts(response.data);
      setLoading("");
    } catch (error) {
      setError(error.message);
      setLoading("");
    }
  };

  useEffect(() => {
    getProducts();
  }, []);

  const filtered = products.filter((product) =>
    product.product_name.includes(search)
  );

  let resultContent;
  if (filtered.length === 0) {
    resultContent = <p className="text-muted">No products found.</p>;
  } else {
    resultContent = (
      <ul className="list-group">
        {filtered.map((product) => (
          <li
            key={product.id}
            className="list-group-item d-flex justify-content-between align-items-center"
          >
            <div>
              <h6>{product.product_name}</h6>
              <h4 className="text-muted">{product.product_description}</h4>
            </div>
            <span className="badge bg-warning">{product.product_cost}</span>
          </li>
        ))}
      </ul>
    );
  }

  return (
    <div className="mt-5 row">
      <form className="col-md-8">
        <input
          type="text"
          className="form-control form-control-lg"
          placeholder="Enter product name ..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </form>

      <h5 className="text-warning">{loading}</h5>
      <h5 className="text-danger">{error}</h5>
      <div className="col-md-12 mt-4">
        {resultContent}
    </div>
    </div>
  );
};

export default SearchProductComponent;
