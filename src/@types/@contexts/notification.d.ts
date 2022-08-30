import { AlertColor } from '@mui/material'
import React from 'react'

export type NotificationContextType = {
  activeNotify: boolean
  setActiveNotify: React.Dispatch<React.SetStateAction<boolean>>
  msn: string
  setMsn: React.Dispatch<React.SetStateAction<string>>
  cor: AlertColor
  setCor: React.Dispatch<React.SetStateAction<AlertColor>>
  /* ipAdress: string */
}