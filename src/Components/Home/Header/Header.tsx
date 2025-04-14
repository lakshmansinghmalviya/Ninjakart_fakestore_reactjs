import React, { useState } from 'react';
import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
import styles from './Header.module.css';
import LoginModal from '../../Login/LoginModel';
import  RegisterModel from '../../Register/RegisterModel';

export const Header: React.FC = () => {
  const [activeModal, setActiveModal] = useState<'login' | 'register' | null>(null);

  return (
    <AppBar position="static" className={styles.appbar}>
      <Toolbar className={styles.toolbar}>
        <Typography variant="h6" className={styles.logo}>
          🛍️ Ninjakart
          {/* <Button className={styles.navButton} color="inherit">Products</Button> */}
        </Typography>
        <Box className={styles.nav}>
          <Button className={styles.loginButton} variant="outlined" onClick={() => setActiveModal('login')}>Login</Button>
          <Button className={styles.loginButton} variant="outlined" onClick={() => setActiveModal('register')}>Sign up</Button>
          {activeModal === 'login' && (
            <LoginModal
              open={true}
              onClose={() => setActiveModal(null)}
              onSubmit={() => { /* handle login */ }}
              onSwitchToRegister={() => setActiveModal('register')}
            />
          )}

          {activeModal === 'register' && (
            < RegisterModel
              open={true}
              onClose={() => setActiveModal(null)}
              onSubmit={() => { /* handle register */ }}
              onSwitchToLogin={() => setActiveModal('login')}
            />
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
};
