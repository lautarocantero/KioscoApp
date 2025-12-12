
// # Componente: ProductDialog  

// ## Descripción 📦
// Diálogo modal para agregar productos al carrito.  
// Utiliza contexto, Redux y Formik para manejar datos de producto y variantes.  

// ## Funciones 🔧
// - `getInitialValues`: genera valores iniciales para el formulario a partir de `productVariants`.  
// - `getValidationSchema`: esquema de validación con Yup para los campos del formulario.  
// - `ProductDialog`: componente principal que:  
//   - Usa `ProductDialogContext` para controlar visibilidad y datos del producto.  
//   - Despacha `getProductVariantsById` para obtener variantes desde Redux.  
//   - Configura Formik para manejar el formulario.  
//   - Renderiza ilustración (`ProductDialogIlustration`) y datos (`ProductDialogData`).  
//   - Contiene botones de acción: **Cerrar** y **Agregar**.  

// ## Notas técnicas 💽
// - `productData` se obtiene del contexto, pero se sugiere migrar a slices para mejorar rendimiento.  
// - `onSubmit` actualmente imprime datos y cierra el modal; en producción debería despachar `addToCartThunk`.  
// - El formulario se re-inicializa cuando cambian las variantes (`enableReinitialize: true`).  
// - Se aplican estilos dinámicos con `Theme` de MUI para personalización visual.  
//-----------------------------------------------------------------------------//

import { useContext, useEffect } from "react";
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Typography, type Theme, Box } from "@mui/material";
import ProductDialogIlustration from "./ProductDialogIlustration";
import type { Product } from "../../../../../typings/product/productTypes";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../../../../../store/productVariant/productVariantSlice";
import { getProductVariantsById } from "../../../../../store/productVariant/productVariantThunks";
import * as Yup from 'yup';
import { useFormik } from "formik";
import ProductDialogData from "./ProductDialogData";
import type { DialogDataInterface } from "../../../../../typings/sells/sellsComponentTypes";
import type { ProductVariant } from "../../../../../typings/productVariant/productVariant";
import { ProductDialogContext } from "../../context/ProductDialogContext";

  const getInitialValues = (productVariants: ProductVariant[]) => ({
    // cambiar por el producto entero
    product_id: productVariants?.length > 0  ? String(productVariants[0]?._id) : "",
    productAvailableStock: 0,
    productStock: 0,
    productPrice: 0,
  });


  const getValidationSchema = () =>
    Yup.lazy(() =>
      Yup.object().shape({
        // cambiar por el producto entero
        product_id: Yup.string().required("Campo requerido"),
        productAvailableStock: Yup.number().required("Campo requerido"),
        productStock: Yup.number().required("Campo requerido"),
        productPrice: Yup.number().required("Campo requerido"),
      })
  );

const ProductDialog = (): React.ReactNode => {
  const { showModal, setShowModal, productData } = useContext(ProductDialogContext)!;
  const dispatch = useDispatch<AppDispatch>();
  const { productVariant } = useSelector((state: RootState) => state);
  const { productVariants } = productVariant;

  useEffect(() => {
      const getProductVariants = async() => {
        const _idResult = productData?._id;

        if(!_idResult) return;
        await dispatch(getProductVariantsById(_idResult));
      }

      getProductVariants();
  }, [dispatch, productData])

  const onSubmit = async (data: DialogDataInterface) => {
    console.log('productData', productData); // productData trae un array d evariantes, es decir mucha informacion en una peticion
    // comprobar si es posible desacoplar esta prop para mejorar rendimiento.

    //eliminar el contexto del product data, usar slices para esto
    //selecciono producto, seteo variable productVariants de product, pero no todo el bojeto, solo ese. O algo ismilar
    //con esa informacion mostrear el dialog
    //ya no necesito un contexto especifico para esto.
    //no necesidad de states
    // al enviar el dialog, setear una prop variantSelected= productVariant
    // ir agregando variants selected a user.cart

    console.log('data', data);
    // product-ticket = interfaz
    //  _id: string | null; = crypto random
    //  name: string; = data.product_id = b2e4c5d6-7f89-4a01-9b23-2d3e4f5a6b78 >> deberia traer el productVariantData
    //  description: string;  >> deberia traer el productVariantData
    //  image_url: string; >> deberia traer el productVariantData
    //  brand: string; >> deberia traer el productVariantData
    //  sku: string; >> deberia traer el productVariantData
    //  model_type: string; >> deberia traer el productVariantData
    //  model_size: string; >> deberia traer el productVariantData
    //  price: number; data.productPrice
    //  stock: number data.productStock
    //  expiration_date: string; >> deberia traer el productVariantData
    // dispatch(addToCartThunk({productData: data}));   
    setShowModal(false)
  }  

  const { handleSubmit, values, setFieldValue } = useFormik({
    initialValues: getInitialValues(productVariants),
    onSubmit,
    validateOnBlur: false,
    validateOnChange: false,
    validationSchema: getValidationSchema(),
    enableReinitialize: true,
  })

  //aca esta el error, no hay productData
  if(!productData) return (<Typography>No product loaded</Typography>)

  const { name } = productData as Product;

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
