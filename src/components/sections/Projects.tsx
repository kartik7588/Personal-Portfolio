import { motion, AnimatePresence, useMotionValue, useTransform } from "framer-motion";
import { ExternalLink, Github, X } from "lucide-react";
import { projects, Project } from "@/data/portfolio";
import { useState } from "react";
import { fadeUp, staggerContainer, staggerItem, easings } from "../../utils/animations";

/**
 * Projects Section with Advanced Animations
 * - Magnetic hover effect on cards
 * - Image zoom and parallax on hover
 * - Staggered card reveals
 * - Modal with spring animations
 * - Smooth tag reveals
 * - 3D transform on hover
 */
export const Projects = () => {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  return (
    <section id="projects" className="py-24 px-6 bg-white dark:bg-zinc-900 relative overflow-visible">
      {/* Animated background gradient */}
      <motion.div
        className="absolute top-1/4 right-0 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        style={{ zIndex: 0 }}
      />

      <div className="max-w-7xl mx-auto relative" style={{ zIndex: 10 }}>
        {/* Section header */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          className="mb-16"
        >
          <motion.h2
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: easings.expoOut }}
            className="text-4xl md:text-5xl font-bold text-zinc-900 dark:text-white mb-4"
          >
            Featured Projects
          </motion.h2>
          
          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 0.8, ease: easings.expoOut }}
            className="h-1.5 w-20 bg-indigo-500 rounded-full origin-left"
          />

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="mt-6 text-lg text-zinc-600 dark:text-zinc-400 max-w-2xl"
          >
            A collection of projects that showcase my expertise in modern web development
          </motion.p>
        </motion.div>

        {/* Projects grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <ProjectCard
              key={project.id}
              project={project}
              index={index}
              onClick={() => setSelectedProject(project)}
            />
          ))}
        </div>
      </div>

      {/* Project modal */}
      <AnimatePresence>
        {selectedProject && (
          <ProjectModal
            project={selectedProject}
            onClose={() => setSelectedProject(null)}
          />
        )}
      </AnimatePresence>
    </section>
  );
};

/**
 * Individual Project Card with Advanced Hover Effects
 */
const ProjectCard = ({ 
  project, 
  index, 
  onClick 
}: { 
  project: Project; 
  index: number; 
  onClick: () => void;
}) => {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const rotateX = useTransform(mouseY, [-100, 100], [5, -5]);
  const rotateY = useTransform(mouseX, [-100, 100], [-5, 5]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    mouseX.set(e.clientX - centerX);
    mouseY.set(e.clientY - centerY);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  return (
    <motion.div
      className="project-card group"
      initial={{ opacity: 0, y: 50, scale: 0.9 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, amount: 0.1, margin: "100px" }}
      transition={{
        delay: index * 0.12,
        duration: 0.8,
        ease: easings.expoOut,
      }}
      onClick={onClick}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        perspective: 1000,
        willChange: "transform",
        position: "relative",
        zIndex: 10
      }}
    >
      <motion.div
        className="relative bg-zinc-50 dark:bg-zinc-800/50 rounded-2xl overflow-hidden border border-zinc-100 dark:border-zinc-700/50 cursor-pointer h-full transition-all duration-300"
        whileHover={{
          y: -12,
          boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
          borderColor: "rgba(99, 102, 241, 0.5)",
        }}
        style={{
          rotateX,
          rotateY,
          transformStyle: "preserve-3d",
          position: "relative",
          zIndex: 1
        }}
        transition={{ duration: 0.3, ease: easings.power3Out }}
      >
        {/* Image with zoom effect */}
        <div className="aspect-video overflow-hidden relative">
          <motion.img
            src={project.image}
            alt={project.title}
            className="w-full h-full object-cover"
            whileHover={{ scale: 1.15 }}
            transition={{ duration: 0.6, ease: easings.power3Out }}
          />

          {/* Gradient overlay on hover */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            initial={false}
          />

          {/* Floating tags on hover */}
          <motion.div
            className="absolute bottom-4 left-4 right-4 flex flex-wrap gap-2 opacity-0 group-hover:opacity-100"
            initial={{ y: 20 }}
            whileHover={{ y: 0 }}
            transition={{ duration: 0.3, delay: 0.1 }}
          >
            {project.tags.slice(0, 3).map((tag, i) => (
              <motion.span
                key={tag}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                className="px-3 py-1 bg-white/90 dark:bg-zinc-900/90 backdrop-blur-sm text-xs font-bold text-zinc-900 dark:text-white rounded-full"
              >
                {tag}
              </motion.span>
            ))}
          </motion.div>
        </div>

        {/* Content */}
        <div className="p-6">
          <motion.h3
            className="text-xl font-bold text-zinc-900 dark:text-white mb-2 group-hover:text-indigo-500 transition-colors"
            whileHover={{ x: 4 }}
          >
            {project.title}
          </motion.h3>

          <p className="text-zinc-600 dark:text-zinc-400 mb-6 line-clamp-2 leading-relaxed">
            {project.description}
          </p>

          <div className="flex items-center gap-2">
            <motion.span
              className="text-sm font-bold text-indigo-500 inline-flex items-center gap-1"
              whileHover={{ x: 4 }}
              transition={{ duration: 0.2 }}
            >
              View Details
              <motion.span
                animate={{ x: [0, 4, 0] }}
                transition={{ repeat: Infinity, duration: 1.5 }}
              >
                →
              </motion.span>
            </motion.span>
          </div>
        </div>

        {/* 3D depth effect - corner accent */}
        <motion.div
          className="absolute top-0 right-0 w-24 h-24 opacity-0 group-hover:opacity-100"
          style={{ transform: "translateZ(20px)" }}
          transition={{ duration: 0.3 }}
        >
          <div className="absolute top-0 right-0 w-full h-full border-t-2 border-r-2 border-indigo-500/30 rounded-tr-2xl" />
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

/**
 * Project Modal with Spring Animations
 */
const ProjectModal = ({ 
  project, 
  onClose 
}: { 
  project: Project; 
  onClose: () => void;
}) => {
  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 md:p-6">
      {/* Backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="absolute inset-0 bg-zinc-950/90 backdrop-blur-md"
        transition={{ duration: 0.3 }}
      />
      
      {/* Modal content */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 40 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 40 }}
        transition={{
          type: "spring",
          stiffness: 300,
          damping: 30,
        }}
        className="relative w-full max-w-4xl bg-white dark:bg-zinc-900 rounded-3xl overflow-hidden shadow-2xl max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <motion.button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 p-3 bg-white/10 hover:bg-white/20 dark:bg-black/20 dark:hover:bg-black/30 backdrop-blur-sm rounded-full text-zinc-900 dark:text-white transition-colors"
          whileHover={{ scale: 1.1, rotate: 90 }}
          whileTap={{ scale: 0.9 }}
        >
          <X size={24} />
        </motion.button>

        {/* Image */}
        <motion.div
          className="aspect-video w-full overflow-hidden"
          initial={{ scale: 1.2, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.1, duration: 0.6, ease: easings.expoOut }}
        >
          <img
            src={project.image}
            alt={project.title}
            className="w-full h-full object-cover"
          />
        </motion.div>

        {/* Content */}
        <motion.div
          className="p-8 md:p-12"
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
        >
          {/* Tags */}
          <motion.div
            variants={staggerItem}
            className="flex flex-wrap gap-2 mb-6"
          >
            {project.tags.map((tag, index) => (
              <motion.span
                key={tag}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2 + index * 0.05 }}
                className="px-3 py-1 bg-indigo-50 dark:bg-indigo-900/30 text-xs font-bold text-indigo-600 dark:text-indigo-400 rounded-full"
              >
                {tag}
              </motion.span>
            ))}
          </motion.div>

          {/* Title */}
          <motion.h3
            variants={staggerItem}
            className="text-3xl md:text-4xl font-black text-zinc-900 dark:text-white mb-6"
          >
            {project.title}
          </motion.h3>
          
          {/* Grid layout */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            <motion.div variants={staggerItem} className="lg:col-span-2">
              <h4 className="text-sm uppercase tracking-widest font-bold text-zinc-400 mb-4">
                Project Overview
              </h4>
              <p className="text-zinc-600 dark:text-zinc-400 text-lg leading-relaxed">
                {project.longDescription}
              </p>
            </motion.div>
            
            <motion.div variants={staggerItem} className="space-y-8">
              <div>
                <h4 className="text-sm uppercase tracking-widest font-bold text-zinc-400 mb-4">
                  Role
                </h4>
                <p className="text-zinc-900 dark:text-white font-bold text-lg">
                  Lead Creative Developer
                </p>
              </div>
              
              <div className="flex flex-col gap-3">
                <motion.a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 w-full py-4 bg-zinc-900 dark:bg-white text-white dark:text-black rounded-xl font-bold"
                  whileHover={{ scale: 1.02, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Github size={20} /> View Source
                </motion.a>
                <motion.a
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 w-full py-4 border-2 border-zinc-200 dark:border-zinc-700 text-zinc-900 dark:text-white rounded-xl font-bold"
                  whileHover={{ scale: 1.02, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <ExternalLink size={20} /> Live Preview
                </motion.a>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};
