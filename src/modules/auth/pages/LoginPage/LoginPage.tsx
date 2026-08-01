import { Suspense } from "react";
import AuthLayout from "../../layout/AuthLayout";
import LoginLoader from "./components/LoginFormComponent/LoginLoader";
import AuthTitle from "./components/LoginFormComponent/AuthTitle";
import LoginForm from "./components/LoginFormComponent/LoginForm";


const LoginPage = (): React.ReactNode => {
  return (
    <AuthLayout>
      <Suspense fallback={<LoginLoader />}>
        <AuthTitle />
        <LoginForm />
      </Suspense>
    </AuthLayout>
  );
};

export default LoginPage;
