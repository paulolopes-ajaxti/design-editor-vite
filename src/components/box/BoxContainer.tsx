import React from 'react'
import { Box, BoxProps } from '@mui/material'
import { styled } from '@mui/material/styles'

const BoxContainer = styled(Box)<BoxProps>(({ theme }) => ({
  boxShadow:
    theme.palette.mode === 'dark' ? '0 0 1em #2af0f4' : '0 0 1em #c1c1c1',
  marginBottom: 6,
  justifySelf: 'center',
  borderRadius: '20px',
  [theme.breakpoints.between('xs', 'md')]: {
    padding: 10,
    width: '90vw'
  },
  [theme.breakpoints.between('md', 'lg')]: {
    padding: 20,
    width: '70vw'
  },
  [theme.breakpoints.between('lg', 'xl')]: {
    padding: 30,
    width: '75vw'
  },
  [theme.breakpoints.up('xl')]: {
    padding: 30,
    width: '75vw'
  },
  backgroundColor:
    theme.palette.mode === 'dark'
      ? 'rgba(31, 40, 62, 0.9)'
      : 'rgba(255, 255, 255, 0.7)',
  zIndex: 1
}))

export default BoxContainer