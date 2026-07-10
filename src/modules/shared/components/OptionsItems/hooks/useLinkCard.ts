import type { LinkCardProps, LinkDataResult, OptionLink } from "@typings/ui/layout.types";

const useNoData = (): LinkDataResult => ({ value: undefined, loading: false, error: null, subtitle: undefined });

export const useLinkCard = ({ link }: LinkCardProps): OptionLink => {
    const useData = link.useData ?? useNoData;
    const { value: dynamicValue, loading, error, subtitle: dynamicSubtitle } = useData();

    const value = link.useData
        ? (link.formatValue ? link.formatValue(dynamicValue) : dynamicValue?.toString())
        : link.value;

    const subtitle = (error ?? dynamicSubtitle ?? link.subtitle)?.toString();

    return { ...link, value, loading, subtitle };
};