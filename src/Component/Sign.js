import React, { useState } from 'react'
import axios from 'axios';
export default function Sign() {
    // http://localhost:5000/api/vi/Create
    const [name, setname] = useState("");
    const [email, setemail] = useState("")
    const [password, setpassword] = useState("")
    const [number, setnumber] = useState("");
    const [image, setimage] = useState(null)
    const SubmitHandle = async (e) => {
        e.preventDefault()
        const formData = new FormData();
        formData.append('name', name);
        formData.append('email', email);
        formData.append('password', password);
        formData.append('number', number);
        formData.append('image', image)
        try {
            const response = await axios.post("http://localhost:5000/api/vi/Create", formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            const result = await response.data;

            console.log(result)

        } catch (error) {
            console.error('Error creating user:', error);

        }
    }
    return (
        <div>
            <div className='container mt-5'>
                <h1>Sign Up</h1>
                <form onSubmit={SubmitHandle}>
                    <div class="mb-3">
                        <label for="text" class="form-label">image</label>
                        <input type="file" onChange={(e) => setimage(e.target.files[0])} class="form-control" id="text" aria-describedby="text" />
                    </div>
                    <div class="mb-3">
                        <label for="text" class="form-label">Name</label>
                        <input type="text" value={name} onChange={(e) => setname(e.target.value)} class="form-control" id="text" aria-describedby="text" />
                    </div>
                    <div class="mb-3">
                        <label for="exampleInputEmail1" class="form-label">Email address</label>
                        <input type="email" value={email} onChange={(e) => setemail(e.target.value)} class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
                        <div id="emailHelp" class="form-text">We'll never share your email with anyone else.</div>
                    </div>
                    <div class="mb-3">
                        <label for="exampleInputPassword1" class="form-label">Password</label>
                        <input type="password" value={password} onChange={(e) => setpassword(e.target.value)} class="form-control" id="exampleInputPassword1" />
                    </div>
                    <div class="mb-3">
                        <label for="text" class="form-label">Number</label>
                        <input type="text" value={number} onChange={(e) => setnumber(e.target.value)} class="form-control" id="text" />
                    </div>
                    <div class="mb-3 form-check">
                        <input type="checkbox" class="form-check-input" id="exampleCheck1" />
                        <label class="form-check-label" for="exampleCheck1">Check me out</label>
                    </div>
                    <button type="submit" class="btn btn-primary">Submit</button>
                </form>
            </div>
        </div>
    )
}
