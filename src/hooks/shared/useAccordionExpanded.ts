import { useState } from "react";


export const useAccordionExpanded = (defaultExpanded = false) => {
    const [expanded, setExpanded] = useState(defaultExpanded);

    const handleExpandedChange = (_: React.SyntheticEvent, isExpanded: boolean): void => {
        setExpanded(isExpanded);
    };

    return { expanded, handleExpandedChange };
};