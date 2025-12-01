import { lazy, Suspense } from "react";
import AuthLayout from "../../layout/AuthLayout";
import LoginLoader from "./components/LoginFormComponent/LoginLoader";
import AuthTitle from "./components/LoginFormComponent/AuthTitle";

const LoginFormHandler = lazy(
  () => import("./components/LoginFormComponent/LoginFormHandler")
);

const LoginPage = (): React.ReactNode => {
  return (
    <AuthLayout>
      <Suspense fallback={<LoginLoader />}>
        <AuthTitle />
        <LoginFormHandler />
      </Suspense>
    </AuthLayout>
  );
};

export default LoginPage;
