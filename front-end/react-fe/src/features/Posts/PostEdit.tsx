import React from "react"
import PostForm from "./PostForm";
import httpService from '../../shared/services/HttpService';

import { PostResponseDto } from "./PostResponseDto";
import { useNavigate, useNavigation, useParams } from "react-router-dom";
import { FormProvider, useForm } from "react-hook-form";
import { Box, Button } from "@mui/material";
import AppCard from "../../shared/comps/AppCard";
const PostEdit: React.FC<object> = () => {
    const {
        id
    } = useParams<'id'>();

    const navigate = useNavigate();

    const savePost = (data: Partial<PostResponseDto>) => {
        httpService.put('/posts/' + id, { ...data, id })
            .then(response => response.data)
            .then(()=>{
                navigate('/');
            });
    }

    const loadPost = () => httpService.get<PostResponseDto>('/posts/' + id)
        .then((response) => response.data)
        .then(({ body, title, canComment }) => {
            console.log('here');
            return ({
                body, title, canComment
            })
        })

    const formMethods = useForm({
        defaultValues: async () => loadPost()
    });

    console.log('PostEdit');

    return <FormProvider {...formMethods}>
        <AppCard>
            <Box component="form" noValidate
                onSubmit={formMethods.handleSubmit((data) => {
                    savePost(data);
                })}
                autoComplete="off" sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}
            >
                <PostForm />
                <Button type="submit" disabled={!formMethods.formState.isValid} variant="contained" >Save</Button>
            </Box>
        </AppCard>
    </FormProvider>


}
export default PostEdit;