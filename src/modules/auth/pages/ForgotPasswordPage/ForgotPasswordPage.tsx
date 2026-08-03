import { Suspense, type ReactNode } from "react";
import AuthLayout from "../../layout/AuthLayout";
import LoginLoader from "../LoginPage/components/LoginFormComponent/LoginLoader";
import AuthTitle from "../LoginPage/components/LoginFormComponent/AuthTitle";
import ForgotPasswordForm from "./components/ForgotPasswordForm";

const ForgotPasswordPage = (): ReactNode => {
  return (
    <AuthLayout>
      <Suspense fallback={<LoginLoader />}>
        <AuthTitle />
        <ForgotPasswordForm />
      </Suspense>
    </AuthLayout>
  );
};

export default ForgotPasswordPage;