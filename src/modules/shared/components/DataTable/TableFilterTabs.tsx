import { Box, Chip, type Theme } from "@mui/material";
import type { TableFilterTabsProps } from "@typings/ui/dataTable.types";

const TableFilterTabs = <T extends string>({ ariaLabel, value, options, onChange, firstTabRef }: TableFilterTabsProps<T>): React.ReactNode => {
    return (
        <Box role="tablist" aria-label={ariaLabel} sx={{ display: "flex", gap: 1, flexWrap: "wrap" }}>
            {options.map((option, index) => {
                const isActive = value === option.value;

                return (
                    <Chip
                        key={option.value}
                        ref={index === 0 ? firstTabRef : undefined}
                        role="tab"
                        aria-selected={isActive}
                        clickable
                        onClick={() => onChange(option.value)}
                        label={`${option.label} (${option.count})`}
                        color={isActive ? "primary" : "default"}
                        variant={isActive ? "filled" : "outlined"}
                        sx={(theme: Theme) => ({
                            borderColor: theme.custom.darkGray,
                            color: isActive ? undefined : theme.custom.fontColor,
                        })}
                    />
                );
            })}
        </Box>
    );
};

export default TableFilterTabs;
