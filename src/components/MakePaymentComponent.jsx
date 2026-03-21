import { useLocation } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
const MakePaymentComponent =()=> {
    const {product}= useLocation().state ||{}
    console.log(product);

const handleSubmit = async(e)=> {
    e.preventDefault();
    setError("");
    setSuccess("");
    setLoading("please wait ...");

    try {
        const data = new FormData()
        data.append("amount",product.product_cost)
        data.append("phone",phone)

        const response = await axios.post("https://karren.alwaysdata.net/api/mpesa_payment",data)
        console.log(response)
        if (response.status === 200) {
            setLoading("")
            setSuccess(response.data.message)
        }
    } catch (error) {
        setLoading("")
        setError(error.message)
    }
}

    const img_url = "https://karren.alwaysdata.net/static/images/"
    let [phone,setPhone]=useState("")
    let [loading,setLoading]=useState("")
    let [error,setError]=useState("")
    let [success,setSuccess]=useState("")
    return (
        <div className="row justify-content-center mt-3">
            <h2>LIPA NA MPESA</h2>
            <div className="col-md-3">
                <img src={img_url+product.product_image} className="rounded img-thumbnail"alt="" />
            </div>
            <div className="col-md-3">
                <h2 className="text-dark">{product.product_name}</h2>
                <h5 className="text-primary">{product.product_category}</h5>
                <p className="text-muted">{product.product_description}</p>
                <h3 className="text-warning">{product.product_cost}</h3>
                <hr />
                <h6 className="text-warning">{loading}</h6>
                <h6 className="text-danger">{error}</h6>
                <h6 className="text-success">{success}</h6>
                <form onSubmit={handleSubmit}>
                    <input type="text" 
                        className="form-control"
                        readOnly
                        value={product.product_cost}
                        placeholder="Enter Amount" 
                    />
                    <br />
                    <input type="tel" 
                        className="form-control"
                        placeholder="Enter phone 254xxxxxxxxx" 
                        onChange={(e)=> setPhone(e.target.value)}
                        value={phone}
                    />
                    <br />

                    <button className="btn btn-dark">Pay Now</button>
                </form>
            </div>
        </div>
    )
}

export default MakePaymentComponent;