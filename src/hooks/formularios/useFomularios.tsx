import { AxiosResponse } from 'axios'
import { useMutation, UseMutationResult, useQuery, useQueryClient, UseQueryResult } from 'react-query'
import Api from '../../services/Api'

type TipoFolha = 'A4' | 'A3'

interface IFormulario {
  foR_COD?: number,
  codigo: string,
  descricao: string,
  tamanho_Folha: TipoFolha,
  largura_Folha: number,
  altura_Folha: number,
  largura_Etiqueta: number,
  altura_Etiqueta: number,
  qt_Etiquetas_Linha: number,
  qt_Etiquetas_Coluna: number,
  distancia_Margem_Sup_Pag: number,
  distancia_Margem_Esquerda_Pag: number,
  modo_Folha: number
}

interface IFormularioResult {
  foR_COD: number,
  codigo: string,
  descricao: string,
  tamanho_Folha: TipoFolha,
  largura_Folha: number,
  altura_Folha: number,
  largura_Etiqueta: number,
  altura_Etiqueta: number,
  qt_Etiquetas_Linha: number,
  qt_Etiquetas_Coluna: number,
  distancia_Margem_Sup_Pag: number,
  distancia_Margem_Esquerda_Pag: number,
  modo_Folha: number
}

//--------------consumo-api
const getAllFormularios = async () => {
  const { data } = await Api.get<IFormularioResult[]>(`Formulario`)
  return data
}

const getFormulario = async (for_cod: number) => {
  const { data } = await Api.get<IFormulario[]>(`Formulario/FiltroFormulario/${for_cod}`)
  return data
}

const postFormulario = async (item: IFormulario) => {
  const result = (
    await Api.post<IFormularioResult>('Formulario/InserirFormulario', {
      codigo: item.codigo,
      descricao: item.descricao,
      tamanho_Folha: item.tamanho_Folha,
      largura_Folha: item.largura_Folha,
      altura_Folha: item.altura_Folha,
      largura_Etiqueta: item.largura_Etiqueta,
      altura_Etiqueta: item.altura_Etiqueta,
      qt_Etiquetas_Linha: item.qt_Etiquetas_Linha,
      qt_Etiquetas_Coluna: item.qt_Etiquetas_Coluna,
      distancia_Margem_Sup_Pag: item.distancia_Margem_Sup_Pag,
      distancia_Margem_Esquerda_Pag: item.distancia_Margem_Esquerda_Pag,
      modo_Folha: item.modo_Folha
    })
  ).data
  return result
}

const gerarPdf = async (for_cod: number) => {
  const { data } = await Api.get<File>(`Formulario/GerarPDF/${for_cod}`)
  return data
}

const putFormulario = async (item: IFormulario) => {
  const result = (
    await Api.put<IFormularioResult>('Formulario/AtualizarFormulario', {
      foR_COD: item.foR_COD,
      codigo: item.codigo,
      descricao: item.descricao,
      tamanho_Folha: item.tamanho_Folha,
      largura_Folha: item.largura_Folha,
      altura_Folha: item.altura_Folha,
      largura_Etiqueta: item.largura_Etiqueta,
      altura_Etiqueta: item.altura_Etiqueta,
      qt_Etiquetas_Linha: item.qt_Etiquetas_Linha,
      qt_Etiquetas_Coluna: item.qt_Etiquetas_Coluna,
      distancia_Margem_Sup_Pag: item.distancia_Margem_Sup_Pag,
      distancia_Margem_Esquerda_Pag: item.distancia_Margem_Esquerda_Pag,
      modo_Folha: item.modo_Folha
    })
  ).data
  return result
}

const deleteFormulario = async (for_cod: number) => {
  const { data } = await Api.delete(`Formulario/DeletarFormulario/${for_cod}`)
  return data
}

//--------------hooks
function useGetAllFormularios(): UseQueryResult<IFormularioResult[], Error> {
  return useQuery(
    ['formularios'],
    async () => await getAllFormularios()
  )
}

function useGetFormulario(for_cod: number): UseQueryResult<IFormularioResult, Error> {
  return useQuery(
    ['formulario', for_cod],
    async () => await getFormulario(for_cod),
    {
      enabled: Boolean(for_cod),
    }
  )
}

function useAddFormulario(): UseMutationResult<IFormularioResult, unknown, IFormulario, unknown> {
  const queryClient = useQueryClient()
  return useMutation(async (item: IFormulario) => await postFormulario(item), {
    onSuccess: () => {
      queryClient.invalidateQueries(["formularios"])
    }
  })
}

function useGerarPdf(for_cod: number): UseQueryResult<File, Error> {
  return useQuery(['pdfGerado'], async () => await gerarPdf(for_cod))
}

function useEditFormulario(): UseMutationResult<IFormularioResult, unknown, IFormulario, unknown> {
  const queryClient = useQueryClient()
  return useMutation(async (item: IFormulario) => await putFormulario(item), {
    onSuccess: (values) => {
      queryClient.invalidateQueries(["formularios"])
      queryClient.setQueryData(["formulario", values.foR_COD], values)
    }
  })
}

function useDeleteFormulario(): UseMutationResult<any, unknown, number, unknown> {
  const queryClient = useQueryClient()
  return useMutation(async (for_cod: number) => await deleteFormulario(for_cod), {
    onSuccess: () => {
      queryClient.invalidateQueries(["formularios"])
    }
  })
}

export { 
  useGetAllFormularios, 
  useGetFormulario, 
  useAddFormulario,
  useGerarPdf, 
  useEditFormulario, 
  useDeleteFormulario, 
}