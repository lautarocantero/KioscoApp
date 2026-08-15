import { useShopPageLinks } from "../../../../hooks/shop/useShopPageLinks";
import { useShopGreeting } from "../../../../hooks/shop/useShopGreeting";
import DisplayOptions from "../../../shared/components/OptionsItems/DisplayOptions";

const ShopPage = (): React.ReactNode => {
    const links = useShopPageLinks();
    const { greeting } = useShopGreeting();

    return (
        <DisplayOptions title="Tienda" links={links} disconnect greetings={greeting} />
    );
};

export default ShopPage;
