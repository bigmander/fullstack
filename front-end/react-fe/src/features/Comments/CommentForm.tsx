import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import { Controller, useFormContext } from "react-hook-form";
import { FormGroup } from "@mui/material";


const CommentForm = (


) => {


    const {
        control,
        watch

    } = useFormContext()

    console.log(control);

    return <>
        <Controller
            control={control}
            name='title'
            rules={{
                required: true
            }}
            render={({ field, formState: { errors } }) =>
                <TextField
                    {...field}
                    fullWidth
                    color='primary'
                    label='Title'
                    error={'title' in errors}
                />
            }
        />



        <Controller
            control={control}
            name='body'
            rules={{
                required: true
            }}
            render={({ field, formState: { errors } }) =>
                <TextField
                    {...field}
                    fullWidth
                    multiline
                    label='Body'
                    color='primary'
                    error={'body' in errors}
                />
            }
        />


    </>



}
export default CommentForm;