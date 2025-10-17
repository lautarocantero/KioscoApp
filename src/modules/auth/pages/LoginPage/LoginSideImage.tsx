import { Grid } from "@mui/material";
import StoreMallDirectoryIcon from "@mui/icons-material/StoreMallDirectory";

const LoginSideImage = () => {
  return (
    <Grid>
      <h1
        style={{
          display: "flex",
          alignItems: "center",
          gap: "0.5em",
          color: "black",
        }}
      >
        <span>Kiosco</span>
        <span>
          <StoreMallDirectoryIcon sx={{ fontSize: "2em" }} />
        </span>
      </h1>
    </Grid>
  );
};

export default LoginSideImage;
