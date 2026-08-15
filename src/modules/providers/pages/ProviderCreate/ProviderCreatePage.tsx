import type { ReactNode } from "react";
import AppLayout from "../../../shared/layout/AppLayout";
import ProviderForm from "../../components/ProviderForm/ProviderForm";
import { FormModeComplexEnum } from "@typings/shared/sharedEnums";

const ProviderCreatePage = (): ReactNode => {
    return (
        <AppLayout>
            <ProviderForm mode={FormModeComplexEnum.Create} />
        </AppLayout>
    );
};

export default ProviderCreatePage;
