import { Suspense, type ReactNode } from "react";
import AuthLayout from "../../layout/AuthLayout";
import LoginLoader from "../LoginPage/components/LoginFormComponent/LoginLoader";
import AuthTitle from "../LoginPage/components/LoginFormComponent/AuthTitle";
import CheckEmailContent from "./components/CheckEmailContent";


const CheckEmailPage = (): ReactNode => {
  return (
    <AuthLayout>
      <Suspense fallback={<LoginLoader />}>
        <AuthTitle />
        <CheckEmailContent />
      </Suspense>
    </AuthLayout>
  );
};

export default CheckEmailPage;