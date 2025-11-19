import { Grid, Link, type Theme} from '@mui/material';
import { Link as LinkReactRouter } from 'react-router-dom';
import type { OptionLink, OptionsListInterface } from '../../../typings/ui/uiModules';
import { useDispatch } from 'react-redux';
import type { AppDispatch } from '../../../store/auth/authSlice';
import { useContext } from 'react';
import { ThemeContext } from '../../../theme/ThemeContext';
import BackButton from './BackButton';
import LogoutButton from './LogoutButton';

const OptionsList = ({ links, disconnect }: OptionsListInterface): React.ReactNode => {
  const { appTheme } = useContext(ThemeContext);
  const dispatch = useDispatch<AppDispatch>();

  // To do, en xs no deberia espaciarse tanto entre columnas
  // To do, componetizar esto

  // dividir en dos mitades
  const mid = Math.ceil(links.length / 2);
  const leftLinks = links.slice(0, mid);
  const rightLinks = links.slice(mid);

  return (
    <Grid container spacing={2}>
      {/* Columna izquierda */}
      <Grid size={{ xs: 12, sm: 6 }}>
        {leftLinks.map((link: OptionLink) => (
          <Grid
            component={'div'}
            key={link.url}
            sx={(theme: Theme) => ({
              alignItems: "center",
              border: `0.1em solid ${
                appTheme ? theme.custom?.blackTranslucid : theme.custom?.whiteTranslucid
              }`,
              borderRadius: "0.5em",
              color: theme.custom?.fontColor,
              display: "flex",
              height: { xs: "3.5em" },
              justifyContent: "center",
              textAlign: "center",
              width: "100%",
              mb: 1,
              "&:hover": {
                backgroundColor: theme?.custom?.fontColor,
              }
            })}
          >
            <Link
              component={LinkReactRouter}
              to={link.url}
              sx={(theme: Theme) => ({
                alignItems: "center",
                color: theme.custom?.fontColor,
                display: "flex",
                fontSize: {
                  xs: theme.typography?.body1.fontSize,
                  sm: theme.typography?.h6.fontSize,
                },
                gap: "0.5em",
                height: "100%",
                justifyContent: "center",
                textAlign: "center",
                textDecoration: "none",
                width: "100%",
                "&:hover": {
                  color: theme?.custom?.backgroundDark,
                }
              })}
            >
              {link.icon}
              {link.description}
            </Link>
          </Grid>
        ))}
      </Grid>

      {/* Columna derecha */}
      <Grid size={{ xs: 12, sm: 6 }}>
        {rightLinks.map((link: OptionLink) => (
          <Grid
            key={link.url}
            sx={(theme: Theme) => ({
              alignItems: "center",
              border: `0.1em solid ${
                appTheme ? theme.custom?.blackTranslucid : theme.custom?.whiteTranslucid
              }`,
              borderRadius: "0.5em",
              color: theme.custom?.fontColor,
              display: "flex",
              height: { xs: "3.5em" },
              justifyContent: "center",
              textAlign: "center",
              width: "100%",
              mb: 1,
              "&:hover": {
                backgroundColor: theme.custom?.fontColor,
              }
            })}
          >
            <Link
              component={LinkReactRouter}
              to={link.url}
              sx={(theme: Theme) => ({
                alignItems: "center",
                color: theme.custom?.fontColor,
                display: "flex",
                fontSize: {
                  xs: theme.typography?.body1.fontSize,
                  sm: theme.typography?.h6.fontSize,
                },
                gap: "0.5em",
                height: "100%",
                justifyContent: "center",
                textAlign: "center",
                textDecoration: "none",
                width: "100%",
                "&:hover": {
                  color: theme?.custom?.backgroundDark,
                }
              })}
            >
              {link.icon}
              {link.description}
            </Link>
          </Grid>
        ))}
      </Grid>

      {/* Botones extra */}
      {disconnect && <LogoutButton dispatch={dispatch} appTheme={appTheme} />}
      {!disconnect && <BackButton appTheme={appTheme} />}
    </Grid>
  );
};

















































export default OptionsList;