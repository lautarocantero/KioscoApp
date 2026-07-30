import type { CategorySelectorProps } from "@typings/presentation/presentationComponentTypes";
import FormSelectorSingle from "./FormSelectorSingle";
import FormSelectorMulti from "./FormSelectorMulti";

function FormSelector<C extends string>(props: CategorySelectorProps<C>): React.ReactNode {
    if (props.mode === "single") {
        return <FormSelectorSingle {...props} />;
    }

    return <FormSelectorMulti {...props} />;
}

export default FormSelector;