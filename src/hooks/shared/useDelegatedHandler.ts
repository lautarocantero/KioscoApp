import { useCallback } from "react";

export function useDelegatedHandler<
  Args extends unknown[],
  Return
>(
  fn: (...args: Args) => Return,
  deps: React.DependencyList
): (...args: Args) => Return {
  return useCallback(fn, deps);
}
