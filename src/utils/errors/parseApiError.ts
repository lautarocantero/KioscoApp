type StatusMessageMap = Record<number, string>;

const STATUS_MESSAGES: StatusMessageMap = {
    400: "La solicitud contiene datos inválidos.",
    401: "Tu sesión expiró o no estás autorizado. Iniciá sesión nuevamente.",
    403: "No tenés permisos para realizar esta acción.",
    404: "No se encontró el recurso solicitado.",
    408: "La solicitud tardó demasiado. Intentá nuevamente.",
    409: "Ya existe un registro con esos datos.",
    413: "El archivo o los datos enviados son demasiado grandes.",
    422: "Los datos enviados no pudieron procesarse.",
    429: "Demasiadas solicitudes. Esperá un momento e intentá de nuevo.",
    500: "Error interno del servidor. Intentá más tarde.",
    502: "El servidor no está disponible en este momento.",
    503: "El servicio no está disponible en este momento.",
    504: "El servidor tardó demasiado en responder.",
};

const getStatusMessage = (status: number): string =>
    STATUS_MESSAGES[status] ?? `Ocurrió un error inesperado (${status}).`;

// ─── Extrae el status de mensajes tipo "Error 404" (patrón usado en los thunks) ──
const extractStatusFromMessage = (message: string): number | null => {
    const match = message.match(/error\s+(\d{3})/i);
    return match ? Number(match[1]) : null;
};

const NETWORK_ERROR_PATTERNS = [
    "failed to fetch",
    "networkerror",
    "network request failed",
    "load failed",
];

const isNetworkError = (message: string): boolean =>
    NETWORK_ERROR_PATTERNS.some((pattern) => message.toLowerCase().includes(pattern));

/**
 * Convierte un error de una petición a la API (Response cruda, Error o unknown)
 * en un mensaje legible para el usuario.
 */
export async function parseApiError(
    error: unknown,
    fallbackMessage = "Ocurrió un error inesperado. Intentá nuevamente.",
): Promise<string> {

    // ── Response cruda sin .ok (por si en algún punto se pasa directo) ──
    if (error instanceof Response) {
        try {
            const body = await error.json();
            if (body?.message) return body.message;
        } catch {
            // body no era JSON válido, seguimos al mapeo por status
        }
        return getStatusMessage(error.status);
    }

    // ── Sin conexión, CORS, servidor caído ──────────────────────────────
    if (error instanceof TypeError && isNetworkError(error.message)) {
        return "No se pudo conectar con el servidor. Verificá tu conexión a internet.";
    }

    // ── Error estándar (el que arman los thunks: message del backend o "Error {status}") ──
    if (error instanceof Error) {
        if (isNetworkError(error.message)) {
            return "No se pudo conectar con el servidor. Verificá tu conexión a internet.";
        }

        const status = extractStatusFromMessage(error.message);
        if (status) return getStatusMessage(status);

        if (error.message.trim().length > 0) return error.message;
    }

    return fallbackMessage;
}