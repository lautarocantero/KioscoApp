// CategoriesPage.tsx
import BookmarksIcon from '@mui/icons-material/Bookmarks';
import { useCategoriesLinks } from '../../../hooks/categories/useLinksData';
import DisplayOptions from '../../shared/components/OptionsItems/DisplayOptions';

const CategoriesPage = (): React.ReactNode => {
  const links = useCategoriesLinks();

  return (
    <DisplayOptions title='Categorias' icon={<BookmarksIcon />} links={links} />
  );
};

export default CategoriesPage;