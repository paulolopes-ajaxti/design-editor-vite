/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useContext, useEffect, useState } from 'react'
import {
  Box, Button, CircularProgress, Link,
} from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete'
import {
  DataGrid,
  GridActionsCellItem,
  GridRowId,
  GridColumns,
  GridValueFormatterParams,
} from '@mui/x-data-grid';
import EditRoundedIcon from '@mui/icons-material/EditRounded';
import AddToHomeScreenRoundedIcon from '@mui/icons-material/AddToHomeScreenRounded';
import { useDeleteFormulario, useGerarPdf, useGetAllFormularios, useGetFormulario } from '../../hooks/formularios/useFomularios';
import { useFormikContext } from 'formik';
import { IFormularioValues } from '../../@types/@forms/formulario';
import { CustomButton, LinkBehavior } from '../buttons/CustomButton';
import Api from '../../services/Api';
import { green } from '@mui/material/colors';

type TipoFolha = 'A4' | 'A3'

interface IFormularios {
  foR_COD: number
  codigo: string
  descricao: string
  tamanho_Folha: TipoFolha
  largura_Folha: number
  altura_Folha: number
  largura_Etiqueta: number
  altura_Etiqueta: number
  qt_Etiquetas_Linha: number
  qt_Etiquetas_Coluna: number
  distancia_Margem_Sup_Pag: number
  distancia_Margem_Esquerda_Pag: number
  modo_Folha: number
}

const DataGridFormularios = () =>  {
  const [rows, setRows] = useState<readonly IFormularios[]>([])
  const [rowId, setRowId] = useState<number>(0)
  const [pdfId, setPdfId] = useState<number>(0)
  const { data: formularios, isSuccess, isLoading, isFetching } = useGetAllFormularios()
  const { data: formulario, isSuccess: formSuccess } = useGetFormulario(rowId)
  const { mutateAsync: deletarFormulario } = useDeleteFormulario()

  function sleep(delay = 0) {
    return new Promise((resolve) => {
      setTimeout(resolve, delay)
    })
  }

  const formik = useFormikContext<IFormularioValues>()

  useEffect(() => {
    const active = true

    ;(async () => {
      await sleep(1e3)

      if (active && isSuccess) {
        setRows(formularios)
      }
    })()
  }, [formularios])

  useEffect(() => {
    const active = true

    ;(async () => {
      await sleep(1e3)

      if (active && formSuccess) {
        formik.setValues(formulario)
        setRowId(0)
      }
    })()
  }, [formulario])

  const deleteFormulario = React.useCallback(
    (id: GridRowId) => async () => {
      await deletarFormulario(parseInt(id.toString()))
      setRows((prevRows) => prevRows.filter((row) => row.foR_COD !== id))
    },
    [deletarFormulario],
  )

  const setValues = React.useCallback(
    (id: GridRowId) => () => {
      setRowId(parseInt(id.toString()))
    },
    [],
  )
 
  type Row = typeof rows[number]
 
  const columns = React.useMemo<GridColumns<Row>>(
    () => [
      { field: 'codigo', type: 'string', width: 80, flex: 1,renderHeader: () => <strong>Cod. Formulário</strong> },
      { field: 'descricao', type: 'string',width: 80, flex: 1,renderHeader: () => <strong>Descrição</strong> },
      { field: 'tamanho_Folha', type: 'string', width: 80, flex: 1,renderHeader: () => <strong>Tamanho da Folha</strong> },
      { field: 'modo_Folha', 
        type: 'number', 
        width: 80,
        flex: 1, 
        renderHeader: () => <strong>Modo da Folha</strong>,
        valueFormatter: (params: GridValueFormatterParams): string => {
          let valorExibicao;
          if(params.value === 1) {
            valorExibicao = 'Retrato'
          } else {
            valorExibicao = 'Paisagem'
          }
          return `${valorExibicao}`
        }, 
      },
      {
        field: 'actions',
        type: 'actions',
        width: 250,
        flex: 2,
        renderHeader: () => <strong>Ações</strong>,
        getActions: (params) => [
          <Button 
            size='small'
            variant='contained' 
            color="error" 
            onClick={deleteFormulario(params.id)}>
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
            variant='contained'
            LinkComponent={Link}
            href={`https://localhost:44355/api/Formulario/GerarPDF/${parseInt(params.id.toString())}`}
            color='warning'>
              Testar
          </Button>,
/*           <GridActionsCellItem
            icon={<DeleteIcon />}
            label="Delete"
            onClick={deleteFormulario(params.id)}
            
          />,
          <GridActionsCellItem
            icon={<EditRoundedIcon />}
            label="Editar "
            onClick={setValues(params.id)}
          />, */
        ],
      },
    ],
    [deleteFormulario, setValues],
  )

  return (
    <Box
      sx={{
        position: 'relative',
        height: 500,
        paddingX: 3,
      }}
    >
      <DataGrid
        disableColumnMenu
        hideFooter
        columns={columns}
        rows={rows}
        getRowId={(row) => row?.foR_COD}
        hideFooterSelectedRowCount
        loading={!rows.length}
      />
    </Box>
  )
}

export default DataGridFormularios