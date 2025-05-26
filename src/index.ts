import './index.css';
import './utils/barba';

import {
  animateHeroSection,
  initHeadingAnimation,
  initHeroAnimation,
  initNavbarAnimation,
  initPortfolioAnimation,
  initTestimonialParallax,
  initToolTipsIntro,
} from '$utils/gsap';

window.Webflow ||= [];
window.Webflow.push(() => {
  initHeroAnimation();
  initHeroAnimation();
  initTestimonialParallax();
  initHeadingAnimation();
  initNavbarAnimation();
  animateHeroSection();
  initToolTipsIntro();
  initPortfolioAnimation();
});
