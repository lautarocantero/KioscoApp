import type { ReactNode } from "react";
import CategorySelector from "../../../../../shared/components/CategorySelector/CategorySelector";
import { useSellbar } from "../../../../../../hooks/sells/useSellBar";

export const SellbarFilter = (): ReactNode => {
    const { categories } = useSellbar();
    const { list, selected, getLabel, onSelect } = categories;

    return (
        <CategorySelector
            mode="single"
            id="sellbar-category"
            label="Categoría"
            categories={list}
            getLabel={getLabel}
            value={selected}
            onChange={onSelect}
            allowClear
            clearLabel="Todas"
        />
    );
};