import React from "react";
import AppLayout from "../../../shared/layout/AppLayout";
import PresentationForm from "../../components/PresentationForm/PresentationForm";
import { FormModeComplexEnum } from "@typings/shared/sharedEnums";


const PresentationCreatePage = (): React.ReactNode => {
    return (
        <AppLayout>
            <PresentationForm mode={FormModeComplexEnum.Create} />
        </AppLayout>
    );
};

export default PresentationCreatePage;