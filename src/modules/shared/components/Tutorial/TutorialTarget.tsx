import { Box } from "@mui/material";
import type { TutorialTargetProps } from "@typings/tutorial/props";

// Marca un elemento real como target de un tutorial sin afectar su layout
// (display:"contents" no genera caja propia). Hace falta porque los
// botones compartidos (PrimaryButtonComponent/OutlinedButtonComponent) no
// reenvían props data-*, así que no se les puede pasar el target directo.
const TutorialTarget = ({ targetId, children }: TutorialTargetProps): React.ReactNode => (
    <Box data-tutorial-target={targetId} sx={{ display: "contents" }}>
        {children}
    </Box>
);

export default TutorialTarget;
