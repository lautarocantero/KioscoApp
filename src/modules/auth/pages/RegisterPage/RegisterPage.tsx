import { Suspense, type ReactNode } from "react";
import AuthLayout from "../../layout/AuthLayout";
import AuthTitle from "../LoginPage/components/LoginFormComponent/AuthTitle";
import RegisterForm from "./components/RegisterForm";
import LoginLoader from "../LoginPage/components/LoginFormComponent/LoginLoader";


const RegisterPage = (): ReactNode  => {
  return (
    <AuthLayout>
      <Suspense fallback={<LoginLoader />}>
        <AuthTitle />
        <RegisterForm />
      </Suspense>
    </AuthLayout>
  );
};

export default RegisterPage;
