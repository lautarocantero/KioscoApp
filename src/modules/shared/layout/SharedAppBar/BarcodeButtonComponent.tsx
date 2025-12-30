
//─────────────────── Componente 🧩: BarcodeButtonComponent ───────────────────//
//
//─────────────────── Descripción 📝 ───────────────────//
// Botón flotante que activa un campo de entrada para escanear códigos de barras.
// Permite agregar productos al carrito mediante el ID escaneado.
// Incluye ícono de pistola lectora y animaciones de entrada.
//
//──────────────────── Funciones 🔧 ─────────────────────//
// • `useEffect`: enfoca el input al mostrarse.
// • `getProductVariant({id})`: obtiene variante de producto desde el store.
// • `handleAddToCart()`: agrega producto al carrito, incrementa unidades si ya existe.
// • `handleKeyDown(e)`: ejecuta `handleAddToCart` al presionar Enter.
// • `showSnackBar()`: muestra notificación de éxito al agregar producto.
//
//─────────────────── Notas técnicas 💽 ───────────────────//
// - Solo se renderiza en rutas `/new-sell` y `/cart`.
// - Usa Redux Thunks: `getProductVariantById`, `selectProductThunk`, `addOneUnitThunk`, `addToCartThunk`.
// - El nombre del producto se recorta a 25 caracteres para mensajes de SnackBar.
// - Animación con `animate.css` (`animate__backInRight`).
// - Contexto: `SnackBarContext` para notificaciones globales.
//
//-----------------------------------------------------------------------------//


import BarcodeReaderIcon from '@mui/icons-material/BarcodeReader';
import { Grid, TextField, Tooltip, type Theme } from "@mui/material";
import "animate.css";
import { useContext, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import type { AppDispatch } from '../../../../store/auth/authSlice';
import { getProductVariantById } from '../../../../store/productVariant/productVariantThunks';
import type { RootState as SellerRootState } from "../../../../store/seller/sellerSlice";
import { addOneUnitThunk, addToCartThunk, selectProductThunk } from '../../../../store/seller/sellerThunks';
import type { ProductVariant } from '../../../../typings/productVariant/productVariant';
import type { ProductTicketType } from '../../../../typings/seller/sellerTypes';
import { AlertColor } from '../../../../typings/ui/ui';
import { SnackBarContext } from '../../components/SnackBar/SnackBarContext';

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

  const getProductVariant = async ({id}:{id: string}): Promise<ProductVariant> => {
    const prod: ProductVariant[] | undefined = await dispatch(getProductVariantById(id));

    if(!prod) {
      showSnackBar(`Código de barras inexistente`, AlertColor.Error);
      throw new Error('No se ha seleccionado un producto');
    }

    await dispatch(selectProductThunk({productData: prod[0] }));
    return prod[0];
  }

  const handleAddToCart = async () => {
    if(barcode === '') return;

    const product: ProductVariant = await getProductVariant({id: barcode});
    
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
    <Grid
      container
      onClick={() => setShowInput(prev => !prev)}
      sx={{
        margin: '0.8em 0 0',
        display: 'flex',
        justifyContent: 'end',
        width: '100%',
      }}
    >
      <Grid
        className="animate__animated animate__backInRight"
        sx={(theme: Theme) => ({
          backgroundColor: showInput ? theme?.custom?.white : theme?.custom?.backgroundDark,
          width: { xs: showInput ? '20em' : '4em', md: showInput ? '20em' : '5em'},
          height: '2em',
          display: 'flex',
          alignItems: 'center',
          justifyContent: showInput ? 'space-between' : 'center',
          gap: '0.5em',
          padding: '0.2em 1em',
          transition: 'all 0.3s ease',
          '&:hover': {
            backgroundColor: theme?.custom?.white,
            cursor: 'pointer',
          },
          '&:hover .MuiSvgIcon-root': {
            color: theme?.palette?.primary?.main,
          },
        })}
      >
        {showInput && (
          <TextField
            inputRef={inputRef}
            value={barcode}
            onChange={(e) => setBarcode(e.target.value)}
            variant="outlined"
            size="small"
            onKeyDown={handleKeyDown}
            placeholder="Escanee el código aquí"
            focused={true}
            sx={{
              flex: 1,
              width: '100%',
              '& .MuiInputBase-root': {
                height: '2.2em',
              },
            }}
          />
        )}
        <Tooltip title="Usar lectora de código de barras">
          <BarcodeReaderIcon
            sx={(theme: Theme) => ({
              color: theme?.palette?.primary?.main,
              fontSize: { 
                xs: theme?.typography?.body1?.fontSize,
                md: theme?.typography?.h3?.fontSize
              },
              transition: 'color 0.3s ease',
              width: { xs: '4em'},
              height: { xs: '2em', md: '1em'},
            })}
          />
        </Tooltip>
      </Grid>
    </Grid>
  );
};

export default BarcodeButtonComponent;
