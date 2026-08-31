import { Box } from "@mui/material";
import { memo, type ReactNode } from "react";
import type { CartItemsListProps } from "@typings/cart/cartComponentTypes";
import CartLineItem from "./CartLineItem";
import CartEmptyComponent from "./EmptyCartComponent";

const CartItemsList = ({ cart, onIncrease, onDecrease, onItemDiscountChange }: CartItemsListProps): ReactNode => {
  if (cart.length === 0) return <CartEmptyComponent />;

  return (
    <Box component="ul" sx={{ m: 0, p: 0, width: "100%" }}>
      {cart.map((product) => (
        <CartLineItem
          key={product._id}
          product={product}
          onIncrease={onIncrease}
          onDecrease={onDecrease}
          onItemDiscountChange={onItemDiscountChange}
        />
      ))}
    </Box>
  );
};

export default memo(CartItemsList);
