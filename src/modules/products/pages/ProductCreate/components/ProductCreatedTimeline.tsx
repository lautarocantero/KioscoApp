import Inventory2OutlinedIcon from "@mui/icons-material/Inventory2Outlined";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import Timeline from "../../../../shared/components/TimeLine";

const ProductCreatedTimeline = (): React.ReactNode => (
    <Timeline
        previousStep={{ icon: <Inventory2OutlinedIcon />, label: "Crear producto" }}
        nextStep={{ icon: <AddCircleOutlineIcon />, label: "Crear presentación" }}
    />
);

export default ProductCreatedTimeline;