import { keyframes } from "@emotion/react";

// Animation for fading in elements
export const fadeIn = {
  opacity: 0,
  animation: "fadeIn 0.4s ease-in-out forwards",
  "@keyframes fadeIn": {
    "0%": { opacity: 0 },
    "100%": { opacity: 1 }
  }
};

// Animation for sliding in from the right
export const slideInRight = {
  opacity: 0,
  transform: "translateX(20px)",
  animation: "slideInRight 0.4s ease-out forwards",
  "@keyframes slideInRight": {
    "0%": { opacity: 0, transform: "translateX(20px)" },
    "100%": { opacity: 1, transform: "translateX(0)" }
  }
};

// Animation for sliding in from the left
export const slideInLeft = {
  opacity: 0,
  transform: "translateX(-20px)",
  animation: "slideInLeft 0.4s ease-out forwards",
  "@keyframes slideInLeft": {
    "0%": { opacity: 0, transform: "translateX(-20px)" },
    "100%": { opacity: 1, transform: "translateX(0)" }
  }
};

// Animation for sliding in from the bottom
export const slideInUp = {
  opacity: 0,
  transform: "translateY(20px)",
  animation: "slideInUp 0.4s ease-out forwards",
  "@keyframes slideInUp": {
    "0%": { opacity: 0, transform: "translateY(20px)" },
    "100%": { opacity: 1, transform: "translateY(0)" }
  }
};

// Animation for sliding in from the top
export const slideInDown = {
  opacity: 0,
  transform: "translateY(-20px)",
  animation: "slideInDown 0.4s ease-out forwards",
  "@keyframes slideInDown": {
    "0%": { opacity: 0, transform: "translateY(-20px)" },
    "100%": { opacity: 1, transform: "translateY(0)" }
  }
};

// Animation for scaling in (zoom effect)
export const scaleIn = {
  opacity: 0,
  transform: "scale(0.95)",
  animation: "scaleIn 0.4s ease-out forwards",
  "@keyframes scaleIn": {
    "0%": { opacity: 0, transform: "scale(0.95)" },
    "100%": { opacity: 1, transform: "scale(1)" }
  }
};

// Glitter animation for decorative elements
export const glitter = {
  background: "linear-gradient(45deg, #6366f1 0%, #ec4899 50%, #8b5cf6 100%)",
  backgroundSize: "200% 200%",
  animation: "glitterShift 5s ease infinite",
  "@keyframes glitterShift": {
    "0%": { backgroundPosition: "0% 50%" },
    "50%": { backgroundPosition: "100% 50%" },
    "100%": { backgroundPosition: "0% 50%" }
  }
};

// Bounce animation
export const bounce = {
  animation: "bounce 2s ease infinite",
  "@keyframes bounce": {
    "0%, 20%, 50%, 80%, 100%": { transform: "translateY(0)" },
    "40%": { transform: "translateY(-10px)" },
    "60%": { transform: "translateY(-5px)" }
  }
};

// Pulse animation
export const pulse = {
  animation: "pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite",
  "@keyframes pulse": {
    "0%, 100%": { opacity: 1 },
    "50%": { opacity: 0.7 }
  }
};

// Float animation
export const float = {
  animation: "float 3s ease-in-out infinite",
  "@keyframes float": {
    "0%, 100%": { transform: "translateY(0)" },
    "50%": { transform: "translateY(-10px)" }
  }
};

// Spin animation
export const spin = {
  animation: "spin 2s linear infinite",
  "@keyframes spin": {
    "0%": { transform: "rotate(0deg)" },
    "100%": { transform: "rotate(360deg)" }
  }
};
