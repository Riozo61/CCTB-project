import React from 'react';

import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';


import MenuIcon from '@mui/icons-material/Menu';

import AccountCircle from '@mui/icons-material/AccountCircle';
import MoreIcon from '@mui/icons-material/MoreVert';
import { NavLink} from 'react-router-dom';
import { PROJECTS_ROUTE, REGISTRATION_ROUTE } from '../utils/consts';
import { useContext } from 'react';
import { Context } from '../index';
import {observer} from 'mobx-react-lite'
import { Button } from '@mui/material';
import AppDrawer from './AppDrawer';




const NavBar =  observer ( () => {
  const {user} = useContext(Context);
  const logOut = () => {
    user.setUser({})
    user.setIsAuth(false)
  }

  return ( 
    
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
      {user.isAuth ?
        <Toolbar>
        <AppDrawer/>

            <Typography variant='h5'><NavLink style={{color: 'white', textDecoration: 'none'}} to={PROJECTS_ROUTE}>APPIX</NavLink></Typography>


          <Box sx={{ flexGrow: 1 }} />
          <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
          <Button
          style={{padding: 5}}
          color='inherit'
          onClick={() => logOut()
          }
          >
          <Typography>Выйти</Typography>
          
          </Button>
            <IconButton
              size="large"
              edge="end"
              aria-label="account of current user"
              aria-haspopup="true"
              color="inherit"
            >
              <AccountCircle />
            </IconButton>
          </Box>
          <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="show more"
              aria-haspopup="true"
              color="inherit"
            >
              <MoreIcon />
            </IconButton>
          </Box>
        </Toolbar>
        :
        <Toolbar>          
            <Typography variant='h5'><NavLink style={{color: 'white', textDecoration: 'none'}} to={REGISTRATION_ROUTE}>APPIX</NavLink></Typography>
          </Toolbar>
        
      }
      </AppBar>

    </Box>
  );
}
)
export default NavBar;