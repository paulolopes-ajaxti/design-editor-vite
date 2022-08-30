import React, { useState } from 'react'
import Snackbar from '@mui/material/Snackbar'
import MuiAlert, { AlertProps, AlertColor } from '@mui/material/Alert'

interface Props {
  notifyActive: boolean
  setNotify: React.Dispatch<React.SetStateAction<boolean>>
  msn: string
  cor: AlertColor
}
const Alert = React.forwardRef<HTMLDivElement, AlertProps>((props, ref) => (
  <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />
))

export default function Notification({
  notifyActive,
  setNotify,
  msn,
  cor
}: Props): JSX.Element {
  const [state] = useState({
    notifyActive: false,
    vertical: 'top',
    horizontal: 'center'
  })

  const { vertical, horizontal } = state

  const handleNotify = () => {
    setNotify(false)
  }

  return (
    <div style={{ width: '100%' }}>
      <Snackbar
        open={notifyActive}
        autoHideDuration={8000}
        onClose={handleNotify}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        key={vertical + horizontal}
      >
        <Alert onClose={handleNotify} severity={cor}>
          {msn}
        </Alert>
      </Snackbar>
    </div>
  )
}