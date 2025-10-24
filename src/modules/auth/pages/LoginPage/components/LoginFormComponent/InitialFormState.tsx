import InitialFormButtons from "./InitialFormButtons";
import InitialFormTitle from "./InitialFormTitle";

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
      <InitialFormTitle />
      <InitialFormButtons setShowForm={setShowForm} />
    </>
  );
};

export default InitialFormState;
