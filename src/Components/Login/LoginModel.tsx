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
  Typography,
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { buttonAsText, scrollableModel } from '../CommonStyle/CommonCSSObjects';
import styles from './LoginModel.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../Redux/Store';
import { toast } from 'react-toastify';
import { loginUserRequest, resetSomeLoginState } from './LoginSlice';
import { saveToken } from '../../Common/LocalStorageLogics/LocalStorageLogics';

interface LoginModalProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (username: string, password: string) => void;
  onSwitchToRegister: () => void;
}

const schema = yup.object({
  username: yup.string().required('Username or email is required'),
  password: yup.string().required('Password is required'),
});

const LoginModal: React.FC<LoginModalProps> = ({ open, onClose, onSubmit, onSwitchToRegister, }) => {
  const [showPassword, setShowPassword] = useState(false);
  const { register, handleSubmit, formState: { errors }, reset, } = useForm({
    resolver: yupResolver(schema),
  });
  const { loginUser, loginMessage, loginError, loginLoading } = useSelector((state: RootState) => state.login);
  const dispatch = useDispatch();

  useEffect(() => {
    // if (loginUser) {
    //     console.log("Token received "+JSON.stringify(loginUser.token));//testibg
    // }
    if (loginMessage) {
      toast.success(loginMessage);
      saveToken(loginUser.token);
      onClose();
      dispatch(resetSomeLoginState())
    }
    if (loginError) {
      toast.error(loginError);
      setTimeout(() => {
        dispatch(resetSomeLoginState())
      }, 1000)
    }
  }, [loginMessage, loginError])


  // const handleFormSubmit = (data: any) => {

  //   onSubmit(data.username, data.password);
  //   reset(); // clear the form after submit
  //   // onClose(); // optional: auto-close modal
  // };

  const handleFormSubmit = (data: any) => {
    dispatch(loginUserRequest(data))
    console.log("Data on submit : " + JSON.stringify(data));
    onSubmit(data.username, data.password);
    // reset();
  };
  return (
    <Modal open={open} onClose={onClose} BackdropProps={{ timeout: 0 }}>
      <Fade in={open}>
        <Box className={styles.modalBox} sx={scrollableModel}>
          <Typography variant="h6" className={styles.title}>
            Welcome to Ninjakart 🛍️
          </Typography>

          <TextField
            fullWidth
            label="Username or email"
            variant="outlined"
            className={styles.input}
            {...register('username')}
            error={!!errors.username}
            helperText={errors.username?.message}
          />

          <TextField
            fullWidth
            label="Password"
            type={showPassword ? 'text' : 'password'}
            variant="outlined"
            className={styles.input}
            {...register('password')}
            error={!!errors.password}
            helperText={errors.password?.message}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={() => setShowPassword((prev) => !prev)} edge="end">
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
            onClick={handleSubmit(handleFormSubmit)}
            disabled={loginLoading}
            className={styles.loginButton}
          >
            {
              loginLoading ? 'Loging...' : 'Login'
            }
          </Button>

          <Stack direction="row" justifyContent="space-between">
            <Button sx={buttonAsText} onClick={() => console.log('Forgot password clicked')}>
              Forgot Password?
            </Button>
            <Button sx={buttonAsText} onClick={onSwitchToRegister}>
              Register
            </Button>
          </Stack>

          <Stack direction="row" justifyContent="center" mt={2}>
            or you can login with
          </Stack>
          <Stack direction="row" spacing={2} justifyContent="center" mt={2}>
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
  );
};

export default LoginModal;
