
//─────────────────── Componente 🧩: BarCodeEscaner ───────────────────//

//─────────────────── Descripción 📝 ───────────────────//
// Renderiza un campo de texto centrado y un ícono de lector.
// Permite ingresar manualmente o escanear un código de barras.
// Al presionar Enter se abre un modal con información del producto.

//──────────────────── Funciones 🔧 ─────────────────────//
// - handleKeyDown: detecta Enter y dispara la apertura del modal.
// - setBarcode: limpia/actualiza el valor del input.
// - setShowModal: controla la visibilidad del diálogo de variantes.

//─────────────────── Notas técnicas 💽 ───────────────────//
// - Contexto ProductVariantDialogContext para manejar el modal.
// - Compatible tanto con ingreso manual como con escaneo automático.
//-----------------------------------------------------------------------------//


import { Grid, TextField, type Theme } from '@mui/material';
import SimpleGridComponent from '../../shared/components/SimpleGrid/SimpleGridComponent';
import AppLayout from '../../shared/layout/AppLayout';
import BarcodeReaderIcon from '@mui/icons-material/BarcodeReader';
import { useContext, useEffect, useRef, useState } from 'react';
import ProductVariantDialog from './components/ProductVariantDialog/ProductVariantDialogComponent';
import { ProductVariantDialogContext } from './context/ProductVariant/ProductVariantDialogContext';

const BarCodeEscaner = (): React.ReactNode => {
  const { showModal, setShowModal } = useContext(ProductVariantDialogContext)!;
  const [barcode, setBarcode] = useState<string>("");
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
                    input: { color: 'white' },
                    '& .MuiInputBase-input::placeholder': { 
                      color: 'white',
                      opacity: 1,
                      },
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
            showModal && 
            <ProductVariantDialog 
              id={barcode} 
              setBarcode={setBarcode}
            />
          }
      </AppLayout>
  )

}

export default BarCodeEscaner; 