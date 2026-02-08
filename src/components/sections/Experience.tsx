import { motion } from "framer-motion";
import { experiences } from "@/data/portfolio";
import { fadeUp, staggerContainer, staggerItem, easings } from "../../utils/animations";
import { useScrollReveal } from "../../utils/useAnimations";

/**
 * Experience Section with Timeline Animations
 * - Animated timeline with growing line
 * - Pulsing timeline dots
 * - Staggered content reveals
 * - Hover lift effects on cards
 * - Smooth scroll-triggered animations
 */
export const Experience = () => {
  const timelineRef = useScrollReveal<HTMLDivElement>({ y: 100, duration: 1.5 });

  return (
    <section id="experience" className="py-24 px-6 bg-white dark:bg-zinc-900 relative overflow-hidden">
      {/* Background decoration */}
      <motion.div
        className="absolute top-0 left-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl"
        animate={{
          scale: [1, 1.3, 1],
          opacity: [0.2, 0.4, 0.2],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />

      <div className="max-w-4xl mx-auto relative z-10">
        {/* Section header */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          className="text-center mb-16"
        >
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: easings.expoOut }}
            className="text-4xl md:text-5xl font-bold text-zinc-900 dark:text-white mb-4"
          >
            Professional Experience
          </motion.h2>

          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 0.8, ease: easings.expoOut }}
            className="h-1.5 w-20 bg-indigo-500 rounded-full mx-auto"
          />

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="mt-6 text-lg text-zinc-600 dark:text-zinc-400"
          >
            My journey in building exceptional web experiences
          </motion.p>
        </motion.div>

        {/* Timeline */}
        <div ref={timelineRef} className="space-y-12 relative">
          {/* Animated timeline line */}
          <motion.div
            className="absolute left-0 top-0 bottom-0 w-px bg-zinc-200 dark:bg-zinc-800"
            initial={{ scaleY: 0 }}
            whileInView={{ scaleY: 1 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 1.5, ease: easings.expoOut }}
            style={{ transformOrigin: "top" }}
          />

          {experiences.map((exp, index) => (
            <motion.div
              key={exp.id}
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              className="relative pl-12"
            >
              {/* Animated timeline dot */}
              <motion.div
                className="absolute left-[-8px] top-0 w-4 h-4 rounded-full bg-indigo-500 border-4 border-white dark:border-zinc-900 shadow-sm z-10"
                initial={{ scale: 0, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                viewport={{ once: true }}
                transition={{
                  delay: index * 0.2,
                  duration: 0.6,
                  ease: easings.bounce
                }}
              >
                {/* Pulsing ring effect */}
                <motion.div
                  className="absolute inset-0 rounded-full bg-indigo-500"
                  animate={{
                    scale: [1, 2, 2],
                    opacity: [0.5, 0, 0]
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeOut"
                  }}
                />
              </motion.div>
              
              {/* Experience card */}
              <motion.div
                variants={staggerItem}
                whileHover={{
                  x: 8,
                  transition: { duration: 0.3, ease: easings.power3Out }
                }}
                className="bg-zinc-50 dark:bg-zinc-800/50 p-8 rounded-2xl border border-zinc-200 dark:border-zinc-700 hover:border-indigo-500/50 hover:shadow-xl transition-all duration-300 cursor-pointer"
                style={{ willChange: "transform" }}
              >
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
                  <div>
                    <motion.h3
                      variants={staggerItem}
                      className="text-2xl font-bold text-zinc-900 dark:text-white mb-2"
                    >
                      {exp.position}
                    </motion.h3>
                    <motion.p
                      variants={staggerItem}
                      className="text-lg text-indigo-500 font-semibold"
                    >
                      {exp.company}
                    </motion.p>
                  </div>

                  <motion.span
                    variants={staggerItem}
                    className="px-4 py-2 bg-white dark:bg-zinc-900 text-zinc-600 dark:text-zinc-400 text-sm font-bold rounded-full border border-zinc-200 dark:border-zinc-700 w-fit whitespace-nowrap"
                    whileHover={{ scale: 1.05 }}
                  >
                    {exp.period}
                  </motion.span>
                </div>

                <motion.ul variants={staggerContainer} className="space-y-4">
                  {exp.description.map((item, i) => (
                    <motion.li
                      key={i}
                      variants={staggerItem}
                      className="text-zinc-600 dark:text-zinc-400 leading-relaxed flex items-start gap-3 group"
                    >
                      <motion.span
                        className="mt-2 w-2 h-2 rounded-full bg-indigo-500 shrink-0 group-hover:scale-125 transition-transform"
                        whileHover={{ scale: 1.5 }}
                      />
                      <span className="group-hover:text-zinc-900 dark:group-hover:text-zinc-300 transition-colors">
                        {item}
                      </span>
                    </motion.li>
                  ))}
                </motion.ul>

                {/* Decorative corner */}
                <motion.div
                  className="absolute bottom-0 right-0 w-16 h-16 opacity-0 group-hover:opacity-100 transition-opacity"
                  initial={false}
                >
                  <div className="absolute bottom-0 right-0 w-full h-full border-b-2 border-r-2 border-indigo-500/20 rounded-br-2xl" />
                </motion.div>
              </motion.div>
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5, duration: 0.8, ease: easings.expoOut }}
          className="text-center mt-16"
        >
          <motion.div
            className="inline-block"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <a
              href="#contact"
              className="px-8 py-4 bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-full font-bold shadow-lg shadow-indigo-500/25 inline-flex items-center gap-2"
            >
              Let's Work Together
              <motion.span
                animate={{ x: [0, 4, 0] }}
                transition={{ repeat: Infinity, duration: 1.5 }}
              >
                →
              </motion.span>
            </a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};
