// shared/components/BackPath/BackPath.tsx
import { IconButton } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useBackPath } from "../../../../hooks/shared/useBackPath";
import type { BackPathProps } from "@typings/shared/reactComponents";
import type { ReactNode } from "react";


const BackPath = ({ defaultBack, ...props }: BackPathProps): ReactNode => {
    const goBack = useBackPath(defaultBack);

    return (
        <IconButton onClick={goBack} aria-label="volver" {...props}>
            <ArrowBackIcon />
        </IconButton>
    );
};

export default BackPath;