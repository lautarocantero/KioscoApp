
//─────────────────── Componente 🧩: BarcodeButtonComponent ───────────────────//
//
//─────────────────── Descripción 📝 ───────────────────//
// Botón flotante que activa un campo de entrada para escanear códigos de barras.
// Permite agregar productos al carrito mediante el ID escaneado.
// Incluye ícono de pistola lectora y animaciones de entrada.
//
//──────────────────── Funciones 🔧 ─────────────────────//
// • `useEffect`: enfoca el input al mostrarse.
// • `getPresentation({id})`: obtiene variante de producto desde el store.
// • `handleAddToCart()`: agrega producto al carrito, incrementa unidades si ya existe.
// • `handleKeyDown(e)`: ejecuta `handleAddToCart` al presionar Enter.
// • `showSnackBar()`: muestra notificación de éxito al agregar producto.
//
//─────────────────── Notas técnicas 💽 ───────────────────//
// - Solo se renderiza en rutas `/new-sell` y `/cart`.
// - Usa Redux Thunks: `getPresentationById`, `selectProductThunk`, `addOneUnitThunk`, `addToCartThunk`.
// - El nombre del producto se recorta a 25 caracteres para mensajes de SnackBar.
// - Animación con `animate.css` (`animate__backInRight`).
// - Contexto: `SnackBarContext` para notificaciones globales.
//
//-----------------------------------------------------------------------------//


import BarcodeReaderIcon from '@mui/icons-material/BarcodeReader';
import { Grid, TextField, Tooltip, Typography, type Theme } from "@mui/material";
import "animate.css";
import { useContext, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import type { AppDispatch } from '../../../../../../store/auth/authSlice';
import type { RootState as SellerRootState } from "../../../../../../store/seller/sellerSlice";
import { addOneUnitThunk, addToCartThunk, selectProductThunk } from '../../../../../../store/seller/sellerThunks';
import type { Presentation } from '../../../../../../typings/presentation/presentationTypes';
import type { ProductTicketType } from '../../../../../../typings/seller/sellerTypes';
import { AlertColor } from '../../../../../../typings/ui/ui';
import { SnackBarContext } from '../../../../../../modules/shared/components/SnackBar/SnackBarContext';
import { getPresentationById } from '../../../../../../store/presentation/presentationThunks';

export const BarcodeButtonComponent = (): React.ReactNode => {
  const location = useLocation();

  const { showSnackBar } = useContext(SnackBarContext)!;

  const { seller } = useSelector((state: SellerRootState ) => state);
  const { cart } : { cart: ProductTicketType[]} = seller;

  const [showInput, setShowInput] = useState(false);
  const [barcode, setBarcode] = useState<string>("");

  const inputRef = useRef<HTMLInputElement>(null);

  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    if(!showInput) return;
    inputRef.current?.focus();
  }, [showInput]);

  if (location.pathname !== "/new-sell" && location.pathname !== "/cart") return null;

  const getPresentation = async ({id}:{id: string}): Promise<Presentation> => {
    const prod: Presentation[] | undefined = await dispatch(getPresentationById(id));

    if(!prod) {
      showSnackBar(`Código de barras inexistente`, AlertColor.Error);
      throw new Error('No se ha seleccionado un producto');
    }

    await dispatch(selectProductThunk({productData: prod[0] }));
    return prod[0];
  }

  const handleAddToCart = async () => {
    if(barcode === '') return;

    const product: Presentation = await getPresentation({id: barcode});
    
    if(!product) {
      showSnackBar(`Código de barras inexistente`, AlertColor.Error);
      return;
    }

    const productObject: ProductTicketType | undefined = cart?.find((prod) => prod._id === barcode);

    {/*─────────────────── 🔎 Si el producto ya se encuentra en el carrito 🔎 ───────────────────*/}

    if(productObject) {
      await dispatch(addOneUnitThunk({_id: productObject?._id}));
      setBarcode('');
      const nameEdited: string = productObject?.name.length > 25 ? `${productObject?.name.slice(0, 25)}...` : productObject?.name;
      showSnackBar(`Agregado '${nameEdited}' al carrito`, AlertColor.Success);
      return;
    }

    {/*─────────────────── 🔎 Si el producto no se escaneo o agrego antes 🔎 ───────────────────*/}

    const 
    { 
      _id, name, description,image_url,
      brand,product_id,sku,model_type,
      model_size,price,expiration_date 
    } = product;

    const productTicket: ProductTicketType = {
      _id,
      name,
      description,
      image_url,
      brand,
      product_id,
      sku,
      model_type,
      model_size,
      price,
      expiration_date,
      stock_required: 1,
    }

    await dispatch(addToCartThunk({productData: productTicket}));

    const nameEdited: string = name.length > 25 ? `${name.slice(0, 25)}...` : name;

    setBarcode('');
    showSnackBar(`Agregado '${nameEdited}' al carrito`, AlertColor.Success);
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleAddToCart();
    }
  };

  return (
    <Tooltip title="Usar lectora de código de barras">
      <Grid
        className="animate__animated animate__backInRight"
        onClick={() => setShowInput(prev => !prev)}
        sx={(theme: Theme) => ({
          borderRadius: '1em',
          display: 'flex',
          alignItems: 'center',
          gap: '0.4em',
          flexShrink: 0,
          cursor: 'pointer',
          transition: 'all 0.3s ease',
          '&:hover': {
            backgroundColor: theme?.custom?.white,
          },
          '&:hover .MuiSvgIcon-root, &:hover .barcode-label': {
            color: theme?.palette?.primary?.main,
          },
        })}
      >
        <BarcodeReaderIcon
          sx={(theme: Theme) => ({
            color: theme?.custom?.accentProviders,
            fontSize: theme?.typography?.body1?.fontSize,
            transition: 'color 0.3s ease',
          })}
        />
        {!showInput && (
          <Typography
            className="barcode-label"
            sx={(theme: Theme) => ({
              color: theme?.custom?.accentProviders,
              fontSize: '0.85em',
              whiteSpace: 'nowrap',
            })}
          >
            Escanear
          </Typography>
        )}
        {showInput && (
          <TextField
            inputRef={inputRef}
            value={barcode}
            onChange={(e) => setBarcode(e.target.value)}
            variant="outlined"
            size="small"
            onKeyDown={handleKeyDown}
            onClick={(e) => e.stopPropagation()}
            placeholder="Escanee aquí"
            focused={true}
            sx={{
              width: '10em',
              '& .MuiInputBase-root': { height: '2em' },
            }}
          />
        )}
      </Grid>
    </Tooltip>
  );
};

export default BarcodeButtonComponent;
