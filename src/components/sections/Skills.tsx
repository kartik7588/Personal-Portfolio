import { motion } from "framer-motion";
import { skills } from "@/data/portfolio";
import { staggerContainer, staggerItem, fadeUp, easings } from "../../utils/animations";

/**
 * Skills Section with Professional Animations
 * - Staggered card reveals
 * - Animated progress bars with count-up
 * - 3D hover lift effects
 * - Glow on hover
 * - GPU-accelerated transforms
 */
export const Skills = () => {
  return (
    <section id="skills" className="py-24 px-6 bg-zinc-50 dark:bg-zinc-950 relative overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, currentColor 1px, transparent 0)`,
          backgroundSize: '40px 40px'
        }} />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section header with reveal animation */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.5 }}
          className="text-center mb-16"
        >
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: easings.expoOut }}
            className="text-4xl md:text-5xl font-bold text-zinc-900 dark:text-white mb-4"
          >
            Technical Expertise
          </motion.h2>

          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 0.8, ease: easings.expoOut }}
            className="h-1.5 w-20 bg-indigo-500 rounded-full mx-auto origin-center"
          />

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="mt-6 text-lg text-zinc-600 dark:text-zinc-400 max-w-2xl mx-auto"
          >
            Mastering modern technologies to build exceptional web experiences
          </motion.p>
        </motion.div>

        {/* Skills grid with stagger animation */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {skills.map((skill, index) => (
            <motion.div
              key={skill.name}
              className="skill-card group"
              initial={{ opacity: 0, y: 40, scale: 0.9 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{
                delay: index * 0.08,
                duration: 0.6,
                ease: easings.power4Out,
              }}
              whileHover={{
                y: -8,
                scale: 1.02,
                transition: { duration: 0.3, ease: easings.power3Out }
              }}
              style={{ willChange: "transform" }}
            >
              <motion.div
                className="bg-white dark:bg-zinc-900 p-8 rounded-3xl border border-zinc-100 dark:border-zinc-800 shadow-sm relative overflow-hidden h-full"
                whileHover={{
                  boxShadow: "0 20px 40px -10px rgba(99, 102, 241, 0.3)",
                  borderColor: "rgba(99, 102, 241, 0.5)",
                }}
                transition={{ duration: 0.3 }}
              >
                {/* Animated gradient background on hover */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-br from-indigo-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  initial={false}
                />

                {/* Content */}
                <div className="relative z-10">
                  <div className="flex justify-between items-center mb-6">
                    <motion.span
                      className="text-xl font-bold text-zinc-900 dark:text-white group-hover:text-indigo-500 transition-colors duration-300"
                      whileHover={{ scale: 1.05 }}
                    >
                      {skill.name}
                    </motion.span>
                    
                    <motion.span
                      className="text-2xl font-black text-indigo-500"
                      initial={{ opacity: 0, scale: 0 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{
                        delay: index * 0.08 + 0.3,
                        duration: 0.5,
                        ease: easings.bounce
                      }}
                    >
                      {skill.level}%
                    </motion.span>
                  </div>
                  
                  {/* Progress bar with animated fill */}
                  <div className="h-2 w-full bg-zinc-100 dark:bg-zinc-800 rounded-full overflow-hidden mb-4">
                    <motion.div
                      initial={{ width: 0, opacity: 0 }}
                      whileInView={{ width: `${skill.level}%`, opacity: 1 }}
                      viewport={{ once: true }}
                      transition={{
                        delay: index * 0.08 + 0.2,
                        duration: 1.5,
                        ease: easings.expoOut,
                      }}
                      className="h-full bg-gradient-to-r from-indigo-500 to-purple-600 rounded-full relative"
                    >
                      {/* Animated shine effect */}
                      <motion.div
                        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                        animate={{
                          x: ['-100%', '200%']
                        }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                          repeatDelay: 3,
                          ease: "linear"
                        }}
                      />
                    </motion.div>
                  </div>

                  <motion.p
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{
                      delay: index * 0.08 + 0.4,
                      duration: 0.6
                    }}
                    className="text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed"
                  >
                    Extensive experience using {skill.name} to build scalable, high-performance applications with modern best practices.
                  </motion.p>

                  {/* Decorative corner accent */}
                  <motion.div
                    className="absolute top-0 right-0 w-20 h-20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    initial={false}
                  >
                    <div className="absolute top-0 right-0 w-full h-full border-t-2 border-r-2 border-indigo-500/20 rounded-tr-3xl" />
                  </motion.div>
                </div>
              </motion.div>
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.8, duration: 0.8, ease: easings.expoOut }}
          className="text-center mt-16"
        >
          <motion.p
            className="text-lg text-zinc-600 dark:text-zinc-400 mb-6"
            whileInView={{ opacity: [0, 1] }}
            viewport={{ once: true }}
          >
            Always learning and exploring new technologies
          </motion.p>
          <motion.a
            href="#projects"
            onClick={(e) => {
              e.preventDefault();
              const element = document.getElementById("projects");
              if (!element) return;
              const offset = 80;
              const bodyRect = document.body.getBoundingClientRect().top;
              const elementRect = element.getBoundingClientRect().top;
              const elementPosition = elementRect - bodyRect;
              const offsetPosition = elementPosition - offset;

              window.scrollTo({
                top: offsetPosition,
                behavior: "smooth",
              });

              window.history.replaceState(null, "", window.location.pathname + window.location.search);
            }}
            className="inline-flex gap-2"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <span className="px-6 py-3 bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-full font-bold shadow-lg shadow-indigo-500/25">
              View All Projects →
            </span>
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
};
