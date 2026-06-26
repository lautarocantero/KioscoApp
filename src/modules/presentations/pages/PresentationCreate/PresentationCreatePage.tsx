import React from "react";
import AppLayout from "../../../shared/layout/AppLayout";
import PresentationFormComponent from "../../components/PresentationForm/PresentationForm";


const PresentationCreatePage = (): React.ReactNode => {
    return (
        <AppLayout title="Crear presentación">
            <PresentationFormComponent />
        </AppLayout>
    );
};

export default PresentationCreatePage;