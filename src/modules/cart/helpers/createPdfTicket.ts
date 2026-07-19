//─────────────────── Helper 🧩: createPdfTicket ───────────────────//

//─────────────────── Descripción 📝 ───────────────────//
// Se encarga de generar un archivo PDF con toda la información del ticket de compra,
// incluyendo encabezado, tabla de productos y totales. Está pensado para ser utilizado
// en el flujo de ventas del sistema y permitir la descarga inmediata del comprobante.

//──────────────────── Funciones 🔧 ─────────────────────//
// - createPdfTicket utiliza la librería jsPDF para crear y manipular el documento PDF.
// - Emplea jspdf-autotable (via applyPlugin) para generar automáticamente la tabla de productos.
// - Usa la función formatCurrency para formatear valores monetarios según la configuración local.
// - Implementa una función interna "truncate" para evitar desbordes de texto en la tabla.
// - Calcula dinámicamente la posición final de la tabla para ubicar correctamente los totales.
// - Genera el archivo final y lo descarga automáticamente con un nombre basado en el ID del ticket.

//─────────────────── Notas técnicas 💽 ───────────────────//
// - Se usa `applyPlugin(jsPDF)` en vez del import default de autoTable porque en este
//   proyecto (Vite) el default export de "jspdf-autotable" v3 se resuelve como el módulo
//   completo en lugar de la función, rompiendo `autoTable(doc, options)`.
//   `applyPlugin` registra `autoTable` como método en el prototipo de jsPDF de forma segura.
// - El augment de tipos de abajo declara `doc.autoTable` y `doc.lastAutoTable`, que no
//   vienen tipados en el paquete base de jsPDF.

//-----------------------------------------------------------------------------//

import jsPDF from "jspdf";
import { applyPlugin } from "jspdf-autotable";
import { formatCurrency } from "./formatCurrency";
import type { SellTicketType } from "../../../typings/sells/types/sellsTypes";

declare module "jspdf" {
  interface jsPDF {
    autoTable: (options: Record<string, unknown>) => jsPDF;
    lastAutoTable: { finalY: number };
  }
}

applyPlugin(jsPDF);

export const createPdfTicket = (ticket: SellTicketType): void => {
  const doc = new jsPDF();

  //──────────────────────────────────────────── Encabezado ───────────────────────────────────────────//
  doc.setFontSize(16);
  doc.text("Comprobante de Venta", 14, 20);
  doc.setFontSize(10);
  doc.text(`Ticket Nº: ${ticket._id}`, 14, 28);
  doc.text(`Fecha: ${new Date().toLocaleString("es-AR")}hs`, 14, 34);
  doc.text(`Cajero: ${ticket.seller_name}`, 14, 40);
  doc.text(`Método de pago: ${ticket.payment_method}`, 14, 46);

  //──────────────────────────────────────────── Tabla de productos───────────────────────────────────────────//
  const truncate = (val: string) =>
    val?.length > 25 ? val.slice(0, 22) + "..." : val;

  const productRows = ticket.products.map((p) => [
      truncate(p.name),
      truncate(p.sku),
      truncate(p.model_type + ' ' + p.model_size),
      truncate(String(p.stock_required)),
      truncate(formatCurrency(p.price)),
      truncate(formatCurrency(p.price * p.stock_required)),
  ]);

  doc.autoTable({
    head: [["Producto", "SKU", "Tipo", "Cant.", "P. Unitario", "P. Total"]],
    body: productRows,
    startY: 55,
  });

  //──────────────────────────────────────────── Totales ───────────────────────────────────────────//

  const finalY = doc.lastAutoTable.finalY + 10;
    //──────────── Subtotal más pequeño ────────────────//

    doc.setFontSize(10);
    doc.text(`Subtotal: ${formatCurrency(ticket.sub_total)}`, 14, finalY);
    //──────────── IVA más pequeño ──────────────//

    doc.setFontSize(10);
    doc.text(`IVA (${ticket.iva}%): ${formatCurrency(ticket.sub_total * ticket.iva / 100)}`, 14, finalY + 6);
    //──────────── Total más grande y destacado ────────────────//

    doc.setFontSize(14);
    doc.text(`Total: ${formatCurrency(ticket.total_amount)}`, 14, finalY + 12);

  //──────────────────────────────────────────── Descargar PDF ───────────────────────────────────────────//
  doc.save(`ticket_${ticket._id}.pdf`);
};