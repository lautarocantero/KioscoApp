import type { PresentationRow } from "@typings/cart/cartTypes";
import { normalizeSearchText } from "../../shared/helpers/normalizeSearchText";

const RESULT_LIMIT = 8;

const MATCH_RANK_PRODUCT_PREFIX = 0;
const MATCH_RANK_SKU_PREFIX = 1;
const MATCH_RANK_OTHER = 2;

const getMatchRank = (row: PresentationRow, normalizedQuery: string): number => {
  if (normalizeSearchText(row.product).startsWith(normalizedQuery)) return MATCH_RANK_PRODUCT_PREFIX;
  if (normalizeSearchText(row.sku).startsWith(normalizedQuery)) return MATCH_RANK_SKU_PREFIX;
  return MATCH_RANK_OTHER;
};

const matchesQuery = (row: PresentationRow, normalizedQuery: string): boolean => {
  const haystack = normalizeSearchText(`${row.product} ${row.presentation} ${row.category} ${row.sku}`);
  return haystack.includes(normalizedQuery);
};

/*══════════════════════════════════════════════════════════════════════╗
║ 🔎 searchPresentationRows                                             ║
║ Matchea + ordena + recorta el índice plano de presentaciones. Orden:  ║
║ prefijo de producto (0) → prefijo de sku (1) → resto (2).             ║
╚══════════════════════════════════════════════════════════════════════╝*/
export const searchPresentationRows = (rows: PresentationRow[], query: string): PresentationRow[] => {
  const normalizedQuery = normalizeSearchText(query.trim());
  if (!normalizedQuery) return [];

  return rows
    .filter((row) => matchesQuery(row, normalizedQuery))
    .sort((a, b) => getMatchRank(a, normalizedQuery) - getMatchRank(b, normalizedQuery))
    .slice(0, RESULT_LIMIT);
};

export default searchPresentationRows;
