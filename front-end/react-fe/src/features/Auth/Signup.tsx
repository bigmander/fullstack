import { SubmitHandler, Controller, useForm } from 'react-hook-form';
import { useAuth } from './AuthProvider';
import httpService from '../../shared/services/HttpService';

import { useNavigate } from 'react-router-dom';
import AppCard from '../../shared/comps/AppCard';
import { Box, Button, FormControl, FormLabel, TextField } from '@mui/material';
import { SignupForm } from './SignupForm';

export default function Signup() {
    const auth = useAuth();
    let navigate = useNavigate();

    const defaultValues = {
        email:
            // 'test@test.com',
            // 'test2@example.com', 
            // 'user@example.com',
            'user3@example.com',
        password: 'best_Passw0rd',
        confirmPassword: 'best_Passw0rd'
    };
    const {
        control,
        handleSubmit,

    } = useForm<SignupForm>({
        defaultValues
    })

    const onSubmit: SubmitHandler<SignupForm> = (formValues) => {
        httpService.post('/signup', formValues)
            .then(() =>
                auth.signIn(formValues)
            )
            .then(() => {
                navigate('/');
            })
    }

    return (
        <AppCard>
            <Box component="form" noValidate
                onSubmit={handleSubmit(onSubmit)}
                autoComplete="off" sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}
            >

                <FormControl>

                    <Controller
                        control={control}
                        name='email'
                        rules={{
                            required: true
                        }}
                        render={({ field, formState: { errors } }) =>
                            <TextField
                                {...field}
                                defaultValue={defaultValues.email}
                                label="Email"
                                fullWidth
                                error={'email' in errors}
                                color='primary'
                            />

                        }
                    />

                </FormControl>

                <FormControl>
                    <Controller
                        control={control}
                        name='password'
                        rules={{
                            required: true
                        }}
                        render={({ field, formState: { errors } }) =>
                            <TextField
                                {...field}

                                defaultValue={defaultValues.password}
                                type='password'
                                label="Password"
                                fullWidth
                                error={'password' in errors}
                                color='primary'
                            />

                        }
                    />
                </FormControl>

                <FormControl>
                    <Controller
                        control={control}
                        name='confirmPassword'
                        rules={{
                            required: true,
                            validate: (currentValue, { password }) => {
                                return currentValue === password;
                            }
                        }}
                        render={({ field, formState: { errors } }) =>
                            <TextField
                                {...field}

                                defaultValue={defaultValues.confirmPassword}
                                type='password'
                                label="Confirm Password"
                                fullWidth
                                error={'confirmPassword' in errors}
                                color='primary'
                            />

                        }
                    />
                </FormControl>

                <Button type="submit" variant="contained" >Go</Button>
            </Box>
        </AppCard>

    )

}