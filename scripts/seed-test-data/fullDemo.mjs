#!/usr/bin/env node
// Demo completa en un solo comando: cuenta + plan + rol + hasta 3 kioscos +
// hasta 5 vendedores + catálogo + ventas artificiales a lo largo del mes.
// Pregunta por consola: entorno (dev/prod), plan y rol de la cuenta
// principal, y cuántas ventas artificiales generar.
//
// Uso:
//   npm run seed:full-demo
//
// Los límites reales de plan (ver docs/usefull/rolesAndPlansMatrix.md):
//   Standard → 1 kiosco por cuenta (dueño + vendedor sumado), 2 miembros
//              por kiosco en total, catálogo de hasta 1150 unidades.
//   Deluxe   → sin límites.
// Con Standard, algunos de los kioscos/vendedores pedidos van a ser
// rechazados por el backend — el script no aborta, reporta cuáles fallaron
// y sigue con lo que sí se pudo crear.
//
// Activar un plan es un pago real por Mercado Pago — este script nunca lo
// completa: si hace falta, imprime el link y espera a que lo pagues vos.

import { ApiClient } from "./apiClient.mjs";
import { loadFileCatalog } from "./fileCatalog.mjs";
import { seedCatalog } from "./seedCatalog.mjs";
import { ensurePlan } from "./membership.mjs";
import { setMemberRole, createAndJoinSeller } from "./sellersAndRoles.mjs";
import { generatePurchaseDates, buildArtificialSell } from "./artificialSells.mjs";
import { ask, askChoice, askNumber, askConfirmTyped, closePrompts } from "./prompts.mjs";

// SEED_DEV_API_URL / SEED_PROD_API_URL permiten apuntar a otro puerto/host
// (útil si el backend local no corre en el 3000, o para testear el script
// contra un mock) sin tocar el código.
const ENV_API_URLS = {
  dev: process.env.SEED_DEV_API_URL ?? "http://localhost:3000",
  prod: process.env.SEED_PROD_API_URL ?? "https://kioscoappbackend.onrender.com",
};

const KIOSCO_COUNT = 3;
const SELLER_COUNT = 5;
const DEFAULT_SELLS = 40;
const DEFAULT_CATALOG_LIMIT = 150;
const CATALOG_CONCURRENCY = 5;
const SELL_CONCURRENCY = 5;
const IVA_PERCENTAGE = 0; // mismo default que src/config/constants.ts (`iva`)

const randomToken = () => Math.random().toString(36).slice(2, 8);
const generatePassword = () => `Qa${randomToken()}${randomToken()}!9`;

// Mismo pool de concurrencia que seedCatalog.mjs — acá se reimplementa chico
// porque el shape de "worker" es distinto (ventas, no productos) y no vale
// la pena una abstracción genérica para dos usos.
const runPool = async (items, concurrency, worker) => {
  const results = [];
  let cursor = 0;
  const runners = Array.from({ length: Math.min(concurrency, items.length) }, async () => {
    while (cursor < items.length) {
      const index = cursor;
      cursor += 1;
      try {
        results[index] = { ok: true, value: await worker(items[index], index) };
      } catch (error) {
        results[index] = { ok: false, error };
      }
    }
  });
  await Promise.all(runners);
  return results;
};

const main = async () => {
  console.log("\n=== Demo completa de datos de prueba — Stocko ===\n");

  const env = await askChoice("¿Entorno?", ["dev", "prod"], "dev");
  const apiUrl = ENV_API_URLS[env];

  if (env === "prod") {
    const confirmed = await askConfirmTyped(
      `\n⚠️  Vas a crear datos reales en PRODUCCIÓN (${apiUrl}).`,
      "CONFIRMAR"
    );
    if (!confirmed) throw new Error("No confirmaste producción — cancelado.");
  }

  const plan = await askChoice("\n¿Plan deseado para la cuenta principal?", ["standard", "deluxe"], "standard");
  const role = await askChoice("¿Rol deseado para la cuenta principal en su kiosco?", ["admin", "seller"], "admin");
  const sellsCount = await askNumber("\n¿Cuántas ventas artificiales generar a lo largo del mes?", DEFAULT_SELLS);

  if (plan === "standard") {
    console.log(`
   ℹ️  Recordatorio (límites reales del plan Standard, no lo que promete la
      card de precios — ver docs/usefull/rolesAndPlansMatrix.md):
        • 1 kiosco por cuenta (dueño + vendedor, sumado)
        • 2 miembros por kiosco en total (dueño + 1 vendedor)
        • catálogo: hasta 1150 unidades (productos + presentaciones)
      Con Standard, casi seguro que de los ${KIOSCO_COUNT} kioscos y
      ${SELLER_COUNT} vendedores pedidos, la mayoría va a ser rechazada por
      el backend. El script no aborta — crea lo que el plan permite y
      reporta el resto como fallido al final.
`);
  }

  console.log(`\n→ Backend: ${apiUrl}\n`);

  const timestamp = new Date().toISOString();
  const email = `stocko.qa+${randomToken()}@example.com`;
  const password = generatePassword();
  const name = "QA Tester";

  const mainClient = new ApiClient(apiUrl);

  console.log(`1) Creando cuenta principal ${email}...`);
  await mainClient.postJson("/auth/register", { name, email, password, repeatPassword: password, profilePhoto: null });
  const { user: mainUser } = await mainClient.postJson("/auth/login", { email, password, rememberMe: true });

  console.log("\n2) Plan de la cuenta:");
  await ensurePlan(mainClient, plan, { ask });

  console.log(`\n3) Creando kioscos (pedidos: ${KIOSCO_COUNT})...`);
  const kioscoAttempts = await runPool(
    Array.from({ length: KIOSCO_COUNT }, (_, i) => i),
    1, // secuencial: el primero tiene que existir antes de intentar el resto tiene sentido igual, pero además así el mensaje de error de "tope alcanzado" es más legible en orden
    async (i) => {
      const kioscoName = `[TEST] Kiosco QA ${randomToken()} #${i + 1}`;
      const { kiosco } = await mainClient.postJson("/kiosco/create", { name: kioscoName, address: `Dirección de prueba ${i + 1}` });
      return { name: kioscoName, id: kiosco._id };
    }
  );
  const kioscos = kioscoAttempts.filter((r) => r.ok).map((r) => r.value);
  const failedKioscos = kioscoAttempts.filter((r) => !r.ok);
  kioscos.forEach((k) => console.log(`   ✓ ${k.name} (${k.id})`));
  failedKioscos.forEach((f) => console.log(`   ✗ kiosco rechazado: ${f.error.message}`));

  if (kioscos.length === 0) {
    throw new Error("No se pudo crear ni un kiosco — no hay sobre qué seguir. Revisá el plan/rol elegidos.");
  }

  const primaryKiosco = kioscos[0];
  mainClient.setActiveKiosco(primaryKiosco.id);

  if (role !== "admin") {
    console.log(`\n4) Cambiando el rol de la cuenta principal a "${role}" en ${primaryKiosco.name}...`);
    await setMemberRole(mainClient, primaryKiosco.id, mainUser._id, role);
  } else {
    console.log("\n4) La cuenta principal ya es admin (rol por defecto del dueño) — nada que cambiar.");
  }

  console.log(`\n5) Creando vendedores (pedidos: ${SELLER_COUNT}) en ${primaryKiosco.name}...`);
  const { invite_code: inviteCode } = await mainClient.get(`/kiosco/${primaryKiosco.id}/invite-info`);
  const sellerAttempts = await runPool(
    Array.from({ length: SELLER_COUNT }, (_, i) => i + 1),
    1,
    (index) => createAndJoinSeller({ apiUrl, inviteCode, index, namePrefix: "[TEST]" })
  );
  const sellers = sellerAttempts.filter((r) => r.ok).map((r) => r.value);
  const failedSellers = sellerAttempts.filter((r) => !r.ok);
  sellers.forEach((s) => console.log(`   ✓ ${s.name} — ${s.email}`));
  failedSellers.forEach((f) => console.log(`   ✗ vendedor rechazado: ${f.error.message}`));

  console.log(`\n6) Cargando catálogo (hasta ${DEFAULT_CATALOG_LIMIT} productos) en ${primaryKiosco.name}...`);
  const { selected: catalogProducts, total: catalogTotal } = loadFileCatalog({
    namePrefix: "[TEST]",
    limit: DEFAULT_CATALOG_LIMIT,
    all: false,
  });
  const { succeeded: seededProducts, failed: failedProducts, presentations } = await seedCatalog(mainClient, catalogProducts, {
    concurrency: CATALOG_CONCURRENCY,
    onProgress: (done, total) => {
      if (done % 25 === 0 || done === total) console.log(`   ... ${done}/${total}`);
    },
  });
  console.log(`   ✓ ${seededProducts.length}/${catalogProducts.length} productos (de ${catalogTotal} disponibles), ${presentations.length} presentaciones`);
  if (failedProducts.length) console.log(`   ✗ ${failedProducts.length} productos fallaron`);

  if (presentations.length === 0) {
    console.log("\n⚠️  No hay presentaciones creadas — no se pueden generar ventas artificiales. Termino acá.");
  } else {
    console.log(`\n7) Generando ${sellsCount} ventas artificiales a lo largo del mes...`);
    const sellersForSells = [{ id: mainUser._id, name }, ...sellers.map((s) => ({ id: s.id, name: s.name }))];
    const purchaseDates = generatePurchaseDates(sellsCount);

    const sellResults = await runPool(purchaseDates, SELL_CONCURRENCY, async (purchaseDate) => {
      const sell = buildArtificialSell({ presentations, sellers: sellersForSells, ivaPercentage: IVA_PERCENTAGE, purchaseDate });
      await mainClient.postJson("/sell/create-sell", sell);
      return sell;
    });
    const succeededSells = sellResults.filter((r) => r.ok);
    const failedSells = sellResults.filter((r) => !r.ok);
    console.log(`   ✓ ${succeededSells.length}/${sellsCount} ventas creadas${failedSells.length ? `, ${failedSells.length} fallaron (posible falta de stock)` : ""}`);
  }

  console.log(`
✅ Demo lista en ${apiUrl}

  Cuenta principal:
    Email:    ${email}
    Password: ${password}
    Rol:      ${role}
    Plan pedido: ${plan}

  Kioscos (${kioscos.length}/${KIOSCO_COUNT}):
${kioscos.map((k) => `    - ${k.name} (${k.id})`).join("\n")}

  Vendedores (${sellers.length}/${SELLER_COUNT}):
${sellers.length ? sellers.map((s) => `    - ${s.name} — ${s.email} / ${s.password}`).join("\n") : "    (ninguno)"}

  Catálogo: ${seededProducts.length} productos, ${presentations.length} presentaciones
  Timestamp de esta corrida: ${timestamp}

Iniciá sesión con el email/password de la cuenta principal en la app,
apuntando a este mismo backend.
`);
};

main()
  .catch((error) => {
    console.error(`\n❌ ${error.message}\n`);
    process.exitCode = 1;
  })
  .finally(() => closePrompts());
