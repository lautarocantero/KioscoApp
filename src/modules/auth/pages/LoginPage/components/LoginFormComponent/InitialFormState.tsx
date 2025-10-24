import InitialFormButtons from "./InitialFormButtons";
import AuthTitle from "./AuthTitle";

interface InitialFormStateProps {
  showForm: boolean;
  setShowForm: (value: boolean) => void;
}

const InitialFormState = ({ showForm, setShowForm }: InitialFormStateProps) => {
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
