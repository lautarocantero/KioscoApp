import { describe, it, expect } from "vitest";
import { act, fireEvent } from "@testing-library/react";
import { Formik } from "formik";
import { renderWithTheme } from "../utils/setupTests";
import FormFieldsRenderer from "../../components/FormCard/FormFieldsRenderer";
import type { FieldRegistry } from "@typings/shared/types/formCard.types";

interface TestValues {
    name: string;
    rol: string;
}

const REGISTRY: FieldRegistry<TestValues> = {
    name: {
        label: "Nombre",
        tooltip: "Nombre",
        required: true,
    },
    rol: {
        label: "Rol",
        tooltip: "Rol",
        type: "select",
        options: ["admin", "seller"],
        getOptionLabel: (v) => v,
    },
};

interface RatingTestValues {
    valoration: number;
}

const RATING_REGISTRY: FieldRegistry<RatingTestValues> = {
    valoration: {
        label: "Valoración",
        tooltip: "Valoración",
        type: "rating",
        maxRating: 5,
    },
};

const renderRatingForm = (initialValue = 0) =>
    renderWithTheme(
        <Formik initialValues={{ valoration: initialValue }} onSubmit={() => {}}>
            <FormFieldsRenderer<RatingTestValues>
                idPrefix="test"
                sectionLabel="Datos"
                registry={RATING_REGISTRY}
                fields={["valoration"]}
            />
        </Formik>
    );

const renderForm = (
    disabledFields: (keyof TestValues)[] = [],
    renderBeforeField?: Partial<Record<keyof TestValues, React.ReactNode>>,
) =>
    renderWithTheme(
        <Formik initialValues={{ name: "Juan", rol: "seller" }} onSubmit={() => {}}>
            <FormFieldsRenderer<TestValues>
                idPrefix="test"
                sectionLabel="Datos"
                registry={REGISTRY}
                fields={["name", "rol"]}
                disabledFields={disabledFields}
                renderBeforeField={renderBeforeField}
            />
        </Formik>
    );

describe("FormFieldsRenderer — disabledFields", () => {
    it("no deshabilita ningún campo por defecto", () => {
        const { getByRole } = renderForm();

        expect(getByRole("textbox", { name: "Nombre" })).toBeEnabled();
        expect(getByRole("combobox")).not.toHaveAttribute("aria-disabled");
    });

    it("deshabilita solo el campo select indicado en disabledFields", () => {
        const { getByRole } = renderForm(["rol"]);

        expect(getByRole("textbox", { name: "Nombre" })).toBeEnabled();
        expect(getByRole("combobox")).toHaveAttribute("aria-disabled", "true");
    });

    it("deshabilita solo el campo de texto indicado en disabledFields", () => {
        const { getByRole } = renderForm(["name"]);

        expect(getByRole("textbox", { name: "Nombre" })).toBeDisabled();
        expect(getByRole("combobox")).not.toHaveAttribute("aria-disabled");
    });
});

describe("FormFieldsRenderer — renderBeforeField", () => {
    it("renderiza el contenido antes del campo indicado", () => {
        const { getByText, getByRole } = renderForm([], {
            rol: <span>Solo administradores pueden editar el rol.</span>,
        });

        expect(getByText("Solo administradores pueden editar el rol.")).toBeInTheDocument();
        expect(getByRole("combobox")).toBeInTheDocument();
    });

    it("no renderiza nada extra si no se pasa contenido para ese campo", () => {
        const { queryByText } = renderForm([], { rol: undefined });

        expect(queryByText("Solo administradores pueden editar el rol.")).not.toBeInTheDocument();
    });
});

describe("FormFieldsRenderer — rating", () => {
    it("renderiza el label y las estrellas según maxRating", () => {
        const { getByText, getAllByRole } = renderRatingForm();

        expect(getByText("Valoración")).toBeInTheDocument();
        // maxRating: 5 → 5 radios "N Star(s)" + 1 radio oculto "Empty"
        expect(getAllByRole("radio")).toHaveLength(6);
    });

    it("marca como checked el radio correspondiente al valor inicial", () => {
        const { getByRole } = renderRatingForm(4);

        expect(getByRole("radio", { name: "4 Stars" })).toBeChecked();
    });

    it("actualiza el valor de Formik al seleccionar una estrella", async () => {
        const { getByRole } = renderRatingForm(0);

        const threeStars = getByRole("radio", { name: "3 Stars" });
        await act(async () => {
            fireEvent.click(threeStars);
        });

        expect(threeStars).toBeChecked();
    });
});
