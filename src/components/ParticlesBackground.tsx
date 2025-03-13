
import React, { useEffect, useRef } from 'react';

interface Particle {
  id: number;
  x: number;
  y: number;
  size: number;
  speedX: number;
  speedY: number;
  opacity: number;
  element: HTMLDivElement;
}

const ParticlesBackground: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const animationFrameRef = useRef<number>();

  useEffect(() => {
    if (!containerRef.current) return;
    
    const container = containerRef.current;
    const containerRect = container.getBoundingClientRect();
    
    // Create particles
    const particleCount = Math.floor(window.innerWidth / 30); // Responsive particle count
    const particles: Particle[] = [];
    
    for (let i = 0; i < particleCount; i++) {
      // Create particle element
      const particleElement = document.createElement('div');
      particleElement.classList.add('particle');
      
      // Random size between 5 and 15px
      const size = Math.random() * 10 + 5;
      particleElement.style.width = `${size}px`;
      particleElement.style.height = `${size}px`;
      
      // Random position
      const x = Math.random() * containerRect.width;
      const y = Math.random() * containerRect.height;
      particleElement.style.left = `${x}px`;
      particleElement.style.top = `${y}px`;
      
      // Random opacity
      const opacity = Math.random() * 0.5 + 0.2;
      particleElement.style.opacity = opacity.toString();
      
      // Append to container
      container.appendChild(particleElement);
      
      // Add to particles array
      particles.push({
        id: i,
        x,
        y,
        size,
        speedX: (Math.random() - 0.5) * 0.5, // Random speed between -0.25 and 0.25
        speedY: (Math.random() - 0.5) * 0.5,
        opacity,
        element: particleElement
      });
    }
    
    particlesRef.current = particles;
    
    // Animation function
    const animate = () => {
      particlesRef.current.forEach(particle => {
        // Update position
        particle.x += particle.speedX;
        particle.y += particle.speedY;
        
        // Bounce off edges
        if (particle.x <= 0 || particle.x >= containerRect.width) {
          particle.speedX *= -1;
        }
        
        if (particle.y <= 0 || particle.y >= containerRect.height) {
          particle.speedY *= -1;
        }
        
        // Update DOM element position
        particle.element.style.left = `${particle.x}px`;
        particle.element.style.top = `${particle.y}px`;
      });
      
      animationFrameRef.current = requestAnimationFrame(animate);
    };
    
    animate();
    
    // Clean up on unmount
    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      
      particlesRef.current.forEach(particle => {
        if (particle.element.parentNode) {
          particle.element.parentNode.removeChild(particle.element);
        }
      });
    };
  }, []);
  
  return (
    <div className="particles-container" ref={containerRef}></div>
  );
};

export default ParticlesBackground;
