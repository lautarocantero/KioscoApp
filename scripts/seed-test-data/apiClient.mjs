// Cliente HTTP mínimo para hablar con el backend de Stocko desde un script de
// Node (no desde la app). El backend autentica por cookie de sesión (httpOnly,
// seteada por /auth/login), no por Bearer token — así que este cliente arma un
// jar de cookies casero y lo reenvía en cada request, imitando lo que hace un
// browser con `credentials: "include"`.

const createCookieJar = () => {
  const cookies = new Map();

  const store = (setCookieHeaders) => {
    for (const raw of setCookieHeaders ?? []) {
      const pair = raw.split(";", 1)[0];
      const eqIndex = pair.indexOf("=");
      if (eqIndex === -1) continue;
      cookies.set(pair.slice(0, eqIndex).trim(), pair.slice(eqIndex + 1).trim());
    }
  };

  const header = () => [...cookies.entries()].map(([k, v]) => `${k}=${v}`).join("; ");

  return { store, header };
};

export class ApiClient {
  constructor(baseUrl) {
    this.baseUrl = baseUrl.replace(/\/$/, "");
    this.jar = createCookieJar();
    this.kioscoId = null;
  }

  setActiveKiosco(kioscoId) {
    this.kioscoId = kioscoId;
  }

  async request(path, { method = "GET", json, form } = {}) {
    const headers = {};
    const cookieHeader = this.jar.header();
    if (cookieHeader) headers.cookie = cookieHeader;
    if (this.kioscoId) headers["x-kiosco-id"] = this.kioscoId;

    let body;
    if (json !== undefined) {
      headers["content-type"] = "application/json";
      body = JSON.stringify(json);
    } else if (form !== undefined) {
      body = form; // FormData — fetch arma el boundary solo
    }

    const response = await fetch(`${this.baseUrl}${path}`, { method, headers, body });
    this.jar.store(response.headers.getSetCookie?.() ?? []);

    const text = await response.text();
    const data = text ? JSON.parse(text) : null;

    if (!response.ok) {
      const message = data?.message ?? data?.error ?? response.statusText;
      throw new Error(`${method} ${path} -> ${response.status}: ${message}`);
    }

    return data;
  }

  get(path) {
    return this.request(path, { method: "GET" });
  }

  postJson(path, json) {
    return this.request(path, { method: "POST", json });
  }

  postForm(path, form) {
    return this.request(path, { method: "POST", form });
  }
}

export default ApiClient;
