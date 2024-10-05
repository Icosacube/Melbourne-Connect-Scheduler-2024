import { Button, Grid, Link, Stack, Typography } from '@mui/material'
import React, { FC, useState } from 'react'
import { FormInputPassword, FormInputText } from '../../components'
import { useForm } from 'react-hook-form'
import { redirect } from 'react-router'
import { useNavigate } from 'react-router-dom'
import { login } from '../../scripts/authentication/auth'

interface UserCredentials {
    username: string
    password: string
}

export const Login: FC = () => {
    const { handleSubmit, reset, control, watch } = useForm<UserCredentials>()

    const [submitting, setSubmitting] = useState(false)
    const navigate = useNavigate()

    const onSubmit = async (data: UserCredentials) => {
        setSubmitting(true)
        try {
            await login(data.username, data.password)
            navigate('/dashboard')
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
                <Typography variant="h4">Login</Typography>
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
                    Login
                </Button>
            </Stack>
            <Stack>
                <Typography className="pt-10">
                    No account? Register <Link href="/register">here</Link>
                </Typography>
            </Stack>
        </Grid>
    )
}
