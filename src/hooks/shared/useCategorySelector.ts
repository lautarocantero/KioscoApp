import type { UseCategorySelectorParams, UseCategorySelectorResult } from "@typings/presentation/presentationTypes";
import { useState } from "react";

export function useCategorySelector<C extends string>({
    value,
    onChange,
    getLabel,
    disabled,
}: UseCategorySelectorParams<C>): UseCategorySelectorResult<C> {
    const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
    const isMenuOpen = Boolean(anchorEl);

    const onOpenMenu = (event: React.MouseEvent<HTMLElement>) => {
        if (disabled) return;
        setAnchorEl(event.currentTarget);
    };
    const onCloseMenu = () => setAnchorEl(null);

    const handleSelect = (category: C | null) => {
        onChange(category);
        onCloseMenu();
    };

    const selectedLabel = value ? getLabel(value) : null;

    return { anchorEl, isMenuOpen, onOpenMenu, onCloseMenu, handleSelect, selectedLabel };
}