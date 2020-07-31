import React from 'react';

import { Container, Badge, NotificationList, Notification  } from './styles';

import { MdNotifications } from 'react-icons/md';

function Notifications() {
  return (
    <Container>
      <Badge hasUnread>
        <MdNotifications color="#7159c1" size={20}/>
      </Badge>

      <NotificationList>
        <Notification unread>
          <p>You have a new appointment tomorrow  </p>
          <time>2 days ago</time>
          <button type="button">Mark as read</button>
        </Notification>
        <Notification>
          <p>You have a new appointment tomorrow  </p>
          <time>2 days ago</time>
          <button type="button">Mark as read</button>
        </Notification>
        <Notification>
          <p>You have a new appointment tomorrow  </p>
          <time>2 days ago</time>
          <button type="button">Mark as read</button>
        </Notification>
      </NotificationList>
    </Container>
  );
}

export default Notifications;