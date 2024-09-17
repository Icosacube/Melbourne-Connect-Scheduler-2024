import { Button, Grid, Stack, Typography, Link } from '@mui/material'
import React, { FC, useState } from 'react'
import {
    BottomSuccessSnackbar,
    FormInputPassword,
    FormInputText,
} from '../../components'
import { useForm } from 'react-hook-form'
import { register } from '../../scripts/authentication/auth'
import { useNavigate } from 'react-router-dom'

interface UserCredentials {
    username: string
    password: string
}

export const Register: FC = () => {
    const { handleSubmit, reset, control, watch } = useForm<UserCredentials>({})

    const [submitting, setSubmitting] = useState(false)
    const [success, setSuccess] = useState(false)
    const navigate = useNavigate()

    const onSubmit = async (data: UserCredentials) => {
        setSubmitting(true)
        console.log(data)
        try {
            // const res = await loginfunction
            const res = await register(data.username, data.password)
            if (res.status === 201) {
                setSuccess(true)
            }
        } catch (error) {
            console.error(error)
        } finally {
            setSubmitting(false)
            reset()
        }
    }

    return (
        <Grid container spacing={0} direction="column" alignItems="center">
            <Stack component="form" className="space-y-8">
                <Typography variant="h4">Register New User</Typography>
                <FormInputText
                    name={'username'}
                    control={control}
                    label={'Username'}
                    required={true}
                />
                <FormInputPassword
                    name={'password'}
                    control={control}
                    label={'Password'}
                    required={true}
                />
                <Button variant="contained" onClick={handleSubmit(onSubmit)}>
                    Register
                </Button>
            </Stack>
            <Stack>
                <Typography className="pt-10">
                    Have an account? Log in <Link href="/login">here</Link>
                </Typography>
            </Stack>
            <BottomSuccessSnackbar
                showSuccess={success}
                setShowSuccess={setSuccess}
                message={'User Registered Successfully!'}
            />
        </Grid>
    )
}
