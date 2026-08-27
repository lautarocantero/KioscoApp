import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import type { TFunction } from "i18next";
import { PaymentMethod, SellStatusEnum } from "@typings/sells/sellsEnum";
import type { SellTicketType } from "@typings/sells/sellTypes";
import { exportSellsToCsv } from "../../helpers/exportSellsToCsv";

const buildSell = (overrides: Partial<SellTicketType>): SellTicketType => ({
    _id: "ticket-1",
    currency: "ars",
    iva: 0,
    modification_date: null,
    payment_method: PaymentMethod.Cash,
    products: [],
    purchase_date: new Date(2026, 7, 15, 10, 0).toISOString(),
    seller_id: "seller-1",
    seller_name: "Lucas",
    sub_total: 100,
    total_amount: 100,
    status: SellStatusEnum.Completada,
    amount_paid: null,
    debtor_name: null,
    settles_sell_id: null,
    settled_by_sell_id: null,
    ...overrides,
} as SellTicketType);

const t = ((key: string) => key) as unknown as TFunction;

describe("exportSellsToCsv", () => {
    let createObjectURL: ReturnType<typeof vi.fn>;
    let revokeObjectURL: ReturnType<typeof vi.fn>;
    let clickSpy: ReturnType<typeof vi.spyOn>;

    beforeEach(() => {
        createObjectURL = vi.fn(() => "blob:mock-url");
        revokeObjectURL = vi.fn();
        URL.createObjectURL = createObjectURL;
        URL.revokeObjectURL = revokeObjectURL;
        clickSpy = vi.spyOn(HTMLAnchorElement.prototype, "click").mockImplementation(() => {});
    });

    afterEach(() => {
        clickSpy.mockRestore();
    });

    it("arma un Blob CSV, dispara la descarga con el nombre pedido y libera la URL", () => {
        const sells = [buildSell({})];

        exportSellsToCsv(sells, "ventas-2026-08-15.csv", t);

        expect(createObjectURL).toHaveBeenCalledTimes(1);
        const [blob] = createObjectURL.mock.calls[0];
        expect(blob.type).toBe("text/csv;charset=utf-8;");
        expect(clickSpy).toHaveBeenCalledTimes(1);
        expect(revokeObjectURL).toHaveBeenCalledWith("blob:mock-url");
    });

    it("exporta el header y una fila por venta, escapando comillas", () => {
        // jsdom no implementa Blob.text(); se reemplaza el constructor global
        // por uno que sólo guarda las partes recibidas, para leer el
        // contenido armado sin depender de esa API.
        class RecordingBlob {
            parts: BlobPart[];
            type: string;

            constructor(parts: BlobPart[] = [], options: BlobPropertyBag = {}) {
                this.parts = parts;
                this.type = options.type ?? "";
            }
        }

        const OriginalBlob = globalThis.Blob;
        globalThis.Blob = RecordingBlob as unknown as typeof Blob;

        const sells = [buildSell({ seller_name: 'Ana "la" Torres' })];
        exportSellsToCsv(sells, "ventas.csv", t);

        const [blob] = createObjectURL.mock.calls[0];
        const lines = (blob as unknown as RecordingBlob).parts.join("").split("\n");
        expect(lines).toHaveLength(2);
        expect(lines[1]).toContain('"Ana ""la"" Torres"');

        globalThis.Blob = OriginalBlob;
    });
});
