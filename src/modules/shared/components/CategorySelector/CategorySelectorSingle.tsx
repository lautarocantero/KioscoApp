import { Box, Menu, MenuItem, Tooltip, Typography, type Theme } from "@mui/material";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { useCategorySelector } from "../../../../hooks/shared/useCategorySelector";
import type { CategorySelectorSingleProps } from "@typings/presentation/presentationComponentTypes";

function CategorySelectorSingle<C extends string>({
    label = "Categoría",
    categories,
    getLabel,
    disabled,
    id = "category-selector",
    value,
    onChange,
    allowClear,
    clearLabel = "Todas",
}: CategorySelectorSingleProps<C>): React.ReactNode {
    const { anchorEl, isMenuOpen, onOpenMenu, onCloseMenu, handleSelect, selectedLabel } =
        useCategorySelector(value, onChange, getLabel, disabled);

    return (
        <>
            <Tooltip title={label}>
                <Box
                    id={id}
                    onClick={onOpenMenu}
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                    sx={(theme: Theme) => ({
                        flex: 1,
                        position: 'relative',
                        cursor: disabled ? 'default' : 'pointer',
                        opacity: disabled ? 0.5 : 1,
                        '&::after': {
                            content: '""',
                            position: 'absolute',
                            right: 0,
                            height: '50%',
                            width: '0.1em',
                            backgroundColor: theme?.custom?.darkBackground,
                        },
                        '&:hover': {
                            backgroundColor: disabled ? undefined : theme?.custom?.darkBackground,
                        }
                    })}
                >
                    <Box
                        sx={(theme: Theme) => ({
                            alignItems: 'center',
                            borderRadius: '1em',
                            display: 'flex',
                            gap: '0.4em',
                            flexShrink: 0,
                            transition: 'all 0.3s ease',
                            height: "2em",
                            flexDirection: 'row',
                            justifyContent: 'center',
                            '&:hover .MuiSvgIcon-root': {
                                color: theme?.palette.secondary.main,
                            },
                        })}
                    >
                        <Typography sx={(theme: Theme) => ({
                            color: theme?.palette?.secondary?.main,
                            fontSize: theme?.typography?.body1?.fontSize,
                            transition: 'color 0.3s ease',
                            whiteSpace: 'nowrap',
                        })}>
                            {selectedLabel ?? label}
                        </Typography>
                        <KeyboardArrowDownIcon sx={(theme: Theme) => ({
                            fontSize: '1em',
                            color: theme?.palette?.secondary?.main,
                        })}/>
                    </Box>
                </Box>
            </Tooltip>

            <Menu
                anchorEl={anchorEl}
                open={isMenuOpen}
                onClose={onCloseMenu}
            >
                {allowClear && (
                    <MenuItem onClick={() => handleSelect(null)}>
                        {clearLabel}
                    </MenuItem>
                )}
                {categories.map((category) => (
                    <MenuItem key={category} onClick={() => handleSelect(category)}>
                        {getLabel(category)}
                    </MenuItem>
                ))}
            </Menu>
        </>
    );
}

export default CategorySelectorSingle;