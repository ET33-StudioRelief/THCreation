import barba from '@barba/core';
import gsap from 'gsap';

import {
  animateHeroSection,
  initHeadingAnimation,
  initNavbarAnimation,
  initPortfolioAnimation,
  initTestimonialParallax,
  initToolTipsIntro,
} from '$utils/gsap';

barba.init({
  transitions: [
    {
      name: 'dynamic-transition',
      async leave(data) {
        const transition = document.querySelector('.barba-transition');
        const currentContent = data.current.container;
        if (!transition || !currentContent) return;
        // Masquer l'ancien contenu
        currentContent.style.opacity = '0';
        // Monter le rideau
        await gsap.to(transition, {
          scaleY: 1,
          duration: 1,
          ease: 'power3.inOut',
          transformOrigin: 'bottom',
        });
      },
      async enter(data) {
        const transition = document.querySelector('.barba-transition');
        // SUPPRIMER l'ancien container du DOM avant d'ouvrir le rideau
        const oldContainer = data.current.container;
        if (oldContainer && oldContainer.parentNode) {
          oldContainer.parentNode.removeChild(oldContainer);
        }
        if (!transition) return;
        // Descendre le rideau (le contenu est déjà là, visible)
        await gsap.to(transition, {
          scaleY: 0,
          duration: 1,
          ease: 'power3.inOut',
          transformOrigin: 'bottom',
        });
      },
    },
  ],
});

// Réinitialisation des animations après chaque transition
barba.hooks.after(() => {
  initTestimonialParallax();
  initHeadingAnimation();
  initNavbarAnimation();
  animateHeroSection();
  initToolTipsIntro();
  initPortfolioAnimation();
});
