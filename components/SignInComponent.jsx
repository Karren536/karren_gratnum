import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const SignInComponent = () => {
    let [email, updateEmail] = useState('');
    let [password, updatePassword] = useState('');
    let [loading, setLoading] = useState("")
    let [error, setError] = useState("")
    let [success, setSuccess] = useState("")

    //use hook usenavigate tochange the url
    let navigator =useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault();

        setError('')
        setSuccess('')
        setLoading("please wait...")

        try {
            //create the form data
            const user_data = new FormData();
            //add the email and password to the userdata
            user_data.append("email", email)
            user_data.append("password", password)

            //use axios to send data to server
            const response = await axios.post("https://duncanm.alwaysdata.net/api/signin", user_data)
            console.log(response)
            if (response.data.user) {
                setLoading("")
                setSuccess(response.data.message)
                localStorage.setItem("user",JSON.stringify(response.data.user))
                navigator("/")
            } else {
                setLoading("")
                setError(response.data.message)
            }
        } catch (error) {
            setLoading("")
            setError(error.message)
        }
    }

    return (
        <div className="row justify-content-center mt-4">
            <div className="col-md-6 card shadow p-4">
                <h2>Sign In</h2>
                <h5 className="text-warning">{loading}</h5>
                <h5 className="text-danger">{error}</h5>
                <h5 className="text-success">{success}</h5>
                <form onSubmit={handleSubmit}>
                    <input type="email"
                        className="form-control my-3"
                        placeholder="Please enter email"
                        onChange={(e) => { updateEmail(e.target.value) }}
                        required
                        value={email}
                    />
                    <input type="password"
                        className="form-control my-3"
                        placeholder="Please enter password"
                        onChange={(e) => { updatePassword(e.target.value) }}
                        required
                        value={password}
                    />
                    <br />
                    <button className="btn btn-secondary"> Sign In</button>
                    <br />
                    <Link to="/signup">Do not have an account?Sign Up</Link>

                </form>
            </div>
        </div>
    )
}

export default SignInComponent;