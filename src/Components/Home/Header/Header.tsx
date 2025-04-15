import React, { useState } from 'react';
import {
  AppBar, Toolbar, Typography, Button, Box,
  Badge, Menu, MenuItem,
  InputBase,
  IconButton,
  Paper
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import styles from './Header.module.css';
import LoginModal from '../../Login/LoginModel';
import RegisterModel from '../../Register/RegisterModel';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../Redux/Store';
import { logout } from '../../../Common/LocalStorageLogics/LocalStorageLogics';
import { logoutUserRequest } from '../../Login/LoginSlice';

export const Header: React.FC = () => {
  const [activeModal, setActiveModal] = useState<'login' | 'register' | null>(null);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const { registerUser } = useSelector((state: RootState) => state.register);
  const { loginUser } = useSelector((state: RootState) => state.login);
  const dispatch = useDispatch();

  const handleProfileClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseProfileMenu = () => {
    setAnchorEl(null);
  };
  const handleLogout = () => {
    logout();
    dispatch(logoutUserRequest());
  }

  return (
    <AppBar position="static" className={styles.appbar}>
      <Toolbar className={styles.toolbar}>
        <Typography variant="h6" className={styles.logo}>
          🛍️ Ninjakart
        </Typography>
        <Box className={styles.nav}>
          <Paper
            // component="form"
            className={styles.searchBox}
          >
            <InputBase
              className={styles.searchInput}
              placeholder="Search Products"
            // value={searchTerm}
            // onChange={(e) => setSearchTerm(e.target.value)}
            />
            <IconButton type="submit" className={styles.searchButton}>
              <SearchIcon />
            </IconButton>
          </Paper>

          {/* <Paper
            
             sx={{ display: 'flex', height: 35, alignItems: 'center', p: '1px 6px' }}
          > 
            <InputBase 
              placeholder="Search Products"
              // value={searchTerm}
              // onChange={(e) => setSearchTerm(e.target.value)}
            />
            <IconButton type="submit">
              <SearchIcon />
            </IconButton>
          </Paper> */}
          {
            (!loginUser.token) ? (
              <>
                <Button className={styles.loginButton} variant="outlined" onClick={() => setActiveModal('login')}>Login</Button>
                <Button className={styles.loginButton} variant="outlined" onClick={() => setActiveModal('register')}>Sign up</Button>
              </>
            ) : (
              <>
                <IconButton size="small" color="inherit">
                  <Badge badgeContent={3} color="error">
                    <ShoppingCartIcon />
                  </Badge>
                </IconButton>

                {/* Profile Icon with Menu */}
                <IconButton
                  size="medium"
                  color="inherit"
                  onClick={handleProfileClick}
                >
                  <AccountCircleIcon />
                </IconButton>
                <Menu
                  anchorEl={anchorEl}
                  open={Boolean(anchorEl)}
                  onClose={handleCloseProfileMenu}
                >
                  <MenuItem onClick={handleCloseProfileMenu}>My Profile</MenuItem>
                  <MenuItem onClick={handleLogout}>Logout</MenuItem>
                </Menu>
              </>
            )
          }

          {activeModal === 'login' && (
            <LoginModal
              open={true}
              onClose={() => setActiveModal(null)}
              onSubmit={() => { }}
              onSwitchToRegister={() => setActiveModal('register')}
            />
          )}
          {activeModal === 'register' && (
            <RegisterModel
              open={true}
              onClose={() => setActiveModal(null)}
              onSubmit={() => { }}
              onSwitchToLogin={() => setActiveModal('login')}
            />
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
};
