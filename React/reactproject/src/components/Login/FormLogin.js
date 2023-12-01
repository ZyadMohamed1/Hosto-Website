import React from 'react'
import useForm from './useForm'
import validate from './validateInfo'
import './Form.css'
import { Link } from 'react-router-dom'


const FormLogin = ({submitForm}) => {
    const { handleChange, values, handleSubmit, errors } = useForm(submitForm, validate);


    return (
        <>
         <div className="form-container">
         <span className="close-btn">x</span>
            <div className="form-content-left">
                <img src="/images/Doctors.png" alt="medical-image" className="form-img" />
            </div>
        <div className="form-content-right">
        <form className="form" onSubmit={handleSubmit}>
            <h1>Enter your Email and password.</h1>
            <div className="form-inputs">
                <label htmlFor="email" className="form-label">
                    Email
                </label>
                <input
                    id="email"
                    type="email"
                    name="email"
                    className="form-input"
                    placeholder="Enter your email"
                    value={values.email}
                    onChange={handleChange}
                />
                {errors.email && <p>{errors.email}</p>}
            </div>
            <div className="form-inputs">
                <label htmlFor="password" className="form-label">
                    Password
                </label>
                <input
                    id="password"
                    type="password"
                    name="password"
                    className="form-input"
                    placeholder="Enter your password"
                    value={values.password}
                    onChange={handleChange}
                />
                {errors.password && <p>{errors.password}</p>}
            </div>
            <button   className="form-input-btn" type="submit">
            <Link to="/" style={{ textDecoration: 'none' }} >
                Log In
                </Link>
                </button>
        </form>
    </div>
    </div>
   </>
    )
}

export default FormLogin
