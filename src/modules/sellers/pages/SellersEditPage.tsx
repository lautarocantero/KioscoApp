import AppLayout from "../../shared/layout/AppLayout";
import SellerForm from "../components/SellerForm/SellerForm";
import { FormModeComplexEnum } from "@typings/shared/sharedEnums";

const ShopSellersEditPage = ():React.ReactNode => {
    return (
        <AppLayout>
            <SellerForm mode={FormModeComplexEnum.Edit} />
        </AppLayout>
    )
}

export default ShopSellersEditPage;