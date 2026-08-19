export const isElectronRuntime = (): boolean => {
  if (typeof window === "undefined") return false;
  return Boolean(window.electron?.isElectron);
};
