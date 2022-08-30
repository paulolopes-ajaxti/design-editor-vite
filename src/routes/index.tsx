import { createTheme, ThemeProvider, useTheme } from '@mui/material'
import React from 'react'
import { NotificationProvider } from '../context/NotificationContext'
import RouterApp from './routerApp'
import * as locales from '@mui/material/locale';


export default function Index() {

  const theme = useTheme()
  const themeWithLocale = React.useMemo(
    () => createTheme(theme, locales['ptBR']),
    [theme],
  )
  return (
    <ThemeProvider theme={themeWithLocale}>
      <NotificationProvider>
        <RouterApp />
      </NotificationProvider>
    </ThemeProvider>
  )
}