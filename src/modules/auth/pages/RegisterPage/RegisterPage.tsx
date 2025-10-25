import AuthLayout from "../../layout/AuthLayout";
import AuthTitle from "../LoginPage/components/LoginFormComponent/AuthTitle";
import RegisterForm from "./components/RegisterForm";

const RegisterPage = () => {
  return (
    <AuthLayout>
      <AuthTitle />
      <RegisterForm />
    </AuthLayout>
  );
};

export default RegisterPage;
