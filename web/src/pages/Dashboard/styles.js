import styled from 'styled-components';

export const Container = styled.div`
  max-width: 600px;
  margin: 50px auto;

  display: flex;
  flex-direction: column;

  header {
    display: flex;
    align-self: center;
    align-items: center;

    button {
      border: 0;
      background: none;
    }

    strong {
      color: #fff;
      font-size: 24px;
      margin: 0 15px;
    }
  }

  ul {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    grid-gap: 15px;
    margin-top: 30px;
  }
`;

export const Time = styled.li`
  padding: 20px;
  border-radius: 4px;
  background: ${(props) => (props.past ? '#ccc' : '#fff')};

  opacity: ${(props) => (props.available && !props.past ? 0.75 : 0.5)};
  opacity: ${(props) => (!props.available && !props.past ? 1 : 0.75)};

  strong {
    display: block;
    color: ${(props) => (props.available ? '#999' : '#7159C1')};
    font-size: ${(props) => (props.available ? '20px' : '24px')};
    padding: ${(props) => (props.available ? '4px' : '0px')};
    font-weight: normal;
  }

  span {
    display: block;
    margin-top: 3px;
    font-size: ${(props) => (props.available ? '14px' : '16px')};
    color: ${(props) => (props.available ? '#999' : '#666')};
  }
`;
