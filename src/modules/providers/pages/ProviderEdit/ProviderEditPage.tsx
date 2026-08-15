import type { ReactNode } from "react";
import AppLayout from "../../../shared/layout/AppLayout";
import ProviderForm from "../../components/ProviderForm/ProviderForm";
import { FormModeComplexEnum } from "@typings/shared/sharedEnums";

const ProviderEditPage = (): ReactNode => {
    return (
        <AppLayout>
            <ProviderForm mode={FormModeComplexEnum.Edit} />
        </AppLayout>
    );
};

export default ProviderEditPage;
