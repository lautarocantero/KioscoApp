import { useCallback } from "react";

/**
 * Hook para delegar funciones y memorizarlas.
 * 
 * @param fn - función a delegar
 * @param deps - lista de dependencias
 */
export function useDelegatedHandler<
  Args extends unknown[],
  Return
>(
  fn: (...args: Args) => Return,
  deps: React.DependencyList
): (...args: Args) => Return {
  return useCallback(fn, deps);
}
