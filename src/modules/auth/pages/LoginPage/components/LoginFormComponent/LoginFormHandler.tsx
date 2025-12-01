import { useState } from "react";
import InitialFormState from "./InitialFormState";
import LoginForm from "./LoginForm";
import { Grid } from "@mui/material";

const LoginFormHandler = (): React.ReactNode => {
  const [showForm, setShowForm] = useState<boolean>(false);

  return (
    <Grid
    >
      <InitialFormState showForm={showForm} setShowForm={setShowForm}/>
      <LoginForm showForm={showForm}/>
    </Grid>
  )
}

export default LoginFormHandler
