const menuIcon = document.querySelector('.menu-icon').firstChild;
const body = document.querySelector('body'); 
const siteNav = document.querySelector('.site-nav');
let menuOpen = false;

const toggleMenu = (e)=> {
  // toggle menu icon
  menuIcon.src = 
    (menuOpen) 
    ? '/images/hamburger-open-menu.svg'
    :'/images/hamburger-close-menu.svg';
  
  // if menu is closed, display menu
  if(!menuOpen)  {
    siteNav.style.display = 'block';
  } else {
    siteNav.style.display = 'none';
  }
  
  // toggle state of menu
  body.classList.toggle('prevent-scrolling');
  menuOpen = !menuOpen;
}