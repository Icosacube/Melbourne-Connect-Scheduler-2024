import { Button, Stack, Typography } from '@mui/material'
import React, { FC, useState } from 'react'
import { FormInputPassword, FormInputText } from '../../components'
import { useForm } from 'react-hook-form'

interface UserCredentials {
    username: string
    password: string
}

export const Register: FC = () => {
    const { handleSubmit, reset, control, watch } = useForm<UserCredentials>({})

    const [submitting, setSubmitting] = useState(false)

    const onSubmit = async () => {
      setSubmitting(true)
        try {
            // const res = await loginfunction
        } catch (error) {
            console.error(error)
        } finally {
            setSubmitting(false)
            reset()
        }
    }

    return (
        <Stack component="form" className="space-y-8">
            <Typography variant="h4">Not Implemented</Typography>
        </Stack>
    )
}
