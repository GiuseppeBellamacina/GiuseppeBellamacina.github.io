// Mobile Navigation Toggle
const hamburger = document.querySelector(".hamburger");
const navMenu = document.querySelector(".nav-menu");

hamburger.addEventListener("click", () => {
  navMenu.classList.toggle("active");
  hamburger.classList.toggle("active");
});

// Close mobile menu when clicking on a link
document.querySelectorAll(".nav-menu a").forEach((link) => {
  link.addEventListener("click", () => {
    navMenu.classList.remove("active");
    hamburger.classList.remove("active");
  });
});

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute("href"));
    if (target) {
      target.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  });
});

// Navbar background on scroll
window.addEventListener("scroll", () => {
  const navbar = document.querySelector(".navbar");
  if (window.scrollY > 100) {
    navbar.style.background = "rgba(10, 14, 39, 0.98)";
  } else {
    navbar.style.background = "rgba(10, 14, 39, 0.95)";
  }
});

// Intersection Observer for fade-in animations
const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -100px 0px",
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = "1";
      entry.target.style.transform = "translateY(0)";
    }
  });
}, observerOptions);

// Apply fade-in to project cards
document.querySelectorAll(".project-card").forEach((card) => {
  card.style.opacity = "0";
  card.style.transform = "translateY(30px)";
  card.style.transition = "opacity 0.6s ease, transform 0.6s ease";
  observer.observe(card);
});

// Apply fade-in to skills categories
document.querySelectorAll(".skills-category").forEach((category) => {
  category.style.opacity = "0";
  category.style.transform = "translateY(30px)";
  category.style.transition = "opacity 0.6s ease, transform 0.6s ease";
  observer.observe(category);
});

// Animate tech icons on scroll with staggered delay
const techIcons = document.querySelectorAll(".tech-icon");
const techObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry, index) => {
      if (entry.isIntersecting) {
        setTimeout(() => {
          entry.target.style.opacity = "1";
          entry.target.style.transform = "translateY(0) scale(1)";
        }, index * 50); // Stagger animation
      }
    });
  },
  {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  }
);

techIcons.forEach((icon) => {
  icon.style.opacity = "0";
  icon.style.transform = "translateY(20px) scale(0.8)";
  icon.style.transition = "opacity 0.5s ease, transform 0.5s ease";
  techObserver.observe(icon);
});

// Add random floating animation to tech icons
function addRandomFloat() {
  const icons = document.querySelectorAll(".tech-icon");
  icons.forEach((icon) => {
    const randomDelay = Math.random() * 5;
    const randomDuration = 3 + Math.random() * 2;
    icon.style.animationDelay = `${randomDelay}s`;
    icon.style.animationDuration = `${randomDuration}s`;
  });
}

// Improved parallax effect with reset on mouse leave
techIcons.forEach((icon) => {
  let isHovering = false;

  icon.addEventListener("mouseenter", () => {
    isHovering = true;
  });

  icon.addEventListener("mouseleave", () => {
    isHovering = false;
    // Reset to original position with smooth transition
    icon.style.transform = "";
  });

  icon.addEventListener("mousemove", (e) => {
    if (isHovering) {
      const rect = icon.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      const moveX = (x / rect.width) * 10;
      const moveY = (y / rect.height) * 10;
      icon.style.transform = `translate(${moveX}px, ${moveY}px) scale(1.1)`;
    }
  });
});

// Add random rainbow effect to some icons
function addRandomRainbowEffect() {
  const icons = Array.from(document.querySelectorAll(".tech-icon"));
  // Select random 20% of icons
  const numberOfRainbowIcons = Math.floor(icons.length * 0.2);
  const shuffled = icons.sort(() => 0.5 - Math.random());
  const selectedIcons = shuffled.slice(0, numberOfRainbowIcons);

  selectedIcons.forEach((icon, index) => {
    // Add rainbow effect with delay
    setTimeout(() => {
      icon.classList.add("rainbow-glow");
    }, index * 200);
  });

  // Randomly change which icons have rainbow effect every 10 seconds
  setInterval(() => {
    // Remove from all
    icons.forEach((icon) => icon.classList.remove("rainbow-glow"));

    // Add to new random selection
    const newShuffled = icons.sort(() => 0.5 - Math.random());
    const newSelected = newShuffled.slice(0, numberOfRainbowIcons);

    newSelected.forEach((icon, index) => {
      setTimeout(() => {
        icon.classList.add("rainbow-glow");
      }, index * 200);
    });
  }, 10000);
}

// Initialize rainbow effect after icons are loaded
setTimeout(() => {
  addRandomRainbowEffect();
}, 1000);

// Add cyberpunk matrix rain effect to navbar
function createMatrixRain() {
  const navbar = document.querySelector(".navbar");
  const characters = "01アイウエオカキクケコサシスセソタチツテトナニヌネノ";

  setInterval(() => {
    if (Math.random() > 0.95) {
      const rain = document.createElement("span");
      rain.textContent =
        characters[Math.floor(Math.random() * characters.length)];
      rain.style.position = "absolute";
      rain.style.left = Math.random() * 100 + "%";
      rain.style.top = "0";
      rain.style.color = "var(--primary-color)";
      rain.style.fontSize = "12px";
      rain.style.opacity = "0.3";
      rain.style.pointerEvents = "none";
      rain.style.animation = "matrixFall 2s linear forwards";
      navbar.appendChild(rain);

      setTimeout(() => rain.remove(), 2000);
    }
  }, 100);
}

// Create shooting stars in the skills section - MUCH MORE FREQUENT
function createShootingStars() {
  const skillsSection = document.querySelector(".skills");
  if (!skillsSection) return;

  // Create multiple shooting stars at once
  setInterval(() => {
    // Spawn 1-3 stars each interval
    const numberOfStars = Math.floor(Math.random() * 3) + 1;

    for (let i = 0; i < numberOfStars; i++) {
      if (Math.random() > 0.3) {
        // 70% chance per star
        setTimeout(() => {
          const star = document.createElement("div");
          star.className = "shooting-star";

          // Random starting position - can start from any edge
          const startX = Math.random() * 100;
          const startY = Math.random() * 50;

          star.style.left = startX + "%";
          star.style.top = startY + "%";

          // Vary duration for different speeds
          const duration = 0.8 + Math.random() * 1.5;
          star.style.animationDuration = duration + "s";

          // Vary angle slightly
          const angle = 40 + Math.random() * 10;
          star.style.setProperty("--shoot-angle", angle + "deg");

          skillsSection.appendChild(star);

          setTimeout(() => star.remove(), duration * 1000);
        }, i * 200); // Stagger slightly
      }
    }
  }, 600); // Much more frequent - every 600ms
}

// Create constellation patterns
function createConstellations() {
  const skillsSection = document.querySelector(".skills");
  if (!skillsSection) return;

  const constellationContainer = document.createElement("div");
  constellationContainer.className = "constellation-container";
  skillsSection.appendChild(constellationContainer);

  // Create MANY more constellation patterns - 15 constellations!
  const constellations = [
    // Top area
    { stars: 5, x: 15, y: 15 },
    { stars: 4, x: 35, y: 20 },
    { stars: 6, x: 55, y: 18 },
    { stars: 5, x: 75, y: 22 },
    { stars: 4, x: 90, y: 25 },
    // Middle area
    { stars: 5, x: 10, y: 45 },
    { stars: 6, x: 30, y: 50 },
    { stars: 4, x: 50, y: 48 },
    { stars: 5, x: 70, y: 52 },
    { stars: 6, x: 88, y: 55 },
    // Bottom area
    { stars: 4, x: 20, y: 75 },
    { stars: 5, x: 42, y: 78 },
    { stars: 6, x: 62, y: 72 },
    { stars: 4, x: 80, y: 80 },
    { stars: 3, x: 95, y: 85 },
  ];

  constellations.forEach((constellation, constIndex) => {
    const constGroup = document.createElement("div");
    constGroup.className = "constellation";
    constGroup.style.position = "absolute";
    constGroup.style.left = constellation.x + "%";
    constGroup.style.top = constellation.y + "%";

    const starPositions = [];

    // Create constellation stars with varied sizes
    for (let i = 0; i < constellation.stars; i++) {
      const star = document.createElement("div");
      star.className = "constellation-star";

      const offsetX = (Math.random() - 0.5) * 120;
      const offsetY = (Math.random() - 0.5) * 120;

      // Vary star sizes
      const size = 2 + Math.random() * 2;
      star.style.width = size + "px";
      star.style.height = size + "px";

      star.style.left = offsetX + "px";
      star.style.top = offsetY + "px";
      star.style.animationDelay = constIndex * 0.3 + i * 0.15 + "s";

      starPositions.push({ x: offsetX, y: offsetY });
      constGroup.appendChild(star);
    }

    // Create lines connecting stars
    for (let i = 0; i < starPositions.length - 1; i++) {
      const line = document.createElement("div");
      line.className = "constellation-line";

      const x1 = starPositions[i].x;
      const y1 = starPositions[i].y;
      const x2 = starPositions[i + 1].x;
      const y2 = starPositions[i + 1].y;

      const length = Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
      const angle = Math.atan2(y2 - y1, x2 - x1) * (180 / Math.PI);

      line.style.width = length + "px";
      line.style.left = x1 + "px";
      line.style.top = y1 + "px";
      line.style.transform = `rotate(${angle}deg)`;
      line.style.animationDelay = constIndex * 0.5 + i * 0.2 + "s";

      constGroup.appendChild(line);
    }

    constellationContainer.appendChild(constGroup);
  });
}

// Add CSS for space effects
const style = document.createElement("style");
style.textContent = `
  @keyframes matrixFall {
    0% {
      transform: translateY(0);
      opacity: 0.3;
    }
    100% {
      transform: translateY(50px);
      opacity: 0;
    }
  }

  /* Shooting stars */
  .shooting-star {
    position: absolute;
    width: 2px;
    height: 2px;
    background: white;
    border-radius: 50%;
    box-shadow: 0 0 10px 2px rgba(255, 255, 255, 0.8);
    animation: shootingStar linear forwards;
    pointer-events: none;
    z-index: 1;
  }

  @keyframes shootingStar {
    0% {
      transform: translate(0, 0) scale(1);
      opacity: 1;
    }
    70% {
      opacity: 1;
    }
    100% {
      transform: translate(300px, 300px) scale(0);
      opacity: 0;
    }
  }

  .shooting-star::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 80px;
    height: 1px;
    background: linear-gradient(90deg, rgba(255, 255, 255, 0.8), transparent);
    transform: translateX(-80px) translateY(0px) rotate(45deg);
  }

  /* Constellation container */
  .constellation-container {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    pointer-events: none;
    z-index: 1;
  }

  .constellation {
    position: absolute;
    width: 100px;
    height: 100px;
  }

  .constellation-star {
    position: absolute;
    width: 3px;
    height: 3px;
    background: rgba(255, 255, 255, 0.9);
    border-radius: 50%;
    box-shadow: 0 0 8px 2px rgba(100, 200, 255, 0.6);
    animation: constellationTwinkle 3s ease-in-out infinite;
  }

  @keyframes constellationTwinkle {
    0%, 100% {
      opacity: 0.6;
      transform: scale(1);
    }
    50% {
      opacity: 1;
      transform: scale(1.3);
    }
  }

  .constellation-line {
    position: absolute;
    height: 1px;
    background: linear-gradient(90deg, 
      rgba(100, 200, 255, 0.3), 
      rgba(100, 200, 255, 0.5), 
      rgba(100, 200, 255, 0.3));
    transform-origin: left center;
    animation: constellationLinePulse 3s ease-in-out infinite;
  }

  @keyframes constellationLinePulse {
    0%, 100% {
      opacity: 0.3;
    }
    50% {
      opacity: 0.6;
    }
  }

  /* Add more large stars scattered */
  .skills::before {
    animation: twinkleStars 8s ease-in-out infinite, floatStars 30s linear infinite;
  }

  @keyframes floatStars {
    0% {
      background-position: 0% 0%, 20% 20%, 40% 40%, 60% 60%, 80% 80%, 10% 90%, 70% 30%, 30% 70%;
    }
    100% {
      background-position: 5% 5%, 25% 25%, 45% 45%, 65% 65%, 85% 85%, 15% 95%, 75% 35%, 35% 75%;
    }
  }
`;
document.head.appendChild(style);

// Initialize effects
addRandomFloat();
createMatrixRain();

// Initialize space effects when skills section is visible
const skillsObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        createShootingStars();
        createConstellations();
        skillsObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.1 }
);

const skillsSection = document.querySelector(".skills");
if (skillsSection) {
  skillsObserver.observe(skillsSection);
}

// Typing effect for hero subtitle (optional enhancement)
const subtitle = document.querySelector(".subtitle");
if (subtitle) {
  const text = subtitle.textContent;
  subtitle.textContent = "";
  let i = 0;

  function typeWriter() {
    if (i < text.length) {
      subtitle.textContent += text.charAt(i);
      i++;
      setTimeout(typeWriter, 50);
    }
  }

  setTimeout(typeWriter, 500);
}

// Add active state to navigation based on scroll position
window.addEventListener("scroll", () => {
  let current = "";
  const sections = document.querySelectorAll("section");

  sections.forEach((section) => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.clientHeight;
    if (window.scrollY >= sectionTop - 200) {
      current = section.getAttribute("id");
    }
  });

  document.querySelectorAll(".nav-menu a").forEach((link) => {
    link.classList.remove("active");
    if (link.getAttribute("href").slice(1) === current) {
      link.classList.add("active");
    }
  });
});

console.log("🚀 Portfolio loaded successfully!");
console.log("Made with ❤️ by Giuseppe Bellamacina");
