import type { FormatProductTicketInterface, ProductTicketWithStockType } from "@typings/sells/sellTypes";

const formatProductTicket = ({ Presentation, requiredStock }: FormatProductTicketInterface): ProductTicketWithStockType | undefined => {

    if (!Presentation) {
      throw new Error('No se ha encontrado el producto');
    }

    const {
      _id,
      brand,
      description,
      expiration_date,
      image_url,
      model_size,
      model_type,
      name,
      price,
      product_id,
      sale_type,
      sku,
      stock,
    } = Presentation;

    // stock_required siempre en unidades REALES (gramos reales si es weight,
    // unidades reales si no). Ninguna conversión acá.
    return {
      _id,
      brand,
      description,
      expiration_date,
      image_url,
      model_size,
      model_type: model_type ?? "",
      name,
      price,
      product_id,
      sale_type,
      sku,
      stock,
      stock_required: requiredStock,
    };
  }

export default formatProductTicket;