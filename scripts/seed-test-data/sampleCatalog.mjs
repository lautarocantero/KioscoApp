// Catálogo de prueba: 5 productos "de kiosco" con presentaciones variadas —
// unidad y peso, distintas categorías, y un ítem con stock bajo — para poder
// probar /new-sell (búsqueda, filtros por categoría, badge de stock bajo,
// venta por peso) con datos que se parecen a los reales.

export const buildSampleCatalog = (namePrefix) => [
  {
    name: `${namePrefix} Coca-Cola`,
    description: "Gaseosa cola",
    brand: "Coca-Cola",
    presentations: [
      { name: "Lata 354 ml", sku: "SEED-COC-354", model_type: "can", model_size: 354, model_unit: "ml", sale_type: "unit", price: 1350, stock: 48, min_stock: 10, category: ["non_alcoholic_beverages"] },
      { name: "Botella 500 ml", sku: "SEED-COC-500", model_type: "bottle", model_size: 500, model_unit: "ml", sale_type: "unit", price: 1700, stock: 31, min_stock: 10, category: ["non_alcoholic_beverages"] },
      { name: "Botella 1,5 L", sku: "SEED-COC-1500", model_type: "bottle", model_size: 1500, model_unit: "ml", sale_type: "unit", price: 3200, stock: 4, min_stock: 10, category: ["non_alcoholic_beverages"] },
    ],
  },
  {
    name: `${namePrefix} Cerveza Quilmes`,
    description: "Cerveza rubia",
    brand: "Quilmes",
    presentations: [
      { name: "Lata 473 ml", sku: "SEED-QUI-473", model_type: "can", model_size: 473, model_unit: "ml", sale_type: "unit", price: 1900, stock: 60, min_stock: 12, category: ["alcoholic_beverages"] },
      { name: "Porrón 340 ml", sku: "SEED-QUI-340", model_type: "bottle", model_size: 340, model_unit: "ml", sale_type: "unit", price: 1650, stock: 22, min_stock: 12, category: ["alcoholic_beverages"] },
    ],
  },
  {
    name: `${namePrefix} Yerba Playadito`,
    description: "Yerba mate",
    brand: "Playadito",
    presentations: [
      { name: "500 g", sku: "SEED-YER-500", model_type: "bag", model_size: 500, model_unit: "g", sale_type: "unit", price: 3100, stock: 20, min_stock: 5, category: ["grocery"] },
      { name: "1 kg", sku: "SEED-YER-1000", model_type: "bag", model_size: 1, model_unit: "kg", sale_type: "unit", price: 5600, stock: 14, min_stock: 5, category: ["grocery"] },
    ],
  },
  {
    name: `${namePrefix} Alfajor Jorgito`,
    description: "Alfajor de chocolate",
    brand: "Jorgito",
    presentations: [
      { name: "Simple chocolate", sku: "SEED-ALF-SIMP", model_type: "sachet", model_size: 1, model_unit: "units", sale_type: "unit", price: 750, stock: 90, min_stock: 15, category: ["cookies_and_pastries"] },
      { name: "Triple dulce de leche", sku: "SEED-ALF-TRIP", model_type: "sachet", model_size: 1, model_unit: "units", sale_type: "unit", price: 1250, stock: 34, min_stock: 15, category: ["cookies_and_pastries"] },
    ],
  },
  {
    name: `${namePrefix} Queso Cremoso La Paulina`,
    description: "Queso cremoso fraccionado, venta por peso",
    brand: "La Paulina",
    presentations: [
      { name: "Por peso (100 g)", sku: "SEED-QUE-PESO", model_type: "other", model_size: 3000, model_unit: "g", sale_type: "weight", price: 1180, stock: 3000, min_stock: 500, category: ["deli_and_cheese"] },
    ],
  },
];

export default buildSampleCatalog;
