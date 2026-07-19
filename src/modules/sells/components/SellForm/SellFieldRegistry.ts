// SellFieldRegistry.ts
import type { SellEditFormValues } from "@typings/sells/sellTypes";
import type { FieldConfig } from "@typings/shared/types/formCard.types";

export const SELL_FIELD_REGISTRY: Record<keyof SellEditFormValues, FieldConfig> = {
    _id: {
        label: "ID",
        tooltip: "Identificador único de la venta",
        required: false,
    },
    purchase_date: {
        label: "Fecha de compra",
        tooltip: "Fecha en la que se realizó la venta",
        required: true,
        placeholder: "dd/mm/aaaa",
    },
    modification_date: {
        label: "Fecha de edición",
        tooltip: "Última fecha en la que se editó la venta",
        required: false,
    },
    seller_id: {
        label: "ID de vendedor",
        tooltip: "Identificador del vendedor responsable",
        required: false,
    },
    seller_name: {
        label: "Vendedor",
        tooltip: "Nombre del vendedor responsable de la venta",
        required: true,
    },
    payment_method: {
        label: "Método de pago",
        tooltip: "Forma de pago utilizada en la venta",
        required: true,
    },
    products: {
        label: "Productos",
        tooltip: "Productos incluidos en la venta",
        required: false,
    },
    sub_total: {
        label: "Subtotal",
        tooltip: "Monto antes de impuestos",
        required: true,
        type: "number",
        step: `0.01`,
        min: `0`,
    },
    iva: {
        label: "IVA",
        tooltip: "Impuesto aplicado a la venta",
        required: true,
        type: "number",
        step: `0.01`,
        min: `0`,
    },
    total_amount: {
        label: "Total",
        tooltip: "Monto total de la venta",
        required: true,
        type: "number",
        step: `0.01`,
        min: `0`,
    },
    currency: {
        label: "Moneda",
        tooltip: "Moneda utilizada en la transacción",
        required: true,
    },
};