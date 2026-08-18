import { describe, it, expect, vi, beforeEach } from "vitest";
import { screen, fireEvent } from "@testing-library/react";
import { renderWithTheme } from "../../../shared/test/utils/setupTests";
import InviteSellerModal from "../../components/InviteSellerModal/InviteSellerModal";
import { useKioscoInvite } from "../../../../hooks/kiosco/useKioscoInvite";

vi.mock("../../../../hooks/kiosco/useKioscoInvite");

const mockedUseKioscoInvite = vi.mocked(useKioscoInvite);

const INVITE_INFO = { invite_code: "ABC123", invite_link: "https://stocko.app/join-kiosco?code=ABC123" };

describe("InviteSellerModal", () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    it("no renderiza contenido si está cerrado", () => {
        mockedUseKioscoInvite.mockReturnValue({
            inviteInfo: null,
            loading: false,
            error: null,
            copied: false,
            handleCopy: vi.fn(),
        });

        renderWithTheme(<InviteSellerModal open={false} onClose={vi.fn()} />);

        expect(screen.queryByText("Agregar vendedor")).not.toBeInTheDocument();
    });

    it("muestra skeletons mientras carga", () => {
        mockedUseKioscoInvite.mockReturnValue({
            inviteInfo: null,
            loading: true,
            error: null,
            copied: false,
            handleCopy: vi.fn(),
        });

        renderWithTheme(<InviteSellerModal open={true} onClose={vi.fn()} />);

        expect(screen.getByText("Agregar vendedor")).toBeInTheDocument();
        expect(screen.queryByLabelText("Código de invitación")).not.toBeInTheDocument();
    });

    it("muestra un mensaje de error si falló la petición", () => {
        mockedUseKioscoInvite.mockReturnValue({
            inviteInfo: null,
            loading: false,
            error: "No se pudo obtener el código de invitación",
            copied: false,
            handleCopy: vi.fn(),
        });

        renderWithTheme(<InviteSellerModal open={true} onClose={vi.fn()} />);

        expect(screen.getByText("No se pudo obtener el código de invitación")).toBeInTheDocument();
    });

    it("muestra el código y el link de invitación cuando terminó de cargar", () => {
        mockedUseKioscoInvite.mockReturnValue({
            inviteInfo: INVITE_INFO,
            loading: false,
            error: null,
            copied: false,
            handleCopy: vi.fn(),
        });

        renderWithTheme(<InviteSellerModal open={true} onClose={vi.fn()} />);

        expect(screen.getByDisplayValue("ABC123")).toBeInTheDocument();
        expect(screen.getByDisplayValue(INVITE_INFO.invite_link)).toBeInTheDocument();
    });

    it("llama a handleCopy al hacer click en copiar link", () => {
        const handleCopy = vi.fn();
        mockedUseKioscoInvite.mockReturnValue({
            inviteInfo: INVITE_INFO,
            loading: false,
            error: null,
            copied: false,
            handleCopy,
        });

        renderWithTheme(<InviteSellerModal open={true} onClose={vi.fn()} />);
        fireEvent.click(screen.getByText("Copiar link"));

        expect(handleCopy).toHaveBeenCalledTimes(1);
    });

    it("muestra el estado copiado cuando copied es true", () => {
        mockedUseKioscoInvite.mockReturnValue({
            inviteInfo: INVITE_INFO,
            loading: false,
            error: null,
            copied: true,
            handleCopy: vi.fn(),
        });

        renderWithTheme(<InviteSellerModal open={true} onClose={vi.fn()} />);

        expect(screen.getByText("¡Copiado!")).toBeInTheDocument();
    });

    it("llama a onClose al hacer click en el botón de cerrar", () => {
        const onClose = vi.fn();
        mockedUseKioscoInvite.mockReturnValue({
            inviteInfo: INVITE_INFO,
            loading: false,
            error: null,
            copied: false,
            handleCopy: vi.fn(),
        });

        renderWithTheme(<InviteSellerModal open={true} onClose={onClose} />);
        fireEvent.click(screen.getByLabelText("Cerrar"));

        expect(onClose).toHaveBeenCalledTimes(1);
    });
});
