import styled from 'styled-components';
import { Button } from '@mui/material';

export const Container = styled.div`
  color: black;
`;

export const Background = styled.div`
  position: absolute;
  background-image: url('https://www.estudokids.com.br/wp-content/uploads/2019/06/esportes-ingles.jpg');
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  background-color: #cccccc;
  filter: blur(4px);
  height: 100%;
  width: 100%;
`;

export const StyledButton = styled(Button)`
  color: black;
  border: 1px solid black;

  &:hover {
    color: #d3d3d3;
    background-color: black;
    border: 1px solid black;
  }

  & + & {
    margin-left: 1rem;
  }
`;

export const Nav = styled.nav`
  position: fixed;
  height: 3.75rem;
  width: 100%;
  background: #d3d3d3;
  box-shadow: 0 0.125rem 0.25rem 0 rgba(0, 0, 0, 0.2);
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
`;

export const Main = styled.main`
  position: absolute;
  margin-top: calc(3.75rem + 1rem);
  padding: 1rem;
  height: 100%;
  height: -moz-available;
  height: -webkit-fill-available;
  height: fill-available;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;

  h3 {
    font-weight: bold;
  }

  p {
    max-width: 30rem;
    font-weight: 500;
  }
`;
