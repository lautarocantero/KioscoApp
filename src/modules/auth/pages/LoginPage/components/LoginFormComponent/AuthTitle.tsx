import { Grid } from "@mui/material";
import KioscoTitle from "./KioscoTitle";
import "animate.css";

const AuthTitle = () => {
  return (
    <Grid component={"div"} className="animate__animated animate__pulse">
      <KioscoTitle />
    </Grid>
  );
};

export default AuthTitle;
