import { AppBar, Toolbar } from '@mui/material'
import React from 'react'

const Footer = () => {
  return (
    <footer>
      <AppBar position="fixed" sx={{ top: 'auto', bottom: 0, backgroundColor: '#272727', height: '45px' }}>
        <Toolbar />
      </AppBar>
    </footer>
  )
}
export default Footer