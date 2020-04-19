import React, { useState, useEffect } from 'react';
import produce from 'immer';

import { Paper, TextField, Button, Checkbox } from '@material-ui/core';
import InputCelular from '../../components/Celular';

export default function Main() {
  /**
   * States
   */
  const [celular, setCelular] = useState('');
  const [quantidade, setQuantidade] = useState(1);
  const [celulares, setCelulares] = useState([]);

  /**
   * Handles
   */
  const handleSubmit = (e) => {
    e.preventDefault();

    const novosCelulares = [];
    for (let index = 0; index < quantidade; index++) {
      const novoCelular = {};
      const celularNumber = Number(celular.replace(/[()-]/gi, ''));
      novoCelular.checked = false;
      novoCelular.numero = celularNumber + index;
      novoCelular.numeroFormatado = `(${String(novoCelular.numero).substring(
        0,
        2
      )})${String(novoCelular.numero).substring(2, 7)}-${String(
        novoCelular.numero
      ).substring(7, 12)}`;
      novoCelular.linkWhastapp = `https://api.whatsapp.com/send?phone=55${novoCelular.numero}`;
      novoCelular.linkTelefone = `tel:${novoCelular.numero}`;

      novosCelulares.push(novoCelular);
    }

    setCelulares(novosCelulares);
    setCelular('');
    setQuantidade(1);
  };

  const handleChecked = (e, i) => {
    setCelulares(
      produce(celulares, (draft) => {
        draft[i].checked = e.target.checked;
      })
    );
  };

  const handleClick = (i) => {
    setCelulares(
      produce(celulares, (draft) => {
        draft[i].checked = true;
      })
    );
  };

  /**
   * Effects
   */
  useEffect(() => {
    const localCelulares = localStorage.getItem('celulares');
    if (localCelulares) {
      setCelulares(JSON.parse(localCelulares));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('celulares', JSON.stringify(celulares));
  }, [celulares]);

  /**
   * Returns
   */
  return (
    <>
      <Paper
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          padding: '15px',
          margin: '15px',
        }}
        component="form"
        onSubmit={handleSubmit}
      >
        <TextField
          style={{ marginRight: '15px' }}
          label="Celular"
          InputProps={{
            inputComponent: InputCelular,
          }}
          fullWidth
          required
          value={celular}
          onChange={(e) => setCelular(e.target.value)}
        />
        <TextField
          style={{ marginRight: '15px' }}
          label="Quantidade"
          type="number"
          InputProps={{ inputProps: { min: 1, max: 99999999, step: 1 } }}
          fullWidth
          required
          value={quantidade}
          onChange={(e) => setQuantidade(e.target.value)}
        />
        <Button variant="contained" color="primary" type="submit">
          Gerar
        </Button>
      </Paper>
      {celulares.map((cel, i) => (
        <Paper
          key={cel.numero}
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            padding: '15px',
            margin: '15px',
          }}
        >
          <Checkbox
            checked={cel.checked}
            onChange={(e) => handleChecked(e, i)}
          />
          {cel.numeroFormatado}
          <a
            style={{ margin: '0px 15px' }}
            href={cel.linkWhastapp}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => handleClick(i)}
          >
            Whatsapp
          </a>
          <a
            href={cel.linkTelefone}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => handleClick(i)}
          >
            Telefone
          </a>
        </Paper>
      ))}
    </>
  );
}
