import { useMemo } from "react";
import { isElectronRuntime } from "../../modules/shared/helpers/isElectronRuntime";

export const useIsElectron = (): boolean => {
  return useMemo(() => isElectronRuntime(), []);
};
