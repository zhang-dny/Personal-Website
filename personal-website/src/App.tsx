import { useState, useEffect, useMemo, useRef } from 'react'
import { createPortal } from 'react-dom';
import { FaGithub, FaLinkedin, FaEnvelope, FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import { motion } from 'framer-motion';
import './style.css'

function Nav() {
    const [menuOpen, setMenuOpen] = useState(false);
    const [activeSection, setActiveSection] = useState('home');
    const toggleMenu = () => {
        setMenuOpen(prev => !prev);
    }
    useEffect(() => {
        const handleScroll = () => {
            const sections = ['about', 'portfolio', 'working-page', 'contact'];
            let current = 'about';
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
                <li><a href="#about" className={activeSection === 'about' ? 'active' : ''}>About</a></li>
                <li><a href="#portfolio" className={activeSection === 'portfolio' ? 'active' : ''}>Portfolio</a></li>
                <li><a href="#working-page" className={activeSection === 'working-page' ? 'active' : ''}>Working</a></li>
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
            setIsVisible(scrollY > 420); // Show logo after scrolling 100px
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
    const [scale, setScale] = useState(1);
    const [wordIndex, setWordIndex] = useState(0);
    const words = useMemo(() => ["amazing", "smart", "beautiful", "impactful"], []);

    useEffect(() => {
        const handleScroll = () => {
            const scrollY = window.scrollY;
            const fadeDistance = 500;

            // Opacity effect (existing)
            const newOpacity = Math.max(0, 1 - scrollY / fadeDistance);
            setOpacity(newOpacity);

            // Scale effect - starts when content sections come into view
            // Scale from 1.0 (100%) to 0.7 (70%) over the same distance
            const scaleRange = 0.3; // 1.0 - 0.7 = 0.3
            const newScale = Math.max(0.7, 1 - (scrollY / fadeDistance) * scaleRange);
            setScale(newScale);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    useEffect(() => {
        const interval = setInterval(() => {
            setWordIndex(prev => (prev + 1) % words.length);
        }, 2000);
        return () => clearInterval(interval);
    }, [words.length]);

    return (
        <div id="backpage" style={{ opacity }}>
            <div
                className="hero-content"
                style={{
                    transform: `scale(${scale})`,
                    transition: 'transform 0.1s ease-out'
                }}
            >
                <h1>Danny Zhang</h1>
                <p>A personal website and learning experience.</p>
                <p className="flipping-sentence">
                    Imagine the limitless possibilities of what one could create with something
                </p>
                <p className="flipping-sentence">
                    <span className="flipping-wrapper">
                        {words.map((word, i) => (
                            <motion.span
                                key={i}
                                className="flipping-word"
                                initial={{ opacity: 0, y: '-100%' }}
                                animate={
                                    wordIndex === i
                                        ? { opacity: 1, y: '0%' }
                                        : { opacity: 0, y: wordIndex > i ? '-100%' : '100%' }
                                }
                                transition={{ type: 'spring', stiffness: 60, damping: 15 }}
                            >
                                {word}
                            </motion.span>
                        ))}
                    </span>
                </p>
            </div>
        </div>
    );
}

function AboutMeSection() {
    const [activeTab, setActiveTab] = useState('overview');

    const languages = [
        { name: 'JavaScript', level: 'Advanced', color: '#F7DF1E', mastery: 90 },
        { name: 'Python', level: 'Advanced', color: '#3776AB', mastery: 85 },
        { name: 'TypeScript', level: 'Intermediate', color: '#3178C6', mastery: 75 },
        { name: 'Java', level: 'Intermediate', color: '#ED8B00', mastery: 70 },
        { name: 'HTML5', level: 'Advanced', color: '#E34F26', mastery: 95 },
        { name: 'CSS3', level: 'Advanced', color: '#1572B6', mastery: 88 },
        { name: 'SQL', level: 'Intermediate', color: '#4479A1', mastery: 65 },
        { name: 'C++', level: 'Beginner', color: '#00599C', mastery: 40 }
    ];

    const tools = [
        'React', 'Node.js', 'Django', 'PostgreSQL', 'MongoDB',
        'Git', 'Docker', 'AWS', 'Heroku', 'Firebase'
    ];

    return (
        <section id="about" className="section">
            <h2>About Me</h2>
            <p>I'm a passionate software engineer who loves creating innovative solutions.</p>

            <div className="tabs-container">
                <div className="tabs-nav">
                    <button
                        className={`tab-btn ${activeTab === 'overview' ? 'active' : ''}`}
                        onClick={() => setActiveTab('overview')}
                    >
                        Overview
                    </button>
                    <button
                        className={`tab-btn ${activeTab === 'languages' ? 'active' : ''}`}
                        onClick={() => setActiveTab('languages')}
                    >
                        Languages
                    </button>
                    <button
                        className={`tab-btn ${activeTab === 'tools' ? 'active' : ''}`}
                        onClick={() => setActiveTab('tools')}
                    >
                        Tools & Frameworks
                    </button>
                </div>

                <div className="tabs-content">
                    {activeTab === 'overview' && (
                        <div className="tab-panel">
                            <p>
                                I'm a Computer Science student with a passion for full-stack development
                                and creating user-centered applications. I enjoy working on projects that
                                combine innovative technology with real-world problem solving.
                            </p>
                            <p>
                                Currently focused on web development, cloud technologies, and building
                                scalable applications. I love learning new technologies and collaborating
                                with teams to bring ideas to life.
                            </p>
                        </div>
                    )}

                    {activeTab === 'languages' && (
                        <div className="tab-panel">
                            <div className="languages-grid">
                                {languages.map((lang, index) => (
                                    <div key={index} className="language-card flip-card">
                                        <div className="flip-card-inner">
                                            <div className="flip-card-front">
                                                <div
                                                    className="language-icon"
                                                    style={{ backgroundColor: lang.color }}
                                                >
                                                    {lang.name.charAt(0)}
                                                </div>
                                                <h4>{lang.name}</h4>
                                                <span className={`level ${lang.level.toLowerCase()}`}>
                                                    {lang.level}
                                                </span>
                                            </div>
                                            <div className="flip-card-back">
                                                <h4>{lang.name}</h4>
                                                <div className="progress-ring-container">
                                                    <svg className="progress-ring" width="80" height="80" viewBox="0 0 80 80">
                                                        <circle
                                                            className="progress-ring-background"
                                                            cx="40"
                                                            cy="40"
                                                            r="32"
                                                            fill="transparent"
                                                            stroke="#333"
                                                            strokeWidth="4"
                                                        />
                                                        <circle
                                                            className="progress-ring-progress"
                                                            cx="40"
                                                            cy="40"
                                                            r="32"
                                                            fill="transparent"
                                                            stroke={lang.color}
                                                            strokeWidth="4"
                                                            strokeLinecap="round"
                                                            style={{
                                                                strokeDasharray: `${2 * Math.PI * 32}`,
                                                                strokeDashoffset: `${2 * Math.PI * 32 * (1 - lang.mastery / 100)}`,
                                                                transform: 'rotate(-90deg)',
                                                                transformOrigin: '40px 40px'
                                                            }}
                                                        />
                                                    </svg>
                                                    <div className="progress-text">
                                                        <span className="progress-percentage">{lang.mastery}%</span>
                                                        <span className="progress-label">Mastery</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {activeTab === 'tools' && (
                        <div className="tab-panel">
                            <div className="tools-list">
                                {tools.map((tool, index) => (
                                    <span key={index} className="tool-tag">
                                        {tool}
                                    </span>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </section>
    )
}

function PortfolioSection() {
    const [selectedProject, setSelectedProject] = useState<Project | null>(null);

    const projects = [
        {
            id: 1,
            title: "Library CLA",
            description: "Description/n In a team of 5, developed a Cataloging and Lending App (CLA) using Django 5 for organizing and lending items such as books, tools, and video games. The app supports Google OAuth for secure user authentication and incorporates role-based access control for Patrons, Librarians, and Administrators. Features include item cataloging, collection management (public/private), and borrowing workflows, enabling users to request and lend items. Integrated Amazon S3 for efficient file storage (e.g., item images) while using PostgreSQL for relational data management. Deployed the app on Heroku with CI/CD pipelines configured through GitHub Actions for automated testing and deployment",
            technologies: ["Django", "Python", "CSS", "PostgreSQL", "GitHub Actions", "Heroku", "Amazon S3", "Google OAuth", "HTML5"],
            github: "https://github.com/yourusername/ecommerce-platform",
            live: "https://your-ecommerce-demo.com",
            image: "https://images.unsplash.com/photo-1481487196290-c152efe083f5?w=400&h=250&fit=crop"
        },
        {
            id: 2,
            title: "Task Management App",
            description: "A collaborative task management application with real-time updates, drag-and-drop functionality, and team collaboration features. Built with React and Firebase.",
            technologies: ["React", "Firebase", "Material-UI", "React DnD"],
            github: "https://github.com/yourusername/task-manager",
            live: "https://your-task-manager-demo.com",
            image: "https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=400&h=250&fit=crop"
        },
        {
            id: 3,
            title: "Weather Dashboard",
            description: "A weather dashboard that displays current weather conditions and forecasts for multiple cities. Integrates with OpenWeatherMap API and features interactive charts.",
            technologies: ["JavaScript", "Chart.js", "OpenWeatherMap API", "CSS3"],
            github: "https://github.com/yourusername/weather-dashboard",
            live: "https://your-weather-demo.com",
            image: "https://images.unsplash.com/photo-1504608524841-42fe6f032b4b?w=400&h=250&fit=crop"
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
                        <div
                            className="project-overlay"
                            style={{
                                backgroundImage: project.image ?
                                    `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${project.image})` :
                                    'none',
                                backgroundSize: 'cover',
                                backgroundPosition: 'center'
                            }}
                        >
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

interface Project {
    id: number;
    title: string;
    description: string;
    technologies: string[];
    github: string;
    live: string;
    image: string;
}
interface ProjectModalProps {
    project: Project | null;
    isOpen: boolean;
    onClose: () => void;
}

function ProjectModal({ project, isOpen, onClose }: ProjectModalProps) {
    const techScrollRef = useRef<HTMLDivElement>(null);
    const [canScrollLeft, setCanScrollLeft] = useState(false);
    const [canScrollRight, setCanScrollRight] = useState(false);

    const checkScrollButtons = () => {
        const container = techScrollRef.current;
        if (container) {
            setCanScrollLeft(container.scrollLeft > 0);
            setCanScrollRight(
                container.scrollLeft < container.scrollWidth - container.clientWidth
            );
        }
    };

    const scrollLeft = () => {
        if (techScrollRef.current) {
            techScrollRef.current.scrollBy({ left: -120, behavior: 'smooth' });
        }
    };

    const scrollRight = () => {
        if (techScrollRef.current) {
            techScrollRef.current.scrollBy({ left: 120, behavior: 'smooth' });
        }
    };

    useEffect(() => {
        if (isOpen && project?.technologies) {
            // Check scroll buttons after modal opens and content is rendered
            setTimeout(checkScrollButtons, 100);
        }
    }, [isOpen, project?.technologies]);

    if (!isOpen) return null;

    return createPortal(
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                <button className="modal-close" onClick={onClose}>×</button>
                <h2>{project?.title}</h2>
                <div className="project-image">
                    <div className="project-placeholder">{project?.title}</div>
                </div>
                <p className="project-description">{project?.description}</p>
                <div className="project-tech">
                    <h4>Technologies Used:</h4>
                    <div className="tech-scroll-container">
                        <button
                            className={`tech-scroll-btn tech-scroll-left ${!canScrollLeft ? 'disabled' : ''}`}
                            onClick={scrollLeft}
                            disabled={!canScrollLeft}
                        >
                            ‹
                        </button>
                        <div
                            className="tech-tags scrollable"
                            ref={techScrollRef}
                            onScroll={checkScrollButtons}
                        >
                            {project?.technologies.map((tech, index) => (
                                <span key={index} className="tech-tag">{tech}</span>
                            ))}
                        </div>
                        <button
                            className={`tech-scroll-btn tech-scroll-right ${!canScrollRight ? 'disabled' : ''}`}
                            onClick={scrollRight}
                            disabled={!canScrollRight}
                        >
                            ›
                        </button>
                    </div>
                </div>
                <div className="project-links">
                    {project?.github && (
                        <a href={project.github} target="_blank" rel="noopener noreferrer" className="project-link">
                            View on GitHub
                        </a>
                    )}
                    {project?.live && (
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

function WorkingPageSection() {
    return (
        <section id="working-page" className="section">
            <h2>Working Page</h2>
            <p>This section is currently being developed. Stay tuned for more content!</p>
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
                <AboutMeSection />
                <PortfolioSection />
                <WorkingPageSection />
                <ContactSection />
            </main>
            <Footer />
        </>
    );
}

export default App;
