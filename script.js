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

// Add random rainbow effect with smooth transitions and better randomization
function addRandomRainbowEffect() {
  const icons = Array.from(document.querySelectorAll(".tech-icon"));

  // Create rainbow layer for each icon
  icons.forEach((icon) => {
    const rainbowLayer = document.createElement("div");
    rainbowLayer.className = "rainbow-layer";
    icon.appendChild(rainbowLayer);
  });

  const numberOfRainbowIcons = Math.floor(icons.length * 0.15); // 15% instead of 20%

  // Better shuffle using Fisher-Yates algorithm
  function shuffleArray(array) {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  }

  function activateRandomIcons() {
    const shuffled = shuffleArray(icons);
    const selectedIcons = shuffled.slice(0, numberOfRainbowIcons);

    selectedIcons.forEach((icon, index) => {
      // Stagger activation with random delays for more organic feel (3-8 seconds spread)
      const randomDelay = Math.random() * 5000 + index * 400;
      setTimeout(() => {
        icon.classList.add("rainbow-glow");
      }, randomDelay);
    });
  }

  function deactivateAllIcons() {
    icons.forEach((icon, index) => {
      // Stagger deactivation with random delays (2-6 seconds spread)
      const randomDelay = Math.random() * 4000 + index * 150;
      setTimeout(() => {
        icon.classList.remove("rainbow-glow");
      }, randomDelay);
    });
  }

  // Initial activation
  activateRandomIcons();

  // Cycle: deactivate -> wait -> activate -> wait
  let cycleCount = 0;
  setInterval(() => {
    if (cycleCount % 2 === 0) {
      // Deactivate phase
      deactivateAllIcons();
    } else {
      // Activate phase (wait a bit longer before reactivating)
      setTimeout(() => activateRandomIcons(), 3000);
    }
    cycleCount++;
  }, 12000); // Every 12 seconds alternate between deactivate and activate
}

// Initialize rainbow effect after icons are loaded
setTimeout(() => {
  addRandomRainbowEffect();
}, 1000);

// Add cyberpunk matrix rain effect to navbar with high density
function createMatrixRain() {
  const navbar = document.querySelector(".navbar");
  const characters =
    "01アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン";

  setInterval(() => {
    // Much higher spawn rate - 70% chance instead of 5%
    if (Math.random() > 0.3) {
      const rain = document.createElement("span");
      rain.textContent =
        characters[Math.floor(Math.random() * characters.length)];
      rain.style.position = "absolute";
      rain.style.left = Math.random() * 100 + "%";
      rain.style.top = "0";
      rain.style.color = "var(--primary-color)";
      rain.style.fontSize = Math.random() * 6 + 10 + "px"; // Variable size 10-16px
      rain.style.opacity = (Math.random() * 0.3 + 0.2).toString(); // Variable opacity 0.2-0.5
      rain.style.pointerEvents = "none";
      rain.style.animation = `matrixFall ${
        Math.random() * 1 + 1.5
      }s linear forwards`; // Variable speed 1.5-2.5s
      navbar.appendChild(rain);

      setTimeout(() => rain.remove(), 2500);
    }
  }, 50); // More frequent checks (50ms instead of 100ms)
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

// Neural Network Feedforward Structure for About Section
function createNeuralNetwork() {
  const aboutSection = document.querySelector(".about");
  if (!aboutSection) return;

  const canvas = document.createElement("canvas");
  canvas.style.cssText = `
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    pointer-events: none;
    z-index: 1;
  `;
  aboutSection.appendChild(canvas);
  const ctx = canvas.getContext("2d");

  function resizeCanvas() {
    canvas.width = aboutSection.offsetWidth;
    canvas.height = aboutSection.offsetHeight;
  }
  resizeCanvas();
  window.addEventListener("resize", resizeCanvas);

  // Define feedforward network structure
  const layers = [
    { nodes: 5, x: 0.15 },  // Input layer
    { nodes: 8, x: 0.35 },  // Hidden layer 1
    { nodes: 6, x: 0.55 },  // Hidden layer 2
    { nodes: 4, x: 0.75 },  // Hidden layer 3
    { nodes: 3, x: 0.90 }   // Output layer
  ];

  const neurons = [];
  const connections = [];

  // Create neurons for each layer
  layers.forEach((layer, layerIndex) => {
    const layerNeurons = [];
    const spacing = canvas.height / (layer.nodes + 1);
    
    for (let i = 0; i < layer.nodes; i++) {
      const neuron = {
        x: layer.x * canvas.width,
        y: spacing * (i + 1),
        radius: 6,
        layer: layerIndex,
        activation: Math.random(),
        pulsePhase: Math.random() * Math.PI * 2
      };
      layerNeurons.push(neuron);
      neurons.push(neuron);
    }

    // Create connections to previous layer
    if (layerIndex > 0) {
      const prevLayer = neurons.filter(n => n.layer === layerIndex - 1);
      layerNeurons.forEach(currentNeuron => {
        prevLayer.forEach(prevNeuron => {
          connections.push({
            from: prevNeuron,
            to: currentNeuron,
            weight: Math.random(),
            pulseOffset: Math.random() * Math.PI * 2
          });
        });
      });
    }
  });

  let time = 0;
  
  // Create impulse system for forward propagation
  const impulses = [];
  setInterval(() => {
    // Create impulses from input layer
    const inputNeurons = neurons.filter(n => n.layer === 0);
    inputNeurons.forEach(inputNeuron => {
      const outgoingConns = connections.filter(c => c.from === inputNeuron);
      outgoingConns.forEach(conn => {
        if (Math.random() > 0.92) { // 8% chance per impulse
          impulses.push({
            connection: conn,
            progress: 0,
            speed: 0.015 + Math.random() * 0.01,
            brightness: 0.5 + Math.random() * 0.5
          });
        }
      });
    });
  }, 600);

  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    time += 0.02;

    // Draw connections (base lines)
    connections.forEach((conn, index) => {
      const weight = conn.weight;
      
      ctx.beginPath();
      ctx.moveTo(conn.from.x, conn.from.y);
      ctx.lineTo(conn.to.x, conn.to.y);
      
      ctx.strokeStyle = `rgba(0, 217, 255, ${0.1 * weight})`;
      ctx.lineWidth = 0.5 + weight * 0.5;
      ctx.stroke();
    });
    
    // Draw and update impulses
    impulses.forEach((impulse, index) => {
      impulse.progress += impulse.speed;
      
      if (impulse.progress >= 1) {
        impulses.splice(index, 1);
        
        // Trigger new impulses from destination neuron
        const destNeuron = impulse.connection.to;
        const outgoingConns = connections.filter(c => c.from === destNeuron);
        outgoingConns.forEach(conn => {
          if (Math.random() > 0.75) { // 25% propagation chance
            impulses.push({
              connection: conn,
              progress: 0,
              speed: 0.015 + Math.random() * 0.01,
              brightness: impulse.brightness * 0.9
            });
          }
        });
        return;
      }
      
      const conn = impulse.connection;
      const x = conn.from.x + (conn.to.x - conn.from.x) * impulse.progress;
      const y = conn.from.y + (conn.to.y - conn.from.y) * impulse.progress;
      
      // Draw impulse trail
      const trailLength = 0.15;
      for (let i = 0; i < 5; i++) {
        const trailProgress = impulse.progress - (trailLength * i / 5);
        if (trailProgress < 0) continue;
        
        const trailX = conn.from.x + (conn.to.x - conn.from.x) * trailProgress;
        const trailY = conn.from.y + (conn.to.y - conn.from.y) * trailProgress;
        const alpha = impulse.brightness * (1 - i / 5);
        
        ctx.beginPath();
        ctx.arc(trailX, trailY, 3 - i * 0.5, 0, Math.PI * 2);
        const gradient = ctx.createRadialGradient(trailX, trailY, 0, trailX, trailY, 3 - i * 0.5);
        gradient.addColorStop(0, `rgba(255, 255, 255, ${alpha})`);
        gradient.addColorStop(0.5, `rgba(0, 255, 255, ${alpha * 0.8})`);
        gradient.addColorStop(1, `rgba(0, 217, 255, 0)`);
        ctx.fillStyle = gradient;
        ctx.fill();
      }
      
      // Draw main impulse
      ctx.beginPath();
      ctx.arc(x, y, 4, 0, Math.PI * 2);
      const gradient = ctx.createRadialGradient(x, y, 0, x, y, 4);
      gradient.addColorStop(0, `rgba(255, 255, 255, ${impulse.brightness})`);
      gradient.addColorStop(0.4, `rgba(0, 255, 255, ${impulse.brightness * 0.9})`);
      gradient.addColorStop(1, `rgba(0, 217, 255, 0)`);
      ctx.fillStyle = gradient;
      ctx.fill();
    });

    // Draw neurons
    neurons.forEach(neuron => {
      const pulse = Math.sin(time + neuron.pulsePhase) * 0.3 + 0.7;
      const size = neuron.radius * pulse;
      
      // Outer glow
      ctx.beginPath();
      ctx.arc(neuron.x, neuron.y, size + 4, 0, Math.PI * 2);
      const gradient = ctx.createRadialGradient(
        neuron.x, neuron.y, 0,
        neuron.x, neuron.y, size + 4
      );
      
      if (neuron.layer === 0) {
        gradient.addColorStop(0, 'rgba(0, 255, 157, 0.8)');
        gradient.addColorStop(1, 'rgba(0, 255, 157, 0)');
      } else if (neuron.layer === layers.length - 1) {
        gradient.addColorStop(0, 'rgba(255, 0, 255, 0.8)');
        gradient.addColorStop(1, 'rgba(255, 0, 255, 0)');
      } else {
        gradient.addColorStop(0, 'rgba(0, 217, 255, 0.8)');
        gradient.addColorStop(1, 'rgba(0, 217, 255, 0)');
      }
      
      ctx.fillStyle = gradient;
      ctx.fill();
      
      // Core
      ctx.beginPath();
      ctx.arc(neuron.x, neuron.y, size, 0, Math.PI * 2);
      ctx.fillStyle = neuron.layer === 0 ? '#00ff9d' : 
                      neuron.layer === layers.length - 1 ? '#ff00ff' : '#00d9ff';
      ctx.fill();
    });

    requestAnimationFrame(animate);
  }
  animate();
}

// Floating Code Snippets for Projects Section
function createFloatingCode() {
  const projectsSection = document.querySelector(".projects");
  if (!projectsSection) return;

  const codeSnippets = [
    { text: "model = ResNet50()", color: "rgba(0, 217, 255, 0.9)" },
    { text: "from langchain import Agent", color: "rgba(255, 0, 255, 0.9)" },
    { text: "graph.query(cypher)", color: "rgba(0, 255, 157, 0.9)" },
    { text: "async def predict(x):", color: "rgba(0, 217, 255, 0.9)" },
    { text: "nn.Conv2d(64, 128)", color: "rgba(255, 0, 255, 0.9)" },
    { text: "GraphRAG.retrieve()", color: "rgba(0, 255, 157, 0.9)" },
    { text: "torch.optim.Adam()", color: "rgba(0, 217, 255, 0.9)" },
    { text: "class MultiAgent:", color: "rgba(255, 0, 255, 0.9)" },
    { text: "neo4j.connect(uri)", color: "rgba(0, 255, 157, 0.9)" },
    { text: "loss.backward()", color: "rgba(0, 217, 255, 0.9)" },
    { text: "embeddings = model()", color: "rgba(255, 0, 255, 0.9)" },
    { text: "agent.run(task)", color: "rgba(0, 255, 157, 0.9)" },
    { text: "df.predict_proba(X)", color: "rgba(0, 217, 255, 0.9)" },
    { text: "vectorstore.search()", color: "rgba(255, 0, 255, 0.9)" },
    { text: "model.compile(loss)", color: "rgba(0, 217, 255, 0.9)" },
    { text: "@dataclass\nclass Node:", color: "rgba(0, 255, 157, 0.9)" },
    { text: "pipeline.fit(X, y)", color: "rgba(0, 217, 255, 0.9)" },
    { text: "response = llm.call()", color: "rgba(255, 0, 255, 0.9)" },
    { text: "scaler.transform(data)", color: "rgba(0, 217, 255, 0.9)" },
    { text: "optimizer.step()", color: "rgba(255, 0, 255, 0.9)" },
  ];

  setInterval(() => {
    if (Math.random() > 0.5) {
      const snippet = codeSnippets[Math.floor(Math.random() * codeSnippets.length)];
      const code = document.createElement("div");
      code.textContent = snippet.text;
      code.style.cssText = `
        position: absolute;
        left: ${Math.random() * 85 + 5}%;
        top: ${Math.random() * 80 + 10}%;
        color: ${snippet.color};
        font-family: 'Courier New', monospace;
        font-size: ${11 + Math.random() * 5}px;
        font-weight: 500;
        opacity: 0;
        pointer-events: none;
        z-index: 1;
        white-space: pre;
        text-shadow: 0 0 10px ${snippet.color};
        animation: codeFloat ${5 + Math.random() * 3}s ease-out forwards;
      `;
      projectsSection.appendChild(code);

      setTimeout(() => code.remove(), 8000);
    }
  }, 600);
}

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

// Initialize About neural network when visible
const aboutObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        createNeuralNetwork();
        aboutObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.1 }
);

const aboutSection = document.querySelector(".about");
if (aboutSection) {
  aboutObserver.observe(aboutSection);
}

// Initialize Projects floating code when visible
const projectsObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        createFloatingCode();
        projectsObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.1 }
);

const projectsSection = document.querySelector(".projects");
if (projectsSection) {
  projectsObserver.observe(projectsSection);
}

// Dynamic typing effect with multiple texts
const typingElement = document.getElementById("typing-text");
if (typingElement) {
  const texts = [
    "AI/ML Engineer",
    "Data Scientist",
    "Ethical Hacker & Security Enthusiast",
    "Star Wars Fanatic",
    "Tame Impala Listener",
    "Anime Enjoyer",
    "Literally Ryan Gosling",
    "Cyberpunk Dreamer",
  ];

  let textIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  let isPaused = false;

  function typeEffect() {
    const currentText = texts[textIndex];

    if (isPaused) {
      setTimeout(typeEffect, 2000); // Pause for 2 seconds after typing
      isPaused = false;
      isDeleting = true;
      return;
    }

    if (isDeleting) {
      typingElement.textContent = currentText.substring(0, charIndex - 1);
      charIndex--;

      if (charIndex === 0) {
        isDeleting = false;
        textIndex = (textIndex + 1) % texts.length;
        setTimeout(typeEffect, 500); // Pause before typing next text
        return;
      }
    } else {
      typingElement.textContent = currentText.substring(0, charIndex + 1);
      charIndex++;

      if (charIndex === currentText.length) {
        isPaused = true;
      }
    }

    const typingSpeed = isDeleting ? 30 : 80;
    setTimeout(typeEffect, typingSpeed);
  }

  setTimeout(typeEffect, 1000);
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
