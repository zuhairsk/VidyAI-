import { keyframes } from "@emotion/react";
import { Variants } from "framer-motion";

// Animation for fading in elements - Framer Motion variants
export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: { 
    opacity: 1, 
    transition: { duration: 0.4, ease: "easeInOut" } 
  }
};

// Animation for sliding in from the right - Framer Motion variants
export const slideInRight: Variants = {
  hidden: { opacity: 0, x: 20 },
  visible: { 
    opacity: 1, 
    x: 0, 
    transition: { duration: 0.4, ease: "easeOut" } 
  }
};

// Animation for sliding in from the left - Framer Motion variants
export const slideInLeft: Variants = {
  hidden: { opacity: 0, x: -20 },
  visible: { 
    opacity: 1, 
    x: 0, 
    transition: { duration: 0.4, ease: "easeOut" } 
  }
};

// Animation for sliding in from the bottom - Framer Motion variants
export const slideInUp: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: { duration: 0.4, ease: "easeOut" } 
  }
};

// Animation for sliding in from the top - Framer Motion variants
export const slideInDown: Variants = {
  hidden: { opacity: 0, y: -20 },
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: { duration: 0.4, ease: "easeOut" } 
  }
};

// Animation for scaling in (zoom effect) - Framer Motion variants
export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: { 
    opacity: 1, 
    scale: 1, 
    transition: { duration: 0.4, ease: "easeOut" } 
  }
};

// Bounce animation - Framer Motion variants
export const bounce: Variants = {
  hidden: { y: 0 },
  visible: {
    y: [0, -10, -5, 0],
    transition: { 
      duration: 2,
      ease: "easeInOut",
      repeat: Infinity,
      times: [0, 0.4, 0.6, 1]
    }
  }
};

// Pulse animation - Framer Motion variants
export const pulse: Variants = {
  hidden: { opacity: 1 },
  visible: {
    opacity: [1, 0.7, 1],
    transition: { 
      duration: 2,
      ease: "easeInOut",
      repeat: Infinity,
      times: [0, 0.5, 1]
    }
  }
};

// Float animation - Framer Motion variants
export const float: Variants = {
  hidden: { y: 0 },
  visible: {
    y: [0, -10, 0],
    transition: { 
      duration: 3,
      ease: "easeInOut",
      repeat: Infinity,
      times: [0, 0.5, 1]
    }
  }
};

// Spin animation - Framer Motion variants
export const spin: Variants = {
  hidden: { rotate: 0 },
  visible: {
    rotate: 360,
    transition: { 
      duration: 2,
      ease: "linear",
      repeat: Infinity
    }
  }
};
