
import AppLayout from "../../shared/layout/AppLayout";
import SellerForm from "../components/SellerForm/SellerForm";
import { FormModeComplexEnum } from "@typings/shared/sharedEnums";

const ShopSellersCreatePage = ():React.ReactNode => {
    return (
        <AppLayout>
            <SellerForm mode={FormModeComplexEnum.Create} />
        </AppLayout>
    )
}

export default ShopSellersCreatePage;