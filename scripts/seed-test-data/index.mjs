#!/usr/bin/env node
// Crea una cuenta, un kiosco y un catálogo de prueba llamando directamente a
// la API del backend (los mismos endpoints que usa la app) — para tener algo
// real con qué probar /new-sell (o cualquier otra pantalla) sin tocar datos
// existentes de dev ni de producción.
//
// Uso:
//   node scripts/seed-test-data/index.mjs --env=dev
//   node scripts/seed-test-data/index.mjs --env=prod --yes-production
//   node scripts/seed-test-data/index.mjs --env=prod --yes-production --catalog=file --limit=500
//   node scripts/seed-test-data/index.mjs --api-url=https://mi-backend.dev
//
// Nunca corre contra un host que no sea localhost sin --yes-production
// explícito — así un "para probar rápido" no termina pegándole a prod
// sin querer.

import { ApiClient } from "./apiClient.mjs";
import { buildSampleCatalog } from "./sampleCatalog.mjs";
import { loadFileCatalog } from "./fileCatalog.mjs";

const ENV_API_URLS = {
  dev: "http://localhost:3000",
  prod: "https://kioscoappbackend.onrender.com",
};

const DEFAULT_FILE_CATALOG_LIMIT = 200;
const DEFAULT_CONCURRENCY = 5;

const parseArgs = (argv) => {
  const args = {
    env: null,
    apiUrl: null,
    yesProduction: false,
    email: null,
    password: null,
    name: null,
    kioscoName: null,
    prefix: "[TEST]",
    catalog: "file",
    limit: null,
    all: false,
    concurrency: DEFAULT_CONCURRENCY,
    help: false,
  };

  for (const raw of argv) {
    if (raw === "--help" || raw === "-h") args.help = true;
    else if (raw === "--yes-production") args.yesProduction = true;
    else if (raw === "--all") args.all = true;
    else if (raw.startsWith("--env=")) args.env = raw.slice("--env=".length);
    else if (raw.startsWith("--api-url=")) args.apiUrl = raw.slice("--api-url=".length);
    else if (raw.startsWith("--email=")) args.email = raw.slice("--email=".length);
    else if (raw.startsWith("--password=")) args.password = raw.slice("--password=".length);
    else if (raw.startsWith("--name=")) args.name = raw.slice("--name=".length);
    else if (raw.startsWith("--kiosco-name=")) args.kioscoName = raw.slice("--kiosco-name=".length);
    else if (raw.startsWith("--prefix=")) args.prefix = raw.slice("--prefix=".length);
    else if (raw.startsWith("--catalog=")) args.catalog = raw.slice("--catalog=".length);
    else if (raw.startsWith("--limit=")) args.limit = Number(raw.slice("--limit=".length));
    else if (raw.startsWith("--concurrency=")) args.concurrency = Number(raw.slice("--concurrency=".length));
  }

  return args;
};

const printHelp = () => {
  console.log(`
Crea cuenta + kiosco + catálogo de prueba pegándole a la API real.

Opciones:
  --env=dev|prod         Backend a usar (dev=localhost:3000, prod=deploy real)
  --api-url=<url>        Backend custom (en vez de --env)
  --yes-production       Obligatorio si el host no es localhost
  --email=<string>       Email de la cuenta (default: generado, dominio example.com)
  --password=<string>    Password de la cuenta (default: generada)
  --name=<string>        Nombre del vendedor/dueño (default: "QA Tester")
  --kiosco-name=<string> Nombre del kiosco (default: "[TEST] Kiosco QA <ts>")
  --prefix=<string>      Prefijo para nombrar productos/kiosco (default: "[TEST]")
  --catalog=file|sample  "file" = catálogo real de data/productos-f.json (default),
                         "sample" = 5 productos de ejemplo, para un smoke test rápido
  --limit=N              Tope de productos a crear con --catalog=file (default: ${DEFAULT_FILE_CATALOG_LIMIT})
  --all                  Ignora --limit y crea TODO el catálogo (miles de requests)
  --concurrency=N        Creaciones en paralelo (default: ${DEFAULT_CONCURRENCY})
  --help                 Esta ayuda
`);
};

const randomToken = () => Math.random().toString(36).slice(2, 8);

const generatePassword = () => `Qa${randomToken()}${randomToken()}!9`;

const resolveApiUrl = (args) => {
  if (args.apiUrl) return args.apiUrl;
  if (args.env && ENV_API_URLS[args.env]) return ENV_API_URLS[args.env];
  throw new Error("Falta --env=dev|prod o --api-url=<url>. Corré con --help para ver las opciones.");
};

const isLocalHost = (url) => {
  const { hostname } = new URL(url);
  return hostname === "localhost" || hostname === "127.0.0.1";
};

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
    createdPresentations.push({ id: presentationId, name: presentation.name });
  }

  return { id: productId, name: product.name, presentations: createdPresentations };
};

const loadCatalog = (args) => {
  if (args.catalog === "sample") {
    return { total: null, products: buildSampleCatalog(args.prefix) };
  }
  if (args.catalog === "file") {
    const limit = args.all ? null : (args.limit ?? DEFAULT_FILE_CATALOG_LIMIT);
    const { total, selected } = loadFileCatalog({ namePrefix: args.prefix, limit, all: args.all });
    return { total, products: selected };
  }
  throw new Error(`--catalog debe ser "file" o "sample" (recibido: "${args.catalog}")`);
};

const seed = async (args) => {
  const apiUrl = resolveApiUrl(args);

  if (!isLocalHost(apiUrl) && !args.yesProduction) {
    throw new Error(
      `"${apiUrl}" no es localhost. Si es realmente lo que querés (ej. producción), ` +
      `volvé a correr el comando agregando --yes-production.`
    );
  }

  console.log(`\n→ Backend: ${apiUrl}${isLocalHost(apiUrl) ? "" : "  ⚠️  NO ES LOCALHOST"}\n`);

  const catalog = loadCatalog(args);
  if (catalog.total !== null) {
    console.log(`→ Catálogo: ${catalog.products.length} de ${catalog.total} productos disponibles${args.all ? " (--all)" : ""}\n`);
  }

  const timestamp = new Date().toISOString();
  const runId = randomToken();
  const email = args.email ?? `stocko.qa+${runId}@example.com`;
  const password = args.password ?? generatePassword();
  const name = args.name ?? "QA Tester";
  const kioscoName = args.kioscoName ?? `${args.prefix} Kiosco QA ${runId}`;

  const client = new ApiClient(apiUrl);

  console.log(`1/4 Creando cuenta ${email}...`);
  await client.postJson("/auth/register", {
    name,
    email,
    password,
    repeatPassword: password,
    profilePhoto: null,
  });

  console.log("2/4 Iniciando sesión...");
  await client.postJson("/auth/login", { email, password, rememberMe: true });

  console.log(`3/4 Creando kiosco "${kioscoName}"...`);
  const { kiosco } = await client.postJson("/kiosco/create", {
    name: kioscoName,
    address: "Dirección de prueba 123",
  });
  client.setActiveKiosco(kiosco._id);

  console.log(`4/4 Cargando catálogo (${catalog.products.length} productos, concurrencia ${args.concurrency})...`);

  let done = 0;
  const results = await runPool(catalog.products, args.concurrency, async (product) => {
    const created = await createProductWithPresentations(client, product, timestamp);
    done += 1;
    if (done % 25 === 0 || done === catalog.products.length) {
      console.log(`   ... ${done}/${catalog.products.length}`);
    }
    return created;
  });

  const succeeded = results.filter((r) => r.ok);
  const failed = results.filter((r) => !r.ok);
  const presentationCount = succeeded.reduce((sum, r) => sum + r.value.presentations.length, 0);

  console.log(`
✅ Listo. Datos de prueba creados en ${apiUrl}:

  Email:       ${email}
  Password:    ${password}
  Kiosco:      ${kioscoName} (${kiosco._id})
  Productos:   ${succeeded.length} ok${failed.length ? `, ${failed.length} fallaron` : ""}
  Presentaciones: ${presentationCount}

Iniciá sesión con ese email/password en la app apuntando a este mismo backend.
`);

  if (failed.length) {
    console.log("Productos que fallaron:");
    for (const f of failed.slice(0, 20)) {
      console.log(`  - ${f.item.name}: ${f.error.message}`);
    }
    if (failed.length > 20) console.log(`  ... y ${failed.length - 20} más`);
  }
};

const args = parseArgs(process.argv.slice(2));

if (args.help) {
  printHelp();
  process.exit(0);
}

seed(args).catch((error) => {
  console.error(`\n❌ ${error.message}\n`);
  process.exit(1);
});
