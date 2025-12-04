import { useContext, useEffect } from "react";
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Typography, type Theme } from "@mui/material";
import { DialogContext } from "../../../sells/pages/context/DialogContext";
import ProductDialogIlustration from "./ProductDialogIlustration";
import ProductDialogData from "./ProductDialogData";
import type { Product } from "../../../../typings/product/productTypes";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../../../../store/productVariant/productVariantSlice";
import { getProductVariantsById } from "../../../../store/productVariant/productVariantThunks";

const ProductDialog = (): React.ReactNode => {
  const { showModal, setShowModal, productData } = useContext(DialogContext)!;
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
        })}
      >
        Agregar producto
      </DialogTitle>
      <DialogContent
        sx={(theme: Theme) => ({
          backgroundColor: theme?.custom?.backgroundLigth, 
          color: theme?.custom?.fontColor,
          width: '100%',
          padding: { xs: '0.1em', sm: '2em', }
        })}
      >
        <ProductDialogIlustration name={name}/>
        <ProductDialogData products={productVariants} />
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
          onClick={() => setShowModal(false)}
          sx={(theme: Theme) => ({
            color: theme?.custom?.fontColor,
          })}
        >
          Agregar
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ProductDialog;
