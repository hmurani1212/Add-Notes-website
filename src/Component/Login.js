import React, { useState } from 'react'
import axios from 'axios';
export default function Login() {
    // http://localhost:5000/api/vi/Create
    const [email, setemail] = useState("")
    const [password, setpassword] = useState("")
    const [errorMessage, setErrorMessage] = useState("");
    const SubmitHandle = async (e) => {
        e.preventDefault()
        try {
            const response = await axios.post("http://localhost:5000/api/vi/Login", {
                email,
                password,
            }, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            const result = await response.data;
            if (result.success) {
                localStorage.setItem('Token', result.AuthToken)
            }
            console.log(result)
        } catch (error) {
            if (error.response && error.response.status === 400) {
                setErrorMessage("User does not exist. Please check your input.");
            } else {
                setErrorMessage("An error occurred. Please try again later.");
            }


        }
    }
    return (
        <div>
            <div className='container mt-5'>
                <h1>Sign Up</h1>
                <form onSubmit={SubmitHandle}>
                    <div class="mb-3">
                        <label for="exampleInputEmail1" class="form-label">Email address</label>
                        <input type="email" value={email} onChange={(e) => setemail(e.target.value)} class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
                        <div id="emailHelp" class="form-text">We'll never share your email with anyone else.</div>
                    </div>
                    <div class="mb-3">
                        <label for="exampleInputPassword1" class="form-label">Password</label>
                        <input type="password" value={password} onChange={(e) => setpassword(e.target.value)} class="form-control" id="exampleInputPassword1" />
                    </div>
                    <h3 className='text-danger'>{errorMessage}</h3>
                    <button type="submit" class="btn btn-primary">Submit</button>
                </form>
            </div>
        </div>
    )
}
