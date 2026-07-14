import React from "react";
import AppLayout from "../../../shared/layout/AppLayout";
import PresentationForm from "../../components/PresentationForm/PresentationForm";
import { FormModeSimpleEnum } from "@typings/shared/sharedEnums";


const PresentationCreatePage = (): React.ReactNode => {
    return (
        <AppLayout>
            <PresentationForm mode={FormModeSimpleEnum.Create} />
        </AppLayout>
    );
};

export default PresentationCreatePage;