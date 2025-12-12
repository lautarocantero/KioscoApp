
// # Componente: QrEscaner  

// ## Descripción 📦  
// Renderiza la vista del escáner QR dentro del flujo de ventas.  
// Incluye un enlace para acceder al carrito y un marcador visual donde se mostrará la imagen del QR.  

// ## Lógica 🔧  
// - `Link` de MUI con integración a `react-router-dom`:  
//   - Redirige a la ruta `/cart`.  
//   - Estilizado con `sx` para mantener coherencia visual con el tema (`Theme`).  
// - Texto "imagen qr": marcador que representa el área donde se mostrará o integrará el escáner QR.  

// ## Notas técnicas 💽  
// - El enlace ocupa todo el ancho disponible y se centra visualmente.  
// - Estilos dinámicos basados en `Theme`:  
//   - Color de fuente (`fontColor`).  
//   - Fondo (`background`).  
//   - Tipografía (`body2`).  
// - Se integra en el flujo de venta como alternativa al ingreso manual de productos.  


import { Link, type Theme } from '@mui/material';
import { Link as LinkReactRouter} from 'react-router-dom';

const QrEscaner = ():React.ReactNode => {

    return (
        <>
            <Link
              component={LinkReactRouter}
              to={"/cart"}
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
              ver carrito
            </Link>
            <p>imagen qr</p>
        </>
    )

}

export default QrEscaner; 