import { useEffect} from "react";
import NavbarComponent from "./NavbarComponent";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

const GetProductComponent =()=> {
    let [products,setProducts] = useState([])
    let [loading,setLoading] = useState("")
    let [error,setError] = useState("")
    let navigator = useNavigate()

    const img_url = "https://karren.alwaysdata.net/static/images/"

        const getProducts = async()=>{ 
            setError("")            
            setLoading("Fetching products...")
            try {
                let response = await axios.get("https://karren.alwaysdata.net/api/products/")
                if (response.status === 200) {
                    setLoading("")
                    setProducts(response.data)
                    
                }
            } catch (error) {
                setLoading("")
                setError(error.message)
            }
        }
        useEffect(()=>{
            getProducts()
        },[])
    
    return (
        <div>
            <NavbarComponent />
            <div className="row">
                    <h3 className="mt-5">Available products</h3>
                    <h5 className="text-warning">{loading}</h5>
                    <h5 className="text-danger">{error}</h5>
                    {products.map((product)=>{
                        return (
                            <div className="col-md-3 mt-4" >
                                <div className="card shadow-margim">
                                    <img src={img_url+product.product_image} className="product-img mt-4" />
                                    <div className="card-body">
                                        <h5 className="mt-2">{product.product_name}</h5>
                                        <p className="text-muted">{product.product_description}</p>
                                        <b className="text-warning">{product.product_cost}</b>
                                        <br /><br />
                                        <button className="btn btn-dark me-2" onClick={()=>{navigator("/makepayment",{state:{product: product}})}}>Buy Now</button>
                                        <button className="btn btn-primary" onClick={()=>{navigator("/trackdelivery",{state:{product: product}})}}>Track Delivery</button>
                                    </div>
                                </div>
                            </div>
                        )
                    })}
            </div>
        </div>
    )
}

export default GetProductComponent;