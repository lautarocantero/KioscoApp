import { Box, Typography } from "@mui/material";
import * as Yup from 'yup';
import { useFormik } from "formik";
import LoginFormInputs from "./LoginFormInputs";
import LoginFormButtons from "./LoginFormButtons";
import 'animate.css'

interface LoginFormProps {
  showForm: boolean;
}

  const getInitialValues = () => ({
    email: '',
    password: '',
  })

  const getValidationSchema = () =>
    Yup.lazy(() =>
      Yup.object().shape({
        email: Yup.string()
          .email('Ingresa un E-mail')
          .required('Campo requerido')
          .trim(),
        password: Yup.string().required('Campo requerido'),
      }),
  );

const LoginForm = ({showForm}: LoginFormProps) => {
  
  const onLogin = ({ email, password }: { email: string; password: string }) => {
    
  }

  const { handleSubmit, values, setFieldValue, errors} = 
    useFormik({
      initialValues: getInitialValues(),
      onSubmit: (data: { email: string; password: string}) => {
        onLogin({
          email: data.email.trim(),
          password: data.password,
        });
      },
      validateOnBlur: false,
      validateOnChange: false,
      validationSchema: getValidationSchema(),
    })

  if(!showForm) return null; 
    
  return (
    <Box 
      component="form" 
      onSubmit={handleSubmit} 
      sx={{ 
        width: '100%',
        maxWidth: '12em',         
        height: '100%',        
        boxSizing: 'border-box',
      }}
      className="animate__animated animate__bounceInRight"
    >
      <LoginFormInputs values={values} setFieldValue={setFieldValue} errors={errors}/>
        <Typography sx={{
          mt: '1em',
          textAlign: 'center',
          color: theme => theme?.custom?.fontColor,
          fontSize: theme => theme?.typography?.body2.fontSize,
          backgroundColor: theme => theme?.custom?.background,
          borderRadius: '1em',
          width: '100%',
        }}>
          ¿Olvidaste tu contraseña?
        </Typography>
      <LoginFormButtons errors={errors}/>
    </Box>
  )
}

export default LoginForm
