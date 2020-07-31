import React from 'react';
import { Link } from 'react-router-dom'

import Notifications from '../Notifications';

import logo from '../../assets/logo_purple.svg';

import { Container, Content, Profile } from './styles';

function Header() {
  return (
  <Container>
    <Content>
      <nav>
        <img src={logo} alt="GoBarber" />
        <Link to="/dashboard">Dashboard</Link>
      </nav>

      <aside>
        <Notifications />
        <Profile>
          <div>
            <strong>Atílio Antônio</strong>
            <Link to="/profile">My profile</Link>
          </div>
          <img src="https://api.adorable.io/avatars/50/atilioa@adorable.io.png" alt ="AtilioA" />
        </Profile>
      </aside>
    </Content>
  </Container>
  );
}

export default Header;