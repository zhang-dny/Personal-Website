import './style.css'
import javascriptLogo from './javascript.svg'
import viteLogo from '/vite.svg'
import { setupCounter } from './counter.js'



document.querySelector('#app').innerHTML = `
  <div id = "backpage">
    <a href="https://vite.dev" target="_blank">
      <img src="${viteLogo}" class="logo" alt="Vite logo" />
    </a>
    <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript" target="_blank">
      <img src="${javascriptLogo}" class="logo vanilla" alt="JavaScript logo" />
    </a>
    <h1>Hello Vite!</h1>
    <div class="card">
      <button id="counter" type="button"></button>
    </div>
    <p class="read-the-docs">
      Click on the Vite logo to learn more
    </p>
  </div>
`
const mainWrapper = document.createElement('div'); 
mainWrapper.id = 'content'

const homeSection = document.createElement('section');
homeSection.id = 'home'
homeSection.className = 'section'
homeSection.innerHTML = `
  <div id = "HomeTop">  
    <h1>Danny Zhang</h1>
    <p> Hello Welcome to my personal website </p> 
  </div>

`
mainWrapper.appendChild(homeSection); 


const aboutSection = document.createElement('section')
aboutSection.id = 'about'
aboutSection.className = 'section'
aboutSection.innerHTML = `
  <div>
    <h1> About </h1>
    <p> About Me </p> 
  </div>
`
mainWrapper.appendChild(aboutSection);


const portfolioSection = document.createElement('section');
portfolioSection.id = 'portfolio';
portfolioSection.className = 'section';
portfolioSection.innerHTML = `
  <div>
    <h1>Portfolio</h1>
    <p>Here are some of my projects.</p>
  </di>
`;
mainWrapper.appendChild(portfolioSection);

const contactSection = document.createElement('section');
contactSection.id = 'contact';
contactSection.className = 'section';
contactSection.innerHTML = `
  <div>
    <h1>Contact</h1>
    <p>Feel free to reach out to me!</p>
  </div> 
`;
mainWrapper.appendChild(contactSection);

document.querySelector('#app').appendChild(mainWrapper);

const nav = document.createElement('nav');
nav.innerHTML = `
  <button id ="nav-toggle">☰ Menu</button>
  <ul id ="nav-menu">
    <li><a href="#home">Home</a></li>
    <li><a href="#about">About</a></li>
    <li><a href="#portfolio">Portfolio</a></li>
    <li><a href="#contact">Contact</a></li>
  </ul>
`;
document.body.prepend(nav);

const backPage = document.getElementById('backpage')
window.addEventListener('scroll', () => {
  const scrollTop = window.scrollY;
  const windowHeight = document.documentElement.scrollHeight - window.innerHeight;
  const scrollPercentage = scrollTop / windowHeight;

  backPage.style.opacity = 1 - (scrollPercentage*5);
});

const navToggle = document.getElementById('nav-toggle')
const navMenu = document.getElementById('nav-menu')

navToggle.addEventListener('click', () => {
  navMenu.classList.toggle('active');
  
  if (navMenu.classList.contains('active')) {
      navToggle.textContent = "X Close"
  } else {
      navToggle.textContent = "☰ Menu"
  }
});


const footer = document.createElement('footer');
footer.innerHTML = `<p>&copy; 2024 My Personal Website. All rights reserved.</p>`;
document.body.appendChild(footer);


setupCounter(document.querySelector('#counter'))
