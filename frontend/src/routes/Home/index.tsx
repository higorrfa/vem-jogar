import { Typography, Card, CardContent } from '@mui/material';

import { Background, Container, Main, Nav, StyledButton } from './styles';

const Home = (): JSX.Element => {
  return (
    <Container>
      <Background />

      <Nav>
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
        <div>
          <StyledButton href="/login" variant="outlined">
            Login
          </StyledButton>
          <StyledButton href="/signup" variant="outlined">
            Cadastro
          </StyledButton>
        </div>
      </Nav>

      <Main>
        <Card sx={{ borderRadius: 4 }}>
          <CardContent>
            <Typography variant="h3" gutterBottom>
              Sobre o app
            </Typography>
            <Typography variant="body1" gutterBottom>
              Vem Jogar! é uma plataforma para gerenciar e participar de grupos
              de práticas esportivas. Os usuários podem criar seus próprios
              grupos de esportes ou participar de grupos existentes, buscando
              por esportes de sua preferência e localização.
            </Typography>
          </CardContent>
        </Card>
      </Main>
    </Container>
  );
};

export default Home;
