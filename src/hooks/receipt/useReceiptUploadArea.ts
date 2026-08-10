import { useState, type DragEvent } from "react";

/*══════════════════════════════════════════════════════════════════════════╗
║ 🪝 useReceiptUploadArea                                                   ║
║                                                                          ║
║ Encapsula el estado y los handlers de drag & drop de la zona de carga.   ║
║ El componente solo consume isDragging + los tres handlers, sin manejar   ║
║ DragEvent directamente.                                                  ║
╚══════════════════════════════════════════════════════════════════════════╝*/
export function useReceiptUploadArea(onFileDrop: (file: File) => void, disabled = false) {
  const [isDragging, setIsDragging] = useState(false);

  const handleDragOver = (e: DragEvent<HTMLDivElement>): void => {
    e.preventDefault();
    if (!disabled) setIsDragging(true);
  };

  const handleDragLeave = (e: DragEvent<HTMLDivElement>): void => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: DragEvent<HTMLDivElement>): void => {
    e.preventDefault();
    setIsDragging(false);
    if (disabled) return;

    const file = e.dataTransfer.files?.[0];
    if (file) onFileDrop(file);
  };

  return {
    isDragging,
    handleDragOver,
    handleDragLeave,
    handleDrop,
  };
}