import { Suspense, type ReactNode } from "react";
import AuthLayout from "../../layout/AuthLayout";
import LoginLoader from "../LoginPage/components/LoginFormComponent/LoginLoader";
import AuthTitle from "../LoginPage/components/LoginFormComponent/AuthTitle";
import ResetPasswordForm from "./components/ResetPasswordForm";

const ResetPasswordPage = (): ReactNode => {
  return (
    <AuthLayout>
      <Suspense fallback={<LoginLoader />}>
        <AuthTitle />
        <ResetPasswordForm />
      </Suspense>
    </AuthLayout>
  );
};

export default ResetPasswordPage;