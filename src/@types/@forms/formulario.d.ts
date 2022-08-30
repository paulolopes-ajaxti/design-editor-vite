export type TipoFolha = 'A4' | 'A3'

export interface IFormularioValues {
  foR_COD?: number,
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