import { describe, it, expect } from "vitest";
import { renderHook } from "@testing-library/react";
import { useCartFormik } from "../useCartFormik";
import { PaymentMethod, SellStatusEnum } from "@typings/sells/sellsEnum";

describe("useCartFormik", () => {
  it("arma initialValues con el estado completo por defecto", () => {
    const { result } = renderHook(() => useCartFormik(100));

    expect(result.current.initialValues).toEqual({
      payment_method: PaymentMethod.Transfer,
      status: SellStatusEnum.Completada,
      amount_paid: null,
      debtor_name: null,
    });
  });

  it("recalcula el validationSchema cuando cambia total", () => {
    const { result, rerender } = renderHook(({ total }) => useCartFormik(total), { initialProps: { total: 100 } });
    const first = result.current.validationSchema;

    rerender({ total: 200 });

    expect(result.current.validationSchema).not.toBe(first);
  });
});
