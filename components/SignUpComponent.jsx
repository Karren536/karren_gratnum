import axios from "axios";
import { use, useState } from "react";
import { Link } from "react-router-dom";

const SignUpComponent =()=> {

    let [username,updateUser] =useState('')
    let [email, updateEmail] =useState('')
    let [phone,updatePhone]=useState('')
    let [password,updatePassword]=useState('')
    let [address, setAddress] = useState('')
    let [loading,setLoading]=useState('')
    let[error,setError]=useState('')
    let[success,setSuccess]=useState('')

    const handleSubmit = async (e)=> {
        e.preventDefault();
        console.log(username,email,phone,password)
        //alert user 
        setError("")
        setSuccess("")
        setLoading("submitting data please wait...")

        //try send data to backend API
        try {
            //create form data
            const user_data = new FormData();
            user_data.append("username",username);
            user_data.append("email",email);
            user_data.append("phone",phone);
            user_data.append("password",password);
            user_data.append("address",address);

            const response = await axios.post('https://karren.alwaysdata.net/api/signup',user_data)
            setLoading("")
            setSuccess("Account created")
            console.log(response)
        } catch (error) {
            console.log(error)
            setLoading('')
            setError(error.message);
        }
    }

    return (
        <div className="row justify-content-center mt-4">
            <div className="col-md-6 card shadow p-4">
                <h2>Create Account</h2>
                <h5 className="text-warning">{loading}</h5>
                <h5 className="text-danger">{error}</h5>
                <h5 className="text-success">{success}</h5>
                <form onSubmit={handleSubmit}>
                        <input type="text"
                            className="form-control my-3" 
                            placeholder="Enter Username" 
                            onChange={(e)=>{updateUser(e.target.value)}} 
                            required
                            value={username}
                        />
                        <input type="email" 
                            placeholder="Enter  Email" 
                            className="form-control my-3" 
                            onChange={(e)=>{updateEmail(e.target.value)}} 
                            required 
                            value={email}
                        />
                        <input type="tel" 
                            placeholder="Enter  Phone number" 
                            className="form-control my-3" 
                            onChange={(e)=>{updatePhone(e.target.value)}}
                            required 
                            value={phone}
                        />
                        <input type="password" 
                            placeholder="Enter Password" 
                            className="form-control my-3" 
                            onChange={(e)=>{updatePassword(e.target.value)}}
                            required 
                            value={password}
                        />
                        <input type="text" 
                            placeholder="Enter Address" 
                            className="form-control my-3" 
                            onChange={(e)=>{setAddress(e.target.value)}}
                            required 
                            value={address}
                        />
                        <button className="btn btn-secondary my-3">Sign Up</button>
                        <br />
                        <Link to="/login">Already has an account?Sign in</Link>
                </form>
            </div>
        </div>
    )
}

export default SignUpComponent;