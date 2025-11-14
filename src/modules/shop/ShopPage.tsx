import { Link, type Theme } from '@mui/material';
import { Link as LinkReactRouter} from 'react-router-dom';

const ShopPage = () => {

    return (
        <>
            <Link
                component={LinkReactRouter}
                to={"/shop-administrators"}
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
            Administradores
            </Link> 
             
            <Link
                component={LinkReactRouter}
                to={"/shop-sellers"}
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
            Vendedores
            </Link>

            <Link
                component={LinkReactRouter}
                to={"/shop-stadistics"}
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
            Estadisticas
            </Link>                      
        </>
    )

}

export default ShopPage;