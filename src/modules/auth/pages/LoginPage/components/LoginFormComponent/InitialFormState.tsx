import InitialFormButtons from "./InitialFormButtons";
import type { FormVisibilityState } from "../../../../../../typings/auth/authComponentTypes";
import { Grid } from "@mui/material";

const InitialFormState = ({ showForm, setShowForm }: FormVisibilityState): React.ReactNode | null => {
  if (showForm) {
    return null;
  }

  return (
    <Grid
      container
      display={'flex'}
      flexDirection={'column'}
    >
      <InitialFormButtons setShowForm={setShowForm} />
    </Grid>
  );
};

export default InitialFormState;
