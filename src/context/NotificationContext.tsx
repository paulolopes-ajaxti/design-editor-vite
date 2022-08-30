import { AlertColor } from '@mui/material'
import React, { createContext, ReactNode, useEffect, useState } from 'react'
import { NotificationContextType } from '../@types/@contexts/notification'

interface Props {
  children: ReactNode
}

export const NotificationContext = createContext({} as NotificationContextType)

export const NotificationProvider: React.FC<Props> = ({ children }) => {
  const [activeNotify, setActiveNotify] = useState(false)
  const [msn, setMsn] = useState('')
  const [cor, setCor] = useState<AlertColor>('warning')

  const contextValues = React.useMemo(
    () => ({
      activeNotify,
      setActiveNotify,
      msn,
      setMsn,
      cor,
      setCor,
   /*    ipAdress */
    }),
    [activeNotify, setActiveNotify, msn, setMsn, cor, setCor, /* ipAdress */]
  )

  return (
    <NotificationContext.Provider value={contextValues}>
      {children}
    </NotificationContext.Provider>
  )
}