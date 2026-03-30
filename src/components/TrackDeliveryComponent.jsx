import { useState } from "react";
import { useLocation } from "react-router-dom";
import NavbarComponent from "./NavbarComponent";
import FooterComponent from "./FooterComponent";

const TrackDeliveryComponent = () => {
  const [address, setAddress] = useState("");
  const [loading, setLoading] = useState("");
  const [error, setError] = useState("");
  const [status, setStatus] = useState("");

  const { product } = useLocation().state || {};
  const img_url = "https://karren.alwaysdata.net/static/images/";

  const handleTrack = async (e) => {
    e.preventDefault();
    setError("");
    setStatus("");
    setLoading("please wait as we trace the delivery...");

    setTimeout(() => {
      setLoading("");
      setStatus("Delivery is being prepared.");
    }, 500);
  };
  try {
    const delivery = JSON.parse(localStorage.getItem("delivery_status")) || {};
    if (delivery[product.id]) {
      setStatus(delivery[product.id]);
    }
  } catch (error) {
    setLoading("");
    setError(error.message);
  }

  return (
    <div className="row justify-content mt-3">
      <NavbarComponent/>
      <h5 className="text-warning">{loading}</h5>
      <h5 className="text-danger mt-2">{error}</h5>
      <h5 className="text-success mt-2">{status}</h5>

      
          <div className="col-md-3">
            <img
              src={img_url + product.product_image}
              className="rounded img-thumbnail"
              alt={product.product_name}
            />
          </div>
          <div className="col-md-6">
            <h5 className="text-primary">{product.product_name}</h5>
            <p className="text-muted">{product.product_description}</p>
            <h3 className="text-warning">{product.product_cost}</h3>
          </div>
        
      

      <div className="col-md-9 mt-4">
        <form onSubmit={handleTrack}>
          <input
            className="form-control"
            type="text"
            placeholder="Enter delivery address"
            value={address}
            required
            onChange={(e) => setAddress(e.target.value)}
          />
          <button className="btn btn-dark mt-3" type="submit">
            Track Delivery
          </button>
        </form>

      </div>
      <FooterComponent />
    </div>
  );
};

export default TrackDeliveryComponent;
