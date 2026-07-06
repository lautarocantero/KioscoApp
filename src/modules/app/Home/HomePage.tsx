import { HomePageLinks } from '../../../config/Links';
import DisplayOptions from '../../shared/components/Options/DisplayOptions';

const HomePage = (): React.ReactNode => {
    return (
      <DisplayOptions title='¿Qué deseas hacer?' links={HomePageLinks} disconnect/>
    )
}

export default HomePage;