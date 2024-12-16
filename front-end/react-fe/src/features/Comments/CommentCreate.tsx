import React from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import AppCard from '../../shared/comps/AppCard';
import Button from '@mui/material/Button';
import { useNavigate, useParams } from 'react-router-dom';
import { CommentDto } from '../Posts/PostResponseDto';
import httpService from '../../shared/services/HttpService';
import Box from '@mui/material/Box';
import CommentForm from './CommentForm';

const CommentCreate: React.FC<any> = () => {
    const navigate = useNavigate();
    const {
        id
    } = useParams<'id'>();

    const formMethods = useForm({
        defaultValues: {
            title: '',
            body: ''
        }
    });

    const savePost = (data: Partial<CommentDto>) => {
        httpService.post('/posts/' + id + '/comments', data)
            .then(response => response.data)
            .then(() => {
                navigate('/');
            });
    }

    return <FormProvider {...formMethods}>
        <AppCard>
            <Box component="form" noValidate
                onSubmit={formMethods.handleSubmit((data) => {
                    savePost(data);
                })}
                autoComplete="off" sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}
            >
                <CommentForm />
                <Button type="submit" disabled={!formMethods.formState.isValid} variant="contained" >Save</Button>
            </Box>
        </AppCard>
    </FormProvider>
}

export default CommentCreate;
