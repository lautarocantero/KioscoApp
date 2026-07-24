import { useCallback, useContext, useMemo } from "react";
import { useDispatch } from "react-redux";
import { useFormik } from "formik";
import type { DialogDataInterface, UseProductDialogReturn } from "@typings/sells/sellTypes";
import type { Presentation } from "@typings/presentation/presentationTypes";
import useCartPresentationPicker from "./useCartPresentationPicker";
import { ProductDialogContext } from "../../modules/sells/context/Product/ProductDialogContext";
import { SnackBarContext } from "../../modules/shared/components/SnackBar/SnackBarContext";
import type { AppDispatch } from "../../store/product/productSlice";
import getInitialProductDialogValues from "../../modules/sells/helpers/ProductDialog/Getters/getInitialProductDialogValues";
import ProductDialogValidationSchema from "../../modules/sells/helpers/ProductDialog/Getters/getProductDialogValidationSchema";
import onSubmit from "../../modules/sells/helpers/ProductDialog/Handlers/handleProductDialogSubmit";


const useProductDialog = (): UseProductDialogReturn => {
  const { showModal, setShowModal } = useContext(ProductDialogContext)!;
  const { showSnackBar } = useContext(SnackBarContext)!;

  const dispatch = useDispatch<AppDispatch>();

  const { productSelected, presentations } = useCartPresentationPicker();

  const initialValues: DialogDataInterface = useMemo(
    () => getInitialProductDialogValues(presentations),
    [presentations],
  );

  const validationSchema = useMemo(() => ProductDialogValidationSchema, []);

  const handleOnSubmit = useCallback(
    (formValues: DialogDataInterface) =>
      onSubmit({
        data: formValues,
        showSnackBar,
        dispatch,
      }),
    [showSnackBar, dispatch],
  );

  const { handleSubmit } = useFormik({
    initialValues,
    onSubmit: handleOnSubmit,
    validateOnBlur: false,
    validateOnChange: false,
    validationSchema,
    //─── 🔎 reinicia si abro modal con otro producto 🔎 ───
    enableReinitialize: true,
  });

  //─── 🔎 stock total de las presentaciones 🔎 ───
  const totalStock = useMemo(
    () => (presentations ?? []).reduce((acc: number, p: Presentation) => acc + (p?.stock ?? 0), 0),
    [presentations],
  );

  const formattedTotalStock = useMemo(
    () => new Intl.NumberFormat("es-AR").format(totalStock),
    [totalStock],
  );

  return {
    showModal,
    setShowModal,
    productSelected,
    presentations,
    handleSubmit,
    totalStock,
    formattedTotalStock,
  };
};

export default useProductDialog;