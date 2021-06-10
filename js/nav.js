const menuIcon = document.querySelector('.menu-icon').firstChild;
const body = document.querySelector('body'); 
const siteNav = document.querySelector('.internal-links');
const extNav = document.querySelector('.external-links');
const intNav = document.querySelectorAll('.hideable-int-link');
const mobileNav = document.querySelector('.mobile-nav');
let menuOpen = false;

// on page load, fill mobile nav with regular nav
const initMobileNav = ()=> {
  intNav.forEach(nav => {
    mobileNav.firstChild.appendChild(nav.cloneNode(true)).className = 'internal-links-mobile'
  })
  mobileNav.firstChild.appendChild(extNav.cloneNode(true)).className = 'external-links-mobile'
}
initMobileNav();

const toggleMenu = ()=> {
  // toggle menu icon
  menuIcon.parentNode.ariaLabel = 
    (menuOpen)
    ? 'open'
    : 'close'
  
  menuIcon.src = 
    (menuOpen) 
    ? '/images/hamburger-open-menu.svg'
    : '/images/hamburger-close-menu.svg';
  
  menuIcon.alt = 
    (menuOpen) 
    ? 'open menu'
    : 'close menu';
  
  // if menu is closed, display menu
  if(!menuOpen)  {
    mobileNav.style.display = 'block';

  } else {
    mobileNav.style.display = 'none';
  }
  
  // toggle state of menu
  mobileNav.ariaExpanded = !menuOpen;
  menuOpen = !menuOpen;
}