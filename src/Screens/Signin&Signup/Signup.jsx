// import React, { useState } from "react";
// import './Signup.css'
// import { NavLink } from "react-router-dom";
// const Signup = () => {
//     const [inputData, setInputData] = useState({
//         fullName: '', email: '', password: '', confirmPassword: ''
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
//         const { fullName, email, password, confirmPassword } = inputData
//         if (fullName === "") {
//             alert("name field is required")
//         } else if (email === "") {
//             alert("email field is required")
//         } else if (!email.includes('@')) {
//             alert("enter valid email address")
//         } else if (password === "") {
//             alert("password field is required")
//         } else if (confirmPassword === "") {
//             alert("confirmPassword field is required")
//         } else if (password != confirmPassword) {
//             alert("password and confirm password must be the same")
//         } else {
//             alert("data added sucessfully");
//             localStorage.setItem("userDetails", JSON.stringify([...data, inputData]))
//         }

//     }
//     return (
//         <>
//             <div className="signup">
//                 <form className="signup-form-layout">
//                     <h2 className=" mb-6">Signup</h2>
//                     <div className="mb-3" >
//                         <label for="exampleInputFullName" className="form-label">FullName</label>
//                         <input type="text" onChange={getData} name='fullName' className="form-control" id="exampleInputFullName" aria-describedby="emailHelp" />
//                     </div>
//                     <div className="mb-3" >
//                         <label for="exampleInputEmail1" className="form-label">Email address</label>
//                         <input type="email" onChange={getData} name='email' className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
//                     </div>
//                     <div className="mb-3">
//                         <label for="exampleInputPassword1" className="form-label">Password</label>
//                         <input type="password" onChange={getData} name='password' className="form-control" id="exampleInputPassword1" />
//                     </div>
//                     <div className="mb-3">
//                         <label for="exampleInputConfirmPassword1" className="form-label">Confirm Password</label>
//                         <input type="password" onChange={getData} name='confirmPassword' className="form-control " id="exampleInputConfirmPassword1" />
//                     </div>

//                     <button type="submit" onClick={submitData} className="btn btn-primary col-lg-4">Signup</button>
//                     <p className="mt-3">Already Have an Account <span><NavLink to="/Signin">SignIn</NavLink></span></p>

//                 </form>
//             </div>
//         </>
//     )
// }
// export default Signup

import React, { useEffect, useState } from "react";
import './Signup.css'
import { NavLink } from "react-router-dom";
const Signup = () => {
    const initialValues = { userName: '', email: '', password: '', confirmPassword: '' }
    const [formValues, setFormValues] = useState(initialValues)
    const [formErrors, setFormErrors] = useState({})
    const [isSubmit, setIsSubmit] = useState(false)
    const [data, setData] = useState()
    const getData = (e) => {
        const { name, value } = e.target
        setFormValues({ ...formValues, [name]: value })
    }


    const submitData = (e) => {
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
        if (!values.userName) {
            errors.userName = 'UserName is required!'
        }
        if (!values.email) {
            errors.email = 'Email is required!'
        }
        //  else if (!regex.test(values.email)) {

        //     errors.email = 'Email is not valid!'
        // }

        if (!values.password) {
            errors.password = 'Password is required!'
        } else if (values.password.length < 4) {
            errors.password = 'password must be atleast 4 characters!'
        } else if (values.password.length > 10) {
            errors.password = 'password must not exceed 10 characters!'
        }
        if (!values.confirmPassword) {
            errors.confirmPassword = 'Confirm Password is required!'
        } else if (values.confirmPassword != values.password) {
            errors.password = "Password and Confirm Password doesn't match!"

        }
        localStorage.setItem("userDetails", JSON.stringify([...data, formValues]))
        return errors
    }

    return (
        <>
            <div className="signup">
                {/* <pre>{JSON.stringify(formValues, undefined, 2)}</pre> */}
                <form className="signup-form-layout" onSubmit={submitData}>
                    <h2 className=" mb-6">Signup</h2>
                    <div className="mb-3" >
                        <label for="exampleInputFullName" className="form-label">UserName</label>
                        <input type="text" name='userName' value={formValues.userName} onChange={getData} className="form-control" id="exampleInputFullName" aria-describedby="emailHelp" />
                        <p style={{ color: 'red' }}>{formErrors.userName}</p>

                    </div>
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

                    <div className="mb-3">
                        <label for="exampleInputConfirmPassword1" className="form-label">Confirm Password</label>
                        <input type="password" name='confirmPassword' value={formValues.confirmPassword} onChange={getData} className="form-control " id="exampleInputConfirmPassword1" />
                        <p style={{ color: 'red' }}>{formErrors.confirmPassword}</p>
                    </div>


                    <button type="submit" className="btn btn-primary col-lg-4">Signup</button>
                    <p className="mt-3">Already Have an Account <span><NavLink to="/Signin">SignIn</NavLink></span></p>
                    {/* {Object.keys(formErrors).length === 0 && isSubmit ? (<div className="ui message success">Signed in successfull</div>) : (<div className="ui message error"> Something went wrong try Again </div>)} */}
                </form>

            </div>
        </>
    )
}
export default Signup