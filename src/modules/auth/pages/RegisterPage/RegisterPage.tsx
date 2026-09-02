import { Suspense, type ReactNode } from "react";
import AuthLayout from "../../layout/AuthLayout";
import AuthPageHeading from "../../layout/AuthPageHeading/AuthPageHeading";
import RegisterForm from "./components/RegisterForm";
import LoginLoader from "../LoginPage/components/LoginFormComponent/LoginLoader";

const REGISTER_TAGLINE = "Creá tu cuenta y empezá a vender en minutos";

const RegisterPage = (): ReactNode  => {
  return (
    <AuthLayout tagline={REGISTER_TAGLINE}>
      <Suspense fallback={<LoginLoader />}>
        <AuthPageHeading eyebrow="Registro" title="Crear una cuenta" />
        <RegisterForm />
      </Suspense>
    </AuthLayout>
  );
};

export default RegisterPage;
