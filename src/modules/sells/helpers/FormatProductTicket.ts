import type { ProductTicketType } from "@typings/seller/sellerTypes";
import type { FormatProductTicketInterface } from "@typings/sells/types";

  const formatProductTicket = ({productVariant, requiredStock } : FormatProductTicketInterface): ProductTicketType | undefined => {
    const {
      _id, name, description,image_url,
      brand,product_id,sku,model_type,
      model_size,price,expiration_date
    } = productVariant;

    return {
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
  }

export default formatProductTicket;