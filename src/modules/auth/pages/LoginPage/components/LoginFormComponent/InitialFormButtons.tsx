import { Grid } from "@mui/material";
import PrimaryButton from "../../../../../shared/components/PrimaryButton";
import EmptyButton from "../../../../../shared/components/EmptyButton";

interface InitialFormButtonsProps {
  showForm?: boolean;
  setShowForm?: (value: boolean) => void;
}

const InitialFormButtons = ({setShowForm} : InitialFormButtonsProps) => {
  return (
    <Grid component={'div'} display={"flex"} flexDirection={"column"} gap={3}>
      <PrimaryButton 
        buttonText={'Iniciar sesión'}
        buttonOnClick={() => {
          setShowForm?.(true);
        }}
      />
      <EmptyButton 
        buttonText={'Registrarse'}
        buttonOnClick={() => {}}
      />
    </Grid>
  );
};

export default InitialFormButtons;
