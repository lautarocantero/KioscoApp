import { Suspense, type ReactNode } from "react";
import AuthLayout from "../../layout/AuthLayout";
import LoginLoader from "../LoginPage/components/LoginFormComponent/LoginLoader";
import AuthTitle from "../LoginPage/components/LoginFormComponent/AuthTitle";
import VerificationForm from "./components/VerificationForm";

const VerificationPage = (): ReactNode => {
  return (
    <AuthLayout>
      <Suspense fallback={<LoginLoader />}>
        <AuthTitle />
        <VerificationForm />
      </Suspense>
    </AuthLayout>
  );
};

export default VerificationPage;