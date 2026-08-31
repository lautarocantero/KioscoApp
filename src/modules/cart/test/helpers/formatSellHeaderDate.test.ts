import { describe, it, expect } from "vitest";
import { formatSellHeaderDate } from "../../helpers/formatSellHeaderDate";

describe("formatSellHeaderDate", () => {
  it("formatea como 'Día D · HH:mm' con el día capitalizado", () => {
    const date = new Date(2026, 7, 28, 18, 40);
    expect(formatSellHeaderDate(date)).toBe("Vie 28 · 18:40");
  });

  it("agrega ceros a la izquierda en la hora", () => {
    const date = new Date(2026, 0, 5, 9, 5);
    expect(formatSellHeaderDate(date)).toBe("Lun 5 · 09:05");
  });
});
