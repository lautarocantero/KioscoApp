
//─────────────────── Componente 🧩: ProductDialog ───────────────────//

//─────────────────── Descripción 📝 ───────────────────//
// Diálogo modal para agregar productos al carrito.  

//──────────────────── Funciones 🔧 ─────────────────────//
//   - Usa `ProductDialogContext` para controlar visibilidad del diálogo.  
//   - Usa `SnackBarContext` para mostrar feedback al usuario.  
//   - Consume el hook `usePresentations` para obtener variantes y producto seleccionado desde Redux.  
//   - Configura Formik con:  
//     - `initialValues` generados por `getInitialProductDialogValues`.  
//     - `validationSchema` definido en `ProductDialogValidationSchema`.  
//     - `onSubmit` encapsulado en helper `ProductDialogSubmit`.  
//   - Renderiza ilustración (`ProductDialogIllustration`) y datos (`ProductDialogData`).  
//   - Contiene botones de acción: **Cerrar** y **Agregar**.  

//─────────────────── Notas técnicas 💽 ───────────────────//
// - Contexto: controla apertura/cierre del modal.  
// - Redux: obtiene variantes y producto seleccionado.  
// - Formik: maneja estado del formulario y validación con Yup.  
// - `enableReinitialize`: asegura que el formulario se reinicie al cambiar de producto.  
// - `useMemo` y `useCallback`: optimizan cálculos y evitan recreaciones innecesarias.  

//-----------------------------------------------------------------------------//

import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, type Theme } from "@mui/material";
import type { DialogDataInterface } from "@typings/sells/types";
import { useFormik } from "formik";
import { useCallback, useContext, useMemo } from "react";
import { useDispatch } from "react-redux";
import type { Presentation } from "../../../../typings/presentation/presentationTypes";
import { SnackBarContext } from "../../../shared/components/SnackBar/SnackBarContext";
import { ProductDialogContext } from "../../context/Product/ProductDialogContext";
import getInitialProductDialogValues from "../../helpers/ProductDialog/Getters/getInitialProductDialogValues";
import ProductDialogValidationSchema from "../../helpers/ProductDialog/Getters/getProductDialogValidationSchema";
import onSubmit from "../../helpers/ProductDialog/Handlers/handleProductDialogSubmit";
import ProductDialogData from "./ProductDialogDataComponent";
import ProductDialogIlustration from "./ProductDialogIlustrationComponent";
import usePresentations from "../../../../hooks/sells/usePresentations";
import type { AppDispatch } from "../../../../store/presentation/presentationSlice";

const ProductDialog = (): React.ReactNode => {
  const { showModal, setShowModal } = useContext(ProductDialogContext)!;
  const { showSnackBar } = useContext(SnackBarContext)!;

  const dispatch = useDispatch<AppDispatch>();

  const {productSelected, presentations} = usePresentations();

  const initialValues: DialogDataInterface = useMemo(() => 
    getInitialProductDialogValues(presentations)
  , [presentations]);

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

  const { name, image_url }: {name: string, image_url: string} = productSelected as Presentation;
  const nameEdited: string = name.length > 25 ? `${name.slice(0, 25)}...` : name;

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
        {`Agregar ${nameEdited} al carrito`}
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
            products={presentations} 
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
              fontSize: theme?.typography?.body2?.fontSize,
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
