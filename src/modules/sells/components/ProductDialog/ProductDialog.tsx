
//─────────────────── Componente 🧩: ProductDialog  ───────────────────//

//─────────────────── Descripción 📝 ───────────────────//
// Diálogo modal para agregar productos al carrito.  

//──────────────────── Funciones 🔧 ─────────────────────//
//   - Usa `ProductDialogContext` para controlar visibilidad del diálogo.  
//   - Usa `SnackBarContext` para mostrar feedback al usuario.  
//   - Consume el hook `useProductVariants` para obtener variantes y producto seleccionado desde Redux.  
//   - Configura Formik con:  
//     - `initialValues` generados por `getInitialProductDialogValues`.  
//     - `validationSchema` definido en `ProductDialogValidationSchema`.  
//     - `onSubmit` encapsulado en helper `ProductDialogSubmit`.  
//   - Renderiza ilustración (`ProductDialogIlustration`) y datos (`ProductDialogData`).  
//   - Contiene botones de acción: **Cerrar** y **Agregar**.  

//─────────────────── Notas técnicas 💽 ───────────────────//
// - Contexto: controla apertura/cierre del modal.  
// - Redux: obtiene variantes y producto seleccionado.  
// - Formik: maneja estado del formulario y validación con Yup.  
// - `enableReinitialize`: asegura que el formulario se reinicie al cambiar de producto.  
// - `useMemo` y `useCallback`: optimizan cálculos y evitan recreaciones innecesarias.  

//─────────────────── 📝 To do ───────────────────//
// - Evaluar soporte para agregar múltiples variantes del mismo producto.  
//-----------------------------------------------------------------------------//


import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, type Theme } from "@mui/material";
import type { DialogDataInterface } from "@typings/sells/types";
import { useFormik } from "formik";
import { useCallback, useContext, useMemo } from "react";
import { useDispatch } from "react-redux";
import useProductVariants from "../../../../hooks/sells/useProductVariants";
import type { AppDispatch } from "../../../../store/productVariant/productVariantSlice";
import type { ProductVariant } from "../../../../typings/productVariant/productVariant";
import { SnackBarContext } from "../../../shared/components/SnackBar/SnackBarContext";
import { ProductDialogContext } from "../../context/Product/ProductDialogContext";
import getInitialProductDialogValues from "../../helpers/ProductDialog/getInitialProductDialogValues";
import ProductDialogValidationSchema from "../../helpers/ProductDialog/getProductDialogValidationSchema";
import onSubmit from "../../helpers/ProductDialog/ProductDialogSubmit";
import ProductDialogData from "./ProductDialogDataComponent";
import ProductDialogIlustration from "./ProductDialogIlustrationComponent";

const ProductDialog = (): React.ReactNode => {
  const { showModal, setShowModal } = useContext(ProductDialogContext)!;
  const { showSnackBar } = useContext(SnackBarContext)!;

  const dispatch = useDispatch<AppDispatch>();

  const {productSelected, productVariants} = useProductVariants();

  const initialValues: DialogDataInterface = useMemo(() => 
    getInitialProductDialogValues(productVariants)
  , [productVariants]);

  const validationSchema = useMemo(() => ProductDialogValidationSchema, []);

  const handleOnSubmit = useCallback(
    (formValues: DialogDataInterface) => onSubmit(
      { 
        data: formValues, 
        showSnackBar, 
        dispatch, 
        setShowModal 
      }),
  [showSnackBar, dispatch, setShowModal]);

  const { handleSubmit, values, setFieldValue } = useFormik({
    initialValues: initialValues,
    onSubmit: handleOnSubmit,
    validateOnBlur: false,
    validateOnChange: false,
    validationSchema,
    /*─── 🔎 reinicia si abro modal con otro producto 🔎 ───*/
    enableReinitialize: true,
  })

  if(!productSelected) {
    return null
  };

  const { name, image_url }: {name: string, image_url: string} = productSelected as ProductVariant;

  return (
    <Dialog 
      open={showModal} 
      onClose={() => setShowModal(false)}
      sx={(theme: Theme) => ({
        backgroundColor: theme?.custom?.backgroundDark, 
        width: '100%',
      })}
    >
      <DialogTitle
        sx={(theme: Theme) => ({
          backgroundColor: theme?.custom?.backgroundLigth, 
          color: theme?.custom?.fontColor,
          fontSize: theme?.typography?.h5?.fontSize,
          width: '100%',
          textAlign: 'center',
        })}
      >
        Agregar al carrito
      </DialogTitle>
      <Box
        component={'form'}
        onSubmit={handleSubmit}
      >
        <DialogContent
          sx={(theme: Theme) => ({
            backgroundColor: theme?.custom?.backgroundLigth, 
            color: theme?.custom?.fontColor,
            width: '100%',
            padding: { xs: '0.1em', sm: '2em', }
          })}
        >
          <ProductDialogIlustration name={name} image_url={image_url}/>
          <ProductDialogData 
            products={productVariants} 
            values={values}
            setFieldValue={setFieldValue}
          />
        </DialogContent>
        <DialogActions
          sx={(theme: Theme) => ({
            backgroundColor: theme?.custom?.backgroundLigth, 
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
          })}
        >
          <Button 
            onClick={() => setShowModal(false)}
            aria-label="Cerrar"
            sx={(theme: Theme) => ({
              color: theme?.custom?.whiteTranslucid,
            })}
          >
            Cerrar
          </Button>
          <Button 
            type="submit"
            aria-label="Agregar"
            sx={(theme: Theme) => ({
              color: theme?.custom?.fontColor,
            })}
          >
            Agregar
          </Button>
        </DialogActions>
      </Box>
    </Dialog>
  );
};

export default ProductDialog;
