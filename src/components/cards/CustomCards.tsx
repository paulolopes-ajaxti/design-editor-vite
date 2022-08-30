import React from 'react'
import { Box, Card, CardActions, CardContent, CardMedia, IconButton, Typography } from "@mui/material"
import {ReactComponent as Devices} from '../../assets/imgs/icons/devices.svg'
import ShareRoundedIcon from '@mui/icons-material/ShareRounded'
import EditRoundedIcon from '@mui/icons-material/EditRounded'
import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded'

interface Props {
  cardTittle: string 
}

const CustomCard = ({cardTittle}: Props) => {
  return (
    <Card elevation={10} sx={{display: 'flex', borderRadius: 5, maxWidth: 250}}>
      <Box sx={{ display: 'flex', flexDirection: 'column' }}>
      <CardMedia
       component={Devices}
       height={200}
       width={250}
       color="#FFF"
       sx={{
        paddingY: 4,
        backgroundColor: '#b2c2d4'
       }}
       />
      <CardContent sx={{flex: '1 0 auto'}}>
      <Typography gutterBottom noWrap fontFamily="Montserrat" variant="h4" component="div" >
        {cardTittle}
        </Typography>
      </CardContent>
      <CardActions>
        <IconButton>
          <ShareRoundedIcon />
        </IconButton>
        <IconButton>
          <EditRoundedIcon/>
        </IconButton>
        <IconButton>
          <DeleteRoundedIcon/>
        </IconButton>
      </CardActions>
      </Box>
    </Card>
  )
}

export default CustomCard