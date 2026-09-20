import { ArrowUpRight, Mail, MapPin } from 'lucide-react';
import { FaGithub, FaLinkedin } from 'react-icons/fa';
import './Contact.css';

const Contact = () => <main className="page inner-page contact-page">
  <header className="page-heading"><p className="eyebrow">05 / say hello</p><h1>Have a project<br /><em>in mind?</em></h1><p className="heading-note">Tell me a little about what you&apos;re building. I&apos;ll get back to you within a couple of days.</p></header>
  <div className="contact-grid"><aside><a className="contact-detail" href="mailto:rishusinghmorals@gmail.com"><Mail /><span><small>email</small>rishusinghmorals@gmail.com</span></a><div className="contact-detail"><MapPin /><span><small>based in</small>Delhi, India</span></div><div className="social-row"><a href="https://github.com/Rishu18D" aria-label="GitHub"><FaGithub size={18} /></a><a href="https://www.linkedin.com/in/rishu018" aria-label="LinkedIn"><FaLinkedin size={18} /></a></div></aside><form className="contact-form" action="https://formspree.io/f/mjkbdrzw" method="POST"><div className="form-row"><label>your name<input type="text" name="name" placeholder="Jane Doe" required /></label><label>email address<input type="email" name="email" placeholder="jane@example.com" required /></label></div><label>what&apos;s on your mind?<textarea name="message" rows="5" placeholder="Tell me about your idea..." required /></label><button className="button button-primary" type="submit">send message <ArrowUpRight size={17} /></button></form></div>
</main>;

export default Contact;
