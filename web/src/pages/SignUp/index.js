import React from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { Form, Input } from '@rocketseat/unform';
import * as Yup from 'yup';

import logo from '../../assets/logo.svg';

import { signUpRequest } from '../../store/modules/auth/actions';

const schema = Yup.object().shape({
  name: Yup.string().required('Name is required'),
  email: Yup.string().email('A valid e-mail is required.').required('E-mail is required.'),
  password: Yup.string().min(8, 'Your password needs to have at least 8 characters.').required('Password is required'),
})

function SignUp() {
  const dispatch = useDispatch();

  function handleSubmit({ name, email, password }) {
    dispatch(signUpRequest(name, email, password));
  }

  return (
    <>
      <img src={logo} alt="GoBarber" />

      <Form  schema={schema} onSubmit={handleSubmit}>
        <Input placeholder="Your name" />
        <Input type="email" placeholder="Your e-mail address" />
        <Input type="password" placeholder="Your secret password" />

        <button type="submit">Create account</button>
        <Link to="/">Already have an account?</Link>
      </Form>
    </>
  );
}

export default SignUp;
