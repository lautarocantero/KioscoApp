import { Link, type Theme } from '@mui/material';
import { Link as LinkReactRouter} from 'react-router-dom';

const ShopSellersPage = () => {
    return (
        <>
            <Link
                component={LinkReactRouter}
                to={"/shop-sellers-list"}
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
                Ver listado de Vendedores
            </Link> 
            
            <Link
                component={LinkReactRouter}
                to={"/shop-sellers-create"}
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
                Crear Vendedor
            </Link>
            
            <Link
                component={LinkReactRouter}
                to={"/shop-sellers-edit"}
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
                Editar Vendedor
            </Link>                      
        </>
    )
}

export default ShopSellersPage;