
//────────── Helper 🦸: formatProductTicket ──────────//

// Descripción 📝
// Convierte una variante de producto (`ProductVariant`) en un objeto
// `ProductTicketType` listo para usar en el flujo de ventas.

// Lógica 🔧
// - Recibe `productVariant` y `requiredStock`.
// - Extrae los campos principales de la variante.
// - Devuelve un `ProductTicketType` con esos datos más `stock_required`.

// Notas técnicas 💽
// - Tipado con `FormatProductTicketInterface`.
// - Se usa en `ProductDialogSubmit` para despachar tickets al carrito.

//-----------------------------------------------------------------------------//

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