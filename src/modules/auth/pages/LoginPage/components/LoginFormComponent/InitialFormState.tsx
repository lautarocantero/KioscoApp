import InitialFormButtons from "./InitialFormButtons";
import AuthTitle from "./AuthTitle";
import type { FormVisibilityState } from "../../../../../../typings/auth/authComponentTypes";

const InitialFormState = ({ showForm, setShowForm }: FormVisibilityState): React.ReactNode | null => {
  if (showForm) {
    return null;
  }

  return (
    <>
      <AuthTitle />
      <InitialFormButtons setShowForm={setShowForm} />
    </>
  );
};

export default InitialFormState;
