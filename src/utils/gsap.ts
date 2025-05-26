import gsap from 'gsap';
import { Draggable } from 'gsap/Draggable';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import SplitText from 'gsap/SplitText';

gsap.registerPlugin(ScrollTrigger, SplitText, Draggable);
declare global {
  interface Window {
    showCursor?: (type: string) => void;
    updateCursorPosition?: (x: number, y: number) => void;
  }
}
export function initPortfolioAnimation() {
  const heroGrid = document.querySelector('.portfolio_grid');
  if (!heroGrid) return;

  // Get average height of grid boxes
  const gridBoxes = document.querySelectorAll('.grid-box');
  const totalHeight = Array.from(gridBoxes).reduce(
    (sum, box) => sum + box.getBoundingClientRect().height,
    0
  );
  const averageBoxHeight = totalHeight / gridBoxes.length;

  // Animation for grid boxes
  gridBoxes.forEach((box) => {
    const boxHeight = box.getBoundingClientRect().height;

    gsap.set(box, {
      y: boxHeight,
      scale: 0.7,
    });

    gsap.to(box, {
      y: 0,
      scale: 1,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: box,
        start: 'top bottom',
        end: 'top 60%',
        scrub: 0.5,
      },
    });
  });

  // Animation for spans
  document.querySelectorAll('.grid-box-span').forEach((span) => {
    gsap.set(span, {
      y: averageBoxHeight,
      scale: 0.7,
    });

    gsap.to(span, {
      y: 0,
      scale: 1,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: span,
        start: 'top bottom',
        end: 'top 60%',
        scrub: 0.5,
      },
    });
  });
}

export function initHeroAnimation() {
  // Animation du contenu gauche
  gsap.from('.hp-features_content-left', {
    y: 30,
    opacity: 0,
    duration: 0.8,
    ease: 'power2.out',
    scrollTrigger: {
      trigger: '.section_hp-features',
      start: 'top 50%',
      toggleActions: 'play none none reverse',
    },
  });

  // Animation du contenu gauche
  gsap.from('.hp-features_relume-component', {
    y: 30,
    opacity: 0,
    duration: 0.8,
    ease: 'power2.out',
    scrollTrigger: {
      trigger: '.section_hp-features',
      start: 'top 50%',
      toggleActions: 'play none none reverse',
    },
  });

  // Animation séquentielle des éléments de la grille
  /*gsap.from('.hp-features_item', {
    y: 30,
    opacity: 0,
    duration: 0.6,
    ease: 'power2.out',
    stagger: 0.2, // Délai de 0.2s entre chaque élément
    scrollTrigger: {
      trigger: '.section_hp-features',
      start: 'top 45%',
      toggleActions: 'play none none reverse',
    },
  });*/

  // Animation séquentielle des éléments de la grille
  gsap.from('.hp-features_btn-group', {
    y: 30,
    opacity: 0,
    duration: 0.6,
    ease: 'power2.out',
    stagger: 0.2, // Délai de 0.2s entre chaque élément
    scrollTrigger: {
      trigger: '.section_hp-features',
      start: 'top 20%',
      toggleActions: 'play none none reverse',
    },
  });
}

export const initTestimonialParallax = () => {
  const testimonialList = document.querySelector('.section_testimonial');
  const testimonialCards = document.querySelectorAll('.testimonial_card');
  const centerCard = document.querySelector('#testi-center');

  if (!testimonialList || !testimonialCards.length || !centerCard) return;

  // Animation pour la carte du milieu
  gsap.to(centerCard, {
    y: 50, // Déplacement vers le bas
    ease: 'none',
    scrollTrigger: {
      trigger: testimonialList,
      start: 'top center',
      end: 'bottom center',
      scrub: 1, // L'animation suit le scroll avec un délai
    },
  });

  // Animation pour les cartes latérales
  testimonialCards.forEach((card) => {
    if (card !== centerCard) {
      gsap.to(card, {
        y: -30, // Déplacement vers le haut
        ease: 'none',
        scrollTrigger: {
          trigger: testimonialList,
          start: 'top center',
          end: 'bottom center',
          scrub: 1,
        },
      });
    }
  });
};

/**
 * Initializes animation for all H2 headings and specific H3
 * Words slide in from right with a staggered effect
 */
export function initHeadingAnimation(): void {
  // Select all H2s and specific H3s from solution_engagement section
  const headings = document.querySelectorAll('h2, .solution_engagement h3');

  headings.forEach((heading) => {
    // Store original HTML to preserve existing structure
    const originalHTML = heading.innerHTML;
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = originalHTML;

    const textNodes: string[] = [];

    // Recursive function to process text and maintain existing spans
    const walkNodes = (node: Node): void => {
      if (node.nodeType === 3) {
        // If text node: split into words and add to array
        const words = node.textContent?.trim().split(/\s+/) || [];
        textNodes.push(...words);
      } else if (node.nodeType === 1) {
        // If element node: check for special spans
        const element = node as HTMLElement;
        if (element.classList?.contains('heading_span')) {
          // Preserve existing spans by wrapping them in animation spans
          textNodes.push(`<span style="display: inline-block">${element.outerHTML}&nbsp;</span>`);
        } else {
          // Process child nodes recursively
          node.childNodes.forEach(walkNodes);
        }
      }
    };
    walkNodes(tempDiv);

    // Rebuild heading content: wrap each word in animation span
    heading.innerHTML = textNodes
      .map((word) => {
        if (word.startsWith('<span style="display: inline-block"')) {
          // Return already formatted spans
          return word;
        }
        // Wrap regular words in animation spans with spacing
        return `<span style="display: inline-block">${word}&nbsp;</span>`;
      })
      .join('');

    // Animate each word/span with GSAP
    gsap.from(heading.children, {
      scrollTrigger: {
        trigger: heading,
        start: 'top bottom-=100', // Start animation when heading is 100px from viewport bottom
        toggleActions: 'restart none none reset', // Replay animation each time element enters viewport
      },
      x: 100, // Slide from right
      opacity: 0, // Fade in
      duration: 0.8,
      ease: 'power3.out', // Smooth easing
      stagger: 0.1, // Delay between each word animation
    });
  });
}

export function initNavbarAnimation(): void {
  const navbar = document.querySelector('.navbar_intro');
  const triggerSection = document.querySelector('.section_portfolio.is-blue');

  if (!navbar || !triggerSection) return;

  // Configuration initiale
  gsap.set(navbar, {
    width: '100%',
    left: 0,
  });

  // Animation de la navbar au scroll
  gsap.to(navbar, {
    width: '50vw',
    x: '25vw', // Déplace la navbar de 25% de la largeur du viewport vers la droite
    duration: 0.5,
    ease: 'power2.inOut',
    scrollTrigger: {
      trigger: 'body',
      start: 'top top',
      end: '+=100',
      scrub: 1,
    },
  });
}

export function animateHeroSection() {
  // 1. Split et anime le texte du hero (optionnel)
  const heading = document.querySelector('.intro_hero-heading h1');
  let splitChars: Element[] = [];
  if (heading) {
    const split = new SplitText(heading, { type: 'chars,words' });
    splitChars = split.chars;
  }

  // 2. Prépare les cartes pour le drag
  const cards = gsap.utils.toArray('.draggable-card').reverse();

  // 3. Timeline d'apparition synchronisée
  const tl = gsap.timeline();

  // Animation du texte (optionnel)
  if (splitChars.length) {
    tl.from(splitChars, {
      opacity: 0,
      y: 50,
      stagger: 0.05,
      duration: 0.6,
      ease: 'power2.out',
    });
  }

  // Animation des cartes façon template
  tl.from(
    cards,
    {
      opacity: 0,
      y: 60,
      scale: 0.5,
      duration: 0.4,
      ease: 'quart.inOut',
      stagger: 0.15,
    },
    '-=0.2'
  ); // Commence l'anim des cartes juste avant la fin du texte

  // 4. Rendre chaque carte draggable dans la section
  Draggable.create('.draggable-card', {
    type: 'x,y',
    edgeResistance: 0.65,
    inertia: true,
    bounds: window,
    zIndexBoost: true,
    onPress() {
      if (window.showCursor) window.showCursor('grab');
    },
    onRelease() {
      if (window.showCursor) window.showCursor('hover');
    },
    onDrag() {
      const e = this.pointerEvent || this.event;
      if (e && window.updateCursorPosition) {
        window.updateCursorPosition(e.clientX, e.clientY);
      }
    },
  });
}

export function initToolTipsIntro() {
  const cursor = document.querySelector('.cursor-fixed') as HTMLElement;
  const defaultCursor = document.querySelector('.cursor-default') as HTMLElement;
  const hoverCursor = document.querySelector('.cursor-hover') as HTMLElement;
  const grabCursor = document.querySelector('.cursor-grab') as HTMLElement;

  if (!cursor || !defaultCursor || !hoverCursor || !grabCursor) return;

  let mouseX = -100;
  let mouseY = -100;
  let cursorVisible = false;

  // Suivi global de la souris
  window.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    if (!cursorVisible) {
      cursorVisible = true;
      gsap.to(cursor, { autoAlpha: 1, duration: 0 });
    }
  });

  function animateCursor() {
    gsap.to(cursor, {
      x: mouseX,
      y: mouseY,
      duration: 0,
      ease: 'power2.out',
    });
    requestAnimationFrame(animateCursor);
  }
  animateCursor();

  // Fonction pour changer d'état de curseur
  function showCursor(type: 'default' | 'hover' | 'grab') {
    gsap.to(defaultCursor, { autoAlpha: type === 'default' ? 1 : 0, duration: 0.2 });
    gsap.to(hoverCursor, { autoAlpha: type === 'hover' ? 1 : 0, duration: 0.2 });
    gsap.to(grabCursor, { autoAlpha: type === 'grab' ? 1 : 0, duration: 0.2 });
  }

  // Hover sur les cartes
  document.querySelectorAll('.draggable-card').forEach((card) => {
    card.addEventListener('mouseenter', () => showCursor('hover'));
    card.addEventListener('mouseleave', () => showCursor('default'));
  });

  // Draggable GSAP
  Draggable.create('.draggable-card', {
    type: 'x,y',
    edgeResistance: 0.65,
    inertia: true,
    bounds: window,
    onPress() {
      showCursor('grab');
    },
    onRelease() {
      showCursor('hover');
    },
    onDrag() {
      const e = this.pointerEvent || this.event;
      if (e) {
        mouseX = e.clientX;
        mouseY = e.clientY;
      }
    },
  });

  // Masquer le curseur custom si la souris quitte la fenêtre
  document.addEventListener('mouseleave', () => {
    gsap.to(cursor, { autoAlpha: 0, duration: 0 });
  });
  document.addEventListener('mouseenter', () => {
    gsap.to(cursor, { autoAlpha: 1, duration: 0.3 });
  });

  // Initialisation
  gsap.set([cursor, defaultCursor, hoverCursor, grabCursor], { autoAlpha: 0 });
  showCursor('default');
}
