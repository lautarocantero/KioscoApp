import { describe, it, expect, vi, beforeEach } from "vitest";
import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { useSelector } from "react-redux";
import { renderWithTheme } from "../../../../../test/utils/setupTests";
import SidebarUserAvatar from "../SidebarUserAvatar";

vi.mock("react-redux", async () => {
    const actual = await vi.importActual("react-redux");
    return { ...actual, useSelector: vi.fn() };
});

const mockedUseSelector = vi.mocked(useSelector);

const mockAuthenticated = () => {
    mockedUseSelector.mockImplementation((selectorFn: (state: unknown) => unknown) =>
        selectorFn({
            auth: { _id: "u1", name: "Lautaro", email: "lautaro@test.com", profilePhoto: null, isLoading: false, isAuthenticated: true },
            kiosco: { myKioscos: [], activeKioscoId: null },
        })
    );
};

describe("SidebarUserAvatar", () => {
    beforeEach(() => vi.clearAllMocks());

    it("no renderiza nada mientras no hay usuario resuelto", () => {
        mockedUseSelector.mockImplementation((selectorFn: (state: unknown) => unknown) =>
            selectorFn({
                auth: { _id: null, name: "", email: "", profilePhoto: null, isLoading: false, isAuthenticated: false },
                kiosco: { myKioscos: [], activeKioscoId: null },
            })
        );

        const { container } = renderWithTheme(<SidebarUserAvatar isActive={false} onClick={vi.fn()} />);
        expect(container).toBeEmptyDOMElement();
    });

    it("dispara onClick al tocarlo", async () => {
        mockAuthenticated();
        const user = userEvent.setup();
        const onClick = vi.fn();

        renderWithTheme(<SidebarUserAvatar isActive={false} onClick={onClick} />);

        await user.click(screen.getByRole("button", { name: "Usuario: Lautaro" }));

        expect(onClick).toHaveBeenCalledTimes(1);
    });

    it("muestra la inicial del nombre cuando no hay avatarUrl", () => {
        mockAuthenticated();
        renderWithTheme(<SidebarUserAvatar isActive={false} onClick={vi.fn()} />);

        expect(screen.getByText("L")).toBeInTheDocument();
    });
});
