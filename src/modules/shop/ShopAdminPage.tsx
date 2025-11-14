import { Link, type Theme } from '@mui/material';
import { Link as LinkReactRouter} from 'react-router-dom';

const ShopAdminPage = () => {
    return (
        <>
            <Link
                component={LinkReactRouter}
                to={"/shop-administrators-list"}
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
                Ver listado de Administradores
            </Link> 
            
            <Link
                component={LinkReactRouter}
                to={"/shop-administrators-create"}
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
                Crear Administrador
            </Link>
            
            <Link
                component={LinkReactRouter}
                to={"/shop-administrators-edit"}
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
                Editar Administrador
            </Link>                      
        </>
    )
}

export default ShopAdminPage;