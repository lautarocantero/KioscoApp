import { useState } from "react";
import InitialFormState from "./InitialFormState";
import LoginForm from "./LoginForm";

const LoginFormHandler = (): React.ReactNode => {
  const [showForm, setShowForm] = useState<boolean>(false);

  return (
    <>
      <InitialFormState showForm={showForm} setShowForm={setShowForm}/>
      <LoginForm showForm={showForm}/>
    </>
  )
}

export default LoginFormHandler
