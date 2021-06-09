const menuIcon = document.querySelector('.menu-icon').firstChild;
const body = document.querySelector('body'); 
const siteNav = document.querySelector('.internal-links');
const extNav = document.querySelector('.external-links');
const intNav = document.querySelector('.internal-links');
const mobileNav = document.querySelector('.mobile-nav');
let menuOpen = false;

// on page load, fill mobile nav with regular nav
const initMobileNav = ()=> {
  mobileNav.appendChild(intNav).classList.add('mobile')
  mobileNav.appendChild(extNav).classList.add('mobile')
}

initMobileNav();

const toggleMenu = (e)=> {
  // toggle menu icon
  menuIcon.src = 
    (menuOpen) 
    ? '/images/hamburger-open-menu.svg'
    :'/images/hamburger-close-menu.svg';
  
  // if menu is closed, display menu
  if(!menuOpen)  {
    mobileNav.style.display = 'block';

  } else {
    mobileNav.style.display = 'none';
  }
  
  // toggle state of menu
  body.classList.toggle('prevent-scrolling');
  menuOpen = !menuOpen;
}