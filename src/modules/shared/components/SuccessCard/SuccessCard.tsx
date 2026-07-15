import { Box, CardContent } from "@mui/material";
import SuccessCardBody from "./SuccessCardBody";
import SuccessCardActions from "./SuccessCardActions";
import NoisyCard from "../../../shared/components/Cards/NoisyCard";
import type { SuccessCardProps } from "@typings/ui/successCard.types";


const SuccessCard = ({ name, title, subtitle, actions, timeline }: SuccessCardProps): React.ReactNode => (
    <Box sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "flex-start",
        p: 2,
        pt: 0
    }}>
        <NoisyCard maxWidth={720} borderRadius="24px">
            <CardContent sx={{ p: 0, position: "relative", zIndex: 1 }}>
                <SuccessCardBody
                    name={name}
                    title={title}
                    subtitle={subtitle}
                    timeline={timeline}
                />
                <SuccessCardActions actions={actions} />
            </CardContent>
        </NoisyCard>
    </Box>
);

export default SuccessCard;