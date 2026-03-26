import { useEffect, useState } from "react";
import NavbarComponent from "./NavbarComponent";
import axios from "axios";
import { useNavigate } from "react-router-dom";
// import 'bootstrap-icons/font/bootstrap-icons.css';

const GetProductsComponent = () => {
  let [products, setProducts] = useState([]);
  let [loading, setLoading] = useState("");
  let [error, setError] = useState("");
  let [cameras, setCameras] = useState([]);
  let [lenses, setLenses] = useState([]);
  let [accessories, setAccessories] = useState([]);
  let [sdcards,setSdcards]= useState([]);
  let [search_word, setSearchWord] = useState("");
  let [filtered_products, setFilteredProducts] = useState([]);

  let navigator = useNavigate();

  // base url for image path from server
  const img_url = "https://karren.alwaysdata.net/static/images/";

  // create function to fetch products from server
  const getProducts = async () => {
    console.log("getting products");
    setError("");
    setLoading("Fetching products. Please wait...");

    try {
      const response = await axios.get(
        "https://karren.alwaysdata.net/api/get_products",
      );
      console.log(response);
      if (response.status === 200) {
        setLoading("");
        setProducts(response.data);

        let cameras_cat = response.data.filter(
          (product) => product.product_category === "cameras",
        );
        setCameras(cameras_cat);

        let lenses_cat = response.data.filter(
          (product) => product.product_category === "lenses",
        );
        setLenses(lenses_cat);

        let accessories_cat = response.data.filter(
          product => product.product_category ==="accessories",
        );
        setAccessories(accessories_cat)

        let sdcards_cat = response.data.filter(
          (product) => product.product_category ==="SDcards"
        )
        setSdcards(sdcards_cat)
      }
    } catch (error) {
      setLoading("");
      setError(error.message);
    }
  };

  useEffect(() => {
    getProducts();
  }, []);

  const handleSearch = (search_word) => {
    let filtered = products.filter((product) =>
      product.product_name.toLowerCase().includes(search_word.toLowerCase()),
    );
    setFilteredProducts(filtered);
  };

  useEffect(() => {
    handleSearch(search_word);
  }, [search_word]);

  return (
    <div className="container-fluid">
      <NavbarComponent />
      <div className="row">
        <h3 className="mt-5">Available Products</h3>
        <h6 className="text-warning">{loading}</h6>
        <h6 className="text-danger">{error}</h6>

        <div className="row justify-content-center my-3">
          <div className="col-md-3">
            <input
              type="text"
              placeholder="Search Product by name"
              className="form-control"
              value={search_word}
              onChange={(e) => {
                setSearchWord(e.target.value);
              }}
            />
          </div>
        </div>

        {filtered_products.map((product) => (
          <div className="col-md-3 justify-content-center mb-4">
            <div className="card shadow card-margin">
              <img
                src={img_url + product.product_image}
                alt=""
                className="product_img mt-4"
                width="100%"
                height="100%"
              />

              <div className="card-body">
                <h5 className="mt-2">{product.product_name}</h5>
                <p className="text-muted">{product.product_description}</p>
                <b className="text-warning">{product.product_cost}</b>
                <br />
                <br />
                <button
                  className="btn btn-dark"
                  onClick={() => {
                    navigator("/makepayment", { state: { product } });
                  }}
                >
                  Purchase Now
                </button>
              </div>
            </div>
          </div>
        ))}

        <h2 className="text-center text-white bg-dark my-2 p-4">Cameras</h2>

        {cameras.map((product) => (
          <div className="col-md-3 justify-content-center mb-4">
            <div className="card shadow card-margin">
              <img
                src={img_url + product.product_image}
                alt=""
                className="product_img mt-4"
                width="100%"
                height="100%"
              />

              <div className="card-body">
                <h5 className="mt-2">{product.product_name}</h5>
                <p className="text-muted">{product.product_description}</p>
                <b className="text-warning">{product.product_cost}</b>
                <br />
                <br />
                <button
                  className="btn btn-dark"
                  onClick={() => {
                    navigator("/makepayment", { state: { product } });
                  }}
                >
                  Purchase Now
                </button>
              </div>
            </div>
          </div>
        ))}

        <h2 className="text-center text-white bg-dark my-2 p-4">Lenses</h2>

        {lenses.map((product) => (
          <div className="col-md-3 justify-content-center mb-4">
            <div className="card shadow card-margin">
              <img
                src={img_url + product.product_image}
                alt=""
                className="product_img mt-4"
                width="100%"
                height="100%"
              />

              <div className="card-body">
                <h5 className="mt-2">{product.product_name}</h5>
                <p className="text-muted">{product.product_description}</p>
                <b className="text-warning">{product.product_cost}</b>
                <br />
                <br />
                <button
                  className="btn btn-dark"
                  onClick={() => {
                    navigator("/makepayment", { state: { product } });
                  }}
                >
                  Purchase Now
                </button>
              </div>
            </div>
          </div>
        ))}

        <h2 className="text-center text-white bg-dark my-2 p-4">Accessories</h2>
        {accessories.map((product) => (
          <div className="col-md-3 justify-content-center mb-4">
            <div className="card shadow card-margin">
              <img
                src={img_url + product.product_image}
                alt=""
                className="product_img mt-4"
                width="100%"
                height="100%"
              />

              <div className="card-body">
                <h5 className="mt-2">{product.product_name}</h5>
                <p className="text-muted">{product.product_description}</p>
                <b className="text-warning">{product.product_cost}</b>
                <br />
                <br />
                <button
                  className="btn btn-dark"
                  onClick={() => {
                    navigator("/makepayment", { state: { product } });
                  }}
                >
                  Purchase Now
                </button>
              </div>
            </div>
          </div>
        ))}

        <h2 className="text-center text-white bg-dark my-2 p-4">SDcards</h2>
        {sdcards.map((product) => (
          <div className="col-md-3 justify-content-center mb-4">
            <div className="card shadow card-margin">
              <img
                src={img_url + product.product_image}
                alt=""
                className="product_img mt-4"
                width="100%"
                height="100%"
              />

              <div className="card-body">
                <h5 className="mt-2">{product.product_name}</h5>
                <p className="text-muted">{product.product_description}</p>
                <b className="text-warning">{product.product_cost}</b>
                <br />
                <br />
                <button
                  className="btn btn-dark"
                  onClick={() => {
                    navigator("/makepayment", { state: { product } });
                  }}
                >
                  Purchase Now
                </button>
              </div>
            </div>
          </div>
        ))}
    </div>
  </div>
  );
};

export default GetProductsComponent;