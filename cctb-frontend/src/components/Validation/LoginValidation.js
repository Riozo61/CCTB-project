import { useFormControl } from '@mui/material'
import React from 'react'
import useForm from './useForm'

const LoginValidation = () => {
  const {
    handleSubmit,
    handleChange,
    data,
    errors
  } = useForm({
    validations: {
      email: {
        pattern: {
          value: ''
        }
      }
    }
  })
  return (
    <div>
      
    </div>
  )
}

export default LoginValidation
