import styled from 'styled-components';

export const Button = styled.button`
  background: #0017f2;
  border: none;
  border-radius: 0.3rem;
  color: #eaeaea;
  font-size: 1.1rem;
  font-weight: 700;
  outline: none;
  padding: 0.6rem 1rem;
  cursor: pointer;

  &:hover {
    transition: all 0.3s ease-out;
    box-shadow: 0 0 1px 1px #aeaeae;
    filter: brightness(150%);
  }
`;
