import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Form, Input } from '@rocketseat/unform';

import { signOut } from '../../store/modules/auth/actions';
import { updateProfileRequest } from '../../store/modules/user/actions';

import AvatarInput from './AvatarInput';

import { Container } from './styles';

function Profile() {
  const dispatch = useDispatch();
  const profile = useSelector(state => state.user.profile);

  function handleSubmit(data) {
    dispatch(updateProfileRequest(data));
  }

  function handleSignOut() {
    dispatch(signOut());
  }

  return (
    <Container>
      <Form initialData={profile} onSubmit={handleSubmit}>
        <AvatarInput name="avatar_id"/>

        <Input name="name" placeholder="Full name"/>
        <Input name="email" type="email" placeholder="Your e-mail address"/>

        <hr />

        <Input name="oldPassword" placeholder="Your current password"/>
        <Input name="password" placeholder="Your new password"/>
        <Input name="confirmPassword" placeholder="New password confirmation"/>

        <button type="submit">Update profile</button>
      </Form>


      <button type="button" onClick={handleSignOut}>Log out</button>
    </Container>
  );
}

export default Profile;
