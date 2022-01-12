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
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ display: { xs: 'none', sm: 'block' } }}
          >
            <NavLink style={{color: 'white', textDecoration: 'none'}} to={PROJECTS_ROUTE}>APPIX</NavLink>

          </Typography>
          <Box sx={{ flexGrow: 1 }} />
          <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
          <Button
          variant='outlined'
          color='inherit'
          onClick={() => logOut()
          }
          >
          Выйти
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
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="open drawer"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ display: { xs: 'none', sm: 'block' } }}
          >
          
            <NavLink style={{color: 'white'}} to={REGISTRATION_ROUTE}>APPIX</NavLink>
          </Typography>
          </Toolbar>
        
      }
      </AppBar>

    </Box>
  );
}
)
export default NavBar;