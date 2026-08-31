#!/usr/bin/env node
// Crea una cuenta, un kiosco y un catálogo de prueba llamando directamente a
// la API del backend (los mismos endpoints que usa la app) — para tener algo
// real con qué probar /new-sell (o cualquier otra pantalla) sin tocar datos
// existentes de dev ni de producción.
//
// Uso:
//   node scripts/seed-test-data/index.mjs --env=dev
//   node scripts/seed-test-data/index.mjs --env=prod --yes-production
//   node scripts/seed-test-data/index.mjs --api-url=https://mi-backend.dev
//
// Nunca corre contra un host que no sea localhost sin --yes-production
// explícito — así un "para probar rápido" no termina pegándole a prod
// sin querer.

import { ApiClient } from "./apiClient.mjs";
import { buildSampleCatalog } from "./sampleCatalog.mjs";

const ENV_API_URLS = {
  dev: "http://localhost:3000",
  prod: "https://kioscoappbackend.onrender.com",
};

const parseArgs = (argv) => {
  const args = { env: null, apiUrl: null, yesProduction: false, email: null, password: null, name: null, kioscoName: null, prefix: "[TEST]", help: false };

  for (const raw of argv) {
    if (raw === "--help" || raw === "-h") args.help = true;
    else if (raw === "--yes-production") args.yesProduction = true;
    else if (raw.startsWith("--env=")) args.env = raw.slice("--env=".length);
    else if (raw.startsWith("--api-url=")) args.apiUrl = raw.slice("--api-url=".length);
    else if (raw.startsWith("--email=")) args.email = raw.slice("--email=".length);
    else if (raw.startsWith("--password=")) args.password = raw.slice("--password=".length);
    else if (raw.startsWith("--name=")) args.name = raw.slice("--name=".length);
    else if (raw.startsWith("--kiosco-name=")) args.kioscoName = raw.slice("--kiosco-name=".length);
    else if (raw.startsWith("--prefix=")) args.prefix = raw.slice("--prefix=".length);
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

const seed = async (args) => {
  const apiUrl = resolveApiUrl(args);

  if (!isLocalHost(apiUrl) && !args.yesProduction) {
    throw new Error(
      `"${apiUrl}" no es localhost. Si es realmente lo que querés (ej. producción), ` +
      `volvé a correr el comando agregando --yes-production.`
    );
  }

  console.log(`\n→ Backend: ${apiUrl}${isLocalHost(apiUrl) ? "" : "  ⚠️  NO ES LOCALHOST"}\n`);

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

  console.log("4/4 Cargando catálogo de prueba...");
  const catalog = buildSampleCatalog(args.prefix);
  const createdProducts = [];

  for (const product of catalog) {
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

    createdProducts.push({ id: productId, name: product.name, presentations: createdPresentations });
    console.log(`   ✓ ${product.name} (${createdPresentations.length} presentaciones)`);
  }

  console.log(`
✅ Listo. Datos de prueba creados en ${apiUrl}:

  Email:    ${email}
  Password: ${password}
  Kiosco:   ${kioscoName} (${kiosco._id})
  Productos: ${createdProducts.length}

Iniciá sesión con ese email/password en la app apuntando a este mismo backend.
`);
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
