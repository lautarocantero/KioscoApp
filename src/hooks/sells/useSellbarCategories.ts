import { useEffect, useState, type MouseEvent } from "react";
import type { PresentationCategory } from "@typings/presentation/presentationEnum";
import { PRESENTATION_CATEGORY_LABELS } from "@typings/presentation/presentationCategoryLabels";
import { AlertColor } from "../../typings/ui/ui";
import type { UseSellbarCategoriesParams, UseSellbarCategoriesResult } from "@typings/sells/sellTypes";
import { getAvailableCategoriesRequest } from "../../modules/presentations/api/presentationsApi";

/*══════════════════════════════════════════════════════════════════════╗
║ 🏷️ useSellbarCategories                                               ║
║ Trae las categorías disponibles y maneja el estado del dropdown de    ║
║ filtro: selección, apertura/cierre del menú y traducción a label.     ║
╚══════════════════════════════════════════════════════════════════════╝*/


export const useSellbarCategories = ({ showSnackBar }: UseSellbarCategoriesParams): UseSellbarCategoriesResult => {
    const [categoriesList, setCategoriesList] = useState<PresentationCategory[]>([]);
    const [isLoadingCategories, setIsLoadingCategories] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState<PresentationCategory | null>(null);
    const [categoryAnchorEl, setCategoryAnchorEl] = useState<HTMLElement | null>(null);

    useEffect(() => {
        const fetchCategories = async () => {
            setIsLoadingCategories(true);
            try {
                const result: PresentationCategory[] = await getAvailableCategoriesRequest();
                setCategoriesList(result ?? []);
            } catch (error: unknown) {
                showSnackBar(`No se pudieron cargar las categorías`, AlertColor.Error);
            } finally {
                setIsLoadingCategories(false);
            }
        };

        void fetchCategories();
    }, []);

    const handleOpenCategoryMenu = (event: MouseEvent<HTMLElement>) => setCategoryAnchorEl(event.currentTarget);
    const handleCloseCategoryMenu = () => setCategoryAnchorEl(null);

    const handleSelectCategory = (category: PresentationCategory | null) => {
        setSelectedCategory(category);
        handleCloseCategoryMenu();
    };

    const getCategoryLabel = (category: PresentationCategory): string => PRESENTATION_CATEGORY_LABELS[category];

    return {
        list: categoriesList,
        isLoading: isLoadingCategories,
        selected: selectedCategory,
        selectedCategory,
        selectedLabel: selectedCategory ? getCategoryLabel(selectedCategory) : null,
        getLabel: getCategoryLabel,
        anchorEl: categoryAnchorEl,
        isMenuOpen: Boolean(categoryAnchorEl),
        onOpenMenu: handleOpenCategoryMenu,
        onCloseMenu: handleCloseCategoryMenu,
        onSelect: handleSelectCategory,
    };
};