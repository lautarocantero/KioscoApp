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
      sku,
      stock,
    } = Presentation;

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
      sku,
      stock,
      stock_required: requiredStock,
    }
  }

export default formatProductTicket;