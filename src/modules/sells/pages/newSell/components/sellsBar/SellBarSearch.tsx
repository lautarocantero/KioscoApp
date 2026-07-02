import { Grid, InputBase, type Theme } from "@mui/material"
import SearchIcon from '@mui/icons-material/Search';
import { getProducts, searchProducts } from "../../../../../../store/product/productThunks";
import { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import type { AppDispatch } from "../../../../../../store/product/productSlice";

export const SellbarSearch = (): React.ReactNode => {
    const dispatch = useDispatch<AppDispatch>();
    const [value, setValue] = useState('');
    const debounceRef = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

    useEffect(() => {
        clearTimeout(debounceRef.current);
        debounceRef.current = setTimeout(() => {
            if (value.trim() === '') {
                dispatch(getProducts());        // sin filtro, trae todo
            } else {
                dispatch(searchProducts(value));
            }
        }, 350);
        return () => clearTimeout(debounceRef.current);
    }, [value]);


    return (
        <Grid
            sx={(theme: Theme) => ({
                alignItems: 'center',
                backgroundColor: theme?.custom?.posSurface,
                borderRadius: '0.3em',
                color: theme?.custom?.fontColor,
                display: 'flex',
                flexDirection: 'row',
                gap: '0.5em',
                padding: '0.4em 0.8em',
                width: '100%',
            })}
        >
            <SearchIcon
                sx={(theme: Theme) => ({
                    color: theme?.custom?.fontColor,
                    fontSize: '1.1em',
                    opacity: 0.6,
                    flexShrink: 0,
                })}
            />
            <InputBase
                placeholder="Buscar..."
                value={value}
                onChange={(e) => setValue(e.target.value)}
                sx={(theme: Theme) => ({
                    color: theme?.custom?.fontColor,
                    fontSize: '0.9em',
                    width: '100%',
                    '& ::placeholder': {
                        opacity: 0.5,
                    },
                })}
            />
        </Grid>
    )
}