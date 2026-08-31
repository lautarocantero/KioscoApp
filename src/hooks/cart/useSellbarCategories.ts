import { useEffect, useState, type MouseEvent } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import type { PresentationCategory } from "@typings/presentation/presentationEnum";
import { AlertColor } from "../../typings/ui/ui";
import { getAvailableCategoriesRequest } from "../../modules/presentations/api/presentationsApi";
import type { UseCartBarCategoriesParams, UseCartBarCategoriesResult } from "@typings/cart/cartTypes";
import type { AppDispatch, RootState } from "../../store/cart/cartSlice";
import { setSelectedCategoryThunk } from "../../store/cart/cartThunks";
import { sortCategoriesAlphabetically } from "../../modules/cart/helpers/sortCategoriesAlphabetically";

/*══════════════════════════════════════════════════════════════════════╗
║ 🏷️ useSellbarCategories                                               ║
║ Trae las categorías disponibles y maneja el estado del filtro de      ║
║ categoría: apertura/cierre del menú y traducción a label. La          ║
║ selección vive en Redux (state.cart.selectedCategory, ya es la        ║
║ fuente que dispara el fetch de productos) en vez de un useState local ║
║ espejado — así el hook se puede llamar de forma segura desde más de   ║
║ un componente (chips del catálogo) sin desincronizar dos instancias.  ║
╚══════════════════════════════════════════════════════════════════════╝*/

export const useSellbarCategories = ({ showSnackBar }: UseCartBarCategoriesParams): UseCartBarCategoriesResult => {
    const { t } = useTranslation();
    const dispatch = useDispatch<AppDispatch>();

    const [categoriesList, setCategoriesList] = useState<PresentationCategory[]>([]);
    const [isLoadingCategories, setIsLoadingCategories] = useState(false);
    const [categoryAnchorEl, setCategoryAnchorEl] = useState<HTMLElement | null>(null);

    const selectedCategory = useSelector((state: RootState) => state.cart.selectedCategory);

    useEffect(() => {
        const fetchCategories = async () => {
            setIsLoadingCategories(true);
            try {
                const result: PresentationCategory[] = await getAvailableCategoriesRequest();
                const sorted = sortCategoriesAlphabetically(result ?? [], (category) => t(`presentationCategory.${category}`));
                setCategoriesList(sorted);
            } catch {
                showSnackBar(t("cart.snackbar.categoriesLoadFailed"), AlertColor.Error);
            } finally {
                setIsLoadingCategories(false);
            }
        };

        void fetchCategories();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [t]);

    const handleOpenCategoryMenu = (event: MouseEvent<HTMLElement>) => setCategoryAnchorEl(event.currentTarget);
    const handleCloseCategoryMenu = () => setCategoryAnchorEl(null);

    const handleSelectCategory = (category: PresentationCategory | null) => {
        dispatch(setSelectedCategoryThunk(category));
        handleCloseCategoryMenu();
    };

    const getCategoryLabel = (category: PresentationCategory): string => t(`presentationCategory.${category}`);

    return {
        list: categoriesList,
        isLoading: isLoadingCategories,
        selected: selectedCategory,
        selectedLabel: selectedCategory ? getCategoryLabel(selectedCategory) : null,
        getLabel: getCategoryLabel,
        anchorEl: categoryAnchorEl,
        isMenuOpen: Boolean(categoryAnchorEl),
        onOpenMenu: handleOpenCategoryMenu,
        onCloseMenu: handleCloseCategoryMenu,
        onSelect: handleSelectCategory,
    };
};
