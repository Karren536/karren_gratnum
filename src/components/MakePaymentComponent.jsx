import axios from "axios";
import { useState } from "react"
import { useLocation } from "react-router-dom"
import { useNavigate } from "react-router-dom";
const MakePaymentComponent =()=> {
    let [error, setError] = useState('')
    let [loading, setLoading] = useState('')
    let [phone, setPhone] = useState('')
    let [success, setSuccess] = useState('')
    let [amount, setAmount] = useState('')
    

    let navigator = useNavigate()

    const img_url = "https://karren.alwaysdata.net/static/images/"

    const {product} = useLocation().state || {}
    const handleSubmit = async(e) => {
        e.preventDefault()
        setError("")
        setLoading("Please wait...")
        setSuccess("")
        try {
            const data = new FormData()
            data.append("phone", phone)
            data.append("amount", product.product_cost)
            const response = await axios.post("https://karren.alwaysdata.net/api/payments/", data)
            setSuccess(response.data.message)
        } catch (error) {
            setLoading("")
            setError(error.message)
            
        }
    }

    return (
        <div className="row justify-content mt-3">            
        <h2>LIPA NA MPESA</h2>
        <div className="col-md-3">
            <img src={img_url+product.product_image} className="rounded img-thumbnail" />
        </div>
        <div className="col-md-6">
            <h5 className="text-primary">{product.product_name}</h5>
            <p className="text-muted">{product.product_description}</p>
            <h3 className="text-warning">{product.product_cost}</h3>
            <h5 className="text-info">{loading} </h5>
            <h5 className="text-danger mt-2">{error}</h5>
            <h5 className="text-success mt-2">{success}</h5>
            <form onSubmit={handleSubmit}>
                <input type="text"
                    className="form-control"
                    placeholder="Enter amount" 
                    value={product.product_cost} 
                    readOnly
                    onChange={(e)=>{setAmount(e.target.value)}} 
                />
                <input type="text" 
                    placeholder="Enter phone number" 
                    className="form-control mt-4" 
                    value={phone} 
                    onChange={(e)=>{setPhone(e.target.value)}} 
                />
            </form>
            <br /><br />
            <button className="btn btn-dark" onClick={handleSubmit}>Pay Now</button>
            <br /><br />

            <button
                  className="btn btn-dark"
                  onClick={() => {
                    navigator("/trackdelivery", { state: { product } });
                  }}
                >
                  Track Delivery
                </button>
            
        </div>
        </div>
    )
}

export default MakePaymentComponent;