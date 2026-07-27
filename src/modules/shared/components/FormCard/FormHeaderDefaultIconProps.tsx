import type { FormHeaderDefaultIconProps } from "@typings/shared/reactComponents";
import type { ReactNode } from "react";


const FormHeaderDefaultIcon = ({ color }: FormHeaderDefaultIconProps): ReactNode => (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
        <rect x="2" y="2" width="6" height="6" rx="1.5" fill={color} />
        <rect x="9" y="2" width="5" height="5" rx="1.5" fill={color} opacity="0.6" />
        <rect x="9" y="8" width="5" height="6" rx="1.5" fill={color} opacity="0.6" />
        <rect x="2" y="9" width="6" height="5" rx="1.5" fill={color} opacity="0.6" />
    </svg>
);

export default FormHeaderDefaultIcon;