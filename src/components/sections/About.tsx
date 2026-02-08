import { motion } from "framer-motion";
import kartikImg from "../../uploads/kartik.png";
import { useScrollReveal, useParallax, useImageReveal } from "../../utils/useAnimations";
import { fadeInLeft, fadeInRight, staggerContainer, staggerItem, easings } from "../../utils/animations";

/**
 * About Section with Cinematic Animations
 * - Image reveal with mask animation
 * - Parallax depth orbs
 * - Staggered text blocks
 * - Scroll-triggered reveals
 * - 3D rotation on image hover
 */
export const About = () => {
  const imageRevealRef = useImageReveal<HTMLDivElement>("up");
  const leftOrbRef = useParallax<HTMLDivElement>(0.3);
  const rightOrbRef = useParallax<HTMLDivElement>(0.5);

  return (
    <section id="about" className="py-24 px-6 bg-zinc-50 dark:bg-zinc-950 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row items-center gap-16">
          {/* Image with reveal animation and depth effects */}
          <motion.div
            variants={fadeInLeft}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            className="w-full lg:w-1/2 relative"
          >
            <motion.div
              ref={imageRevealRef}
              className="aspect-square rounded-3xl overflow-hidden shadow-2xl bg-indigo-500 relative"
              whileHover={{ 
                rotate: -3,
                scale: 1.02,
                transition: { duration: 0.6, ease: easings.power3Out }
              }}
              style={{ 
                transformStyle: "preserve-3d",
                willChange: "transform"
              }}
            >
              <img
                src={kartikImg}
                alt="Kartik Jangid"
                className="w-full h-full object-cover transition-all duration-500"
                style={{ willChange: "transform" }}
              />
              
              {/* Gradient overlay on hover */}
              <motion.div
                initial={{ opacity: 0 }}
                whileHover={{ opacity: 0.2 }}
                transition={{ duration: 0.3 }}
                className="absolute inset-0 bg-gradient-to-t from-indigo-500 to-transparent pointer-events-none"
              />
            </motion.div>

            {/* Parallax depth orbs */}
            <motion.div
              ref={rightOrbRef}
              initial={{ opacity: 0, scale: 0 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3, duration: 1, ease: easings.expoOut }}
              className="absolute -bottom-6 -right-6 w-48 h-48 bg-purple-500/20 rounded-full blur-3xl -z-10"
              style={{ willChange: "transform" }}
            />
            <motion.div
              ref={leftOrbRef}
              initial={{ opacity: 0, scale: 0 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5, duration: 1, ease: easings.expoOut }}
              className="absolute -top-6 -left-6 w-48 h-48 bg-indigo-500/20 rounded-full blur-3xl -z-10"
              style={{ willChange: "transform" }}
            />

            {/* Decorative corner accents */}
            <motion.div
              initial={{ opacity: 0, scale: 0 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.7, duration: 0.6 }}
              className="absolute top-0 right-0 w-20 h-20 border-t-4 border-r-4 border-indigo-500 rounded-tr-3xl"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.8, duration: 0.6 }}
              className="absolute bottom-0 left-0 w-20 h-20 border-b-4 border-l-4 border-purple-500 rounded-bl-3xl"
            />
          </motion.div>

          {/* Content with staggered reveal */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            className="w-full lg:w-1/2"
          >
            <motion.h4
              variants={staggerItem}
              className="text-indigo-500 font-bold uppercase tracking-widest mb-4"
            >
              About Me
            </motion.h4>

            <motion.h2
              variants={staggerItem}
              className="text-4xl md:text-5xl font-black text-zinc-900 dark:text-white mb-8 leading-tight"
            >
              I build systems that are{" "}
              <span className="relative inline-block">
                <span className="text-transparent bg-clip-text bg-linear-to-r from-indigo-500 to-purple-600">
                  predictable and scalable.
                </span>
                <motion.span
                  initial={{ scaleX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 1, duration: 0.8, ease: easings.expoOut }}
                  className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-indigo-500 to-purple-600 origin-left"
                />
              </span>
            </motion.h2>

            <div className="space-y-6">
              <motion.p
                variants={staggerItem}
                className="text-lg text-zinc-600 dark:text-zinc-400 leading-relaxed"
              >
                Full-stack Computer Science Engineering student focused on building clean, scalable web applications using JavaScript, React, TailwindCSS, and Node.js. Creator of PDF-King and interactive 3D projects like CYBERFICTION using GSAP and Locomotive Scroll. I prioritize system design, performance, and practical usability.
              </motion.p>

              <motion.p
                variants={staggerItem}
                className="text-lg text-zinc-600 dark:text-zinc-400 leading-relaxed"
              >
                I work across frontend and backend to design predictable systems and maintainable architectures. I value clarity in code, disciplined problem-solving, and continuous improvement through real-world projects and open-source work.
              </motion.p>

              {/* Stats bar */}
              <motion.div
                variants={staggerItem}
                className="grid grid-cols-3 gap-4 pt-8"
              >
                {[
                  { label: "Projects", value: "10+" },
                  { label: "Technologies", value: "15+" },
                  { label: "Experience", value: "2+ yrs" }
                ].map((stat, index) => (
                  <motion.div
                    key={stat.label}
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ 
                      delay: 1.2 + index * 0.1, 
                      duration: 0.6,
                      ease: easings.bounce
                    }}
                    whileHover={{ scale: 1.05 }}
                    className="text-center p-4 bg-white dark:bg-zinc-900 rounded-xl border border-zinc-200 dark:border-zinc-800 shadow-sm"
                  >
                    <div className="text-3xl font-black text-indigo-500 mb-1">
                      {stat.value}
                    </div>
                    <div className="text-sm text-zinc-600 dark:text-zinc-400 font-medium">
                      {stat.label}
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
