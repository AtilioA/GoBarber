import React from 'react';
import { Link } from 'react-router-dom';
import * as Yup from 'yup';

import logo from '../../assets/logo.svg';

const schema = Yup.object().shape({
  name: Yup.string().required('Name is required'),
  email: Yup.string().email('A valid e-mail is required.').required('E-mail is required.'),
  password: Yup.string().min(8, 'Your password needs to have at least 8 characters.').required('Password is required'),
})

function SignUp() {
  return (
    <>
      <img src={logo} alt="GoBarber" />

      <form>
        <input placeholder="Your name" />
        <input type="email" placeholder="Your e-mail" />
        <input type="password" placeholder="Your secret password" />

        <button type="submit">Create account</button>
        <Link to="/">Already have an account?</Link>
      </form>
    </>
  );
}

export default SignUp;
