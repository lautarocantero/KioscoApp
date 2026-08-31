import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { cartFormSchema, getCartFormInitialValues } from "../../modules/cart/schema/CartFormSchema";
import type { UseCartFormikResult } from "@typings/cart/cartTypes";

/*══════════════════════════════════════════════════════════════════════╗
║ 🪝 useCartFormik                                                      ║
║ Arma initialValues/validationSchema del Formik de checkout del        ║
║ carrito — afuera de CartComponent para que el .tsx quede libre de     ║
║ useMemo/lógica (solo recibe props ya resueltas).                      ║
╚══════════════════════════════════════════════════════════════════════╝*/
export const useCartFormik = (total: number): UseCartFormikResult => {
    const { t } = useTranslation();

    const initialValues = useMemo(() => getCartFormInitialValues(), []);
    const validationSchema = useMemo(() => cartFormSchema(total, t), [total, t]);

    return { initialValues, validationSchema };
};

export default useCartFormik;
