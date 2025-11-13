import { lazy, Suspense } from "react";
import AuthLayout from "../../layout/AuthLayout";
import LoginLoader from "./components/LoginFormComponent/LoginLoader";

const LoginFormHandler = lazy(
  () => import("./components/LoginFormComponent/LoginFormHandler")
);

const LoginPage = (): React.ReactNode => {
  return (
    <AuthLayout>
      <Suspense fallback={<LoginLoader />}>
        <LoginFormHandler />
      </Suspense>
    </AuthLayout>
  );
};

export default LoginPage;
