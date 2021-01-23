import React, { useState } from 'react'
import FormSignup from './FormSignup'
import FormSuccess from './FormSuccess'
import './Form.css'

const Form = () => {
    const [IsSubmitted, setIsSubmitted] = useState(false);

    function submitForm() {
        setIsSubmitted(true);
    }

    return (
        <>
        <div className="form-container">
            <span className="close-btn">x</span>
            <div className="form-content-left">
                <img src="/images/Doctors.png" alt="medical-image" className="form-img" />
            </div>
            {!IsSubmitted ? (<FormSignup submitForm={submitForm} />) : <FormSuccess />}
        </div>
        </>
    )
}

export default Form
