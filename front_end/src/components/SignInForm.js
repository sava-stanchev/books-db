import React from 'react';
import { useFormik } from 'formik';

const validate = values => {
  const errors = {};
  if (!values.user_name) {
    errors.user_name = 'Required';
  } else if (typeof(values.user_name)!== 'string' || values.user_name.length < 4 || values.user_name.length > 30) {
    errors.user_name = 'Must be string from 4 to 30 characters';
  }

  if (!values.password) {
    errors.password = 'Required';
  } else if (values.password.length < 4 || values.password.length > 30) {
    errors.password = 'Must be 20 characters or less';
  };

  return errors;
};

const SignInForm = (user, updateUser, login) => {
  const formik = useFormik({
    initialValues: {
      user_name: '',
      password: '',
    },
    validate,
    onsubmit: values => {
      alert(JSON.stringify(values, null, 2));
    },
  });
  return (
    <form onSubmit={formik.handleSubmit}>
      <label htmlFor="user_name">User Name</label>
      <input
        id='user_name'
        name='user_name'
        type='text'
        placeholder='Enter username'
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        value={formik.values.user_name}
      />
      {formik.touched.user_name && formik.errors.user_name ? <div>{formik.errors.user_name}</div> : null}
      <label htmlFor="password">Password</label>
      <input
        id='password'
        name='password'
        type='password'
        placeholder='Enter password'
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        value={formik.values.password}
      />
      {formik.touched.password && formik.errors.password ? <div>{formik.errors.password}</div> : null}
      <br/>

      <button type="submit">Login</button>
    </form>
  )
};

export default SignInForm;