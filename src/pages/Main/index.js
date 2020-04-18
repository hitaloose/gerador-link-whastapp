import React, { useState } from 'react';

import { Paper, TextField, Button } from '@material-ui/core';
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
  };

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
      {celulares.map((cel) => (
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
          {cel.numeroFormatado}{' '}
          <a
            style={{ margin: '0px 15px' }}
            href={cel.linkWhastapp}
            target="_blank"
          >
            Whastapp
          </a>
          <a href={cel.linkTelefone} target="_blank">
            Telefone
          </a>
        </Paper>
      ))}
    </>
  );
}
