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
import { useSellerCreate, useSellerEdit } from "../../../../hooks/sellers/useSellersForm";
import { useSellerData } from "../../../../hooks/sellers/useSellerData";
import * as Yup from "yup";
import type { ReactNode } from "react";

const sellerFormSchema = Yup.object({
    name: Yup.string().trim().min(1).required("Nombre requerido"),
    email: Yup.string().email("Email inválido").required("Email requerido"),
});

const getSellerFormInitialValues = () => ({ name: "", email: "", password: "", rol: "seller" });

const getSellerEditInitialValues = (seller: any | null) => ({ name: seller?.name ?? "", email: seller?.email ?? "", rol: seller?.rol ?? "seller" });

const STEP_COMPONENTS = [() => (
    <FormCard submitText="Guardar" header={{ title: "Vendedor" }}>
        <FormFieldsRenderer idPrefix="seller" sectionLabel="Datos del vendedor" registry={SELLER_FIELD_REGISTRY} fields={["name", "email", "rol"]} />
    </FormCard>
)];

const SellerForm = ({ mode = FormModeComplexEnum.Create }: { mode?: FormModeComplexEnum }): ReactNode => {
    if (mode === FormModeComplexEnum.Create) return <SellerCreateForm />;
    if (mode === FormModeComplexEnum.Edit) return <SellerEditForm />;
    return <SellerDetailForm />;
};

const SellerCreateForm = (): ReactNode => {
    const { isSubmitting, submitError, handleSubmit } = useSellerCreate();

    return (
        <Formik initialValues={getSellerFormInitialValues()} validationSchema={sellerFormSchema} onSubmit={handleSubmit}>
            {({ handleSubmit: formikSubmit }) => (
                <FormNavigationContext.Provider value={{ actionTitle: FormModeComplexEnum.Create, currentStep: 0, totalSteps: 1, onNext: async () => {}, onPrev: () => {}, onSubmit: formikSubmit, isSubmitting: isSubmitting, validateForm: async () => ({} as any), submitError: submitError, stepErrors: [] }}>
                    <Grid container component="form" onSubmit={formikSubmit} sx={{ width: "100%" }}>
                        <ActualStepComponent currentStep={0} stepComponents={STEP_COMPONENTS} />
                    </Grid>
                </FormNavigationContext.Provider>
            )}
        </Formik>
    );
};

const SellerEditForm = (): ReactNode => {
    const { seller_id: sellerId } = useParams<{ seller_id: string }>();
    const { editingSeller, isLoadingSeller, isSubmitting, submitError, handleEdit } = useSellerEdit();

    if (isLoadingSeller) return <SellerSkeleton />;
    if (!editingSeller) return <EmptySeller />;

    return (
        <Formik initialValues={getSellerEditInitialValues(editingSeller)} validationSchema={sellerFormSchema} onSubmit={handleEdit} enableReinitialize>
            {({ handleSubmit: formikSubmit }) => (
                <FormNavigationContext.Provider value={{ actionTitle: FormModeComplexEnum.Edit, currentStep: 0, totalSteps: 1, onNext: async () => {}, onPrev: () => {}, onSubmit: formikSubmit, isSubmitting: isSubmitting, validateForm: async () => ({} as any), submitError: submitError, stepErrors: [] }}>
                    <Grid container component="form" onSubmit={formikSubmit} sx={{ width: "100%" }}>
                        <ActualStepComponent currentStep={0} stepComponents={STEP_COMPONENTS} />
                    </Grid>
                </FormNavigationContext.Provider>
            )}
        </Formik>
    );
};

const SellerDetailForm = (): ReactNode => {
    const { seller_id: sellerId } = useParams<{ seller_id: string }>();
    const { sellerData: viewingEntity, isLoading } = useSellerData(sellerId);

    if (isLoading) return <SellerSkeleton />;
    if (!viewingEntity) return <EmptySeller />;

    return (
        <Formik initialValues={getSellerEditInitialValues(viewingEntity)} onSubmit={() => {}} enableReinitialize>
            {() => (
                <FormNavigationContext.Provider value={{ actionTitle: FormModeComplexEnum.Detail, currentStep: 0, totalSteps: 1, onNext: async () => {}, onPrev: () => {}, onSubmit: () => {}, isSubmitting: false, validateForm: async () => ({} as any), submitError: null, stepErrors: [] }}>
                    <Grid container sx={{ width: "100%" }}>
                        <ActualStepComponent currentStep={0} stepComponents={STEP_COMPONENTS} />
                    </Grid>
                </FormNavigationContext.Provider>
            )}
        </Formik>
    );
};

export default SellerForm;
