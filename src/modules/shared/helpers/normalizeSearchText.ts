const DIACRITICS_REGEX = /[̀-ͯ]/g;

// Normaliza texto para matching de búsqueda: minúsculas + sin acentos,
// así "almacen" encuentra "Almacén".
export const normalizeSearchText = (value: string): string =>
  value.toLowerCase().normalize("NFD").replace(DIACRITICS_REGEX, "");

export default normalizeSearchText;
