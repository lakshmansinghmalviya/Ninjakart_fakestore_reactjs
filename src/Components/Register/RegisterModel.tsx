import { yupResolver } from '@hookform/resolvers/yup';
import {
    GitHub,
    Google,
    Visibility,
    VisibilityOff,
    CheckCircle,
    Cancel,
} from '@mui/icons-material';
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
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { buttonAsText, scrollableModel } from '../CommonStyle/CommonCSSObjects';
import styles from '../Login/LoginModel.module.css';
import { passwordRules } from './PasswordRules';
import { useDispatch, useSelector } from 'react-redux';
import { registerUserRequest, resetSomeRegisterState } from './RegisterSlice';
import { RootState } from '../../Redux/Store';
import { toast } from 'react-toastify';

interface RegisterModelProps {
    open: boolean;
    onClose: () => void;
    onSubmit: (username: string, email: string, password: string) => void;
    onSwitchToLogin: () => void;
}

const schema = yup.object({
    username: yup
        .string()
        .min(3, 'Username too short')
        .matches(/^[a-zA-Z0-9_]+$/, 'Username can only contain letters, numbers, and underscores')
        .required('Username is required'),

    email: yup
        .string()
        .email('Invalid email format')
        .required('Email is required'),

    password: yup
        .string()
        .min(6, 'Follow password rules')
        .test('password-strength', 'Follow password rules',
            (value = '') => {
                const passwordRules = [/[A-Z]/, /[a-z]/, /[0-9]/, /[@$!%*?&]/,];
                return passwordRules.every((rule) => rule.test(value));
            })
        .required('Password is required'),
});

const RegisterModel: React.FC<RegisterModelProps> = ({
    open,
    onClose,
    onSubmit,
    onSwitchToLogin,
}) => {
    const [showPassword, setShowPassword] = useState(false);
    const [password, setPassword] = useState('');
    const { register, handleSubmit, formState: { errors }, reset, setValue, trigger } = useForm({
        resolver: yupResolver(schema),
    });
    const { registerUser, registerMessage, registerError, registerLoading } = useSelector((state: RootState) => state.register);
    const dispatch = useDispatch();

    useEffect(() => {
        // if (registerUser) {
        //     console.log(JSON.stringify(registerUser));//testibg
        // }
        if (registerMessage) {
            toast.success(registerMessage);
            onClose();
            dispatch(resetSomeRegisterState())
        }
        if (registerError) {
            toast.error(registerError);
            setTimeout(() => {
                dispatch(resetSomeRegisterState())
            }, 1000)
        }
    }, [registerMessage, registerError])

    const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setPassword(value);
        setValue('password', value);  // Update the form state
        trigger('password'); // Trigger validation manually
    };

    const handleFormSubmit = (data: any) => {
        dispatch(registerUserRequest(data))
        console.log("Data on submit : " + JSON.stringify(data));
        onSubmit(data.username, data.email, data.password);
        // reset();
    };

    return (
        <Modal open={open} onClose={onClose} BackdropProps={{ timeout: 0 }}>
            <Fade in={open}>
                <Box sx={scrollableModel}>
                    <Typography variant="h6" className={styles.title}>
                        Create Your Account 🛍️
                    </Typography>

                    <TextField
                        fullWidth
                        label="Username"
                        variant="outlined"
                        className={styles.input}
                        {...register('username')}
                        error={!!errors.username}
                        helperText={errors.username?.message}
                    />
                    <TextField
                        fullWidth
                        label="Email"
                        variant="outlined"
                        className={styles.input}
                        {...register('email')}
                        error={!!errors.email}
                        helperText={errors.email?.message}
                    />

                    <TextField
                        fullWidth
                        label="Password"
                        type={showPassword ? 'text' : 'password'}
                        variant="outlined"
                        className={styles.input}
                        {...register('password')}
                        onChange={handlePasswordChange}
                        error={!!errors.password}
                        helperText={errors.password?.message}
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

                    {/* Password Criteria Checklist */}
                    <Stack spacing={1} mt={1} mb={2}>
                        {passwordRules.map((rule, index) => {
                            const passed = rule.test(password);
                            return (
                                <Typography
                                    key={index}
                                    variant="body2"
                                    sx={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        color: passed ? 'green' : '#db3e38',
                                    }}
                                >
                                    {passed ? (
                                        <CheckCircle fontSize="small" sx={{ mr: 1 }} />
                                    ) : (
                                        <Cancel fontSize="small" sx={{ mr: 1 }} />
                                    )}
                                    {rule.label}
                                </Typography>
                            );
                        })}
                    </Stack>

                    <Button
                        fullWidth
                        variant="contained"
                        color="primary"
                        onClick={handleSubmit(handleFormSubmit)}
                        disabled={registerLoading}
                        className={styles.loginButton}
                    >   {
                            registerLoading ? 'Registering...' : 'Register'
                        }
                        {/* Register */}
                    </Button>

                    <Stack direction="row" justifyContent="center" alignItems="center" mt={2}>
                        <Typography variant="body2">Have an account?</Typography>
                        <Button sx={buttonAsText} onClick={onSwitchToLogin}>
                            Login
                        </Button>
                    </Stack>

                    <Stack direction="row" justifyContent="center" mt={2}>
                        <Typography variant="body2">or you can register with</Typography>
                    </Stack>

                    <Stack direction="row" spacing={2} justifyContent="center" mt={1}>
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

export default RegisterModel