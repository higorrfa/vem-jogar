import { useState, useEffect } from 'react';

import axios from 'axios';

import type { AxiosError } from 'axios';

import { useSnackbar } from 'notistack';

import { Link, useParams } from 'react-router-dom';

import { Typography } from '@mui/material';

import NavBar from 'components/NavBar';

import { Main } from './styles';

interface GroupsInterface {
  id: number;
  name: string;
  sport: string;
  minimumAge: number;
  isPrivate: boolean;
  isFree: boolean;
  value: number;
  address: string;
  additionalInformation: string;
  adminId: number;
}

const GroupDetails = (): JSX.Element => {
  const { id: groupID } = useParams();

  const { enqueueSnackbar } = useSnackbar();

  const [group, setGroup] = useState<GroupsInterface | undefined>(undefined);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isMember, setIsMember] = useState<boolean>(false);
  const user = JSON.parse(String(localStorage.getItem('user')));
  const isGroupAdmin = group?.adminId === user?.id;

  useEffect(() => {
    axios
      .get(`/api/groups/${groupID}`)
      .then(response => {
        setGroup(response.data);
      })
      .catch(error => {
        const err = error as AxiosError;
        enqueueSnackbar(err?.message || 'Ops, algo deu errado...', {
          variant: 'error',
        });
      });

    axios
      .get(`/api/groups/${groupID}/isMember/${user.id}`) // solicitação para verificar se o usuário é membro do grupo
      .then(response => {
        setIsMember(response.data);
      })
      .catch(error => {
        const err = error as AxiosError;
        enqueueSnackbar(err?.message || 'Ops, algo deu errado...', {
          variant: 'error',
        });
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleAskInvite = async () => {
    try {
      if (!isLoading) {
        setIsLoading(true);

        const response = await axios.post(
          `/api/group/${groupID}/user/${user?.id}`,
        );

        if (response.data) {
          enqueueSnackbar('Solicitação de entrada enviada com sucesso', {
            variant: 'success',
          });
        }
      }
    } catch (error) {
      const err = error as AxiosError;
      enqueueSnackbar(err?.message || 'Ops, algo deu errado...', {
        variant: 'error',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <NavBar />
      <Main>
        <div className="box">
          <h1>{group?.name}</h1>
          <div className="content">
            <div className="description">
              <h3>Informações do grupo</h3>
              <div style={{ textAlign: 'justify' }}>
                <Typography variant="body1" gutterBottom>
                  <b>Esporte:</b> {group?.sport}
                </Typography>
                <Typography variant="body1" gutterBottom>
                  <b>Endereço:</b> {group?.address}
                </Typography>
                <Typography variant="body1" gutterBottom>
                  <b>Valor:</b>{' '}
                  {group?.isFree
                    ? 'grátis'
                    : group?.value.toString().concat(' reais')}
                </Typography>
                {group?.minimumAge !== undefined && group?.minimumAge > 0 && (
                  <Typography variant="body1" gutterBottom>
                    <b>Idade mínima:</b> {group?.minimumAge} anos
                  </Typography>
                )}
                {group?.additionalInformation && (
                  <Typography variant="body1" gutterBottom>
                    <b>Descrição:</b> {group?.additionalInformation}
                  </Typography>
                )}
              </div>
            </div>
            <div className="buttons">
              {isGroupAdmin && (
                <>
                  <Link to="invites">
                    <button className="group-action-button" type="button">
                      Pedidos <br />
                      de entrada
                    </button>
                  </Link>
                  <Link to="members">
                    <button
                      className="group-action-button"
                      type="button"
                      disabled={isLoading}
                    >
                      Membros
                    </button>
                  </Link>
                  <button
                    className="group-action-button"
                    type="button"
                    disabled={isLoading}
                  >
                    Criar evento
                  </button>
                </>
              )}
              {!isGroupAdmin && !isMember && (
                <button
                  className="group-action-button"
                  type="button"
                  onClick={handleAskInvite}
                  disabled={isLoading}
                >
                  Solicitar <br />
                  entrada
                </button>
              )}
              {(isGroupAdmin || isMember) && (
                <button
                  className="group-action-button"
                  type="button"
                  disabled={isLoading}
                >
                  Eventos
                </button>
              )}
            </div>
          </div>
        </div>
      </Main>
    </>
  );
};

export default GroupDetails;
