
//─────────────────── Extensión 🧩: Tipado para jsPDF + AutoTable ───────────────────//

//─────────────────── Descripción 📝 ───────────────────//
// Este módulo amplía la definición original de jsPDF para incluir las propiedades
// y métodos utilizados por la librería jspdf-autotable. Permite que TypeScript
// reconozca correctamente los métodos autoTable y lastAutoTable, evitando errores
// de tipado y mejorando la autocompletación en el editor.

//──────────────────── Funciones / Extensiones 🔧 ─────────────────────//
// - Declara el método autoTable(options): Permite generar tablas dentro del PDF.
// - Declara la propiedad lastAutoTable: Contiene información de la última tabla generada.
// - lastAutoTable.finalY indica la posición vertical final de la tabla, útil para
//   continuar escribiendo contenido debajo sin superponer elementos.
// - Esta extensión no modifica el comportamiento de jsPDF, solo agrega tipado
//   adicional para integrarse correctamente con jspdf-autotable.

//-----------------------------------------------------------------------------//

import "jspdf";

declare module "jspdf" {
  interface jsPDF {
    autoTable: (options) => jsPDF;
    lastAutoTable: {
      finalY: number;
    };
  }
}
