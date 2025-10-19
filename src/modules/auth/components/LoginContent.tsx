import Grid from '@mui/material/Grid';
import LoginSideForm from "./LoginSideForm";
import LoginSideTitle from "./LoginSideTitle";
import LoginAppBar from './LoginAppBar';

const LoginContent = () => {
  return (
    <>
      <LoginAppBar />
      <Grid
      container
      rowSpacing={15}
      sx={(theme) => ({
        display: { xs: 'flex', md: 'flex' },
        flexDirection: { md: 'column' },
        alignItems: { xs: 'center', md: 'center' },
        width: { xs: '100%', sm: '90%', md: '80%' },
        justifyContent: 'center',
        margin: 'auto',
        padding: '3em 0',
        borderRadius: { xs: '0', md: '1em' },
        backgroundColor: {
          xs: 'transparent',
          md: theme.custom?.blackTranslucid || 'rgba(0,0,0,0.6)', // Fallback opcional
        },
      })}
      >
          <LoginSideTitle />
          <LoginSideForm />
      </Grid>
      </>
  );
};

export default LoginContent;