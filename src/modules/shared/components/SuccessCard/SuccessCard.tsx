import { Box, Card, CardContent } from "@mui/material";
import SuccessCardBody from "./SuccessCardBody";
import SuccessCardActions from "./SuccessCardActions";

export interface SuccessCardAction {
    label:   string;
    onClick: () => void;
    variant: "contained" | "outlined";
}

export interface SuccessCardProps {
    name:      string;
    title:     string;
    subtitle:  string;
    actions:   SuccessCardAction[];
    timeline?: React.ReactNode;
}

const SuccessCard = ({ name, title, subtitle, actions, timeline }: SuccessCardProps): React.ReactNode => (
    <Box sx={{ display: "flex", justifyContent: "center", alignItems: "flex-start", p: 2, pt: 0 }}>
        <Card sx={theme => ({
            width: "100%",
            maxWidth: 720,
            backgroundColor: theme.custom.white,
            borderRadius: "24px",
            overflow: "hidden",
            boxShadow: "0 12px 32px rgba(0,0,0,0.12)",
        })}>
            <CardContent sx={{ p: 0 }}>
                <SuccessCardBody
                    name={name}
                    title={title}
                    subtitle={subtitle}
                    timeline={timeline}
                />
                <SuccessCardActions actions={actions} />
            </CardContent>
        </Card>
    </Box>
);

export default SuccessCard;