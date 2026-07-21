import type { CategorySelectorProps } from "@typings/presentation/presentationComponentTypes";
import CategorySelectorSingle from "./CategorySelectorSingle";
import CategorySelectorMulti from "./CategorySelectorMulti";

function CategorySelector<C extends string>(props: CategorySelectorProps<C>): React.ReactNode {
    if (props.mode === "single") {
        return <CategorySelectorSingle {...props} />;
    }

    return <CategorySelectorMulti {...props} />;
}

export default CategorySelector;