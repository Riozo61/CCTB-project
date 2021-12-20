import React, { useState } from 'react'
import Box from '@mui/material/Box';
import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import ContentPasteIcon from '@mui/icons-material/ContentPaste';
import { IconButton } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { useHistory } from 'react-router-dom';
import { ORDERS_ROUTE, PROJECTS_ROUTE } from '../utils/consts';

export default function AppDrawer() {
  const [state, setState] = useState({
    left: false
  });
  const history = useHistory('');

  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event &&
      event.type === 'keydown' &&
      (event.key === 'Tab' || event.key === 'Shift')
    ) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  const list = (anchor) => (
    <Box
      sx={{ width: 250 }}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <List>
          <ListItem button
            onClick={() => history.push(PROJECTS_ROUTE)}
          >
          <ListItemIcon>
              <InboxIcon />
            </ListItemIcon>
            <ListItemText primary='Проекты' />
          </ListItem>
          <ListItem button
            onClick={() => history.push(ORDERS_ROUTE)}
          >
          <ListItemIcon>
              <InboxIcon />
            </ListItemIcon>
            <ListItemText primary='Заказы' />
          </ListItem>
      </List>
      <Divider />
    </Box>
  );

  return (
    <div>
      {['left'].map((anchor) => (
        <React.Fragment key={anchor}>
        <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="open drawer"
            sx={{ mr: 2 }}
            onClick={toggleDrawer(anchor, true)}
          >
            <MenuIcon />
          </IconButton>
          <SwipeableDrawer
            anchor={anchor}
            open={state[anchor]}
            onClose={toggleDrawer(anchor, false)}
            onOpen={toggleDrawer(anchor, true)}
          >
            {list(anchor)}
          </SwipeableDrawer>
        </React.Fragment>
      ))}
    </div>
  );
}