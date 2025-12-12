
// # Componente: QuantityChip  

// ## Descripción 📦
// Renderiza un chip circular con un valor numérico o texto en su interior.  
// Se utiliza para mostrar cantidades o etiquetas de forma compacta y visual.  

// ## Funciones 🔧
// - `QuantityChip`: componente principal que recibe props tipadas con `QuantityChipInterface`.  
//   - `color`: color del borde y del texto (por defecto `"red"`).  
//   - `label`: texto o número a mostrar dentro del chip.  
// - Lógica interna:  
//   - Ajusta el tamaño de fuente dinámicamente según la longitud del `label`:  
//     - Si el `label` tiene más de 3 caracteres → `0.6em`.  
//     - Si tiene 3 o menos → `0.7em`.  

// ## Notas técnicas 💽
// - Usa un `span` con estilos inline para simular un chip circular.  
// - Diseño:  
//   - Borde redondeado (`borderRadius: "50%"`).  
//   - Dimensiones fijas (`2.5em x 2.5em`).  
//   - Centrado con `inline-flex`.  
// - Se integra en vistas de productos o tickets para mostrar cantidades de manera clara y visual.  
//-----------------------------------------------------------------------------//

import type { QuantityChipInterface } from "../../../../typings/sells/sellsComponentTypes";


const QuantityChip = ({ color = "red", label }: QuantityChipInterface): React.ReactNode => {
    const fontSize: string = label?.length > 3 ? "0.6em" : "0.7em";

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
            <span style={{ fontSize }}>{label}</span>
        </span>
    );
};

export default QuantityChip;