import { Link, type Theme } from '@mui/material';
import { Link as LinkReactRouter} from 'react-router-dom';

const ProductsPage = () => {
    return (
        <>
            <Link
                component={LinkReactRouter}
                to={"/products-list"}
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
                Ver listado de Productos
            </Link> 
            
            <Link
                component={LinkReactRouter}
                to={"/products-create"}
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
                Crear Producto
            </Link>
            
            <Link
                component={LinkReactRouter}
                to={"/products-edit"}
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
                Editar Productos
            </Link>     

            <Link
                component={LinkReactRouter}
                to={"/categories"}
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
            categorias
            </Link>                                                
        </>
    )
}

export default ProductsPage;