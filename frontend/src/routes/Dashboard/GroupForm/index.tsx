import type { ChangeEvent } from 'react';

import axios from 'axios';

import { useState, useCallback, useEffect } from 'react';

import {
  Dialog,
  FormControl,
  Box,
  TextField,
  Stack,
  Button,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
} from '@mui/material';

import { useSnackbar } from 'notistack';

import ModalHeader from 'components/ModalHeader';

import styles from './styles';

interface GroupFormProps {
  open: boolean;
  onClose: () => void;
  groupFormState?: {
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
  };
  setGroupFormState: (
    state:
      | {
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
      | undefined,
  ) => void;
  handleClearFilter: () => void;
}

type CreateGroupInput = {
  name: string;
  sport: string;
  minimumAge: number;
  isPrivate: boolean;
  isFree: boolean;
  value: number;
  address: string;
  additionalInformation: string;
  adminId: number;
};

const initialState: CreateGroupInput = {
  name: '',
  sport: '',
  minimumAge: 0,
  isPrivate: false,
  isFree: true,
  value: 0,
  address: '',
  additionalInformation: '',
  adminId: 0,
};

const Constants = {
  addOrgDialogId: 'dialog-title',
  orgStatusId: 'Group-status-group',
  orgTagsId: 'Group-tags-select',
};

const GroupForm = ({
  open,
  onClose,
  groupFormState,
  setGroupFormState,
  handleClearFilter,
}: GroupFormProps): JSX.Element => {
  const { enqueueSnackbar } = useSnackbar();
  const [formFields, setFormFields] = useState<CreateGroupInput>(initialState);

  useEffect(() => {
    if (groupFormState && Object.keys(groupFormState).length) {
      setFormFields(groupFormState);
    } else {
      setFormFields(initialState);
    }
  }, [groupFormState]);
  const handleChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>): void => {
      setFormFields(curr => ({
        ...curr,
        [event.target.name]: event.target.value || '',
      }));
    },
    [],
  );

  const handleIsFreeChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      const isFree = event.target.value === 'true';
      setFormFields({
        ...formFields,
        isFree,
      });
    },
    [formFields, setFormFields],
  );

  const handleIsPrivateChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      const isPrivate = event.target.value === 'true';
      setFormFields({
        ...formFields,
        isPrivate,
      });
    },
    [formFields, setFormFields],
  );

  const handleClose = useCallback(() => {
    setGroupFormState(undefined);
    onClose();
  }, [onClose, setGroupFormState]);

  const handleClick = useCallback(() => {
    const adminId = JSON.parse(String(localStorage.getItem('user'))).id;

    if (!groupFormState) {
      formFields.minimumAge = Number(formFields.minimumAge);
      formFields.value = Number(formFields.value);
      axios
        .post('api/groups', { ...formFields, adminId })
        .then(() => {
          enqueueSnackbar('Grupo criado com sucesso', {
            variant: 'success',
          });
        })
        .catch(() => {
          enqueueSnackbar('Ocorreu um erro ao criar o grupo', {
            variant: 'error',
          });
        });
    } else {
      axios
        .put(`api/groups/${groupFormState.id}`, formFields)
        .then(() => {
          enqueueSnackbar('Grupo atualizado com sucesso', {
            variant: 'success',
          });
          handleClearFilter();
        })
        .catch(() => {
          enqueueSnackbar('Ocorreu um erro ao atualizar o grupo', {
            variant: 'error',
          });
        });
    }
    handleClose();
  }, [
    enqueueSnackbar,
    formFields,
    groupFormState,
    handleClose,
    handleClearFilter,
  ]);

  return (
    <Dialog
      fullWidth
      open={open}
      onClose={handleClose}
      aria-labelledby={Constants.addOrgDialogId}
    >
      <Box>
        <ModalHeader
          id={Constants.addOrgDialogId}
          closeButtonAriaLabel="Fechar"
          onClose={handleClose}
          text={!groupFormState ? 'Adicionar Grupo' : 'Modificar Grupo'}
        />
        <Stack style={styles.stack}>
          <FormControl style={styles.textField}>
            <TextField
              autoFocus
              label="Nome"
              type="text"
              margin="dense"
              variant="outlined"
              value={formFields.name}
              fullWidth
              name="name"
              onChange={handleChange}
            />
            <TextField
              autoFocus
              label="Esporte"
              type="text"
              margin="dense"
              variant="outlined"
              value={formFields.sport}
              fullWidth
              name="sport"
              onChange={handleChange}
            />
            <TextField
              autoFocus
              label="Idade mínima"
              type="number"
              margin="dense"
              variant="outlined"
              value={formFields.minimumAge}
              fullWidth
              name="minimumAge"
              onChange={handleChange}
            />
            <FormControl margin="dense">
              <FormLabel color="success" id="isPrivate">
                É privado?
              </FormLabel>
              <RadioGroup row aria-labelledby="isPrivate" name="isPrivate">
                <FormControlLabel
                  control={
                    <Radio
                      checked={formFields.isPrivate === true}
                      color="success"
                      onChange={handleIsPrivateChange}
                    />
                  }
                  label="Sim"
                  value="true"
                />
                <FormControlLabel
                  control={
                    <Radio
                      checked={formFields.isPrivate === false}
                      color="success"
                      onChange={handleIsPrivateChange}
                    />
                  }
                  label="Não"
                  value="false"
                />
              </RadioGroup>
            </FormControl>
            <FormControl margin="dense">
              <FormLabel color="success" id="isFree">
                É grátis?
              </FormLabel>
              <RadioGroup row aria-labelledby="isFree" name="isFree">
                <FormControlLabel
                  control={
                    <Radio
                      checked={formFields.isFree === true}
                      color="success"
                      onChange={handleIsFreeChange}
                    />
                  }
                  label="Sim"
                  value="true"
                />
                <FormControlLabel
                  control={
                    <Radio
                      checked={formFields.isFree === false}
                      color="success"
                      onChange={handleIsFreeChange}
                    />
                  }
                  label="Não"
                  value="false"
                />
              </RadioGroup>
            </FormControl>
            {!formFields.isFree && (
              <TextField
                autoFocus
                label="Valor"
                type="number"
                margin="dense"
                variant="outlined"
                value={formFields.value}
                fullWidth
                name="value"
                onChange={handleChange}
              />
            )}
            <TextField
              autoFocus
              label="Endereço"
              type="text"
              margin="dense"
              variant="outlined"
              value={formFields.address}
              fullWidth
              name="address"
              onChange={handleChange}
            />
            <TextField
              autoFocus
              label="Informações adicionais"
              type="text"
              margin="dense"
              variant="outlined"
              value={formFields.additionalInformation}
              fullWidth
              name="additionalInformation"
              onChange={handleChange}
            />
          </FormControl>
        </Stack>
        <Button fullWidth onClick={handleClick}>
          {!groupFormState ? 'Adicionar' : 'Atualizar'}
        </Button>
      </Box>
    </Dialog>
  );
};

export default GroupForm;
