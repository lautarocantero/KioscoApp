import type { ReactNode } from "react";
import AppLayout from "../../../shared/layout/AppLayout";
import SellerForm from "../../components/SellerForm/SellerForm";
import { FormModeComplexEnum } from "@typings/shared/sharedEnums";

const SellerDetailPage = (): ReactNode => {
    return (
        <AppLayout>
            <SellerForm mode={FormModeComplexEnum.Detail} />
        </AppLayout>
    );
};

export default SellerDetailPage;
