/* eslint-disable react/jsx-curly-brace-presence */

import type { ChangeEvent } from 'react';

import { useState, useCallback } from 'react';

import axios from 'axios';

import useSWR from 'swr';

import type { AxiosError } from 'axios';

import { Fab, Card, CardContent, Typography, Tabs, Tab } from '@mui/material';

import {
  Delete,
  Edit,
  Group,
  LocationOn,
  Visibility,
} from '@mui/icons-material';

import AddIcon from '@mui/icons-material/Add';

import { useSnackbar } from 'notistack';

import { Link } from 'react-router-dom';

import ReactPaginate from 'react-paginate';

import { useModal } from 'hooks/useModal';

import NavBar from 'components/NavBar';

import styles, { Main } from './styles';

import GroupForm from './GroupForm';
import NoRows from './NoRows';
import Map from './Map';

const Constants = {
  first: 5,
  initialFilter: {},
};

const ITEMS_PER_PAGE = 4;

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

interface GroupForm {
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

const Dashboard = (): JSX.Element => {
  const user = JSON.parse(String(localStorage.getItem('user')));
  const [currentPage, setCurrentPage] = useState(0);
  const [_filter, setFilter] = useState(Constants.initialFilter);
  const [tab, setTab] = useState(0);

  const { isOpen, handleOpen, handleClose } = useModal();
  const { enqueueSnackbar } = useSnackbar();
  const [groups, setGroups] = useState<GroupsInterface[] | undefined>(
    undefined,
  );
  const [rows, setRows] = useState<GroupsInterface[] | undefined>(undefined);

  const [groupFormState, setGroupFormState] = useState(
    {} as GroupForm | undefined,
  );

  const fetcherGroups = useCallback(() => {
    axios
      .get('/api/groups')
      .then(response => {
        setGroups(response.data);
        setRows(response.data);
      })
      .catch(error => {
        const err = error as AxiosError;
        enqueueSnackbar(err?.message || 'Ops, algo deu errado...', {
          variant: 'error',
        });
      });
  }, [enqueueSnackbar]);

  useSWR(`/api/groups`, fetcherGroups, { refreshInterval: 300000 });

  const handleAddOpen = useCallback(() => {
    setGroupFormState(undefined);
    handleOpen();
  }, [setGroupFormState, handleOpen]);

  const handleSearch = (event: ChangeEvent<HTMLInputElement>) => {
    const searchText = event?.target?.value.toLowerCase().trim();
    const filtered = searchText
      ? rows?.filter(group => {
          return group.name.toLowerCase().includes(searchText);
        })
      : groups;

    setRows(filtered);
  };

  const handleClear = useCallback((): void => {
    setFilter(Constants.initialFilter);
  }, []);

  const setGroupFormStateHandler = useCallback(
    (newFormState: GroupForm | undefined) => {
      setGroupFormState(newFormState);
    },
    [],
  );

  const handlePageClick = (selectedItem: { selected: number }) => {
    setCurrentPage(selectedItem.selected);
  };

  const pageCount = Math.ceil((rows?.length ?? 0) / ITEMS_PER_PAGE);

  return (
    <>
      <NavBar />
      <Main>
        <Tabs
          className="tab"
          value={tab}
          onChange={(event, newValue) => setTab(newValue)}
        >
          <Tab icon={<Group />} />
          <Tab icon={<LocationOn />} />
        </Tabs>
        {tab === 0 && (
          <>
            <div className="search-container">
              <input
                className="search"
                type="text"
                placeholder="Procurar grupo..."
                onChange={handleSearch}
              />
              <Fab sx={styles.button} size="medium" onClick={handleAddOpen}>
                <AddIcon />
              </Fab>
            </div>
            <div className="box">
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(2, 1fr)',
                  gridGap: '20px',
                }}
              >
                {rows
                  ?.slice(
                    currentPage * ITEMS_PER_PAGE,
                    (currentPage + 1) * ITEMS_PER_PAGE,
                  )
                  .map(group => (
                    <Card
                      key={group.id}
                      sx={{
                        boxShadow: 15,
                        display: 'flex',
                        textAlign: 'start',
                        flexDirection: 'column',
                        alignItems: 'center',
                      }}
                    >
                      <CardContent
                        sx={{
                          width: '100%',
                          height: '100%',
                          display: 'flex',
                          flexDirection: 'column',
                          justifyContent: 'space-between',
                        }}
                      >
                        <div>
                          <Typography
                            sx={{ textAlign: 'center' }}
                            variant="h4"
                            component="h2"
                            gutterBottom
                          >
                            {group.name}
                          </Typography>
                        </div>
                        <div>
                          <Typography variant="body1" gutterBottom>
                            <b>Esporte:</b> {group.sport}
                          </Typography>
                          <Typography variant="body1" gutterBottom>
                            <b>Endereço:</b> {group.address}
                          </Typography>
                          <Typography variant="body1" gutterBottom>
                            <b>Valor:</b>{' '}
                            {group.isFree
                              ? 'grátis'
                              : group.value.toString().concat(' reais')}
                          </Typography>
                          {group.minimumAge > 0 && (
                            <Typography variant="body1" gutterBottom>
                              <b>Idade mínima:</b> {group.minimumAge} anos
                            </Typography>
                          )}
                        </div>

                        <div
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-evenly',
                          }}
                        >
                          <Link to={`/group/${group.id}`}>
                            <Typography
                              variant="h5"
                              sx={{ mt: 1, textAlign: 'center' }}
                            >
                              <Visibility
                                style={{
                                  color: 'black',
                                }}
                              >
                                i
                              </Visibility>
                            </Typography>
                          </Link>
                          {user.id === group.adminId && (
                            <Typography>
                              <Edit
                                style={{
                                  color: 'black',
                                }}
                              >
                                i
                              </Edit>
                            </Typography>
                          )}
                          {user.id === group.adminId && (
                            <Typography>
                              <Delete
                                style={{
                                  color: 'black',
                                }}
                              >
                                i
                              </Delete>
                            </Typography>
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  ))}
              </div>
              {!rows?.length && <NoRows />}
            </div>
            <GroupForm
              open={isOpen}
              onClose={handleClose}
              groupFormState={groupFormState}
              setGroupFormState={setGroupFormStateHandler}
              handleClearFilter={handleClear}
            />
          </>
        )}
        {tab === 1 && (
          <div className="map">
            <Map groups={rows} />
          </div>
        )}
        {tab === 0 && (
          <div
            style={{
              marginTop: '2px',
              borderRadius: '20px',
              backgroundColor: '#d3d3d3',
            }}
          >
            <ReactPaginate
              previousLabel={'<'}
              nextLabel={'>'}
              breakLabel={'...'}
              breakClassName={'break-me'}
              pageCount={pageCount}
              marginPagesDisplayed={2}
              pageRangeDisplayed={4}
              onPageChange={handlePageClick}
              containerClassName={'pagination'}
              activeClassName={'active'}
            />
          </div>
        )}
      </Main>
    </>
  );
};

export default Dashboard;
