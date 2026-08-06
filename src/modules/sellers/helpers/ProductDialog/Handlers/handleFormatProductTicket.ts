import { SALE_TYPE_LABELS } from "@typings/presentation/presentationLabels";
import type { FormatProductTicketInterface, ProductTicketWithStockType } from "@typings/sells/sellTypes";


const formatProductTicket = ({Presentation, requiredStock } : FormatProductTicketInterface): ProductTicketWithStockType | undefined => {
    
    if(!Presentation) {
      throw new Error('No se ha encontrado el producto');
      return;
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

    const stock_required = sale_type === SALE_TYPE_LABELS.weight
    ? requiredStock / 100
    : requiredStock;

    return {
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
      stock_required,
    };
  }

export default formatProductTicket;