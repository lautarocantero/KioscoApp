// modules/Presentations/pages/PresentationEditPage.tsx

import React from "react";
import AppLayout from "../../../shared/layout/AppLayout";
import PresentationEditFormComponent from "../../pages/PresentationEdit/components/PresentationEdit/PresentationEditForm";

const PresentationEditPage = (): React.ReactNode => {
    return (
        <AppLayout title="Editar presentación">
            <PresentationEditFormComponent />
        </AppLayout>
    );
};

export default PresentationEditPage;