import React, { useState } from 'react'

export default function Form() {

    const [step, setStep] = useState(1);
    const previous = () => {
        if (step > 1) setStep(step - 1);
    };
    const next = () => {
        if (step < 3) setStep(step + 1);
    };

    const [formData, setFormData] = useState([])

    const [name, setName] = useState('')
    const [phone, setPhone] = useState('')
    const [email, setemail] = useState('')
    const handleFormSubmit = (e) => {
        e.preventDefault();
        setStep(1)
        setName('')
        setemail('')
        setPhone('')
        const newData = {
            name: name,
            email,
            phone,
            id: Date.now()
        }
        const news = [...formData, newData];
        setFormData(news)
        console.log(formData)
    };

    const handleRemove = (id) => {
        const updatedFormData = formData.filter(item => item.id !== id);
        setFormData(updatedFormData);
    }

    return (
        <>
            <div className="step_form">
                <div className="numbers">
                    <button className={`num ${step >= 1 ? 'active' : ''}`} onClick={() => setStep(1)}>1</button>
                    <button className={`num ${step >= 2 ? 'active' : ''}`} onClick={() => setStep(2)}>2</button>
                    <button className={`num ${step >= 3 ? 'active' : ''}`} onClick={() => setStep(3)}>3</button>
                </div>
                <form onSubmit={handleFormSubmit}>
                    {step === 1 ? (
                        <div className='inpBox'>
                            <label htmlFor="name">Name</label>
                            <input type="text" id="name" value={name} onChange={(e) => setName(e.target.value)} />
                        </div>
                    ) : ''}
                    {step === 2 ? (
                        <div className='inpBox'>
                            <label htmlFor="email">Email</label>
                            <input type="email" id="email" value={email} onChange={(e) => setemail(e.target.value)} />
                        </div>
                    ) : ''}
                    {step === 3 ? (
                        <div className='inpBox'>
                            <label htmlFor="phone">Phone</label>
                            <input type="tel" id="phone" value={phone} onChange={(e) => setPhone(e.target.value)} />
                        </div>
                    ) : ''}
                    <div className="buttons">
                        <button type="button" onClick={previous}>Prev</button>
                        {step <= 2 ? (<button onClick={next} type="button">Next</button>) : ''}
                        {step === 3 ? <button type="submit" className="submitBtn">Submit</button> : ''}
                    </div>
                </form>
            </div>
            <div className='dataTable'>
                <table>
                    <thead>
                        <tr>
                            <th>Name </th>
                            <th>Email </th>
                            <th>Phone </th>
                            <th>Action </th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            formData.map((data) => {
                                return (
                                    <tr key={data.id}>
                                        <td>{data.name}</td>
                                        <td>{data.email}</td>
                                        <td>{data.phone}</td>
                                        <td><button onClick={() => handleRemove(data.id)}>remove</button></td>
                                    </tr>
                                )
                            })
                        }

                    </tbody>
                </table>

            </div>
        </>
    )
}
