#!/usr/bin/env node
// Crea una cuenta, un kiosco y un catálogo de prueba llamando directamente a
// la API del backend (los mismos endpoints que usa la app) — para tener algo
// real con qué probar /new-sell (o cualquier otra pantalla) sin tocar datos
// existentes de dev ni de producción.
//
// Para un demo más completo (plan, rol, varios kioscos/vendedores, ventas
// artificiales) ver fullDemo.mjs — este script es la versión liviana:
// 1 cuenta + 1 kiosco + catálogo.
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
import { seedCatalog } from "./seedCatalog.mjs";

// SEED_DEV_API_URL / SEED_PROD_API_URL permiten apuntar a otro puerto/host
// sin tocar el código (o pasar --api-url= directamente).
const ENV_API_URLS = {
  dev: process.env.SEED_DEV_API_URL ?? "http://localhost:3000",
  prod: process.env.SEED_PROD_API_URL ?? "https://kioscoappbackend.onrender.com",
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
Para plan/rol/varios kioscos y vendedores/ventas artificiales, ver:
  npm run seed:full-demo

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

  const email = args.email ?? `stocko.qa+${randomToken()}@example.com`;
  const password = args.password ?? generatePassword();
  const name = args.name ?? "QA Tester";
  const kioscoName = args.kioscoName ?? `${args.prefix} Kiosco QA ${randomToken()}`;

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

  const { succeeded, failed, presentations } = await seedCatalog(client, catalog.products, {
    concurrency: args.concurrency,
    onProgress: (done, total) => {
      if (done % 25 === 0 || done === total) console.log(`   ... ${done}/${total}`);
    },
  });

  console.log(`
✅ Listo. Datos de prueba creados en ${apiUrl}:

  Email:       ${email}
  Password:    ${password}
  Kiosco:      ${kioscoName} (${kiosco._id})
  Productos:   ${succeeded.length} ok${failed.length ? `, ${failed.length} fallaron` : ""}
  Presentaciones: ${presentations.length}

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
