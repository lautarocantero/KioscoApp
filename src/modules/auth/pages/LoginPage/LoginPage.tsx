import { lazy, Suspense } from "react";
import AuthLayout from "../../layout/AuthLayout";
import LoginLoader from "./components/LoginFormComponent/LoginLoader";

const LoginContent = lazy(() => import('./components/LoginFormComponent/LoginContent'));

const LoginPage = () => {
  
  return (
    <AuthLayout>
      <Suspense fallback={<LoginLoader/>}>
        <LoginContent />
      </Suspense>
    </AuthLayout>
  );
};

export default LoginPage;