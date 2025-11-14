import { useDispatch } from "react-redux";
import type { AppDispatch } from "../../store/auth/authSlice";
import { startLogout } from "../../store/auth/thunks";
import { Link, type Theme } from '@mui/material';
import { Link as LinkReactRouter} from 'react-router-dom';

// ventas
// tienda
// cuenta
// proovedores
// productos
// cerrar session


const HomePage = (): React.ReactNode => {
    const dispatch = useDispatch<AppDispatch>();

    return (
        <>
            <h1>Que deseas hacer?</h1>
            <Link
              component={LinkReactRouter}
              to={"/sells"}
              sx={{
                mt: "1em",
                textDecoration: "none",
                textAlign: "center",
                display: "block",
                color: (theme: Theme) => theme?.custom?.fontColor,
                fontSize: (theme: Theme) => theme?.typography?.body2.fontSize,
                backgroundColor: (theme: Theme) => theme?.custom?.background,
                borderRadius: "1em",
                width: "100%",
              }}
            >
              ventas
            </Link>

            <Link
                component={LinkReactRouter}
                to={"/shop"}
                sx={{
                  mt: "1em",
                  textDecoration: "none",
                  textAlign: "center",
                  display: "block",
                  color: (theme: Theme) => theme?.custom?.fontColor,
                  fontSize: (theme: Theme) => theme?.typography?.body2.fontSize,
                  backgroundColor: (theme: Theme) => theme?.custom?.background,
                  borderRadius: "1em",
                  width: "100%",
                }}
            >
            tienda
            </Link>

            <Link
                component={LinkReactRouter}
                to={"/account"}
                sx={{
                  mt: "1em",
                  textDecoration: "none",
                  textAlign: "center",
                  display: "block",
                  color: (theme: Theme) => theme?.custom?.fontColor,
                  fontSize: (theme: Theme) => theme?.typography?.body2.fontSize,
                  backgroundColor: (theme: Theme) => theme?.custom?.background,
                  borderRadius: "1em",
                  width: "100%",
                }}
            >
            cuenta
            </Link>            

            <Link
                component={LinkReactRouter}
                to={"/login"}
                sx={{
                  mt: "1em",
                  textDecoration: "none",
                  textAlign: "center",
                  display: "block",
                  color: (theme: Theme) => theme?.custom?.fontColor,
                  fontSize: (theme: Theme) => theme?.typography?.body2.fontSize,
                  backgroundColor: (theme: Theme) => theme?.custom?.background,
                  borderRadius: "1em",
                  width: "100%",
                }}
            >
            proovedores
            </Link>            

            <Link
                component={LinkReactRouter}
                to={"/login"}
                sx={{
                  mt: "1em",
                  textDecoration: "none",
                  textAlign: "center",
                  display: "block",
                  color: (theme: Theme) => theme?.custom?.fontColor,
                  fontSize: (theme: Theme) => theme?.typography?.body2.fontSize,
                  backgroundColor: (theme: Theme) => theme?.custom?.background,
                  borderRadius: "1em",
                  width: "100%",
                }}
            >
            productos
            </Link>            

            <button onClick={() => dispatch(startLogout())}>
              Desloguear
            </button>

        </>
    )
}

export default HomePage;