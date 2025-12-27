//─────────────────── Componente 🧩: QuantityChip ───────────────────//

//─────────────────── Descripción 📝 ───────────────────//
// Renderiza un 'chip' visual que muestra con color y texto cuantas existencias existen
// de un producto en una medida en especifico. Ejemplo = 200 ml verde (existencias por encima de punto de reposicion)

//──────────────────── Funciones 🔧 ─────────────────────//
// QuantityChip componente principal, recibe color y label para mostrar la informacion

//-----------------------------------------------------------------------------//

import type { QuantityChipInterface } from "../../../../../typings/sells/sellsComponentTypes";

const QuantityChip = ({ color = "red", label }: QuantityChipInterface): React.ReactNode => {
    const fontSize: string = label?.length > 3 ? "0.6em" : "0.7em";
    const labelText: string = label.includes("unidades") ? label.replace("unidades", "u.") : label;

    return (
        <span
            style={{
              border: `1px solid ${color}`,
              borderRadius: "50%",
              color: color,
              width: "2.5em",
              height: "2.5em",
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              marginLeft: "0.5em",
              textAlign: "center",
              lineHeight: 1,
              whiteSpace: "nowrap",
            }}
        >
            <span style={{ fontSize }}>{labelText}</span>
        </span>
    );
};

export default QuantityChip;