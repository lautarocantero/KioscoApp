
import { Grid } from "@mui/material";
import StockoTitle from "./StockoTitle";
import "animate.css";

const AuthTitle = (): React.ReactNode => {
  return (
    <Grid 
      component={"div"} 
      className="animate__animated animate__pulse" 
      sx={{ 
        width: "100%", 
        display: "flex", 
        justifyContent: "center",
        mb: 2,
      }}
    >
      <StockoTitle />
    </Grid>
  );
};

export default AuthTitle;
