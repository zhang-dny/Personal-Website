import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './style.css'

function Nav() {
    const [menuOpen, setMenuOpen] = useState(false);
    const toggleMenu = () => {
        setMenuOpen(prev => !prev);
    }
    return (
        <nav>
            <button id="nav-toggle" onClick={toggleMenu}>
                {menuOpen ? 'X Close' : '☰ Menu'}
            </button>
            <ul id="nav-menu" className={menuOpen ? 'active' : ''}>
                <li><a href="#home">Home</a></li>
                <li><a href="#about">About</a></li>
                <li><a href="#portfolio">Portfolio</a></li>
                <li><a href="#contact">Contact</a></li>
            </ul>
        </nav>
    );
}

function Backpage() {
    const [opacity, setOpacity] = useState(1);

    useEffect(() => {
        const handleScroll = () => {
            // Fade out over the first 400px of scroll
            const scrollY = window.scrollY;
            const fadeDistance = 400;
            const newOpacity = Math.max(0, 1 - scrollY / fadeDistance);
            setOpacity(newOpacity);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return <div id="backpage" style={{ opacity }}></div>;
}

function HomeSection() {
    return (
        <section id="home" className="section">
            <div id="HomeTop">
                <h1>Danny Zhang</h1>
                <p>Hello! Welcome to my personal website.</p>
            </div>
            <div id="HomeBottom">
                <p>I am a software engineer with a passion for building web applications.</p>
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

function PortfolioSection() {
    return (
        <section id="portfolio" className="section">
            <h2>Portfolio</h2>
            <p>Here are some of my recent projects:</p>
            <div style={{ marginTop: '2rem' }}>
                <h3>Project 1</h3>
                <p>Description of your first project...</p>
            </div>
        </section>
    );
}

function ContactSection() {
    return (
        <section id="contact" className="section">
            <h2>Contact Me</h2>
            <p>Get in touch with me:</p>
            <div style={{ marginTop: '2rem' }}>
                <p>Email: your.email@example.com</p>
                <p>LinkedIn: linkedin.com/in/yourprofile</p>
                <p>GitHub: github.com/yourusername</p>
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
