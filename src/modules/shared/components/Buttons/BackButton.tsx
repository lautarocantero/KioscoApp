
//─────────────────── Componente 🧩: BackButton ───────────────────//

//─────────────────── Descripción 📝 ───────────────────//
// Boton que se encarga de retroceder en el historial de navegacion
// obtiene un tema para renderizarse con el color adecuado

//-----------------------------------------------------------------------------//

import { useNavigate } from "react-router-dom";
import { Button, Grid, type Theme } from "@mui/material";
import KeyboardReturnIcon from '@mui/icons-material/KeyboardReturn';
import type { BackButtonProps } from "../../../../typings/ui/uiModules";


const BackButton = ({appTheme}: BackButtonProps): React.ReactNode => {
    const navigate = useNavigate();
    return (
        <Grid
            sx={() => ({
                borderRadius: "1em",
                width: "100%",
                height: '3.5em',
                textAlign: 'center',
                alignContent: 'center',
            })}>
            <Button 
                onClick={()=> navigate(-1)}
                sx={(theme: Theme) => ({
                    color: theme?.palette?.primary?.main,
                    fontSize: theme?.typography?.body2?.fontSize,
                })}
            >
                <KeyboardReturnIcon sx={(theme) => ({ 
                    fontSize: theme?.typography?.body2?.fontSize,
                    marginRight: '10px',
                    color: theme?.palette?.primary?.main
                })}/>
                Volver
            </Button>
        </Grid>
    )
}

export default BackButton;