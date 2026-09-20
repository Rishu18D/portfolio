import { ArrowUpRight } from 'lucide-react';
import { FaGithub } from 'react-icons/fa';
import portfolio from '../../../public/assets/Images/my-Portfolio.png?url';
import PhotoGallery from '../../../public/assets/Images/abc.png?url';
import Ecom from '../../../public/assets/Images/bbb.png?url';
import './Projects.css';

const projects = [
  { title: 'My Portfolio', type: 'personal / 2024', image: portfolio, description: 'A cinematic portfolio experience with a focus on motion, clarity, and personality.', tags: ['React', 'Vite', 'CSS'], code: 'https://github.com/Rishu18D/My-Portfolio', demo: 'https://my-portfolio-chi-rosy-55.vercel.app/' },
  { title: 'Photo Gallery', type: 'full-stack / 2023', image: PhotoGallery, description: 'A social gallery for uploading, curating, and discovering photographs.', tags: ['MERN', 'Cloudinary', 'REST'], code: 'https://github.com/Rishu18D/Photo_gallery', demo: 'https://photo-gallery-frontend-1840.onrender.com' },
  { title: 'Commerce SSR', type: 'full-stack / 2023', image: Ecom, description: 'Server-rendered commerce with a lean browsing experience and secure checkout flow.', tags: ['EJS', 'Node', 'MongoDB'], code: 'https://github.com/Rishu18D/E-commerce_SSR', demo: 'https://e-commerce-ssr-1.onrender.com' },
];

const Projects = () => <main className="page inner-page projects-page">
  <header className="page-heading split-heading"><div><p className="eyebrow">04 / selected work</p><h1>Things I&apos;ve<br /><em>built recently.</em></h1></div><p className="heading-note">A small archive of experiments, shipped products, and lessons learned along the way.</p></header>
  <div className="project-grid">{projects.map((project, index) => <article className="project-card" key={project.title}><div className="project-image"><img src={project.image} alt={`${project.title} preview`} /><span>0{index + 1}</span></div><div className="project-meta"><p>{project.type}</p><h2>{project.title}</h2><p className="project-description">{project.description}</p><div className="tag-list">{project.tags.map(tag => <span key={tag}>{tag}</span>)}</div><div className="project-links"><a href={project.code} target="_blank" rel="noreferrer"><FaGithub size={15} /> source</a><a href={project.demo} target="_blank" rel="noreferrer">live <ArrowUpRight size={15} /></a></div></div></article>)}</div>
</main>;

export default Projects;
