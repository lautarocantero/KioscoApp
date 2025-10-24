import { Grid } from "@mui/material";
import PrimaryButton from "../../../../../shared/components/PrimaryButton";
import EmptyButton from "../../../../../shared/components/EmptyButton";
import { useNavigate } from "react-router-dom";

interface InitialFormButtonsProps {
  setShowForm?: (value: boolean) => void;
}

const InitialFormButtons = ({ setShowForm }: InitialFormButtonsProps) => {
  const handleNavigate = useNavigate();
  return (
    <Grid component={"div"} display={"flex"} flexDirection={"column"} gap={3}>
      <PrimaryButton
        buttonText={"Iniciar sesión"}
        buttonOnClick={() => {
          setShowForm?.(true);
        }}
      />
      <EmptyButton
        buttonText={"Registrarse"}
        buttonOnClick={() => {
          handleNavigate("/register");
        }}
      />
    </Grid>
  );
};

export default InitialFormButtons;
