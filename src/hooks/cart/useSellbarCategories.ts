import { useEffect, useState, type MouseEvent } from "react";
import { useTranslation } from "react-i18next";
import type { PresentationCategory } from "@typings/presentation/presentationEnum";
import { AlertColor } from "../../typings/ui/ui";
import { getAvailableCategoriesRequest } from "../../modules/presentations/api/presentationsApi";
import type { UseCartBarCategoriesParams, UseCartBarCategoriesResult } from "@typings/cart/cartTypes";

/*══════════════════════════════════════════════════════════════════════╗
║ 🏷️ useSellbarCategories                                               ║
║ Trae las categorías disponibles y maneja el estado del dropdown de    ║
║ filtro: selección, apertura/cierre del menú y traducción a label.     ║
╚══════════════════════════════════════════════════════════════════════╝*/


export const useSellbarCategories = ({ showSnackBar }: UseCartBarCategoriesParams): UseCartBarCategoriesResult => {
    const { t } = useTranslation();
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

    const getCategoryLabel = (category: PresentationCategory): string => t(`presentationCategory.${category}`);

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