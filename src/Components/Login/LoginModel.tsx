import { GitHub, Google, Visibility, VisibilityOff } from '@mui/icons-material';
import {
  Box,
  Button,
  Fade,
  IconButton,
  InputAdornment,
  Modal,
  Stack,
  TextField,
  Typography
} from '@mui/material';
import React, { useState } from 'react';
import { buttonAsText, scrollableModel } from '../CommonStyle/CommonCSSObjects';
import styles from './LoginModel.module.css';

interface LoginModalProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (username: string, password: string) => void;
  onSwitchToRegister: () => void;
}

const LoginModal: React.FC<LoginModalProps> = ({ open, onClose, onSubmit, onSwitchToRegister }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = () => {
    onSubmit(username, password);
    onClose();
  };

  return (
    <>
      <Modal
        open={open}
        onClose={onClose}
        BackdropProps={{
          timeout: 0,
        }}
      >
        <Fade in={open}>
          <Box className={styles.modalBox} sx={scrollableModel}>
            <Typography variant="h6" className={styles.title}>
              Welcome to Ninjakart 🛍️
            </Typography>
            <TextField
              fullWidth
              label="Username or email"
              variant="outlined"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className={styles.input}
            />
            <TextField
              fullWidth
              label="Password"
              type={showPassword ? 'text' : 'password'}
              variant="outlined"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={styles.input}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() => setShowPassword((prev) => !prev)}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
            <Button
              fullWidth
              variant="contained"
              color="primary"
              onClick={handleSubmit}
              className={styles.loginButton}
            >
              Login
            </Button> 
            <Stack direction="row" justifyContent="space-between">
              <Button
                sx={buttonAsText}
                onClick={() => console.log('Forgot password clicked')}
              >
                Forgot Password?
              </Button>
              <Button
                sx={buttonAsText}
                onClick={onSwitchToRegister}
              >
                Register
              </Button>
            </Stack>
            <Stack direction="row" justifyContent="space-around">
              or you can login with
            </Stack>
            <Stack direction="row" spacing={2} justifyContent="space-around" mt={2}>
              <Button variant="outlined" startIcon={<Google />} color="error">
                Google
              </Button>
              <Button variant="outlined" startIcon={<GitHub />} color="inherit">
                GitHub
              </Button>
            </Stack>
          </Box>
        </Fade>
      </Modal> 
    </>
  );
};

export default LoginModal;
