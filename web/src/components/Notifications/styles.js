import styled, { css } from 'styled-components';
import PerfectScrollbar from 'react-perfect-scrollbar';
import { lighten } from 'polished';

export const Container = styled.div`
  position: relative;
`;

export const Badge = styled.button`
  background: none;
  border: 0;
  position: relative;
  ${(props) =>
    props.hasUnread &&
    css`
      &::after {
        position: absolute;
        right: 0px;
        top: 1px;
        width: 8px;
        height: 8px;
        background: #ff892e;
        content: '';
        border-radius: 50%;
        opacity: 1;
      }
    `}
    opacity: ${(props) => (props.hasUnread ? 1 : 0.8)}
`;

export const NotificationList = styled.div`
  position: absolute;
  width: 260px;
  left: calc(50% - 130px);
  top: calc(100% + 30px);
  background: rgba(0, 0, 0, 0.6);
  border-radius: 10px;
  padding: 15px 5px;
  display: ${(props) => (props.visible ? 'block' : 'none')};
  box-shadow: 0px 15px 30px rgba(0, 0, 0, 0.25);

  &::before {
    content: '';
    position: absolute;
    left: calc(50% - 13px);
    top: -22px;
    width: 0;
    height: 0;
    border-left: 13px solid transparent;
    border-right: 13px solid transparent;
    border-bottom: 22px solid rgba(0, 0, 0, 0.6);
  }
`;

export const Scroll = styled(PerfectScrollbar)`
  max-height: 360px;
  padding: 5px 15px;
`;

export const Notification = styled.div`
  color: #eee;
  opacity: ${(props) => (props.unread ? 1 : 0.5)};

  & + div {
    margin-top: 15px;
    padding-top: 15px;
    border-top: 1px solid rgba(255, 255, 255, 0.1);
  }

  p {
    font-size: 13px;
    line-height: 18px;
  }

  time {
    font-size: 12px;
    opacity: 0.6;
  }

  button {
    font-size: 12px;
    border: 0;
    background: none;
    color: ${lighten(0.2, '#7159c1')};
    padding: 0 5px;
    margin: 0 5px;
    border-left: 1px solid rgba(255, 255, 255, 0.1);
  }

  ${(props) =>
    props.unread &&
    css`
  &::after {
    content: '';
    display: inline-block;
    width: 8px;
    height: 8px;
    background: #ff892e;
    border-radius: 50%;
  `}
`;
