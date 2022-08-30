import React from 'react'
import { Button, ButtonBaseProps } from '@mui/material'
import { cyan } from '@mui/material/colors'
import { styled } from '@mui/material/styles'
import { NavLink as RouterLink, NavLinkProps } from 'react-router-dom'

const CustomButton = styled(Button, {
  shouldForwardProp: (prop) => prop !== 'success'
})<{ success?: boolean } & ButtonBaseProps>(({ theme, success }) => ({
  backgroundColor: '#6ea0d9',
  borderRadius: 10,
  color: '#ffff',
  ...(success && {
    bgcolor: cyan[500],
    '&:hover': {
      bgcolor: cyan[700]
    }
  })
}))

const LinkBehavior = React.forwardRef<
  any,
  Omit<NavLinkProps, 'to'> & { href: NavLinkProps['to'] }
>((props, ref) => {
  const { href, ...other } = props
  // Map href (MUI) -> to (react-router)
  return <RouterLink ref={ref} to={href} {...other} />
})

export { CustomButton, LinkBehavior }