import { Link } from 'react-router-dom';
import { ArrowUpRight, MapPin } from 'lucide-react';
import { FaGithub, FaLinkedin } from 'react-icons/fa';
import ProfileImage from '../../../public/assets/git_dp.jpg?url';
import Resume from '../../../public/assets/New_Updated_Resume.pdf';
import './Home.css';

const Home = () => <main className="page home-page">
  <section className="hero layout-grid">
    <div className="hero-copy">
      <p className="eyebrow"><span className="status-dot" /> available for select projects</p>
      <h1>Building digital<br /><em>experiences</em><br />for the next web.</h1>
      <p className="lede">I&apos;m Rishu Singh — a full-stack developer turning thoughtful ideas into fast, expressive products with a little bit of neon.</p>
      <div className="hero-actions"><Link className="button button-primary" to="/projects">Explore my work <ArrowUpRight size={17} /></Link><a className="text-link" href={Resume} target="_blank" rel="noreferrer">download résumé <ArrowUpRight size={14} /></a></div>
      <div className="social-row"><a href="https://github.com/Rishu18D" aria-label="GitHub"><FaGithub size={18} /></a><a href="https://www.linkedin.com/in/rishu018" aria-label="LinkedIn"><FaLinkedin size={18} /></a><span className="location"><MapPin size={15} /> Delhi, India</span></div>
    </div>
    <div className="hero-visual"><div className="portrait-frame"><img src={ProfileImage} alt="Rishu Singh" /></div><div className="orbit orbit-one" /><div className="orbit orbit-two" /></div>
  </section>
</main>;

export default Home;
