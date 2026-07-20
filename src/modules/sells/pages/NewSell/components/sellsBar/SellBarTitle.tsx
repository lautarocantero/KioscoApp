import { Typography, type Theme } from "@mui/material";
import type { SellBarContentInterface } from "@typings/ui/appbar.types";


const SellBarTitle = ({title}: SellBarContentInterface): React.ReactNode => {

  return (
      <Typography
        sx={(theme: Theme) => ({
          color: theme?.custom?.fontColor,
          fontSize: theme?.typography?.body1?.fontSize,
          whiteSpace: 'nowrap',
          cursor: 'pointer',
          flexShrink: 0,
        })}
      >
        {title}
      </Typography>

  );
};

export default SellBarTitle;