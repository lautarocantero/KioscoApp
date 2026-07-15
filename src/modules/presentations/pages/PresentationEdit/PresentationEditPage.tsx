import React from "react";
import AppLayout from "../../../shared/layout/AppLayout";
import PresentationForm from "../../../../modules/presentations/components/PresentationForm/PresentationForm";
import { FormModeComplexEnum } from "@typings/shared/sharedEnums";

const PresentationEditPage = (): React.ReactNode => {
    return (
        <AppLayout>
            <PresentationForm mode={FormModeComplexEnum.Edit}  />
        </AppLayout>
    );
};

export default PresentationEditPage;