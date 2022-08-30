import React from 'react'
import { Card, CardContent } from "@mui/material"
import { ReactNode } from "react"

interface IProps {
  children: ReactNode
}

const DashedCard: React.FC<IProps> = ({children}) => {
  return (
    <Card
      component={'div'}
      sx={{
          border: '4px dashed',
          borderRadius: 2,
          color: '#cdd4da',
          boxShadow: '1px 7px 15px -7px rgba(150,170,180,0.5)',
          bgcolor: '#fff',
          marginBottom: 10
      }}>
      <CardContent>
        {children}
      </CardContent>
  </Card>
  )
}

export default DashedCard