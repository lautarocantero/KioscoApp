import AuthLayout from "../../layout/AuthLayout";
import AuthTitle from "../LoginPage/components/LoginFormComponent/AuthTitle";
import RegisterForm from "./components/RegisterForm";

const RegisterPage = (): React.ReactNode  => {
  return (
    <AuthLayout>
      <AuthTitle />
      <RegisterForm />
    </AuthLayout>
  );
};

export default RegisterPage;
