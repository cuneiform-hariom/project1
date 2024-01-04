import { useFormik } from 'formik';
import React, { useEffect, useState } from 'react'
import { countries } from './Countries';
import { states } from './States';
import { AllStates } from './AllStates';


export default function FormikForm() {

    const [step, setStep] = useState(1);
    const previous = () => {
        if (step > 1) setStep(step - 1);
    };
    const next = () => {
        if (step < 3) setStep(step + 1);
    };

    const [formData, setFormData] = useState({
        name: '',
        phone: '',
        email: '',
        id: Date.now()
    })

    const formik = useFormik({
        initialValues: formData,
        onSubmit: (values, actions) => {
            setStep(1)
            setFormData(formData)
            console.log(values)
            actions.resetForm();
        },
    });
    const [selectedCountry, setSelectedCountry] = useState('');
    const [optState, setOptState] = useState('')

    const handleCountryChange = (e) => {
        const selectedCountryValue = e.target.value;
        setSelectedCountry(selectedCountryValue);

        const OptedState = AllStates.filter((opt) => opt.country_id = selectedCountry)
        setOptState(OptedState)
        
    };
    console.log("OptedState: ",optState)
    console.log("selectedCountry: ", selectedCountry)


    return (
        <>
            <div className="step_form">
                <div className="numbers">
                    <button className={`num ${step >= 1 ? 'active' : ''}`} onClick={() => setStep(1)}>1</button>
                    <button className={`num ${step >= 2 ? 'active' : ''}`} onClick={() => setStep(2)}>2</button>
                    <button className={`num ${step >= 3 ? 'active' : ''}`} onClick={() => setStep(3)}>3</button>
                </div>
                <form onSubmit={formik.handleSubmit}>
                    {step === 1 ? (
                        <>
                            <p className="appTitle">Personal Details</p>
                            <div className='inpBox'>
                                <label htmlFor="name">Name</label>
                                <input
                                    id="name"
                                    name="name"
                                    type="text"
                                    onChange={formik.handleChange}
                                    value={formik.values.name}
                                    onBlur={formik.handleBlur}
                                />
                                <label htmlFor="email">Email</label>
                                <input
                                    id="email"
                                    name="email"
                                    type="email"
                                    onChange={formik.handleChange}
                                    value={formik.values.email}
                                    onBlur={formik.handleBlur}
                                />
                                <label htmlFor="phone">Phone</label>
                                <input
                                    id="phone"
                                    name="phone"
                                    type="text"
                                    onChange={formik.handleChange}
                                    value={formik.values.phone}
                                    onBlur={formik.handleBlur}
                                />
                            </div>
                        </>
                    ) : ''}
                    {step === 2 ? (
                        <>
                            <p className="appTitle">Address</p>
                            <div className='inpBox'>
                                <label htmlFor="country">Select Country</label>
                                <select name="country" id="country" onChange={handleCountryChange} value={selectedCountry}>
                                    {
                                        countries.map((item) =>
                                            <option value={item.country_id} key={item.country_id}>{item.country_name}</option>
                                        )
                                    }
                                </select>
                                <label htmlFor="state">Select State</label>
                                <select name="state" id="state">

                                </select>
                            </div>
                        </>
                    ) : ''}
                    {step === 3 ? (
                        <div className='inpBox'>
                            thankYou
                        </div>
                    ) : ''}
                    <div className="buttons">
                        <button disabled={step <= 1} type="button" onClick={previous}>Prev</button>
                        {step <= 2 ? (<button onClick={next} type="button">Next</button>) : ''}
                        {step === 3 && <button type="submit" className="submitBtn">Submit</button>}
                    </div>
                </form>
            </div>
        </>
    )
}
