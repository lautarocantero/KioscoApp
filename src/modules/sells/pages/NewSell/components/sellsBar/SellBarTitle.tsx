import { Typography, type Theme } from "@mui/material";
import type { SellBarTitleInterface } from "@typings/ui/appbar.types";


const SellBarTitleComponent = ({title}: SellBarTitleInterface): React.ReactNode => {

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

export default SellBarTitleComponent;