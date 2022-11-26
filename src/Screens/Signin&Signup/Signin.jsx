import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import './Signin.css'

const Signin = () => {
    const history = useNavigate()
    const [inputData, setInputData] = useState({
        email: '', password: ''
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
        const getUserData = localStorage.getItem("userDetails")
        console.log(getUserData);

        const { email, password } = inputData
        if (email === "") {
            alert("email field is required")
        } else if (!email.includes('@')) {
            alert("enter valid email address")
        } else if (password === "") {
            alert("password field is required")
        } else {
            if (getUserData && getUserData.length) {
                const UserData = JSON.parse(getUserData)
                const userLogin = UserData.filter((el, k) => {
                    return el.email === email && el.password === password
                })
                if (userLogin.length === 0) {
                    alert("Invalid username or password")
                } else {
                    console.log("user login sucessfully");
                    history("/Home")
                }
            }
        }

    }
    return (
        <>
            <div className="signup">
                <form className="signup-form-layout">
                    <h2 className=" mb-6">Signin</h2>

                    <div className="mb-3" >
                        <label for="exampleInputEmail1" className="form-label">Email address</label>
                        <input type="email" onChange={getData} name='email' className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
                    </div>
                    <div className="mb-3">
                        <label for="exampleInputPassword1" className="form-label">Password</label>
                        <input type="password" onChange={getData} name='password' className="form-control" id="exampleInputPassword1" />
                    </div>


                    <button type="submit" onClick={submitData} className="btn btn-primary col-lg-4">Signup</button>
                    <p className="mt-3">Already Have an Account <span>SignIn</span></p>

                </form>
            </div>
        </>
    )
}
export default Signin