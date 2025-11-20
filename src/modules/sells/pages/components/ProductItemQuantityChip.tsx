import type { QuantityChipInterface } from "../../../../typings/ui/uiModules";


const QuantityChip = ({ color = "red", label }: QuantityChipInterface): React.ReactNode => {
    const fontSize = label.length > 3 ? "0.6em" : "0.7em";

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