export const sanitizeInput = (input: string, label: string): string => {
    if (typeof input !== "string") {
        console.warn(`🤖 [${label}] no es texto. Se forzó a string.`);
        input = String(input);
    }

    const sanitized = input.replace(/[^a-zA-Z0-9 @._-]/g, "?");

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