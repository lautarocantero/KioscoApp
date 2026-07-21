// modules/presentations/components/PresentationForm/PresentationCategoryField.tsx
import CategorySelector from "../../../shared/components/CategorySelector/CategorySelector";
import { useFormikCategorySelectorMulti } from "../../../shared/components/CategorySelector/useFormikCategorySelector";
import { PresentationCategory, PRESENTATION_CATEGORY_VALUES } from "@typings/presentation/presentationEnum";
import { PRESENTATION_CATEGORY_LABELS } from "@typings/presentation/presentationCategoryLabels";
import type { PresentationCategoryFieldProps } from "@typings/presentation/presentationComponentTypes";

function PresentationCategoryField<T extends object>({
    name,
    label,
}: PresentationCategoryFieldProps<T>): React.ReactNode {
    const { value, onChange } = useFormikCategorySelectorMulti<T, PresentationCategory>(name);

    return (
        <CategorySelector
            mode="multi"
            id={name}
            label={label ?? "Categorías"}
            categories={PRESENTATION_CATEGORY_VALUES}
            getLabel={(c) => PRESENTATION_CATEGORY_LABELS[c]}
            value={value}
            onChange={onChange}
        />
    );
}

export default PresentationCategoryField;