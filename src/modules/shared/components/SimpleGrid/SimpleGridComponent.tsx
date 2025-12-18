
//─────────────────── Componente 🧩: SimpleGridComponent ───────────────────//

//─────────────────── Descripción 📝 ───────────────────//
// Es un grid de fondo oscuro para destacar la informacion de sus hijos

//-----------------------------------------------------------------------------//

import { Grid, Typography, type Theme } from "@mui/material";
import React from "react";
import type { SimpleGridInterface } from "../../../../typings/ui/uiModules";

const SimpleGridComponent = ({title, position, children}: SimpleGridInterface ): React.ReactNode => {
    
    if (!children || React.Children.count(children) === 0)
        return <Typography>No children Loaded...</Typography>;

    return (
    <Grid
      container
      spacing={{ xs: 1, md: 2 }}
      sx={(theme: Theme) => ({
        position: 'relative',
        backgroundColor: theme?.custom?.backgroundDark,
        borderRadius: '1em',
        margin: { xs: "5em 0.4em 1em", md: "5em auto 1em"},
        padding: { xs: '0.1em' ,md: '0.5em'},
        width: { xs: '100%', md: '90%'},
        minHeight: '10em',
        ...(position === "center" && {
          display: "flex",
          justifyContent: "center",
        }),
      })}
    > 
      <Typography
        sx={(theme: Theme) => ({ 
          position: 'absolute',
          top: '0.5em',
          left: '0.5em',
          color: theme?.custom?.fontColorTransparent,
          fontWeight: 600,
          zIndex: 1,
        })}
      >
        {title}
      </Typography>
      {children}
    </Grid>
)}

export default SimpleGridComponent;