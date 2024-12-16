import React from "react"
import PostForm from "./PostForm";
import { FormProvider, useForm } from "react-hook-form";
import AppCard from "../../shared/comps/AppCard";
import { Box, Button } from "@mui/material";
import { PostResponseDto } from "./PostResponseDto";
import httpService from '../../shared/services/HttpService';
import { useNavigate } from "react-router-dom";

const PostCreate: React.FC<any> = () => {
    const navigate = useNavigate();


    const formMethods = useForm({
        defaultValues: {
            title: '',
            body: '',
            canComment: false
        }
    });

    const savePost = (data: Partial<PostResponseDto>) => {
        httpService.post('/posts/', data)
            .then(response => response.data)
            .then(()=>{
                navigate('/');
            });
    }

    return <FormProvider {...formMethods}>
        <AppCard>
            <Box component="form" noValidate
                onSubmit={formMethods.handleSubmit((data)=>{
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
export default PostCreate;