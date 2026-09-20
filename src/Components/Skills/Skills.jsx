import './Skills.css';
import htmlicon from '../../../public/assets/icons/html-icon.svg';
import cssicon from '../../../public/assets/icons/css-icon.svg';
import js from '../../../public/assets/icons/javascript.svg';
import reactIcon from '../../../public/assets/icons/reactjs.svg';
import tailwind from '../../../public/assets/icons/tailwind.svg';
import redux from '../../../public/assets/icons/redux.svg';
import nodejs from '../../../public/assets/icons/nodejs.svg';
import express from '../../../public/assets/icons/express.svg';
import mongodb from '../../../public/assets/icons/mongodb.svg';
import git from '../../../public/assets/icons/git.svg';
import github from '../../../public/assets/icons/github.svg';
import python from '../../../public/assets/icons/python.svg';
import docker from '../../../public/assets/icons/docker.svg';

const groups = [
  ['01 / languages', [{ name: 'JavaScript', icon: js }, { name: 'Python', icon: python }]],
  ['02 / frontend', [{ name: 'HTML', icon: htmlicon }, { name: 'CSS', icon: cssicon }, { name: 'React', icon: reactIcon }, { name: 'Next.js', icon: null }, { name: 'Tailwind CSS', icon: tailwind }, { name: 'Redux', icon: redux }]],
  ['03 / backend', [{ name: 'Node.js', icon: nodejs }, { name: 'Express', icon: express }, { name: 'MongoDB', icon: mongodb }]],
  ['04 / devops basics', [{ name: 'Git', icon: git }, { name: 'GitHub', icon: github }, { name: 'Docker', icon: docker }]],
];

const Skills = () => <main className="page inner-page skills-page">
  <header className="page-heading"><p className="eyebrow">03 / toolkit</p><h1>The tools behind<br /><em>the work.</em></h1><p className="heading-note">A growing set of technologies I use to turn concepts into reliable, human-friendly software.</p></header>
  <div className="skill-groups">{groups.map(([label, skills]) => <section className="skill-group" key={label}><h2>{label}</h2><div className="skill-list">{skills.map(skill => <div className="skill-item" key={skill.name}>{skill.icon ? <img src={skill.icon} alt="" /> : <span className="skill-mark" aria-hidden="true">+</span>}<span>{skill.name}</span><i /></div>)}</div></section>)}</div>
</main>;

export default Skills;
