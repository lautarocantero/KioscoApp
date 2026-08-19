export type ElectronPlatform = "darwin" | "linux" | "win32" | "aix" | "freebsd" | "openbsd" | "sunos" | "android";

export type ElectronBridge = {
  isElectron: true;
  platform: ElectronPlatform;
};

declare global {
  interface Window {
    electron?: ElectronBridge;
  }
}
