import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import Notifications from '~/components/Notifications';

import logo from '~/assets/logo_purple.svg';

import { Container, Content, Profile } from './styles';

export default function Header() {
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
                  <Link to="/profile">
                  <img
                     src={
                        (profile.avatar && profile.avatar.url) || "https://api.adorable.io/avatars/285/gobarber@adorable.io"
                     }
                     alt={profile.name}/>
                  </Link>
               </Profile>
            </aside>
         </Content>
      </Container>
   );
}