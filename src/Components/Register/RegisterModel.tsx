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
import styles from '../Login/LoginModel.module.css';

interface RegisterModalProps {
    open: boolean;
    onClose: () => void;
    onSubmit: (username: string, email: string, password: string) => void;
    onSwitchToLogin: () => void;
}

const RegisterModal: React.FC<RegisterModalProps> = ({ open, onClose, onSubmit, onSwitchToLogin }) => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);

    const handleSubmit = () => {
        onSubmit(username, email, password);
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
                    <Box sx={scrollableModel}>
                        <Typography variant="h6" className={styles.title}>
                            Create Your Account 🛍️
                        </Typography>

                        <TextField
                            fullWidth
                            label="Username"
                            variant="outlined"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            className={styles.input}
                        />

                        <TextField
                            fullWidth
                            label="Email"
                            variant="outlined"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
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
                            Register
                        </Button>
                        <Stack direction="row" justifyContent="center" alignItems="center">
                            <Typography variant="body2">Have an account?</Typography>
                            <Button
                                sx={buttonAsText}
                                onClick={onSwitchToLogin}
                            >
                                Login
                            </Button>
                        </Stack>
                        <Stack direction="row" justifyContent="space-around">
                            or you can register with
                        </Stack>
                        <Stack direction="row" spacing={2} justifyContent="center" >
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

export default RegisterModal;
