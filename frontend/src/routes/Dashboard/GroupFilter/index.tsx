/* eslint-disable react/jsx-no-useless-fragment */
/* eslint-disable jsx-a11y/label-has-associated-control */

import React, { useState } from 'react';
import { FormGroup, TextField, Button, Box } from '@mui/material';

interface GroupFilterProps {
  onFilter: (filter: any) => void;
  onCancel: () => void;
}

const GroupFilter: React.FC<GroupFilterProps> = ({ onFilter, onCancel }) => {
  const [filter, setFilter] = useState<any>({});

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFilter((prevFilter: any) => ({
      ...prevFilter,
      [name]: value,
    }));
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onFilter(filter);
  };

  const handleCancel = () => {
    setFilter({});
    onCancel();
  };

  return (
    <Box
      sx={{
        p: 2,
        backgroundColor: 'white',
        borderRadius: '5px',
        position: 'absolute',
        right: 0,
        zIndex: 9999,
      }}
    >
      <form onSubmit={handleSubmit}>
        <FormGroup>
          <TextField
            label="Nome"
            name="name"
            value={filter.name || ''}
            onChange={handleInputChange}
            sx={{ mr: 2 }}
          />
          <TextField
            label="Esporte"
            name="sport"
            value={filter.sport || ''}
            onChange={handleInputChange}
            sx={{ mr: 2 }}
          />
          <TextField
            label="Idade mínima"
            name="minimumAge"
            type="number"
            value={filter.minimumAge || ''}
            onChange={handleInputChange}
            sx={{ mr: 2 }}
          />
          <TextField
            label="Valor máximo"
            name="value"
            type="number"
            value={filter.value || ''}
            onChange={handleInputChange}
            sx={{ mr: 2 }}
          />
          <TextField
            label="Endereço"
            name="address"
            value={filter.address || ''}
            onChange={handleInputChange}
            sx={{ mr: 2 }}
          />
        </FormGroup>
        <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
          <Button variant="contained" onClick={handleCancel} sx={{ mr: 2 }}>
            Cancelar
          </Button>
          <Button variant="contained" type="submit">
            Filtrar
          </Button>
        </Box>
      </form>
    </Box>
  );
};

export default GroupFilter;
