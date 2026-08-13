import { Grid } from "@mui/material";
import { Formik } from "formik";
import { useParams } from "react-router-dom";
import { FormModeComplexEnum } from "@typings/shared/sharedEnums";
import ActualStepComponent from "../../../shared/components/FormCard/ActualStep";
import { FormNavigationContext } from "../../../shared/context/FormNavigationContext";
import FormCard from "../../../shared/components/FormCard/FormCard";
import FormFieldsRenderer from "../../../shared/components/FormCard/FormFieldsRenderer";
import { SELLER_FIELD_REGISTRY } from "./SellerFieldRegistry";
import SellerSkeleton from "./SellerSkeleton";
import EmptySeller from "./EmptySeller";
import { useSellerEdit } from "../../../../hooks/sellers/useSellersForm";
import { useSellerData } from "../../../../hooks/sellers/useSellerData";
import {
    getSellerEditInitialValues,
    sellerEditFormSchema,
} from "./SellerFormSchema.ts";

const STEP_COMPONENTS = [() => (
    <FormCard submitText="Guardar" header={{ title: "Vendedor" }}>
        <FormFieldsRenderer idPrefix="seller" sectionLabel="Datos del vendedor" registry={SELLER_FIELD_REGISTRY} fields={["name", "email", "rol"]} />
    </FormCard>
)];


// ── Modo EDITAR ───────────────────────────────────────────────────────────────
const SellerEditForm = (): React.ReactNode => {
    const { editingSeller, isLoadingSeller, isSubmitting, submitError, handleEdit } = useSellerEdit();

    if (isLoadingSeller) return <SellerSkeleton />;
    if (!editingSeller) return <EmptySeller />;

    return (
        <Formik
            initialValues={getSellerEditInitialValues(editingSeller)}
            validationSchema={sellerEditFormSchema}
            onSubmit={handleEdit}
            validateOnBlur={false}
            validateOnChange={false}
            enableReinitialize
        >
            {({ handleSubmit: formikSubmit, validateForm }) => (
                <FormNavigationContext.Provider
                    value={{
                        currentStep: 0,
                        totalSteps: 1,
                        onNext: async () => {},
                        onPrev: () => {},
                        onSubmit: formikSubmit,
                        isSubmitting,
                        validateForm,
                        submitError,
                        stepErrors: [],
                        actionTitle: FormModeComplexEnum.Edit,
                    }}
                >
                    <Grid container component="form" onSubmit={formikSubmit} sx={{ width: "100%" }}>
                        <ActualStepComponent currentStep={0} stepComponents={STEP_COMPONENTS} />
                    </Grid>
                </FormNavigationContext.Provider>
            )}
        </Formik>
    );
};

// ── Modo DETALLE ─────────────────────────────────────────────────────────────
const SellerDetailForm = (): React.ReactNode => {
    const { seller_id: sellerId } = useParams<{ seller_id: string }>();
    const { sellerData: viewingEntity, isLoading: isLoadingEntity } = useSellerData(sellerId);

    if (isLoadingEntity) return <SellerSkeleton />;
    if (!viewingEntity) return <EmptySeller />;

    return (
        <Formik initialValues={getSellerEditInitialValues(viewingEntity)} onSubmit={() => {}} enableReinitialize>
            {() => (
                <FormNavigationContext.Provider
                    value={{
                        currentStep: 0,
                        totalSteps: 1,
                        onNext: async () => {},
                        onPrev: () => {},
                        onSubmit: () => {},
                        isSubmitting: false,
                        validateForm: async () => ({}),
                        submitError: null,
                        stepErrors: [],
                        actionTitle: FormModeComplexEnum.Detail,
                    }}
                >
                    <Grid
                        container
                        sx={{
                            width: { xs: "100%", sm: "80%", md: "100%" },
                            m: { xs: "3em auto", sm: "3em 1em" },
                        }}
                    >
                        {!isLoadingEntity && (
                            <ActualStepComponent currentStep={0} stepComponents={STEP_COMPONENTS} />
                        )}
                    </Grid>
                </FormNavigationContext.Provider>
            )}
        </Formik>
    );
};

// ── Export público ────────────────────────────────────────────────────────────
const SellerForm = ({ mode = FormModeComplexEnum.Create }: { mode?: FormModeComplexEnum }): React.ReactNode => {
    if (mode === FormModeComplexEnum.Edit) return <SellerEditForm />;
    return <SellerDetailForm />;
};

export default SellerForm;