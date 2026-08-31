// Crea productos + presentaciones contra un ApiClient ya autenticado y con
// x-kiosco-id seteado. Compartido por index.mjs y fullDemo.mjs — único lugar
// que arma el FormData de /presentation/create-presentation.

const createPresentationForm = ({ presentation, productId, timestamp }) => {
  const form = new FormData();
  const fields = {
    name: presentation.name,
    description: presentation.description ?? "",
    brand: presentation.brand ?? "",
    image_url: presentation.image_url ?? "",
    product_id: productId,
    sku: presentation.sku,
    barcode: presentation.barcode ?? "",
    model_type: presentation.model_type,
    model_size: presentation.model_size,
    model_unit: presentation.model_unit,
    is_perishable: presentation.is_perishable ?? false,
    sale_type: presentation.sale_type,
    min_stock: presentation.min_stock,
    stock: presentation.stock,
    price: presentation.price,
    expiration_date: presentation.expiration_date ?? "",
    created_at: timestamp,
    updated_at: timestamp,
  };

  for (const [key, value] of Object.entries(fields)) {
    form.append(key, String(value));
  }
  for (const category of presentation.category ?? []) {
    form.append("category", category);
  }

  return form;
};

const createProductWithPresentations = async (client, product, timestamp) => {
  const { _id: productId } = await client.postJson("/product/create-product", {
    name: product.name,
    description: product.description,
    brand: product.brand,
    image_url: "",
    created_at: timestamp,
    updated_at: timestamp,
    presentations: [],
  });

  const createdPresentations = [];
  for (const presentation of product.presentations) {
    const form = createPresentationForm({ presentation, productId, timestamp });
    const { _id: presentationId } = await client.postForm("/presentation/create-presentation", form);
    createdPresentations.push({
      id: presentationId,
      productId,
      name: presentation.name,
      sku: presentation.sku,
      description: presentation.description ?? "",
      brand: presentation.brand ?? "",
      model_type: presentation.model_type,
      model_size: presentation.model_size,
      price: presentation.price,
      sale_type: presentation.sale_type,
    });
  }

  return { id: productId, name: product.name, presentations: createdPresentations };
};

// Pool de concurrencia mínimo: corre `worker` sobre `items` con a lo sumo
// `concurrency` en simultáneo, sin abortar el resto si un item falla.
const runPool = async (items, concurrency, worker) => {
  const results = [];
  let cursor = 0;

  const runners = Array.from({ length: Math.min(concurrency, items.length) }, async () => {
    while (cursor < items.length) {
      const index = cursor;
      cursor += 1;
      try {
        const value = await worker(items[index], index);
        results[index] = { ok: true, value };
      } catch (error) {
        results[index] = { ok: false, error, item: items[index] };
      }
    }
  });

  await Promise.all(runners);
  return results;
};

// Crea todos los `products` (shape sampleCatalog/fileCatalog) contra `client`
// y devuelve { succeeded, failed, presentations } — `presentations` es la
// lista plana de todas las presentaciones creadas con sus datos completos
// (para poder armar ventas artificiales después).
export const seedCatalog = async (client, products, { concurrency = 5, onProgress } = {}) => {
  const timestamp = new Date().toISOString();
  let done = 0;

  const results = await runPool(products, concurrency, async (product) => {
    const created = await createProductWithPresentations(client, product, timestamp);
    done += 1;
    onProgress?.(done, products.length);
    return created;
  });

  const succeeded = results.filter((r) => r.ok).map((r) => r.value);
  const failed = results.filter((r) => !r.ok);
  const presentations = succeeded.flatMap((p) => p.presentations);

  return { succeeded, failed, presentations };
};

export default seedCatalog;
