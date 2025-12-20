
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

import { Grid, TextField, type Theme } from '@mui/material';
import SimpleGridComponent from '../../shared/components/SimpleGrid/SimpleGridComponent';
import AppLayout from '../../shared/layout/AppLayout';
import BarcodeReaderIcon from '@mui/icons-material/BarcodeReader';
import { useContext, useEffect, useRef, useState } from 'react';
import ProductVariantDialog from './components/ProductVariantDialog/ProductVariantDialog';
import { ProductVariantDialogContext } from './context/ProductVariant/ProductVariantDialogContext';

const BarCodeEscaner = (): React.ReactNode => {
  const { showModal, setShowModal } = useContext(ProductVariantDialogContext)!;
  const [barcode, setBarcode] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      setShowModal(true);
    }
  };

  return (
      <AppLayout>
          <SimpleGridComponent>
              <Grid
                container
                sx={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignContent: 'center',
                  width: '100%',
                  height: { xs: '20em', md: '25em'},
                }}
              >
                <TextField
                  inputRef={inputRef}
                  value={barcode}
                  onChange={(e) => setBarcode(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="Escanee el código aquí"
                  sx={{ 
                    width: "80%",
                    color: 'white',
                   }}
                />
                <BarcodeReaderIcon 
                  sx={(theme: Theme) => ({
                    fontSize: { xs: '5em', sm: '10em', md: '20em' },
                    color: theme.palette.primary.main,
                  })}
                />
              </Grid>
          </SimpleGridComponent>
          {
            showModal && <ProductVariantDialog id={barcode} />
          }
      </AppLayout>
  )

}

export default BarCodeEscaner; 