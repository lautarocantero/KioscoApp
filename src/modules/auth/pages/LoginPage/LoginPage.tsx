import { Suspense, type ReactNode } from "react";
import { AuthPageModeEnum } from "@typings/auth/authEnums";
import { useAuthPageMode } from "@hooks/auth/useAuthPageMode";
import AuthLayout from "../../layout/AuthLayout";
import AuthPageHeading from "../../layout/AuthPageHeading/AuthPageHeading";
import RegisterForm from "../RegisterPage/components/RegisterForm";
import LoginLoader from "./components/LoginFormComponent/LoginLoader";
import LoginForm from "./components/LoginFormComponent/LoginForm";

const LOGIN_TAGLINE = "Gestión de stock y ventas para tu kiosco";
const REGISTER_TAGLINE = "Creá tu cuenta y empezá a vender en minutos";

const LoginPage = (): ReactNode => {
  const { mode } = useAuthPageMode();
  const isRegisterMode = mode === AuthPageModeEnum.Register;

  return (
    <AuthLayout tagline={isRegisterMode ? REGISTER_TAGLINE : LOGIN_TAGLINE}>
      <Suspense fallback={<LoginLoader />}>
        {isRegisterMode ? (
          <>
            <AuthPageHeading eyebrow="Registro" title="Crear una cuenta" />
            <RegisterForm />
          </>
        ) : (
          <>
            <AuthPageHeading eyebrow="Iniciar sesión" title="Bienvenido de nuevo" />
            <LoginForm />
          </>
        )}
      </Suspense>
    </AuthLayout>
  );
};

export default LoginPage;
