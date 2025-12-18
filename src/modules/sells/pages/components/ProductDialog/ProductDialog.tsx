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

//─────────────────── Notas técnicas 💽  ───────────────────//
// Utiliza contexto para mostrar condicionalmente el modal
// Utiliza Redux para actualizar el estado del slice de productos, variante de productos y vendedor
// Utiliza Formik para el manejo del formulario

//─────────────────── 📝 To do: considerar si eligo agregar del mismo producto, OTRO sub producto ───────────────────//
//─────────────────── 📝 To do: Agregar Snackbars ───────────────────//
//-----------------------------------------------------------------------------//

import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, type Theme } from "@mui/material";
import { useFormik } from "formik";
import { useContext, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as Yup from 'yup';
import type { AppDispatch, RootState as ProductVariantState } from "../../../../../store/productVariant/productVariantSlice";
import { getProductVariantsById } from "../../../../../store/productVariant/productVariantThunks";
import type { RootState as SellerRootState } from "../../../../../store/seller/sellerSlice";
import { addToCartThunk } from "../../../../../store/seller/sellerThunks";
import type { ProductVariant } from "../../../../../typings/productVariant/productVariant";
import type { ProductTicketType } from "../../../../../typings/seller/sellerTypes";
import type { DialogDataInterface } from "../../../../../typings/sells/sellsComponentTypes";
import { ProductDialogContext } from "../../context/ProductDialogContext";
import ProductDialogData from "./ProductDialogDataComponent";
import ProductDialogIlustration from "./ProductDialogIlustrationComponent";

  const getInitialValues = (productVariants: ProductVariant[]): DialogDataInterface => {
    const product: ProductVariant | null = productVariants?.length > 0 ? productVariants[0] : null;
    const productId: string = product?._id ?? ''

    return {
        productVariantId: productId,
        productVariant: product,
        requiredStock: 0, 
        totalPrice: 0,
    };
  };

  const getValidationSchema = () =>
    Yup.lazy(() =>
      Yup.object().shape({
        productVariantId: Yup.string().required("Campo requerido"), 
        productVariant: Yup.object().shape({
          _id: Yup.string().nullable().required("Campo requerido"),
          name: Yup.string().required("Campo requerido"),
          description: Yup.string().required("Campo requerido"),
          created_at: Yup.string().required("Campo requerido"),
          updated_at: Yup.string().required("Campo requerido"),
          image_url: Yup.string().url("Debe ser una URL válida").required("Campo requerido"),
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
        requiredStock: Yup.number().required("Campo requerido"),
        totalPrice: Yup.number().required("Campo requerido"),
      })
  );

const ProductDialog = (): React.ReactNode => {
  {/*─────────────────── 🔎 non‑null assertion operator 🔎 ───────────────────*/}
  {/*─────────────────── por si el contexto es undefined en algun momento ───────────────────*/}
  const { showModal, setShowModal } = useContext(ProductDialogContext)!;

  const dispatch = useDispatch<AppDispatch>();

  const { productVariant } = useSelector((state: ProductVariantState) => state);
  const { productVariants }: {productVariants: ProductVariant[]} = productVariant;

  const { seller } = useSelector((state: SellerRootState ) => state);
  const { productSelected }: {productSelected: ProductVariant | null} = seller;

  useEffect(() => {
      const getProductVariants = async(): Promise<void> => {
        const _idResult: string | null | undefined = productSelected?._id;

        if(!_idResult) return;
        if(_idResult === undefined) return;

        await dispatch(getProductVariantsById(_idResult));
      }

      getProductVariants();
  }, [dispatch, productSelected])

  const onSubmit = async (data: DialogDataInterface): Promise<void> => {

    const { productVariant, requiredStock } : {productVariant: ProductVariant | null, requiredStock: number} = data;

    if(!productVariant) return;
    if(requiredStock === 0) return;

    const 
    { 
      _id, name, description,image_url,
      brand,product_id,sku,model_type,
      model_size,price,expiration_date 
    } = productVariant;

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
      stock_required: requiredStock,
    }
    
    dispatch(addToCartThunk({productData: productTicket}));   
    setShowModal(false)
  }  

  const { handleSubmit, values, setFieldValue } = useFormik({
    initialValues: getInitialValues(productVariants),
    onSubmit,
    validateOnBlur: false,
    validateOnChange: false,
    validationSchema: getValidationSchema(),
    /*─────────────────── 🔎 reinicia si abro modal con otro producto 🔎 ───────────────────*/
    enableReinitialize: true,
  })

  if(!productSelected) return null;

  const { name }: {name: string} = productSelected as ProductVariant;

  return (
    <Dialog 
      key={String(productSelected?._id)}
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
          <ProductDialogIlustration name={name}/>
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
            sx={(theme: Theme) => ({
              color: theme?.custom?.whiteTranslucid,
            })}
          >
            Cerrar
          </Button>
          <Button 
            type="submit"
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
