import { Suspense, type ReactNode } from "react";
import AuthLayout from "../../layout/AuthLayout";
import AuthPageHeading from "../../layout/AuthPageHeading/AuthPageHeading";
import LoginLoader from "./components/LoginFormComponent/LoginLoader";
import LoginForm from "./components/LoginFormComponent/LoginForm";

const LOGIN_TAGLINE = "Gestión de stock y ventas para tu kiosco";

const LoginPage = (): ReactNode => {
  return (
    <AuthLayout tagline={LOGIN_TAGLINE}>
      <Suspense fallback={<LoginLoader />}>
        <AuthPageHeading eyebrow="Iniciar sesión" title="Bienvenido de nuevo" />
        <LoginForm />
      </Suspense>
    </AuthLayout>
  );
};

export default LoginPage;
