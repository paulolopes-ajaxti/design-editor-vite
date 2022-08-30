import React from 'react'
import { LocalizationProvider } from "@mui/lab"
import AdapterDateFns from '@mui/lab/AdapterDateFns'
import { FormControl, Grid, InputLabel, MenuItem, Select } from "@mui/material"
import { useFormikContext } from "formik"
import { StyledInputSelect, StyledTextField } from "../../../../components/fields/CustomTextField"
import ptBR from 'date-fns/esm/locale/pt-BR'
import { CustomButton } from '../../../../components/buttons/CustomButton'
import { IEtiquetaValues } from '../../../../@types/@forms/etiqueta'
import { useGetAllFormularios } from '../../../../hooks/formularios/useFomularios'

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

const EtiquetaForm = () => {

  const {data: formularios} = useGetAllFormularios()
  
  const formik = useFormikContext<IEtiquetaValues>()

  console.log(formik.values)
  
  return (
    <LocalizationProvider dateAdapter={AdapterDateFns} locale={ptBR}>
    <Grid container spacing={2} padding={5} justifyContent="center">
    <Grid item xs={4}>
      <StyledTextField 
         id="nome"
         name="nome"
         label="Nome da Etiqueta"
         value={formik.values.nome}
         onChange={formik.handleChange}
         fullWidth
         size='medium'
         />
      </Grid>
      <Grid item xs={4}>
        <StyledTextField 
           id="descricao"
           name="descricao"
           label="Descrição Etiqueta"
           value={formik.values.descricao}
           onChange={formik.handleChange}
           fullWidth
           size='medium'
           />
      </Grid>
      <Grid item xs={4}>
        <FormControl fullWidth>
          <InputLabel sx={{margin: 2}} id="formulario-label">Escolha o Formulário</InputLabel>
          <Select
            labelId="formulario-label"
            id="id_Formulario"
            name="id_Formulario"
            label="Escolha o Formulário"
            value={formik.values.id_Formulario}
            onChange={formik.handleChange}
            MenuProps={MenuProps}
            input={<StyledInputSelect label="Escolha o Formulário" fullWidth />}
          >
            {formularios?.map((item, index) => (
              <MenuItem key={index} value={item.foR_COD}>
                {item.codigo}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Grid>
      <Grid container justifyContent="flex-end" alignItems="flex-end" paddingY={2}>
        <CustomButton
          variant='contained'
          onClick={() => formik.handleSubmit()}
        >
          Salvar Etiqueta
        </CustomButton>
      </Grid>
    </Grid>
    </LocalizationProvider>
  )
}

export default EtiquetaForm