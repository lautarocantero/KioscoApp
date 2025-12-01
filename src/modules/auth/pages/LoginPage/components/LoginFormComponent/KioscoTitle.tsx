import { Typography, type Theme } from "@mui/material";
import StoreMallDirectoryIcon from "@mui/icons-material/StoreMallDirectory";

const KioscoTitle = (): React.ReactNode => (
  <Typography 
    sx={{
      display: "flex",
      alignItems: "center",
      color: (theme: Theme) => theme?.custom?.fontColor,
    }}
    variant="h1">
    <span>
      Kiosco
    </span>
    <span>
      <StoreMallDirectoryIcon sx={{ fontSize: "2em" }} titleAccess="kiosco icon"/>
    </span>
  </Typography>
)

export default KioscoTitle;