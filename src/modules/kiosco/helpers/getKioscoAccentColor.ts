import type { Theme } from "@mui/material";

// Rota entre los accent colors del theme activo (mismos tokens que sku/
// model_type/model_size en presentations) para distinguir cards de kiosco a
// simple vista. Toma el theme por parámetro (no un import estático) para
// respetar el modo claro/oscuro vigente.
export const getKioscoAccentColor = (theme: Theme, index: number): string => {
    const rotation = [
        theme.custom.accents.violet,
        theme.custom.accents.green,
        theme.custom.accents.blue,
        theme.custom.accents.orange,
        theme.custom.accents.pink,
        theme.custom.accents.gold,
    ];

    return rotation[index % rotation.length];
};
