import { useEffect, useState } from "react";
import NavbarComponent from "./NavbarComponent";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const GetProductComponent = () => {
    let [products, setProducts] = useState([]);
    let [loading, setLoading] = useState("");
    let [error, setError] = useState("");

    let navigator =useNavigate();

    //base url for image path to server
    const img_url ="https://karren.alwaysdata.net/static/images/"


    //create function to fetch products ferom server
    const getProducts = async () => {
        setError("");
        setLoading("Fetching products please wait...");
        try {
            const response = await axios.get("https://karren.alwaysdata.net/api/get_products")
            if (response.status === 200) {
                setLoading("")
                setProducts(response.data)
            }
            console.log(response)
        } catch (error) {
            setLoading("");
            setError(error.message);

        }
    }

    useEffect(() => {
        getProducts();
    }, [])
    return (
        <div>
            <NavbarComponent />
            <div className="row">
                <h3 className="mt-5">Available products</h3>
                <h6 className="text-danger">{error}</h6>
                <h6 className="text-warning">{loading}</h6>

                {products.map((product) => (
                    <div className="col-md-3 justify-content-center mb-4">
                        <div className="card shadow card-margin">
                            <img src={img_url+product.product_image} alt="" className="product_img mt-4" width= "100%" height="75%" />
                            <div className="card-body">
                                <h5 className="mt-2">{product.product_name}</h5>
                                <p className="text-muted">{product.product_description}</p>
                                <b className="text-warning">{product.product_cost}</b>
                                <br /><br />
                                <button onClick={()=> {navigator("/makepayment",{state:{product}})}} className="btn btn-dark">puchase now</button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default GetProductComponent;