import { useTranslation } from "react-i18next";
import Inventory2OutlinedIcon from "@mui/icons-material/Inventory2Outlined";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import Timeline from "../../../../shared/components/Timeline/TimeLine";

const ProductCreatedTimeline = (): React.ReactNode => {
    const { t } = useTranslation();

    return (
        <Timeline
            previousStep={{ icon: <Inventory2OutlinedIcon />, label: t("products.created.timeline.previousStep") }}
            nextStep={{ icon: <AddCircleOutlineIcon />, label: t("products.created.timeline.nextStep") }}
        />
    );
};

export default ProductCreatedTimeline;