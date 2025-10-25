import PrimaryButton from "../../../../shared/components/PrimaryButton";

interface RegisterFormButtonsProps {
  errors: {
    user?: string;
    email?: string;
    password?: string;
    confirmPassword?: string;
  };
}

const RegisterFormButtons = ({ errors }: RegisterFormButtonsProps) => {
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
