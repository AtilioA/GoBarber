import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Form, Input } from '@rocketseat/unform';
import * as Yup from 'yup';

import { signInRequest } from '../../store/modules/auth/actions';

import logo from '../../assets/logo.svg';
// import { func } from 'prop-types';

const schema = Yup.object().shape({
  email: Yup.string()
    .email('A valid e-mail is required.')
    .required('An e-mail address is required.'),
  password: Yup.string().required('Password is required.'),
});

function SignIn() {
  const dispatch = useDispatch();
  const loading = useSelector(state => state.auth.loading);

  function handleSubmit({ email, password }) {
    dispatch(signInRequest(email, password));
  }

  return (
    <>
      <img src={logo} alt="GoBarber" />

      <Form schema={schema} onSubmit={handleSubmit}>
        <Input name="email" type="email" placeholder="Your e-mail address" />
        <Input
          name="password"
          type="password"
          placeholder="Your secret password"
        />

        <button type="submit">{loading ? 'Loading...' : 'Sign in'}</button>
        <Link to="/register">Create free account</Link>
      </Form>
    </>
  );
}

export default SignIn;
