// Carga el catálogo real exportado en data/productos-f.json y lo normaliza
// al mismo shape que sampleCatalog.mjs (producto + [presentaciones]) — acá
// cada fila del archivo de origen es un producto con una única presentación,
// porque el POS de origen no agrupa variantes bajo un producto padre.

import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import path from "node:path";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const DATA_PATH = path.join(__dirname, "data", "productos-f.json");

const shuffle = (array) => {
  const copy = [...array];
  for (let i = copy.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
};

const toProductJob = (row, namePrefix) => ({
  name: namePrefix ? `${namePrefix} ${row.name}` : row.name,
  description: "",
  brand: "",
  presentations: [
    {
      name: "Presentación única",
      sku: row.sku,
      barcode: row.barcode,
      model_type: "other",
      model_size: 1,
      model_unit: "units",
      sale_type: "unit",
      price: row.price,
      stock: row.stock,
      min_stock: row.min_stock,
      category: [row.category],
    },
  ],
});

export const loadFileCatalog = ({ namePrefix, limit, all }) => {
  const raw = readFileSync(DATA_PATH, "utf-8");
  const rows = JSON.parse(raw);

  const selected = all || !limit ? rows : shuffle(rows).slice(0, limit);

  return { total: rows.length, selected: selected.map((row) => toProductJob(row, namePrefix)) };
};

export default loadFileCatalog;
