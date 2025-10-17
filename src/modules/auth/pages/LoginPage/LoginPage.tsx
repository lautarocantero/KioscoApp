import { Grid } from "@mui/material";
import LoginSideImage from "./LoginSideImage";
import LoginSideForm from "./LoginSideForm";

const LoginPage = () => {
  return (
    <Grid
      container
      justifyContent="center"
      alignItems="center"
      display={"flex"}
      flexDirection={"column"}
      margin={"auto"}
      spacing={30}
      marginTop={"40%"}
      width={"80%"}
      backgroundColor={"black"}
    >
      <LoginSideImage />
      <LoginSideForm />
    </Grid>
  );
};

export default LoginPage;
