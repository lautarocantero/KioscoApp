export const sanitizeInput = (input: string, label: string): string => {
    if (typeof input !== "string") {
        console.warn(`🤖 [${label}] no es texto. Se forzó a string.`);
        input = String(input);
    }

    // \p{L}/\p{N} (Unicode letras/números) en vez de a-zA-Z0-9: la versión ASCII
    // rompía nombres legítimos con tildes/ñ (ej. "José" → "Jos?"). Esto es una
    // conveniencia de UX, no una barrera de seguridad real — la validación de
    // verdad vive en el backend (Validation.email/stringValidation), ya que
    // esto se evita trivialmente llamando la API directo.
    const sanitized = input.replace(/[^\p{L}\p{N} @'._-]/gu, "?");

    if (sanitized !== input) {
        console.warn(`⚠️ [${label}] contenía caracteres sospechosos. Se reemplazaron con "?"`);
        console.warn(`🎭 Original: "${input}"`);
        console.warn(`🧼 Sanitizado: "${sanitized}"`);
    }

    return sanitized;
};

export const sanitizeRegisterValues = (values: {
    name: string;
    email: string;
    password: string;
    repeatPassword: string;
}) => ({
    name: sanitizeInput(values.name, "Name"),
    email: sanitizeInput(values.email, "Email"),
    password: values.password, // sin sanitizar
    repeatPassword: values.repeatPassword, // sin sanitizar
});