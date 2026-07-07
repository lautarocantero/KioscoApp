
//─────────────────── Componente 🧩: SimpleGridComponent ───────────────────//

//─────────────────── Descripción 📝 ───────────────────//
// Es un grid de fondo oscuro para destacar la informacion de sus hijos

//-----------------------------------------------------------------------------//

import { Grid, Typography } from "@mui/material";
import type { SimpleGridInterface } from "@typings/ui/grid.types";
import React from "react";

const SimpleGridComponent = ({children}: SimpleGridInterface ): React.ReactNode => {
    
    if (!children || React.Children.count(children) === 0)
        return <Typography>No children Loaded...</Typography>;

    return (
    <Grid
      container
      spacing={{ xs: 1, md: 2 }}
    > 
      {children}
    </Grid>
)}

export default SimpleGridComponent;