import { Button, Grid, type Theme } from "@mui/material";
import type { LogoutButtonProps } from "../../../../typings/ui/uiModules";
import { startLogout } from "../../../../store/auth/thunks";
import LogoutIcon from '@mui/icons-material/Logout';


const LogoutButton = ({dispatch, appTheme}: LogoutButtonProps): React.ReactNode => {
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
                onClick={()=> dispatch(startLogout())}
                sx={(theme: Theme) => ({
                    color: appTheme ? theme?.custom?.blackTranslucid : theme?.custom?.whiteTranslucid,
                    fontSize: theme?.typography?.body2?.fontSize,
                })}
            >
                <LogoutIcon sx={(theme) => ({ 
                    fontSize: theme?.typography?.body2?.fontSize,
                    marginRight: '10px'
                })}/>
                Cerrar sesión
            </Button>
        </Grid>
    )
};

export default LogoutButton;