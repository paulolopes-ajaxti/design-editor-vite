import React from 'react'
import { LocalizationProvider } from "@mui/lab"
import AdapterDateFns from '@mui/lab/AdapterDateFns'
import { FormControl, Grid, InputAdornment, InputLabel, MenuItem, Select } from "@mui/material"
import { useFormikContext } from "formik"
import { StyledInputSelect, StyledTextField } from "../../../../components/fields/CustomTextField"
import ptBR from 'date-fns/esm/locale/pt-BR'
import { IFormularioValues } from '../../../../@types/@forms/formulario'
import { CustomButton } from '../../../../components/buttons/CustomButton'

const tamanhoFolha = [
  {
    field: 'Tamanho A4',
    value: 'A4'
  },
  {
    field: 'Tamanho A3',
    value: 'A3'
  }
]

const modoFolha = [
  {
    field: 'Retrato',
    value: 1
  },
  {
    field: 'Paisagem',
    value: 2
  }
]
const ITEM_HEIGHT = 48
const ITEM_PADDING_TOP = 8
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250
    }
  }
}

const FormularioForm = () => {
  
  const formik = useFormikContext<IFormularioValues>()

  function setDimensoesFolha(tamanhoFolha: string) {
    switch(tamanhoFolha) {
      case 'A4':
       return (
        formik.setFieldValue('largura_Folha', 21),
        formik.setFieldValue('altura_Folha', 29.7)
       );
       case 'A3':
        return (
         formik.setFieldValue('largura_Folha', 29.7),
         formik.setFieldValue('altura_Folha', 42)
        )
      default: 
        return (
          formik.setFieldValue('largura_Folha', 21),
          formik.setFieldValue('altura_Folha', 29.7)
        )
    }

  }

  console.log(formik.values)
  
  return (
    <LocalizationProvider dateAdapter={AdapterDateFns} locale={ptBR}>
    <Grid container spacing={2} padding={5} justifyContent="center">
    <Grid item xs={3}>
      <StyledTextField 
         id="codigo"
         name="codigo"
         label="Codigo Formulario"
         value={formik.values.codigo}
         onChange={formik.handleChange}
         fullWidth
         size='medium'
         />
      </Grid>
      <Grid item xs={3}>
        <StyledTextField 
           id="descricao"
           name="descricao"
           label="Descrição Formulario"
           value={formik.values.descricao}
           onChange={formik.handleChange}
           fullWidth
           size='medium'
           />
      </Grid>
      <Grid item xs={3}>
        <FormControl fullWidth>
          <InputLabel sx={{margin: 2}} id="tamanhoFolha-label">Tamanho da Folha</InputLabel>
          <Select
            labelId="tamanhoFolha-label"
            id="tamanho_Folha"
            name="tamanho_Folha"
            label="Tamanho da Folha"
            value={formik.values.tamanho_Folha}
            onChange={formik.handleChange}
            MenuProps={MenuProps}
            input={<StyledInputSelect label="Tamanho da Folha" fullWidth />}
          >
            {tamanhoFolha.map((item, index) => (
              <MenuItem key={index} value={item.value} onClick={() => setDimensoesFolha(item.value)}>
                {item.field}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Grid>
      <Grid item xs={3}>
        <FormControl fullWidth>
          <InputLabel sx={{margin: 2}} id="modoFolha-label">Modo da Folha</InputLabel>
          <Select
            labelId="modoFolha-label"
            id="modo_Folha"
            name="modo_Folha"
            label="Modo da Folha"
            value={formik.values.modo_Folha}
            onChange={formik.handleChange}
            MenuProps={MenuProps}
            input={<StyledInputSelect label="Modo da Folha" fullWidth/>}
          >
            {modoFolha.map((item, index) => (
              <MenuItem key={index} value={item.value}>
                {item.field}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Grid>
      <Grid item xs={3}>
        <StyledTextField 
           id="largura_Folha"
           name="largura_Folha"
           label="Largura da Folha"
           value={formik.values.largura_Folha}
           onChange={formik.handleChange}
           fullWidth
           size='medium'
           InputProps={{
            endAdornment: <InputAdornment position="start">cm</InputAdornment>,
          }}
           />
      </Grid>
      <Grid item xs={3}>
        <StyledTextField 
           id="altura_Folha"
           name="altura_Folha"
           label="Altura da folha"
           value={formik.values.altura_Folha}
           onChange={formik.handleChange}
           fullWidth
           size='medium'
           InputProps={{
            endAdornment: <InputAdornment position="start">cm</InputAdornment>,
          }}
           />
      </Grid>
      <Grid item xs={3}>
        <StyledTextField 
           id="largura_Etiqueta"
           name="largura_Etiqueta"
           label="Largura da Etiqueta"
           value={formik.values.largura_Etiqueta}
           onChange={formik.handleChange}
           fullWidth
           size='medium'
           InputProps={{
            endAdornment: <InputAdornment position="start">cm</InputAdornment>,
          }}
           />
      </Grid>
      <Grid item xs={3}>
        <StyledTextField 
           id="altura_Etiqueta"
           name="altura_Etiqueta"
           label="Altura da Etiqueta"
           value={formik.values.altura_Etiqueta}
           onChange={formik.handleChange}
           fullWidth
           size='medium'
           InputProps={{
            endAdornment: <InputAdornment position="start">cm</InputAdornment>,
          }}
           />
      </Grid>
      <Grid item xs={3}>
        <StyledTextField 
           id="qt_Etiquetas_Linha"
           name="qt_Etiquetas_Linha"
           label="Qt Etiquetas/Linha"
           value={formik.values.qt_Etiquetas_Linha}
           onChange={formik.handleChange}
           fullWidth
           size='medium'
           />
      </Grid>
      <Grid item xs={3}>
        <StyledTextField 
           id="qt_Etiquetas_Coluna"
           name="qt_Etiquetas_Coluna"
           label="Qt Etiquetas/Coluna"
           value={formik.values.qt_Etiquetas_Coluna}
           onChange={formik.handleChange}
           fullWidth
           size='medium'
           />
      </Grid>
      <Grid item xs={3}>
        <StyledTextField 
           id="distancia_Margem_Sup_Pag"
           name="distancia_Margem_Sup_Pag"
           label="Distância Margem Superior"
           value={formik.values.distancia_Margem_Sup_Pag}
           onChange={formik.handleChange}
           fullWidth
           size='medium'
           InputProps={{
            endAdornment: <InputAdornment position="start">cm</InputAdornment>,
          }}
           />
      </Grid>
      <Grid item xs={3}>
        <StyledTextField 
           id="distancia_Margem_Esquerda_Pag"
           name="distancia_Margem_Esquerda_Pag"
           label="Distância Margem Esquerda"
           value={formik.values.distancia_Margem_Esquerda_Pag}
           onChange={formik.handleChange}
           fullWidth
           size='medium'
           InputProps={{
            endAdornment: <InputAdornment position="start">cm</InputAdornment>,
          }}
           />
      </Grid>
      <Grid container justifyContent="flex-end" alignItems="flex-end" paddingY={2}>
        <CustomButton
          variant='contained'
          onClick={() => formik.handleSubmit()}
        >
          Salvar Formulario
        </CustomButton>
      </Grid>
    </Grid>
    </LocalizationProvider>
  )
}

export default FormularioForm