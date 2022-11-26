import React, { useState } from "react";
import './Signup.css'
import { NavLink } from "react-router-dom";
const Signup = () => {
    const [inputData, setInputData] = useState({
        fullName: '', email: '', password: '', confirmPassword: ''
    })
    const getData = (e) => {
        // console.log(e.target.value);
        setInputData(() => {
            const { value, name } = e.target;
            return {
                ...inputData,
                [name]: value
            }
        })
    }
    const [data, setData] = useState([])
    const submitData = (e) => {
        e.preventDefault();
        const { fullName, email, password, confirmPassword } = inputData
        if (fullName === "") {
            alert("name field is required")
        } else if (email === "") {
            alert("email field is required")
        } else if (!email.includes('@')) {
            alert("enter valid email address")
        } else if (password === "") {
            alert("password field is required")
        } else if (confirmPassword === "") {
            alert("confirmPassword field is required")
        } else if (password != confirmPassword) {
            alert("password and confirm password must be the same")
        } else {
            alert("data added sucessfully");
            localStorage.setItem("userDetails", JSON.stringify([...data, inputData]))
        }

    }
    return (
        <>
            <div className="signup">
                <form className="signup-form-layout">
                    <h2 className=" mb-6">Signup</h2>
                    <div className="mb-3" >
                        <label for="exampleInputFullName" className="form-label">FullName</label>
                        <input type="text" onChange={getData} name='fullName' className="form-control" id="exampleInputFullName" aria-describedby="emailHelp" />
                    </div>
                    <div className="mb-3" >
                        <label for="exampleInputEmail1" className="form-label">Email address</label>
                        <input type="email" onChange={getData} name='email' className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
                    </div>
                    <div className="mb-3">
                        <label for="exampleInputPassword1" className="form-label">Password</label>
                        <input type="password" onChange={getData} name='password' className="form-control" id="exampleInputPassword1" />
                    </div>
                    <div className="mb-3">
                        <label for="exampleInputConfirmPassword1" className="form-label">Confirm Password</label>
                        <input type="password" onChange={getData} name='confirmPassword' className="form-control " id="exampleInputConfirmPassword1" />
                    </div>

                    <button type="submit" onClick={submitData} className="btn btn-primary col-lg-4">Signup</button>
                    <p className="mt-3">Already Have an Account <span><NavLink to="/Signin">SignIn</NavLink></span></p>

                </form>
            </div>
        </>
    )
}
export default Signup