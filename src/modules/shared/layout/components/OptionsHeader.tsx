import { Grid, Typography, type Theme } from "@mui/material";
import type { OptionsHeaderInterface } from "../../../../typings/ui/uiModules";


const OptionsHeader = ({isOptions,title,icon, appTheme}: OptionsHeaderInterface):React.ReactNode => {

  if(!isOptions) return (<></>);

  return (
      <Grid
        sx={(theme: Theme) => ({
          alignContent: 'center',
          backgroundColor: !appTheme ? theme.custom.backgroundDark : theme.custom.backgroundLigth,
          borderRadius: '1em',
          color: !appTheme ? theme?.custom?.fontColor : theme.custom.fontColorDark,
          width: '90%',
          margin: { xs: "4em 0", sm: '0'},
          padding: {xs: '1em' },
          textAlign: 'center'
        })}
      >
        <Typography
          variant="h1"
          sx={(theme: Theme) => ({
            fontSize: {xs: theme?.typography?.h4.fontSize, sm: theme?.typography?.h2.fontSize, md: theme?.typography?.h1.fontSize },
          })}
        >
          {icon && icon}
          {title}
        </Typography>
      </Grid>
  )
}

export default OptionsHeader;