import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, type Theme } from "@mui/material";
import { useContext, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch } from "../../../../../store/productVariant/productVariantSlice";
import { getProductVariantById } from "../../../../../store/productVariant/productVariantThunks";
import type { RootState as SellerRootState } from "../../../../../store/seller/sellerSlice";
import { addToCartThunk, selectProductThunk } from "../../../../../store/seller/sellerThunks";
import type { ProductVariant } from "../../../../../typings/productVariant/productVariant";
import { ProductVariantDialogContext } from "../../context/ProductVariant/ProductVariantDialogContext";
import ProductDialogIlustrationComponent from "../ProductDialog/ProductDialogIlustrationComponent";
import type { VariantDialogDataInterface } from "../../../../../typings/sells/sellsComponentTypes";
import * as Yup from 'yup';
import { useFormik } from "formik";
import ProductDialogDataComponent from "./ProductVariantDialogData";
import type { ProductTicketType } from "../../../../../typings/seller/sellerTypes";

const getInitialValues = (productSelected: ProductVariant | null): VariantDialogDataInterface => {

  const product: ProductVariant | null = productSelected

  return {
    productVariant: product,
    requiredStock: 0,
    totalPrice: 0,
  }
}

const getValidationSchema = () => 
  Yup.lazy(() => 
    Yup.object().shape({
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
    requiredStock: Yup.number().required("Campo requerido"),
    totalPrice: Yup.number().required("Campo requerido"),
    })
  )

const ProductVariantDialog = ({id}: { id: string}) : React.ReactNode => {
    const { showModal, setShowModal } = useContext(ProductVariantDialogContext)!;
    const { seller } = useSelector((state: SellerRootState ) => state);
    const { productSelected }: {productSelected: ProductVariant | null} = seller;

    const dispatch = useDispatch<AppDispatch>();

    useEffect(() => {
      if(id === '') return; 
      const getProductVariant = async (): Promise<void> => {
        const prod = await dispatch(getProductVariantById(id));
        if(!prod) throw new Error('No se ha seleccionado un producto');
        await dispatch(selectProductThunk({productData: prod[0] }));
      }
      getProductVariant();
    }, [id, dispatch])

    const onSubmit = async (data: VariantDialogDataInterface): Promise<void> => {
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

    const { handleSubmit, values, setFieldValue, errors } = useFormik({
      initialValues: getInitialValues(productSelected),
      onSubmit,
      validateOnBlur: false,
      validateOnChange: false,
      validationSchema: getValidationSchema(),
      /*─────────────────── 🔎 reinicia si abro modal con otro producto 🔎 ───────────────────*/
      enableReinitialize: true,
    })

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
            Agregar al carrito variante
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
              <ProductDialogIlustrationComponent name={productSelected?.name} image_url={productSelected?.image_url}/>
              <ProductDialogDataComponent 
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
    )
}

export default ProductVariantDialog;