export interface Project {
  id: string;
  title: string;
  description: string;
  longDescription: string;
  tags: string[];
  link: string;
  github: string;
  image: string;
}

export interface Experience {
  id: string;
  company: string;
  position: string;
  period: string;
  description: string[];
}

export interface Skill {
  name: string;
  level: number;
  icon: string;
}

export const projects: Project[] = [
  {
    id: "1",
    title: "PDF-King",
    description: "A powerful, client-side PDF manipulation tool for merging, splitting, and compressing documents.",
    longDescription: "PDF-King is a comprehensive tool designed to provide users with privacy-focused PDF operations. Built with React and specialized PDF libraries, it performs all processing directly in the browser, ensuring user data never leaves their device. Features include drag-and-drop support, real-time processing feedback, and an intuitive user interface.",
    tags: ["React", "JavaScript", "PDF-Lib", "TailwindCSS"],
    link: "https://kartik7588.github.io/PDF-King/",
    github: "https://github.com/kartik7588/PDF-King",
    image: "/pdf-king.png",
  },
  {
    id: "2",
    title: "CYBERFICTION",
    description: "An immersive 3D interactive web experience inspired by modern cyberpunk aesthetics.",
    longDescription: "CYBERFICTION is an experimental project exploring the boundaries of web-based storytelling. It utilizes GSAP for intricate scroll-based animations and Locomotive Scroll for a cinematic smooth-scrolling experience. The project focuses on high-performance asset loading and frame-perfect synchronization between 2D and 3D elements.",
    tags: ["React", "GSAP", "Locomotive Scroll", "Three.js"],
    link: "https://kartik7588.github.io/Cyber-Fiction/",
    github: "https://github.com/kartik7588/Cyber-Fiction",
    image: "/cyberfiction.png",
  },
  {
    id: "3",
    title: "Cynthiaugwu",
    description: "A sleek, web-responsive personal website with high-end animations.",
    longDescription: "A sleek, web-responsive personal website. Features smooth scroll animations with Locomotive Scroll, interactive elements powered by GSAP, and a custom cursor for enhanced user experience. Designed for modern web aesthetics.",
    tags: ["GSAP", "Locomotive Scroll", "Modern UI" , "JavaScript"],
    link: "https://kartik7588.github.io/cynthiaugwu/",
    github: "https://github.com/kartik7588/cynthiaugwu",
    image: "/cynthia.png",
  },
  {
    id: "4",
    title: "Record Management App",
    description: "Centralized digital vault for academic and financial documents.",
    longDescription: "A record management app to store, organize, and access marksheets, certificates, and fee receipts in one place, helping users keep important documents structured, safe, and easy to find.",
    tags: ["React", "Firebase", "Digital Vault"],
    link: "#",
    github: "https://github.com/kartik7588",
    image: "https://images.unsplash.com/photo-1568667256549-094345857637?auto=format&fit=crop&q=80&w=1200",
  },
];

export const experiences: Experience[] = [
  {
    id: "e1",
    company: "Personal Projects & Open Source",
    position: "Full-stack Developer",
    period: "2024 - Present",
    description: [
      "Building clean, scalable web applications using JavaScript, React, and Node.js.",
      "Developing privacy-focused tools like PDF-King with local-first processing.",
      "Creating immersive 3D web experiences using GSAP and Three.js.",
    ],
  },
  {
    id: "e2",
    company: "Computer Science Engineering",
    position: "Student",
    period: "Ongoing",
    description: [
      "Focused on system design, performance optimization, and practical usability.",
      "Maintaining architectures with a focus on predictable systems and clarity.",
      "Practicing disciplined problem-solving and continuous improvement through real-world projects.",
    ],
  },
  {
    id: "e3",
    company: "Oracle Cloud Infrastructure",
    position: "OCI 2025 Certified AI Foundations Associate",
    period: "Jul 2025 - Oct 2025",
    description: [
      "Earned the Oracle Cloud Infrastructure 2025 Certified AI Foundations Associate certification.",
      "Deepened understanding of AI, Machine Learning, and Cloud Computing, with hands-on exposure to Oracle Cloud services such as Vision, Language, and Document AI.",
      "Explored how AI services on OCI enable data-driven solutions and practical AI workflows."
      ,
    ],
  },
];

export const skills: Skill[] = [
  { name: "JavaScript", level: 95, icon: "javascript" },
  { name: "React", level: 92, icon: "react" },
  { name: "Node.js", level: 85, icon: "node" },
  { name: "Tailwind CSS", level: 92, icon: "tailwind" },
  { name: "GSAP", level: 88, icon: "gsap" },
  { name: "System Design", level: 80, icon: "design" },
];
