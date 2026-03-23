import React,{useState} from "react"
import axios from "axios";
import NavbarComponent from "./NavbarComponent";
const AddProductComponent =()=> {
    let [productName, setProductName] = useState('')
    let [productCategory, setProductCategory] = useState('')
    let [productCost, setProductCost] = useState('')
    let [productImage, setProductImage] = useState(null)
    let [loading, setLoading] = useState('')
    let [error, setError] = useState('')
    let [success, setSuccess] = useState('')
    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(productName, productCategory, productCost)
        setError("")
        setSuccess("")
        setLoading("Adding product please wait...")

        try {
            const product_data = new FormData();
            product_data.append("name", productName);
            product_data.append("category", productCategory);
            product_data.append("cost", productCost);
            product_data.append("image", productImage);

            const response = await axios.post('https://karren.alwaysdata.net/api/add_product', product_data)
            console.log(response)
            setLoading('')
            setSuccess('Product added successfully!')
        } catch (error) {
            console.log(error)
            setLoading('')
            setError(error.message);
        }
    }
    return (
        <div className="row justify-content-center mt-4">
            <NavbarComponent />
            <div className="col-md-6 card shadow p-4">
                <h2>Add New Product</h2>
                <h5 className="text-warning">{loading}</h5>
                <h5 className="text-danger">{error}</h5>
                <h5 className="text-success">{success}</h5>
                <form onSubmit={handleSubmit}>
                        <input type="text"
                            className="form-control my-3" 
                            placeholder="Enter Product Name" 
                            onChange={(e)=>{setProductName(e.target.value)}} 
                            required
                            value={productName}
                        />
                        <select  
                            className="form-select" 
                            onChange={(e)=>{setProductCategory(e.target.value)}} 
                            required>
                            <option value="">Select Product Category</option>
                            <option value="TVs">televisions</option>
                            <option value="laptops">laptops</option>
                            <option value="accessories ">Accessories</option>
                        </select>
                        <input type="number"
                            placeholder="Enter Product Cost"
                            className="form-control my-3"
                            onChange={(e)=>{setProductCost(e.target.value)}}
                            required
                            value={productCost}
                        />
                        <input type="file" 
                            className="form-control my-3" 
                            onChange={(e)=>{setProductImage(e.target.files[0])}} 
                            required 
                        />
                        <button type="submit" className="btn btn-primary">Add Product</button>
                </form>
            </div>
        </div>
    )
}

export default AddProductComponent;