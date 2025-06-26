import { useState, useEffect } from 'react'
import { createPortal } from 'react-dom';
import { FaGithub, FaLinkedin, FaEnvelope } from 'react-icons/fa';
import './style.css'

function Nav() {
    const [menuOpen, setMenuOpen] = useState(false);
    const [activeSection, setActiveSection] = useState('home');
    const toggleMenu = () => {
        setMenuOpen(prev => !prev);
    }
    useEffect(() => {
        const handleScroll = () => {
            const sections = ['home', 'about', 'portfolio', 'contact'];
            let current = 'home';
            for (let section of sections) {
                const el = document.getElementById(section);
                if (el) {
                    const rect = el.getBoundingClientRect();
                    if (rect.top <= 80 && rect.bottom >= 80) {
                        current = section;
                        break;
                    }
                }
            }
            setActiveSection(current);
        };
        window.addEventListener('scroll', handleScroll, { passive: true });
        handleScroll(); // set on mount
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);
    return (
        <nav>
            <button id="nav-toggle" onClick={toggleMenu}>
                {menuOpen ? 'X Close' : '☰ Menu'}
            </button>
            <ul id="nav-menu" className={menuOpen ? 'active' : ''}>
                <li><a href="#home" className={activeSection === 'home' ? 'active' : ''}>Home</a></li>
                <li><a href="#about" className={activeSection === 'about' ? 'active' : ''}>About</a></li>
                <li><a href="#portfolio" className={activeSection === 'portfolio' ? 'active' : ''}>Portfolio</a></li>
                <li><a href="#contact" className={activeSection === 'contact' ? 'active' : ''}>Contact</a></li>
            </ul>
        </nav>
    );
}

function Logo() {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            const scrollY = window.scrollY;
            setIsVisible(scrollY > 100); // Show logo after scrolling 100px
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <div id="logo" className={isVisible ? 'visible' : ''}>
            Danny Zhang
        </div>
    );
}

function Backpage() {
    const [opacity, setOpacity] = useState(1);

    useEffect(() => {
        const handleScroll = () => {
            const scrollY = window.scrollY;
            const fadeDistance = 400;
            const newOpacity = Math.max(0, 1 - scrollY / fadeDistance);
            setOpacity(newOpacity);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <div id="backpage" style={{ opacity }}>
            <div className="hero-content">
                <h1>Danny Zhang</h1>
                <p>A personal website and learning experience.</p>
                <p>Imagine the limitless possibilities of what one could create.</p>
            </div>
        </div>
    );
}

function HomeSection() {
    return (
        <section id="home" className="section">
            <div id="HomeTop">
                <h2>Welcome</h2>
                <p>Scroll down to learn more about my work and experience.</p>
            </div>
        </section>
    )
}

function AboutSection() {
    return (
        <section id="about" className="section">
            <h2>About Me</h2>
            <p>I'm a passionate software engineer who loves creating innovative solutions.</p>
            <div style={{ marginTop: '2rem' }}>
                <h3>Skills</h3>
                <p>JavaScript, React, Node.js, Python, and more...</p>
            </div>
        </section>
    );
}

function ProjectModal({ project, isOpen, onClose }) {
    if (!isOpen) return null;

    return createPortal(
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                <button className="modal-close" onClick={onClose}>×</button>
                <h2>{project.title}</h2>
                <div className="project-image">
                    <div className="project-placeholder">{project.title}</div>
                </div>
                <p className="project-description">{project.description}</p>
                <div className="project-tech">
                    <h4>Technologies Used:</h4>
                    <div className="tech-tags">
                        {project.technologies.map((tech, index) => (
                            <span key={index} className="tech-tag">{tech}</span>
                        ))}
                    </div>
                </div>
                <div className="project-links">
                    {project.github && (
                        <a href={project.github} target="_blank" rel="noopener noreferrer" className="project-link">
                            View on GitHub
                        </a>
                    )}
                    {project.live && (
                        <a href={project.live} target="_blank" rel="noopener noreferrer" className="project-link">
                            Live Demo
                        </a>
                    )}
                </div>
            </div>
        </div>,
        document.body
    );
}

function PortfolioSection() {
    const [selectedProject, setSelectedProject] = useState(null);

    const projects = [
        {
            id: 1,
            title: "Library CLA",
            description: "A full-stack e-commerce platform built with React and Node.js. Features include user authentication, product management, shopping cart functionality, and payment integration with Stripe.",
            technologies: ["Django", "Python", "CSS", "Postresql", "Express"],
            github: "https://github.com/yourusername/ecommerce-platform",
            live: "https://your-ecommerce-demo.com"
        },
        {
            id: 2,
            title: "Task Management App",
            description: "A collaborative task management application with real-time updates, drag-and-drop functionality, and team collaboration features. Built with React and Firebase.",
            technologies: ["React", "Firebase", "Material-UI", "React DnD"],
            github: "https://github.com/yourusername/task-manager",
            live: "https://your-task-manager-demo.com"
        },
        {
            id: 3,
            title: "Weather Dashboard",
            description: "A weather dashboard that displays current weather conditions and forecasts for multiple cities. Integrates with OpenWeatherMap API and features interactive charts.",
            technologies: ["JavaScript", "Chart.js", "OpenWeatherMap API", "CSS3"],
            github: "https://github.com/yourusername/weather-dashboard",
            live: "https://your-weather-demo.com"
        }
    ];

    return (
        <section id="portfolio" className="section">
            <h2>Portfolio</h2>
            <p>Here are some of my recent projects:</p>

            <div className="projects-grid">
                {projects.map((project) => (
                    <div
                        key={project.id}
                        className="project-card"
                        onClick={() => setSelectedProject(project)}
                    >
                        <div className="project-image">
                            <div className="project-placeholder">{project.title}</div>
                        </div>
                        <div className="project-overlay">
                            <span className="find-out-more">Find out more</span>
                        </div>
                    </div>
                ))}
            </div>

            <ProjectModal
                project={selectedProject}
                isOpen={!!selectedProject}
                onClose={() => setSelectedProject(null)}
            />
        </section>
    );
}

function ContactSection() {
    return (
        <section id="contact" className="section">
            <h2>Contact Me</h2>
            <p>Get in touch with me:</p>
            <div style={{ marginTop: '2rem' }}>
                <div className="icon-row">
                    <a href="https://www.linkedin.com/in/zhang-dny/" target="_blank" rel="noreferrer">
                        <FaLinkedin />
                    </a>
                    <a href="https://github.com/zhang-dny" target="_blank" rel="noreferrer">
                        <FaGithub />
                    </a>
                    <a href="mailto:zhang.dny@gmail.com">
                        <FaEnvelope />
                    </a>
                </div>
            </div>
        </section>
    );
}

function Footer() {
    return (
        <footer>
            <p>&copy; 2024 Danny Zhang. All rights reserved.</p>
        </footer>
    );
}

function App() {
    return (
        <>
            <Logo />
            <Nav />
            <Backpage />
            <main id="content">
                <HomeSection />
                <AboutSection />
                <PortfolioSection />
                <ContactSection />
            </main>
            <Footer />
        </>
    );
}

export default App;
