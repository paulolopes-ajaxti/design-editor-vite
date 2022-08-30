/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useContext, useState } from 'react'
import { Container, Divider, Grid, Stack, Typography } from '@mui/material'
import AddRoundedIcon from '@mui/icons-material/AddRounded';
import { useLocation } from 'react-router-dom';
import FormularioForm from './forms/FormularioForm';
import DataGridFormularios from '../../../components/datagrid/DataGridFormularios';
import BoxContainer from '../../../components/box/BoxContainer';
import { Formik } from 'formik';
import { IFormularioValues } from '../../../@types/@forms/formulario';
import { useAddFormulario, useEditFormulario } from '../../../hooks/formularios/useFomularios';
import { NotificationContext } from '../../../context/NotificationContext';

const FormularioPage = () => {
  const location = useLocation()
  const { setMsn, setCor, setActiveNotify} = useContext(NotificationContext)
  const [success, setSuccess] = useState(false)
  const [loading,setLoading] = useState(false)
  const {mutateAsync: postFormulario} = useAddFormulario()
  const {mutateAsync: putFormulario} = useEditFormulario()

  const initialValues: IFormularioValues = {
    foR_COD: 0,
    codigo: '',
    descricao: '',
    tamanho_Folha: 'A4',
    largura_Folha: 0,
    altura_Folha: 0,
    largura_Etiqueta: 0,
    altura_Etiqueta: 0,
    qt_Etiquetas_Linha: 0,
    qt_Etiquetas_Coluna: 0,
    distancia_Margem_Sup_Pag: 0,
    distancia_Margem_Esquerda_Pag: 0,
    modo_Folha: 1,
  }

  const salvarFormulario = async (values: IFormularioValues) => {
    setSuccess(false)
    setLoading(true)
    setActiveNotify(false)
    const formularioValue = {
      codigo: values.codigo,
      descricao: values.descricao,
      tamanho_Folha: values.tamanho_Folha,
      largura_Folha: values.largura_Folha,
      altura_Folha: values.altura_Folha,
      largura_Etiqueta: values.largura_Etiqueta,
      altura_Etiqueta: values.altura_Etiqueta,
      qt_Etiquetas_Linha: values.qt_Etiquetas_Linha,
      qt_Etiquetas_Coluna: values.qt_Etiquetas_Coluna,
      distancia_Margem_Sup_Pag: values.distancia_Margem_Sup_Pag,
      distancia_Margem_Esquerda_Pag: values.distancia_Margem_Esquerda_Pag,
      modo_Folha: values.modo_Folha,
    }
    try {
      const formulario = await postFormulario(formularioValue)
        if (formulario) {
          setMsn('Cadastro concluído')
          setCor('success')
          setActiveNotify(true)
          setSuccess(true)
        }
    } catch (error) {
      const { name, stack, message } = error as Error
      setMsn('Erro ao cadastrar o Formulario!')
      setCor('error')
      setActiveNotify(true)
      setSuccess(false)
    } finally {
      setLoading(false)
    }
  }

  const editarFormulario = async (values: IFormularioValues) => {
    setSuccess(false)
    setLoading(true)
    setActiveNotify(false)
    const formularioValue = {
      foR_COD: values.foR_COD,
      codigo: values.codigo,
      descricao: values.descricao,
      tamanho_Folha: values.tamanho_Folha,
      largura_Folha: values.largura_Folha,
      altura_Folha: values.altura_Folha,
      largura_Etiqueta: values.largura_Etiqueta,
      altura_Etiqueta: values.altura_Etiqueta,
      qt_Etiquetas_Linha: values.qt_Etiquetas_Linha,
      qt_Etiquetas_Coluna: values.qt_Etiquetas_Coluna,
      distancia_Margem_Sup_Pag: values.distancia_Margem_Sup_Pag,
      distancia_Margem_Esquerda_Pag: values.distancia_Margem_Esquerda_Pag,
      modo_Folha: values.modo_Folha,
    }
    try {
      const formulario = await putFormulario(formularioValue)
        if (formulario) {
          setMsn('Formulário atualizado com sucesso')
          setCor('success')
          setActiveNotify(true)
          setSuccess(true)
        }
    } catch (error) {
      const { name, stack, message } = error as Error
      setMsn('Erro ao atualizar o Formulario!')
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
        onSubmit={async (values,{ resetForm }) => {
            values.foR_COD ? 
              await editarFormulario(values) 
              : 
              await salvarFormulario(values)
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
              <Typography fontFamily="Montserrat" fontWeight={600} variant="h4">Formularios</Typography>
            </Grid>
            <Divider/>
            <Grid item xs={12}>
              <FormularioForm />
            </Grid>
            <Grid item xs={12} >
              <DataGridFormularios />
            </Grid>
          </BoxContainer>
        </Grid>
      </Formik>
    </>
  )
}

export default FormularioPage