import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom'

import Notifications from '../Notifications';

import logo from '../../assets/logo_purple.svg';

import { Container, Content, Profile } from './styles';

function Header() {
  const profile = useSelector(state => state.user.profile);

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
            <strong>{profile.name}</strong>
            <Link to="/profile">My profile</Link>
          </div>
          <img src={profile.avatar_url} alt="Your avatar" />
        </Profile>
      </aside>
    </Content>
  </Container>
  );
}

export default Header;