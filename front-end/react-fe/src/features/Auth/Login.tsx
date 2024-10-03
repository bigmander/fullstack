import { SubmitHandler, useForm } from 'react-hook-form';
import { useAuth } from './AuthProvider';
import { AuthSignInPayload } from './AuthSignInPayload';
import { useNavigate } from 'react-router-dom';

export default function Login() {
    const auth = useAuth();
    let navigate = useNavigate();

    const {
        register,
        handleSubmit,
    } = useForm<AuthSignInPayload>()

    const onSubmit: SubmitHandler<AuthSignInPayload> = (data) => {
        auth.signIn(data).then(() => {
            navigate('/');

        }, console.error);
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <p>

                <label htmlFor='email'>Email</label>
                <input defaultValue='test@test.com' {...register("email", { required: true })} />
            </p>

            <p>

                <label htmlFor='password'>Password</label>
                <input defaultValue='best_Passw0rd' type="password" {...register("password", { required: true })} />
            </p>

            <input type="submit" />
        </form>
    )

}