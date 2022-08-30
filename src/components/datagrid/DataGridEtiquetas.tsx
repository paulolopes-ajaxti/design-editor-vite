/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useContext, useEffect, useState } from 'react'
import {
  Box, Button,
} from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete'
import {
  DataGrid,
  GridActionsCellItem,
  GridRowId,
  GridColumns,
} from '@mui/x-data-grid';
import EditRoundedIcon from '@mui/icons-material/EditRounded';
import AddToHomeScreenRoundedIcon from '@mui/icons-material/AddToHomeScreenRounded';
import { useFormikContext } from 'formik';
import { IEtiquetaValues } from '../../@types/@forms/etiqueta';
import { useDeleteEtiqueta, useGetAllEtiquetas, useGetEtiqueta } from '../../hooks/etiquetas/useEtiquetas';
import { CustomButton } from '../buttons/CustomButton';

interface IEtiquetas {
  etQ_COD: number,
  nome: string,
  descricao: string,
  id_Formulario: number
}

const DataGridEtiquetas = () =>  {
  const [rows, setRows] = useState<readonly IEtiquetas[]>([])
  const [rowId, setRowId] = useState<number>(0)
  const { data: etiquetas, isSuccess } = useGetAllEtiquetas()
  const { data: etiqueta, isSuccess: etiquetaSuccess } = useGetEtiqueta(rowId)

  const { mutateAsync: deletarEtiqueta } = useDeleteEtiqueta()

  function sleep(delay = 0) {
    return new Promise((resolve) => {
      setTimeout(resolve, delay)
    })
  }
  
  const formik = useFormikContext<IEtiquetaValues>()

  useEffect(() => {
    const active = true

    ;(async () => {
      await sleep(1e3)

      if (active && isSuccess) {
        setRows(etiquetas)
      }
    })()
  }, [etiquetas])

  useEffect(() => {
    const active = true

    ;(async () => {
      await sleep(1e3)

      if (active && etiquetaSuccess) {
        formik.setValues(etiqueta)
      }
    })()
  }, [etiqueta])

  const deleteEtiqueta = React.useCallback(
    (id: GridRowId) => async () => {
      await deletarEtiqueta(parseInt(id.toString()))
      setRows((prevRows) => prevRows.filter((row) => row.etQ_COD !== id));
    },
    [deletarEtiqueta],
  );

  const duplicateUser = React.useCallback(
    (id: GridRowId) => () => {
      setRows((prevRows) => {
        const rowToDuplicate = prevRows.find((row) => row.etQ_COD === id)!;
        return [...prevRows, { ...rowToDuplicate, id: Date.now() }];
      });
    },
    [],
  );

  const setValues = React.useCallback(
    (id: GridRowId) => () => {
      setRowId(parseInt(id.toString()))
    },
    [],
  )

  type Row = typeof rows[number]
 
  const columns = React.useMemo<GridColumns<Row>>(
    () => [
      { field: 'nome', type: 'string', width: 80, flex: 1,renderHeader: () => <strong>Nome da Etiqueta</strong> },
      { field: 'descricao', type: 'string',width: 80, flex: 1,renderHeader: () => <strong>Descrição</strong> },
      { field: 'idfor_cod', type: 'number', width: 80, flex: 1,renderHeader: () => <strong>Formulario</strong> },
      {
        field: 'actions',
        type: 'actions',
        width: 250,
        flex: 2,
        renderHeader: () => <strong>Ações</strong>,
        getActions: (params) => [
 /*       <GridActionsCellItem
            icon={<DeleteIcon />}
            label="Delete"
            onClick={deleteEtiqueta(params.id)}
            
          />,
          <GridActionsCellItem
            icon={<EditRoundedIcon />}
            label="Editar "
            onClick={setValues(params.id)}
          />, */
          <Button 
            size='small'
            variant='contained' 
            color="error" 
            onClick={deleteEtiqueta(params.id)}>
            Deletar
          </Button>,
          <Button
            size="small" 
            variant='contained' 
            color="info" 
            onClick={setValues(params.id)}>
            Editar
          </Button>,
          <Button
            size="small" 
            variant='contained' 
            color='warning'>
            Testar
          </Button>,
          <Button
            size="small" 
            variant='contained'>
            Desenhar
          </Button>
        ],
      },
    ],
    [deleteEtiqueta, duplicateUser, setValues],
  );


  return (
    <Box
      sx={{
        height: 500,
        paddingX: 3,
      }}
    >
      <DataGrid
        disableColumnMenu
        hideFooter
        columns={columns}
        rows={rows}
        getRowId={(row) => row?.etQ_COD}
        hideFooterSelectedRowCount
        loading={!rows.length}
      />
    </Box>
  )
}

export default DataGridEtiquetas