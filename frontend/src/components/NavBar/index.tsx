import { useCallback } from 'react';

import { Typography } from '@mui/material';

import { useLocation, useNavigate } from 'react-router-dom';

import { useToken } from 'hooks/useToken';

import Route from 'routes/Route';

import { Nav, StyledButton } from './styles';

const NavBar = (): JSX.Element => {
  const location = useLocation().pathname;
  const navigate = useNavigate();

  const { wipeToken } = useToken();

  const goBack = () => {
    navigate(-1);
  };

  const goToProfile = () => {
    navigate(Route.PROFILE);
  };

  const logout = useCallback(() => {
    wipeToken();
    navigate(Route.LOGIN);
  }, [navigate, wipeToken]);

  return (
    <Nav>
      {location === '/dashboard' ? (
        <div
          style={{
            display: 'flex',
          }}
        >
          <img
            style={{
              width: '42px',
              height: '42px',
              marginRight: '8px',
              borderRadius: '32px',
            }}
            src="/vemjogar.png"
            alt="Ícone"
          />
          <Typography style={{ paddingTop: '10px' }} color="black">
            Vem Jogar!
          </Typography>
        </div>
      ) : (
        <StyledButton onClick={goBack}>Voltar</StyledButton>
      )}
      {location === '/profile' ? (
        <StyledButton onClick={logout}>Logout</StyledButton>
      ) : (
        <StyledButton onClick={goToProfile}>Perfil</StyledButton>
      )}
    </Nav>
  );
};

export default NavBar;
