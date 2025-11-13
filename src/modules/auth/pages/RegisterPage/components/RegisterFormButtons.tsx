import type { RegisterFormButtonsInterface } from "../../../../../typings/auth/authTypes";
import PrimaryButton from "../../../../shared/components/PrimaryButton";

const RegisterFormButtons = ({ errors }: RegisterFormButtonsInterface): React.ReactNode => {
  return (
    <>
      <PrimaryButton
        buttonText="Registrarse"
        buttonType="submit"
        buttonOnClick={() => {}}
        buttonWidth="100%"
        buttonColor={Object.keys(errors).length === 0 ? "default" : "error"}
      />
    </>
  );
};

export default RegisterFormButtons;
