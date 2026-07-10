import { useHomePageLinks } from '../../../hooks/shared/useLinksData';
import DisplayOptions from '../../shared/components/OptionsItems/DisplayOptions';

const HomePage = (): React.ReactNode => {
    const links = useHomePageLinks();

    return (
      <DisplayOptions title='¿Qué deseas hacer?' links={links} disconnect greetings='¡Hola! 👋'/>
    )
}

export default HomePage;