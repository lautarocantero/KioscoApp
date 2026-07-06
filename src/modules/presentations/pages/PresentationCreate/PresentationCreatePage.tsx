import React from "react";
import AppLayout from "../../../shared/layout/AppLayout";
import PresentationForm from "../../components/PresentationForm/PresentationForm";


const PresentationCreatePage = (): React.ReactNode => {
    return (
        <AppLayout>
            <PresentationForm mode="create" />
        </AppLayout>
    );
};

export default PresentationCreatePage;