// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import './Signin.css'
// import { NavLink } from "react-router-dom";


// const Signin = () => {
//     const history = useNavigate()
//     const [inputData, setInputData] = useState({
//         email: '', password: ''
//     })
//     const getData = (e) => {
//         // console.log(e.target.value);
//         setInputData(() => {
//             const { value, name } = e.target;
//             return {
//                 ...inputData,
//                 [name]: value
//             }
//         })
//     }
//     const [data, setData] = useState([])
//     const submitData = (e) => {
//         e.preventDefault();
//         const getUserData = localStorage.getItem("userDetails")
//         console.log(getUserData);

//         const { email, password } = inputData
//         if (email === "") {
//             alert("email field is required")
//         } else if (!email.includes('@')) {
//             alert("enter valid email address")
//         } else if (password === "") {
//             alert("password field is required")
//         } else {
//             if (getUserData && getUserData.length) {
//                 const UserData = JSON.parse(getUserData)
//                 const userLogin = UserData.filter((el, k) => {
//                     return el.email === email && el.password === password
//                 })
//                 if (userLogin.length === 0) {
//                     alert("Invalid username or password")
//                 } else {
//                     console.log("user login sucessfully");
//                     history("/Home")
//                 }
//             }
//         }

//     }
//     return (
//         <>
//             <div className="signup">
//                 <form className="signup-form-layout">
//                     <h2 className=" mb-6">Signin</h2>

//                     <div className="mb-3" >
//                         <label for="exampleInputEmail1" className="form-label">Email address</label>
//                         <input type="email" onChange={getData} name='email' className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
//                     </div>
//                     <div className="mb-3">
//                         <label for="exampleInputPassword1" className="form-label">Password</label>
//                         <input type="password" onChange={getData} name='password' className="form-control" id="exampleInputPassword1" />
//                     </div>


//                     <button type="submit" onClick={submitData} className="btn btn-primary col-lg-4">Signup</button>
//                     <p className="mt-3">Create a New Account? <span><NavLink to="/Signup">SignUp</NavLink></span></p>


//                 </form>
//             </div>
//         </>
//     )
// }
// export default Signin

import React, { useEffect, useState } from "react";
import './Signin.css'
import { NavLink, useNavigate } from "react-router-dom";

const Signin = () => {
    const getUserData = localStorage.getItem("userDetails")
    const navigate = useNavigate();



    const initialValues = { email: '', password: '' }
    const [formValues, setFormValues] = useState(initialValues)
    const [formErrors, setFormErrors] = useState({})
    const [isSubmit, setIsSubmit] = useState(false)
    const [data, setData] = useState([])

    const getData = (e) => {
        const { name, value } = e.target
        setFormValues({ ...formValues, [name]: value })
    }


    const submitDataSigin = (e) => {
        e.preventDefault()

        setFormErrors(validate(formValues))
        setIsSubmit(true)
    }
    useEffect(() => {
        console.log(formErrors);
        if (Object.keys(formErrors).length === 0 && isSubmit) {
            console.log(formValues);
        }
    }, [formErrors])
    const validate = (values) => {

        const errors = {};
        const regex = "^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$"

        if (!values.email) {
            errors.email = 'Email is required!'
        }
        //  else if (!regex.test(values.email)) {

        //     errors.email = 'Email is not valid!'
        // }

        if (!values.password) {
            errors.password = 'Password is required!'
        } else {


            if (getUserData && getUserData.length) {
                const UserData = JSON.parse(getUserData)
                const userLogin = UserData.filter((el, k) => {
                    return el.email === values.email && el.password === values.password
                })
                if (userLogin.length === 0) {
                    alert("Invalid username or password")
                } else {
                    console.log("user login sucessfully");
                    navigate('/Home')
                }
            }
        }
        return errors


    }

    return (
        <>
            <div className="signup">
                {/* <pre>{JSON.stringify(formValues, undefined, 2)}</pre> */}
                <form className="signup-form-layout" onSubmit={submitDataSigin}>
                    <h2 className=" mb-6">Signin</h2>

                    <div className="mb-3" >
                        <label for="exampleInputEmail1" className="form-label">Email address</label>
                        <input type="email" name='email' value={formValues.email} onChange={getData} className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
                        <p style={{ color: 'red' }}>{formErrors.email}</p>
                    </div>

                    <div className="mb-3">
                        <label for="exampleInputPassword1" className="form-label">Password</label>
                        <input type="password" name='password' value={formValues.password} onChange={getData} className="form-control" id="exampleInputPassword1" />
                        <p style={{ color: 'red' }}>{formErrors.password}</p>
                    </div>




                    <button type="submit" className="btn btn-primary col-lg-4">Signin</button>
                    <p className="mt-3">Already Have an Account <span><NavLink to="/Signup">SignUp</NavLink></span></p>

                </form>
            </div>
        </>
    )
}
export default Signin