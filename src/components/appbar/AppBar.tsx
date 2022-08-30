// eslint-disable-next-line @typescript-eslint/no-unused-vars
import React from "react";
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar'
import { styled } from '@mui/material/styles'
import {
  Toolbar,
  Grid,
  Typography,
} from '@mui/material'
import {ReactComponent as Logo} from '../../assets/imgs/logos/logo-branca.svg'


interface AppBarProps extends MuiAppBarProps {
  open?: boolean
}

const Appbar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open'
})<AppBarProps>(({ theme, open }) => ({
  // eslint-disable-next-line no-unsafe-optional-chaining
  zIndex: open === true ? theme.zIndex.drawer + 1 : theme.zIndex.drawer - 1,
  background: theme.palette.mode === 'dark' ? '#1A2035' : '#6ea0d9',
  boxShadow: theme.palette.mode === 'dark' ? '0px 1px 1px 0px #3e3957' : 'none',
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen
  }),
  ...(open && {
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen
    })
  })
}))


const Navbar = () => {
  return (
    <Appbar>
      <Toolbar>
        <Grid container alignItems="center">
        <Grid item>
            <Logo width="150px" height="52"/>
          </Grid>
          <Grid item xs={10}>
            <Typography variant="h5" justifyContent="center" textAlign="center">Grendene Deg</Typography>
          </Grid>
        </Grid>
      </Toolbar>
    </Appbar>
  )
}

export default Navbar