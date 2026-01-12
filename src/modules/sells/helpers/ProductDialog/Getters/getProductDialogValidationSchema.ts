
//── Helper 🦸: ProductDialogValidationSchema ──//

// Descripción 📝
// Esquema de validación Yup para el formulario de ProductDialog.

// Lógica 🔧
// - Valida que `productVariantId` sea obligatorio.
// - Valida que `productVariant` contenga todos los campos requeridos (id, nombre, descripción, stock, precio, etc.).
// - Exige que `requiredStock` sea mayor a 0.
// - Exige que `totalPrice` esté definido.

// Notas técnicas 💽
// - Implementado con Yup.
// - Usado en el componente `ProductDialog` dentro de Formik para validar entradas del usuario.

//-----------------------------------------------------------------------------//

import * as Yup from "yup";

const ProductDialogValidationSchema = Yup.object().shape({
    productVariantId: Yup.string().required("Campo requerido"),
    productVariant: Yup.object().shape({
      _id: Yup.string().nullable().required("Campo requerido"),
      brand: Yup.string().required("Campo requerido"),
      created_at: Yup.string().required("Campo requerido"),
      description: Yup.string().required("Campo requerido"),
      expiration_date: Yup.string().required("Campo requerido"),
      gallery_urls: Yup.array().of(Yup.string().url("Debe ser una URL válida")).required("Campo requerido"),
      image_url: Yup.string().required("Campo requerido"),
      min_stock: Yup.number().min(0).required("Campo requerido"),
      model_size: Yup.string().required("Campo requerido"),
      model_type: Yup.string().required("Campo requerido"),
      name: Yup.string().required("Campo requerido"),
      price: Yup.number().min(0).required("Campo requerido"),
      product_id: Yup.string().required("Campo requerido"),
      sku: Yup.string().required("Campo requerido"),
      stock: Yup.number().min(0).required("Campo requerido"),
      updated_at: Yup.string().required("Campo requerido"),
    }).required("Campo requerido"),
    requiredStock: Yup.number().moreThan(0).required("Campo requerido"),
    totalPrice: Yup.number().required("Campo requerido"),
  });

  export default ProductDialogValidationSchema;
