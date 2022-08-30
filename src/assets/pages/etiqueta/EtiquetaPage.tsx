/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useContext, useState } from 'react'
import { Container, Divider, Grid, Stack, Typography } from '@mui/material'
import AddRoundedIcon from '@mui/icons-material/AddRounded';
import { useLocation } from 'react-router-dom';
import EtiquetaForm from './forms/EtiquetaForm';
import DataGridFormularios from '../../../components/datagrid/DataGridFormularios';
import BoxContainer from '../../../components/box/BoxContainer';
import { Formik } from 'formik';
import { IFormularioValues } from '../../../@types/@forms/formulario';
import { useAddFormulario, useEditFormulario } from '../../../hooks/formularios/useFomularios';
import { NotificationContext } from '../../../context/NotificationContext';
import { IEtiquetaValues } from '../../../@types/@forms/etiqueta';
import { useAddEtiqueta, useEditEtiqueta } from '../../../hooks/etiquetas/useEtiquetas';
import DataGridEtiquetas from '../../../components/datagrid/DataGridEtiquetas';

const EtiquetaPage = () => {
  const location = useLocation()
  const { setMsn, setCor, setActiveNotify} = useContext(NotificationContext)
  const [success, setSuccess] = useState(false)
  const [loading,setLoading] = useState(false)
  const {mutateAsync: postEtiqueta} = useAddEtiqueta()
  const {mutateAsync: putEtiqueta} = useEditEtiqueta()

  const initialValues: IEtiquetaValues = {
    etQ_COD: 0, 
    nome: '',
    descricao: '',
    id_Formulario: 0,
  }

  const salvarEtiqueta = async (values: IEtiquetaValues) => {
    setSuccess(false)
    setLoading(true)
    setActiveNotify(false)
    const etiquetaValue = {
      nome: values.nome,
      descricao: values.descricao,
      id_Formulario: values.id_Formulario,
    }
    try {
      const etiqueta = await postEtiqueta(etiquetaValue)
        if (etiqueta) {
          setMsn('Cadastro concluído')
          setCor('success')
          setActiveNotify(true)
          setSuccess(true)
        }
    } catch (error) {
      const { name, stack, message } = error as Error
      setMsn('Erro ao cadastrar a Etiqueta!')
      setCor('error')
      setActiveNotify(true)
    } finally {
      setLoading(false)
    }
  }

  const editarEtiqueta = async (values: IEtiquetaValues) => {
    setSuccess(false)
    setLoading(true)
    setActiveNotify(false)
    const etiquetaValue = {
      etQ_COD: values.etQ_COD,
      nome: values.nome,
      descricao: values.descricao,
      id_Formulario: values.id_Formulario,
    }
    try {
      const etiqueta = await putEtiqueta(etiquetaValue)
        if (etiqueta) {
          setMsn('Etiqueta atualizada com sucesso')
          setCor('success')
          setActiveNotify(true)
          setSuccess(true)
        }
    } catch (error) {
      const { name, stack, message } = error as Error
      setMsn('Erro ao atualizar a Etiqueta!')
      setCor('error')
      setActiveNotify(true)
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <Formik
        initialValues={initialValues}
        onSubmit={async (values, { resetForm }) => {
            values.etQ_COD ? 
              await editarEtiqueta(values) 
                : 
              await salvarEtiqueta(values)
            resetForm({values: initialValues})
          } 
        }
        enableReinitialize={true}>
        <Grid 
        container   
        alignItems="center"
        justifyContent="center"
        paddingX={5} 
        marginBottom={5}>
          <BoxContainer component={Container}>
            <Grid item xs={9} paddingBottom={5}>
              <Typography fontFamily="Montserrat" fontWeight={600} variant="h4">Etiquetas</Typography>
            </Grid>
            <Divider/>
            <Grid item xs={12}>
              <EtiquetaForm />
            </Grid>
            <Grid item xs={12} >
              <DataGridEtiquetas />
            </Grid>
          </BoxContainer>
        </Grid>
      </Formik>
    </>
  )
}

export default EtiquetaPage