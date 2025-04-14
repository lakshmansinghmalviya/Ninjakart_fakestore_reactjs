import { yupResolver } from '@hookform/resolvers/yup';
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
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { buttonAsText, scrollableModel } from '../CommonStyle/CommonCSSObjects';
import styles from '../Login/LoginModel.module.css';

interface RegisterModalProps {
    open: boolean;
    onClose: () => void;
    onSubmit: (username: string, email: string, password: string) => void;
    onSwitchToLogin: () => void;
}

// ✅ Yup validation schema
const schema = yup.object({
    username: yup.string().min(3, 'Username too short').required('Username is required'),
    email: yup.string().email('Invalid email format').required('Email is required'),
    password: yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
});

const RegisterModal: React.FC<RegisterModalProps> = ({ open, onClose, onSubmit, onSwitchToLogin }) => {
    const [showPassword, setShowPassword] = useState(false);

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset
    } = useForm({
        resolver: yupResolver(schema),
    });

    const handleFormSubmit = (data: any) => {
        onSubmit(data.username, data.email, data.password);
        reset(); // clear form
        // onClose();
    };

    return (
        <Modal open={open} onClose={onClose} BackdropProps={{ timeout: 0 }}>
            <Fade in={open}>
                <Box sx={scrollableModel}>
                    <Typography variant="h6" className={styles.title}>
                        Create Your Account 🛍️
                    </Typography>

                    <form onSubmit={handleSubmit(handleFormSubmit)}>
                        <TextField
                            fullWidth
                            label="Username"
                            variant="outlined"
                            {...register('username')}
                            error={!!errors.username}
                            helperText={errors.username?.message}
                            className={styles.input}
                        />

                        <TextField
                            fullWidth
                            label="Email"
                            variant="outlined"
                            {...register('email')}
                            error={!!errors.email}
                            helperText={errors.email?.message}
                            className={styles.input}
                        />

                        <TextField
                            fullWidth
                            label="Password"
                            type={showPassword ? 'text' : 'password'}
                            variant="outlined"
                            {...register('password')}
                            error={!!errors.password}
                            helperText={errors.password?.message}
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
                            type="submit"
                            className={styles.loginButton}
                        >
                            Register
                        </Button>
                    </form>

                    <Stack direction="row" justifyContent="center" alignItems="center">
                        <Typography variant="body2">Have an account?</Typography>
                        <Button sx={buttonAsText} onClick={onSwitchToLogin}>
                            Login
                        </Button>
                    </Stack>

                    <Stack direction="row" justifyContent="space-around">
                        or you can register with
                    </Stack>
                    <Stack direction="row" spacing={2} justifyContent="center">
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

export default RegisterModal;
