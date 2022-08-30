import React, { useContext } from "react";
import { styled } from "@mui/material/styles";
import { Outlet } from 'react-router-dom'
import { Grid } from "@mui/material";
import Notification from "../notificacoes/Notification";
import { NotificationContext } from "../../context/NotificationContext";

const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })<{
  open?: boolean
}>(({ theme, open }) => ({
  flexGrow: 1,
  transition: theme.transitions.create('margin', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen
  })
}))

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

const Body = () => {
  const {activeNotify,setActiveNotify, msn, cor } = useContext(NotificationContext)
  return (
    <Main sx={{backgroundColor: '#E7E7E7'}}>
      <Grid container
        sx={{
          py: 4,
          height: '100%',
          borderRadius: 7,
          alignItems: 'center',
          justifyContent: 'center'
        }}>
            <DrawerHeader />
            <Outlet />
            <Notification 
              notifyActive={activeNotify}
              setNotify={setActiveNotify}
              msn={msn}
              cor={cor || 'warning'}/>
      </Grid>
    </Main>
  )
}

export default Body