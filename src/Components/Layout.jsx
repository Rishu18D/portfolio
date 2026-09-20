import { Outlet, useLocation } from 'react-router-dom';
import Navbar from './Navbar/Navbar';
import NavMobile from './MobNev/NavMobile';
import Pagination from './PaginationLinks';
import AiChat from './AiChat';

const pageOrder = ['/', '/about', '/skills', '/projects', '/contact'];

const Layout = () => {
  const { pathname } = useLocation();
  const index = pageOrder.indexOf(pathname);
  const previous = pageOrder[(index - 1 + pageOrder.length) % pageOrder.length];
  const next = pageOrder[(index + 1) % pageOrder.length];

  return (
    <div className="app-shell">
      <Navbar />
      <Outlet />
      <AiChat />
      <Pagination prevPage={previous} nextPage={next} />
      <NavMobile />
    </div>
  );
};

export default Layout;
