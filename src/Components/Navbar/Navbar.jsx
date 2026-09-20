import { useState } from 'react';
import './Navbar.css';
import { NavLink, Link } from 'react-router-dom';
import { Menu, X, Sun, Moon, Monitor } from 'lucide-react';
import WeatherTracker from '../WeatherTracker.jsx';

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [theme, setTheme] = useState(() => localStorage.getItem('portfolio-theme') || 'system');
  const links = [['/', 'home'], ['/about', 'about'], ['/skills', 'skills'], ['/projects', 'projects'], ['/contact', 'contact']];
  const themeOptions = ['system', 'day', 'night'];
  const themeIcons = { system: Monitor, day: Sun, night: Moon };
  const ThemeIcon = themeIcons[theme];

  const changeTheme = () => {
    const nextTheme = themeOptions[(themeOptions.indexOf(theme) + 1) % themeOptions.length];
    setTheme(nextTheme);
    localStorage.setItem('portfolio-theme', nextTheme);
    document.documentElement.dataset.theme = nextTheme;
  };

  if (!document.documentElement.dataset.theme) {
    document.documentElement.dataset.theme = theme;
  }

  return (
    <nav className="site-nav" aria-label="Primary navigation">
      <Link className="brand" to="/" onClick={() => setOpen(false)}><span>RS</span><strong>RISHU<span>.DEV</span></strong></Link>
      <WeatherTracker />
      <button className="menu-toggle" onClick={() => setOpen(!open)} aria-expanded={open} aria-label={open ? 'Close menu' : 'Open menu'}>
        {open ? <X size={22} /> : <Menu size={22} />}
      </button>
      <div className={`nav-links ${open ? 'is-open' : ''}`}>
        {links.map(([to, label]) => <NavLink key={to} to={to} end={to === '/'} onClick={() => setOpen(false)}>{label}</NavLink>)}
        <button className="theme-toggle" type="button" onClick={changeTheme} aria-label={`Theme: ${theme}. Click to change theme`} title={`Theme: ${theme}`}><ThemeIcon size={15} /><span>{theme}</span></button>
      </div>
    </nav>
  );
};

export default Navbar;
