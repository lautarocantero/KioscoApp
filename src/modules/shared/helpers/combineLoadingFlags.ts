// Pliega varios flags de carga independientes (uno por widget/hook de un
// dashboard) en un único boolean: alcanza con que uno esté cargando para
// que la página completa siga tapada por el LoadingScreen.
export const combineLoadingFlags = (...flags: boolean[]): boolean => flags.some(Boolean);
