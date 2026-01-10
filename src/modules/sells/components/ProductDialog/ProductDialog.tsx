//─────────────────── Componente 🧩: ProductDialog  ───────────────────//

//─────────────────── Descripción 📝 ───────────────────//
// Diálogo modal para agregar productos al carrito.  

//──────────────────── Funciones 🔧 ─────────────────────//
// - `ProductDialog`: componente principal que:  
// - - Usa `ProductDialogContext` para controlar visibilidad del dialog.  
// -  - Despacha `getProductVariantsById` para obtener variantes desde Redux.  
// -  - Configura Formik para manejar el formulario.  
// -  - Renderiza ilustración (`ProductDialogIlustration`) y datos (`ProductDialogData`).  
// -  - Contiene botones de acción: **Cerrar** y **Agregar**.  
// - -showSnackBar: Permite mostrar un snackbar con informacion para dar feedback

//─────────────────── Notas técnicas 💽  ───────────────────//
// Utiliza contexto para mostrar condicionalmente el modal
// Utiliza Redux para actualizar el estado del slice de productos, variante de productos y vendedor
// Utiliza Formik para el manejo del formulario

//─────────────────── 📝 To do: considerar si eligo agregar del mismo producto, OTRO sub producto ───────────────────//
//-----------------------------------------------------------------------------//

import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, type Theme } from "@mui/material";
import type { DialogDataInterface } from "@typings/sells/types";
import { useFormik } from "formik";
import { useCallback, useContext, useEffect, useMemo } from "react";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import * as Yup from 'yup';
import type { AppDispatch, RootState as ProductVariantState } from "../../../../store/productVariant/productVariantSlice";
import { getProductVariantsById } from "../../../../store/productVariant/productVariantThunks";
import type { RootState as SellerRootState } from "../../../../store/seller/sellerSlice";
import type { ProductVariant } from "../../../../typings/productVariant/productVariant";
import { SnackBarContext } from "../../../shared/components/SnackBar/SnackBarContext";
import { ProductDialogContext } from "../../context/Product/ProductDialogContext";
import ProductDialogData from "./ProductDialogDataComponent";
import ProductDialogIlustration from "./ProductDialogIlustrationComponent";
import onSubmit from "../../helpers/ProductDialog/ProductDialogSubmit";

const ProductDialog = (): React.ReactNode => {
  const { showModal, setShowModal } = useContext(ProductDialogContext)!;
  const { showSnackBar } = useContext(SnackBarContext)!;

  const dispatch = useDispatch<AppDispatch>();

  {/*─────────────────── 🔎 shallowEqual para que solo se cargue si el valor es diferente 🔎 ───────────────────*/}
  {/*─────────────────── 🔎 compara arrays 🔎 ───────────────────*/}
  const productVariants = useSelector((state: ProductVariantState) => state.productVariant.productVariants, shallowEqual);

  const productSelected = useSelector((state: SellerRootState) => state.seller.productSelected);

  useEffect(() => {
      const getProductVariants = async(): Promise<void> => {
        const _idResult: string | null | undefined = productSelected?._id;

        if(!_idResult) return;

        await dispatch(getProductVariantsById(_idResult));
      }

      getProductVariants();
  }, [dispatch, productSelected]);

  const initialValues: DialogDataInterface = useMemo(() => {
    const product: ProductVariant | null = productVariants?.length > 0 ? productVariants[0] : null;
    const productId: string = product?._id ?? '';

    return {
        productVariantId: productId,
        productVariant: product,
        requiredStock: product && product?.stock > 0 ? 1 : 0, 
        totalPrice: 0,
    };
  }, [productVariants]);

  const validationSchema = useMemo(() =>
  Yup.lazy(() =>
    Yup.object().shape({
      productVariantId: Yup.string().required("Campo requerido"), 
      productVariant: Yup.object().shape({
        _id: Yup.string().nullable().required("Campo requerido"),
        name: Yup.string().required("Campo requerido"),
        description: Yup.string().required("Campo requerido"),
        created_at: Yup.string().required("Campo requerido"),
        updated_at: Yup.string().required("Campo requerido"),
        image_url: Yup.string().required("Campo requerido"),
        gallery_urls: Yup.array().of(Yup.string().url("Debe ser una URL válida")).required("Campo requerido"),
        brand: Yup.string().required("Campo requerido"),
        product_id: Yup.string().required("Campo requerido"),
        sku: Yup.string().required("Campo requerido"),
        model_type: Yup.string().required("Campo requerido"),
        model_size: Yup.string().required("Campo requerido"),
        min_stock: Yup.number().min(0, "Debe ser mayor o igual a 0").required("Campo requerido"),
        stock: Yup.number().min(0, "Debe ser mayor o igual a 0").required("Campo requerido"),
        price: Yup.number().min(0, "Debe ser mayor o igual a 0").required("Campo requerido"),
        expiration_date: Yup.string().required("Campo requerido"),
      }).required("Campo requerido"), 
      requiredStock: Yup.number().moreThan(0).required("Campo requerido"),
      totalPrice: Yup.number().required("Campo requerido"),
    })
  ), []);

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
    /*─────────────────── 🔎 reinicia si abro modal con otro producto 🔎 ───────────────────*/
    enableReinitialize: true,
  })

  if(!productSelected) return null;

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
