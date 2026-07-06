

import { Box, Button, Dialog, DialogActions, DialogContent, type Theme } from "@mui/material";
import type { DialogDataInterface } from "@typings/sells/types";
import { useFormik } from "formik";
import { useCallback, useContext, useMemo } from "react";
import { useDispatch } from "react-redux";
import { SnackBarContext } from "../../../shared/components/SnackBar/SnackBarContext";
import { ProductDialogContext } from "../../context/Product/ProductDialogContext";
import getInitialProductDialogValues from "../../helpers/ProductDialog/Getters/getInitialProductDialogValues";
import ProductDialogValidationSchema from "../../helpers/ProductDialog/Getters/getProductDialogValidationSchema";
import onSubmit from "../../helpers/ProductDialog/Handlers/handleProductDialogSubmit";
import ProductDialogData from "./ProductDialogDataComponent";
import usePresentations from "../../../../hooks/sells/usePresentations";
import type { AppDispatch } from "../../../../store/presentation/presentationSlice";
import { getNoisyBackgroundSx } from "../../../../modules/shared/components/NoisyBackground/NoisyBackground";

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
        dispatch
      }),
  [showSnackBar, dispatch]);

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

  return (
    <Dialog 
      open={showModal} 
      onClose={() => setShowModal(false)}
      fullWidth
      maxWidth="md"
      sx={(theme: Theme) => ({
        width: '100%',
      })}
    >
      <Box
        component={'form'}
        onSubmit={handleSubmit}
      >
        <DialogContent
          sx={(theme: Theme) => ({
            color: theme?.custom?.fontColor,
            width: '100%',
            padding: { xs: '0.1em', sm: '2em', },
            ...getNoisyBackgroundSx(theme)
          })}
        >
          <ProductDialogData 
            name={productSelected.name}
            products={presentations} 
            values={values}
            setFieldValue={setFieldValue}
          />
        </DialogContent>
        <DialogActions
          sx={(theme: Theme) => ({
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'flex-start',
            ...getNoisyBackgroundSx(theme)
          })}
        >
          <Button 
            onClick={() => setShowModal(false)}
            aria-label="Cerrar"
            sx={(theme: Theme) => ({
              color: theme?.custom?.fontColor,
              fontSize: theme?.typography?.body2?.fontSize,
            })}
          >
            Cerrar
          </Button>
        </DialogActions>
      </Box>
    </Dialog>
  );
};

export default ProductDialog;
