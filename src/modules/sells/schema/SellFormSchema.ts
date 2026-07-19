import type { SellEditFormValues, SellTicketType } from "@typings/sells/sellTypes";
import * as Yup from "yup";

export const getSellEditInitialValues = (sell?: SellTicketType | null): SellEditFormValues => ({
    _id: sell?._id ?? "",
    purchase_date: sell?.purchase_date ?? "",
    modification_date: sell?.modification_date ?? null,
    seller_id: sell?.seller_id ?? "",
    seller_name: sell?.seller_name ?? "",
    payment_method: sell?.payment_method ?? ("" as SellEditFormValues["payment_method"]),
    products: sell?.products ?? [],
    sub_total: sell?.sub_total ?? 0,
    iva: sell?.iva ?? 0,
    total_amount: sell?.total_amount ?? 0,
    currency: sell?.currency ?? "",
});

export const sellEditFormSchema = Yup.object({
    purchase_date:  Yup.string().required("La fecha de compra es obligatoria"),
    seller_name:    Yup.string().required("El nombre del vendedor es obligatorio"),
    payment_method: Yup.string().required("El método de pago es obligatorio"),
    sub_total:      Yup.number().required("El subtotal es obligatorio").min(0),
    iva:            Yup.number().required("El IVA es obligatorio").min(0),
    total_amount:   Yup.number().required("El total es obligatorio").min(0),
    currency:       Yup.string().required("La moneda es obligatoria"),
});