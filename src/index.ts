import './index.css';
import './utils/barba';

import {
  animateHeroSection,
  initHeadingAnimation,
  initNavbarAnimation,
  initPortfolioAnimation,
  initTestimonialParallax,
  initToolTipsIntro,
} from '$utils/gsap';

window.Webflow ||= [];
window.Webflow.push(() => {
  initTestimonialParallax();
  initHeadingAnimation();
  initNavbarAnimation();
  animateHeroSection();
  initToolTipsIntro();
  initPortfolioAnimation();
});
