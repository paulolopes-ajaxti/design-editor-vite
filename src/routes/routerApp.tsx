import React from 'react'
import { Route, Routes } from 'react-router-dom'
import EtiquetaPage from '../assets/pages/etiqueta/EtiquetaPage'
import FormularioPage from '../assets/pages/formulario/FormularioPage'
import Layout from '../components/layout/Layout'
import { ImageMapEditor } from '../editor/editors'

const RouterApp = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout/>}>
        <Route index element={<></>}/>
        <Route path="/formulario">
          <Route index element={<FormularioPage />} />
        </Route>
        <Route path="/etiqueta">
          <Route index element={<EtiquetaPage />} />
        </Route>
        <Route path="/editor">
          <Route index element={<div className="App"><ImageMapEditor /></div>} />
        </Route>
      </Route>
    </Routes>
  )
}

export default RouterApp