import React, { useCallback, useState } from 'react';

import { useNavigate } from 'react-router-dom';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import axios from 'axios';
import type { AxiosError } from 'axios';
import type { ChangeEvent } from 'react';
import {
  FormControl,
  InputLabel,
  TextField,
  Typography,
  Input,
  InputAdornment,
  IconButton,
} from '@mui/material';

import { VisibilityOff, Visibility } from '@mui/icons-material';

import { useSnackbar } from 'notistack';

import { validateString } from 'utils/validate-string';

import { validateAge } from 'utils/validate-age';

import { validatePassword } from 'utils/validate-password';

import { useToken } from 'hooks/useToken';

import Route from 'routes/Route';

import { Main, ButtonsContainer, StyledButton } from './styles';

const TIME_TO_REDIRECT = 6000;
const INITIAL_DATA = {
  name: '',
  email: '',
  password: ``,
  confirmPassword: ``,
  address: '',
  favoriteSport: '',
  age: 0,
};

interface FormDataInterface {
  name: string;
  email: string;
  password: string;
  favoriteSport: string;
  age: number;
  address: string;
  confirmPassword?: string;
}
const SignUpForm: React.FC = () => {
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const { updateToken } = useToken();
  const [formData, setFormData] = useState<FormDataInterface>(INITIAL_DATA);

  const handleClickShowPassword = useCallback((): void => {
    setShowPassword(curr => !curr);
  }, []);

  const handleClickShowConfirmPassword = useCallback((): void => {
    setShowConfirmPassword(curr => !curr);
  }, []);

  const handleMouseDownPassword = useCallback(
    (event: React.MouseEvent<HTMLButtonElement>): void => {
      event.preventDefault();
    },
    [],
  );

  const handleChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>): void => {
      setFormData(curr => ({
        ...curr,
        [event.target.name]: event.target.value || '',
      }));
    },
    [],
  );

  const handleSubmit = useCallback(async (): Promise<void> => {
    setLoading(true);
    try {
      formData.age = Number(formData.age);
      validateString(formData.name, 'Nome');
      validateString(formData.email, 'Email');
      validateAge(formData.age, 'Idade');
      validatePassword(formData.password, formData.confirmPassword ?? ``);
      validateString(formData.favoriteSport, 'Esporte Favorito');
      validateString(formData.address, 'Endereço');
      delete formData.confirmPassword;

      const response = await axios.post('/api/users', formData);

      if (response.data) {
        enqueueSnackbar(
          'Usuário criado com sucesso! Você será redirecionado agora!',
          {
            variant: 'success',
          },
        );

        setFormData(INITIAL_DATA);
        const login = await axios.post('/api/auth', {
          email: formData.email,
          password: formData.password,
        });

        if (login.data) {
          setFormData(INITIAL_DATA);
          updateToken(login.data.token);
          setTimeout(() => {
            navigate(Route.DASHBOARD);
          }, TIME_TO_REDIRECT);
        }
      }
    } catch (error) {
      const err = error as AxiosError;
      enqueueSnackbar(err?.message || 'Ops, algo deu errado...', {
        variant: 'error',
      });
    } finally {
      setLoading(false);
    }
  }, [enqueueSnackbar, formData, navigate, updateToken]);

  return (
    <Main>
      <Typography variant="h3" gutterBottom>
        Crie sua conta
      </Typography>
      <form>
        <TextField
          color="success"
          label="Nome"
          margin="dense"
          name="name"
          onChange={handleChange}
          required
          value={formData.name}
          variant="standard"
        />
        <TextField
          color="success"
          label="Email"
          margin="dense"
          name="email"
          onChange={handleChange}
          required
          value={formData.email}
          variant="standard"
        />
        <TextField
          color="success"
          label="Idade"
          margin="dense"
          name="age"
          onChange={handleChange}
          required
          value={formData.age}
          variant="standard"
        />
        <TextField
          color="success"
          label="Endereço"
          margin="dense"
          name="address"
          onChange={handleChange}
          required
          value={formData.address}
          variant="standard"
        />
        <TextField
          color="success"
          label="Esporte Favorito"
          margin="dense"
          name="favoriteSport"
          onChange={handleChange}
          required
          value={formData.favoriteSport}
          variant="standard"
        />
        <FormControl variant="standard" margin="dense">
          <InputLabel color="success" htmlFor="standard-adornment-password">
            Senha
          </InputLabel>
          <Input
            id="standard-adornment-password"
            type={showPassword ? 'text' : 'password'}
            value={formData.password}
            onChange={handleChange}
            color="success"
            name="password"
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                  edge="end"
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
          />
        </FormControl>
        <FormControl variant="standard" margin="dense">
          <InputLabel
            color="success"
            htmlFor="standard-adornment-confirmPassword"
          >
            Confirmação de senha
          </InputLabel>
          <Input
            id="standard-adornment-confirmPassword"
            type={showConfirmPassword ? 'text' : 'password'}
            value={formData.confirmPassword}
            onChange={handleChange}
            color="success"
            name="confirmPassword"
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowConfirmPassword}
                  onMouseDown={handleMouseDownPassword}
                  edge="end"
                >
                  {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
          />
        </FormControl>
      </form>
      <ButtonsContainer>
        <StyledButton href="/" variant="outlined">
          <ArrowBackIcon fontSize="small" /> Voltar
        </StyledButton>
        <StyledButton
          variant="outlined"
          disabled={loading}
          onClick={handleSubmit}
        >
          Cadastrar
        </StyledButton>
      </ButtonsContainer>
    </Main>
  );
};

export default SignUpForm;
