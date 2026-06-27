import React from "react";
import AppLayout from "../../../shared/layout/AppLayout";
import PresentationForm from "../../components/PresentationForm/PresentationForm";


const PresentationCreatePage = (): React.ReactNode => {
    return (
        <AppLayout title="Crear presentación">
            <PresentationForm mode="create" />
        </AppLayout>
    );
};

export default PresentationCreatePage;