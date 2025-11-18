import { Button, Grid, Link, type Theme} from '@mui/material';
import { Link as LinkReactRouter} from 'react-router-dom';
import type { LogoutButtonProps, OptionLink, OptionsListInterface } from '../../../typings/ui/uiModules';
import { useDispatch } from 'react-redux';
import type { AppDispatch } from '../../../store/auth/authSlice';
import { startLogout } from '../../../store/auth/thunks';
import LogoutIcon from '@mui/icons-material/Logout';
import { useContext } from 'react';
import { ThemeContext } from '../../../theme/ThemeContext';

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
}

const OptionsList = ({links}: OptionsListInterface): React.ReactNode => {
    const { appTheme } = useContext(ThemeContext);
    const dispatch = useDispatch<AppDispatch>();

    return (
        <>
            {
                links?.map((link: OptionLink) => (
                  <Grid
                    sx={(theme: Theme) => ({
                      alignItems: "center",
                      border: `0.1em solid ${appTheme ? theme?.custom?.blackTranslucid : theme?.custom?.whiteTranslucid}`,
                      borderRadius: "0.5em",
                      color: (theme: Theme) => theme?.custom?.fontColor,
                      display: "flex",
                      height: "3.5em",
                      justifyContent: "center",
                      textAlign: "center",
                      width: "100%",
                    })}
                  >
                    <Link
                      component={LinkReactRouter}
                      to={link?.url}
                      sx={{
                        alignItems: "center",
                        color: (theme: Theme) => theme?.custom?.fontColor,
                        display: "flex",
                        fontSize: (theme: Theme) => theme?.typography?.h6.fontSize,
                        gap: "0.5em",
                        height: "100%",
                        justifyContent: "center",
                        textAlign: "center",
                        textDecoration: "none",
                        width: "100%",
                      }}
                    >
                      {link.icon}
                      {link?.description}
                    </Link>
                  </Grid>
                ))
}

            <LogoutButton dispatch={dispatch} appTheme={appTheme}/>
        </>
    )
}

export default OptionsList;