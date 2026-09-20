import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './Components/Home/Home.jsx';
import About from './Components/About/About.jsx';
import Skills from './Components/Skills/Skills.jsx';
import Projects from './Components/Projects/Projects.jsx';
import Contact from './Components/ContactMe/Contact.jsx';
import Layout from './Components/Layout.jsx';
import './index.css';

const App = () => {
  return <Router><Routes><Route element={<Layout />}>
    <Route path="/" element={<Home />} />
    <Route path="/about" element={<About />} />
    <Route path="/skills" element={<Skills />} />
    <Route path="/projects" element={<Projects />} />
    <Route path="/contact" element={<Contact />} />
  </Route></Routes></Router>;
}

export default App