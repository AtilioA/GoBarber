import React from 'react';
import { Link } from 'react-router-dom';
import { Form, Input } from '@rocketseat/unform';
import * as Yup from 'yup';

import logo from '../../assets/logo.svg';
import { func } from 'prop-types';

const schema = Yup.object().shape({
  email: Yup.string().email('A valid e-mail is required.').required('E-mail is required.'),
  password: Yup.string().required('Password is required'),
})
 
function SignIn() {
  function handleSubmit(data) {
    console.log(data)
  }

  return (
    <>
      <img src={logo} alt="GoBarber" />

      <Form schema={schema} onSubmit={handleSubmit}>
        <Input name="email" type="email" placeholder="Seu e-mail" />
        <Input name="password" type="password" placeholder="Sua senha secreta" />

        <button type="submit">Acessar</button>
        <Link to="/register">Criar conta gratuita</Link>
      </Form>
    </>
  );
}

export default SignIn;
