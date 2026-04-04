import React, { useContext } from 'react';
import { AppBar, Toolbar, Typography } from '@mui/material';
import { AppContext } from '../../App';

import './styles.css';

/**
 * Define TopBar, a React component of Project 4.
 */
function TopBar() {
  const { title } = useContext(AppContext);

  return (
    <AppBar className="topbar-appBar" position="absolute">
      <Toolbar>
        <Typography variant="h5" color="inherit" sx={{ flexGrow: 1 }}>
          Photo Sharing App
        </Typography>
        <Typography variant="subtitle1" color="inherit">
          {title}
        </Typography>
      </Toolbar>
    </AppBar>
  );
}

export default TopBar;
