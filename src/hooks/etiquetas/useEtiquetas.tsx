import { AxiosResponse } from 'axios'
import { useMutation, UseMutationResult, useQuery, useQueryClient, UseQueryResult } from 'react-query'
import Api from '../../services/Api'


interface IEtiqueta {
  etQ_COD?: number,
  nome: string,
  descricao: string,
  id_Formulario: number
}

interface IEtiquetaResult {
  etQ_COD: number,
  nome: string,
  descricao: string,
  id_Formulario: number
}

//--------------consumo-api
const getAllEtiquetas = async () => {
  const { data } = await Api.get<IEtiquetaResult[]>(`Etiqueta`)
  return data
}

const getEtiqueta = async (etq_cod: number) => {
  const { data } = await Api.get<IEtiquetaResult[]>(`Etiqueta/FiltroEtiqueta/${etq_cod}`)
  return data
}

const postEtiqueta = async (item: IEtiqueta) => {
  const result = (
    await Api.post<IEtiquetaResult>('Etiqueta/InserirEtiqueta', {
      nome: item.nome,
      descricao: item.descricao,
      id_Formulario: item.id_Formulario,
    })
  ).data
  return result
}

const putEtiqueta = async (item: IEtiqueta) => {
  const result = (
    await Api.put<IEtiquetaResult>('Etiqueta/AtualizarEtiqueta', {
      etQ_COD: item.etQ_COD,
      nome: item.nome,
      descricao: item.descricao,
      id_Formulario: item.id_Formulario,
    })
  ).data
  return result
}

const deleteEtiqueta = async (etq_cod: number) => {
  const result = (
    await Api.delete<any, AxiosResponse<any, any>, IEtiqueta>(`Etiqueta/Etiqueta/${etq_cod}`)
  ).data
  return result
}

//--------------hooks
function useGetAllEtiquetas(): UseQueryResult<IEtiquetaResult[], Error> {
  return useQuery(
    ['etiquetas'],
    async () => await getAllEtiquetas()
  )
}

function useGetEtiqueta(etq_cod: number): UseQueryResult<IEtiquetaResult, Error> {
  return useQuery(
    ['etiqueta', etq_cod],
    async () => await getEtiqueta(etq_cod),
    {
      enabled: Boolean(etq_cod),
    }
  )
}

function useAddEtiqueta(): UseMutationResult<IEtiquetaResult, unknown, IEtiqueta, unknown> {
  const queryClient = useQueryClient()
  return useMutation(async (item: IEtiqueta) => await postEtiqueta(item), {
    onSuccess: () => {
      queryClient.invalidateQueries(['etiquetas'])
    }
  })
}

function useEditEtiqueta(): UseMutationResult<IEtiquetaResult, unknown, IEtiqueta, unknown> {
  const queryClient = useQueryClient()
  return useMutation(async (item: IEtiqueta) => await putEtiqueta(item), {
    onSuccess: (values) => {
      queryClient.invalidateQueries(['etiquetas'])
      queryClient.setQueryData(['etiquetas', values.etQ_COD], values)

    }
  })
}

function useDeleteEtiqueta(): UseMutationResult<any, unknown, number, unknown> {
  const queryClient = useQueryClient()
  return useMutation(async (etq_cod: number) => await deleteEtiqueta(etq_cod), {
    onSuccess: () => {
      queryClient.invalidateQueries(['etiquetas'])
    }
  })
}

export { 
  useGetAllEtiquetas, 
  useGetEtiqueta, 
  useAddEtiqueta, 
  useEditEtiqueta, 
  useDeleteEtiqueta, 
}