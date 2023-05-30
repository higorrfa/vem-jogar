/* eslint-disable prefer-destructuring */
/* eslint-disable react/no-array-index-key */
/* eslint-disable @typescript-eslint/no-floating-promises */
/* eslint-disable react/jsx-no-useless-fragment */
/* eslint-disable @typescript-eslint/no-unused-vars */

import { useState, useEffect } from 'react';

import axios from 'axios';

import { useSnackbar } from 'notistack';

import { useParams } from 'react-router-dom';

import { IconButton } from '@mui/material';

import { Delete, Visibility } from '@mui/icons-material';

import NavBar from 'components/NavBar';

import { Main } from './styles';

interface GroupInterface {
  id: number;
  name: string;
  adminId: number;
}

interface UserInterface {
  id: number;
  name: string;
  age: number;
}

const Members = (): JSX.Element => {
  const { group: groupID } = useParams();
  const { enqueueSnackbar } = useSnackbar();
  const [, setGroup] = useState<GroupInterface | undefined>(undefined);
  const [users, setUsers] = useState<UserInterface[]>([]);

  useEffect(() => {
    const fetchGroup = async () => {
      try {
        const response = await axios.get<GroupInterface>(
          `api/groups/${groupID}`,
        );
        setGroup(response.data);
      } catch (error) {
        enqueueSnackbar('Erro ao buscar o grupo', { variant: 'error' });
      }
    };

    const fetchUsers = async () => {
      try {
        const response = await axios.get<UserInterface[]>(
          `api/groups/${groupID}/users`,
        );
        setUsers(response.data);
      } catch (error) {
        enqueueSnackbar('Erro ao buscar os usuários', { variant: 'error' });
      }
    };

    fetchGroup();
    fetchUsers();
  }, [groupID, enqueueSnackbar]);

  const handleRemove = async (userId: number) => {
    try {
      await axios.delete(`api/groups/${groupID}/removeUser/${userId}`);
      setUsers(users.filter(user => user.id !== userId));
      enqueueSnackbar('Usuário removido com sucesso', { variant: 'success' });
    } catch (error) {
      enqueueSnackbar('Erro ao remover o usuário', { variant: 'error' });
    }
  };

  return (
    <>
      <NavBar />
      <Main>
        <div className="box">
          <h1>Membros</h1>
          <div className="content">
            <table>
              <thead>
                <tr>
                  <th>Nome</th>
                  <th>Idade</th>
                  <th>Ações</th>
                </tr>
              </thead>
              <tbody>
                {users.map(user => (
                  <tr key={user.id}>
                    <td>{user.name}</td>
                    <td>{user.age}</td>
                    <td>
                      <IconButton
                        aria-label="Remover"
                        onClick={() => handleRemove(user.id)}
                      >
                        <Delete />
                      </IconButton>
                      <IconButton>
                        <Visibility />
                      </IconButton>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </Main>
    </>
  );
};

export default Members;
