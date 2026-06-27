// modules/Presentations/pages/PresentationEditPage.tsx

import React from "react";
import AppLayout from "../../../shared/layout/AppLayout";
import PresentationForm from "../../../../modules/presentations/components/PresentationForm/PresentationForm";

const PresentationEditPage = (): React.ReactNode => {
    return (
        <AppLayout title="Editar presentación">
            <PresentationForm mode ="edit"  />
        </AppLayout>
    );
};

export default PresentationEditPage;