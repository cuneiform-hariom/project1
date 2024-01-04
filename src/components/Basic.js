import React, { useState } from 'react';
import { useFormik } from 'formik';

export default function Basic() {

  const [formData, setFormData] = useState([])

  const formik = useFormik({
    initialValues: {
      firstName: '',
      lastName: '',
      email: '',
    },
    onSubmit: values => {
      const data = JSON.stringify(values, null, 2);
      setFormData(data)
      const news = [...formData, values]
      setFormData(news)
      console.log(formData)
    },
  });
  return (
    <div className="step_form">
      <form onSubmit={formik.handleSubmit}>
        <label htmlFor="firstName">First Name</label>
        <input
          id="firstName"
          name="firstName"
          type="text"
          onChange={formik.handleChange}
          value={formik.values.firstName}
        />
        <br />
        <label htmlFor="lastName">Last Name</label>
        <input
          id="lastName"
          name="lastName"
          type="text"
          onChange={formik.handleChange}
          value={formik.values.lastName}
        />
        <br />
        <label htmlFor="email">Email Address</label>
        <input
          id="email"
          name="email"
          type="email"
          onChange={formik.handleChange}
          value={formik.values.email}
        />
        <br />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

