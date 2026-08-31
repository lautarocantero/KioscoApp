// Prompts interactivos de consola (sin dependencias). Usado por
// fullDemo.mjs para las preguntas obligatorias: entorno, plan y rol.
//
// No usa el `rl.question()` de readline/promises reutilizando una sola
// interface: con stdin no-TTY (pipeado, como en un test automatizado) esa
// API solo resuelve la PRIMERA pregunta — el stream llega completo, hace
// EOF, la interface se cierra sola, y cualquier `question()` posterior
// queda colgado para siempre. Acá se desacopla "preguntar" (escribir el
// prompt) de "responder" (el próximo evento 'line' que llegue), con una
// cola de resolvers — funciona igual en una terminal real que con stdin
// pipeado.

import { createInterface } from "node:readline";
import { stdin, stdout } from "node:process";

const rl = createInterface({ input: stdin, output: stdout, terminal: stdin.isTTY });

// Cola simétrica: con stdin pipeado, todas las líneas pueden llegar antes de
// que el código haya llamado a ask() para cada una — si eso pasa, se
// bufferean acá en vez de perderse (una cola de resolvers sola no alcanza,
// porque una 'line' puede llegar sin que haya ningún ask() esperándola
// todavía).
const lineQueue = [];
const resolverQueue = [];

rl.on("line", (line) => {
  const trimmed = line.trim();
  const resolve = resolverQueue.shift();
  if (resolve) resolve(trimmed);
  else lineQueue.push(trimmed);
});

export const closePrompts = () => rl.close();

export const ask = (question) => {
  stdout.write(question);
  if (lineQueue.length > 0) return Promise.resolve(lineQueue.shift());
  return new Promise((resolve) => resolverQueue.push(resolve));
};

export const askChoice = async (question, options, defaultValue) => {
  const label = options.join("/");
  const suffix = defaultValue ? ` (Enter = ${defaultValue})` : "";
  while (true) {
    const raw = await ask(`${question} [${label}]${suffix}: `);
    const value = raw || defaultValue;
    if (value && options.includes(value)) return value;
    console.log(`  → respondé una de estas opciones: ${label}`);
  }
};

export const askNumber = async (question, defaultValue) => {
  while (true) {
    const raw = await ask(`${question} (Enter = ${defaultValue}): \n`);
    if (!raw) return defaultValue;
    const n = Number(raw);
    if (Number.isFinite(n) && n >= 0) return n;
    console.log("  → ingresá un número válido");
  }
};

export const askConfirmTyped = async (question, expected) => {
  const raw = await ask(`${question} (escribí "${expected}" para confirmar): \n`);
  return raw === expected;
};

export default { ask, askChoice, askNumber, askConfirmTyped, closePrompts };
