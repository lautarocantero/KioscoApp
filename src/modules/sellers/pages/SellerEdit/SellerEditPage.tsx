import type { ReactNode } from "react";
import AppLayout from "../../../shared/layout/AppLayout";
import SellerForm from "../../components/SellerForm/SellerForm";
import { FormModeComplexEnum } from "@typings/shared/sharedEnums";

const SellerEditPage = (): ReactNode => {
    return (
        <AppLayout>
            <SellerForm mode={FormModeComplexEnum.Edit} />
        </AppLayout>
    );
};

export default SellerEditPage;
