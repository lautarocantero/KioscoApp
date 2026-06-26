
//────────── Helper 🦸: formatProductTicket ──────────//

// Descripción 📝
// Convierte una variante de producto (`Presentation`) en un objeto
// `ProductTicketType` listo para despachar tickets al carrito.

// Lógica 🔧
// - Recibe `Presentation` y `requiredStock`.
// - Extrae los campos principales de la variante.
// - Devuelve un `ProductTicketType` con esos datos más `stock_required`.

// Notas técnicas 💽
// - Se usa en `ProductDialogSubmit`.

//-----------------------------------------------------------------------------//

import type { ProductTicketType } from "@typings/seller/sellerTypes";
import type { FormatProductTicketInterface } from "@typings/sells/types";

  const formatProductTicket = ({Presentation, requiredStock } : FormatProductTicketInterface): ProductTicketType | undefined => {
    
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
      stock_required: requiredStock,
    }
  }

export default formatProductTicket;