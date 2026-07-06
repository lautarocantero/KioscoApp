import { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { getProducts, searchProducts } from "../../../../../../store/product/productThunks";
import type { AppDispatch } from "../../../../../../store/product/productSlice";
import SearchBar from "../../../../../shared/components/SearchBar/SearchBar";

export const SellbarSearch = (): React.ReactNode => {
  const dispatch = useDispatch<AppDispatch>();
  const [value, setValue] = useState("");
  const debounceRef = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  useEffect(() => {
    clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => {
      if (value.trim() === "") {
        dispatch(getProducts());
      } else {
        dispatch(searchProducts(value));
      }
    }, 350);
    return () => clearTimeout(debounceRef.current);
  }, [value]);

  return (
    <SearchBar
      value={value}
      onChange={setValue}
      placeholder="Buscar..."
      fullWidth
    />
  );
};