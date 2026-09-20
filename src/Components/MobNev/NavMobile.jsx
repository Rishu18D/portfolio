import './NavMobile.css';
import { NavLink } from 'react-router-dom';
import { Home, UserRound, Layers3, Send } from 'lucide-react';

const NavMobile = () => <nav className="bottom-nav" aria-label="Mobile navigation">
  {[['/', Home, 'home'], ['/about', UserRound, 'about'], ['/projects', Layers3, 'work'], ['/contact', Send, 'contact']].map(([to, Icon, label]) =>
    <NavLink key={to} to={to} end={to === '/'}><Icon size={18} /><span>{label}</span></NavLink>)}
</nav>;

export default NavMobile;
