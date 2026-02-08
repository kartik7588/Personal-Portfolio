import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, Mail, MapPin, Phone, CheckCircle } from "lucide-react";
import confetti from "canvas-confetti";
import { fadeUp, staggerContainer, staggerItem, easings } from "../../utils/animations";

/**
 * Contact Section with Micro-interactions
 * - Staggered contact info reveals
 * - Input focus animations with glow effects
 * - Spring-based button interactions
 * - Success state with animated icon
 * - Enhanced confetti on submission
 * - Form validation feedback animations
 */
export const Contact = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [emailError, setEmailError] = useState("");
  const [focusedField, setFocusedField] = useState<string | null>(null);
  const emailRef = useRef<HTMLInputElement | null>(null);

  const validateEmail = (value: string) => {
    const v = value.trim();
    const basicRegex = /^[^\s@]+@[^\s@]+\.[a-zA-Z]{2,}$/;
    if (!basicRegex.test(v)) return false;
    const domain = v.split("@")[1].toLowerCase();
    const disposable = new Set([
      "mailinator.com",
      "10minutemail.com",
      "tempmail.com",
      "guerrillamail.com",
      "yopmail.com",
      "dispostable.com",
      "maildrop.cc",
      "trashmail.com",
    ]);
    if (disposable.has(domain)) return false;
    return true;
  };

  const handleEmailBlur = () => {
    setFocusedField(null);
    if (!email) {
      setEmailError("Enter a valid email address");
      return;
    }
    if (!validateEmail(email)) {
      setEmailError("Enter a valid email address");
      return;
    }
    setEmailError("");
  };

  const triggerSuccessConfetti = () => {
    const count = 200;
    const defaults = {
      origin: { y: 0.7 },
      zIndex: 9999
    };

    function fire(particleRatio: number, opts: confetti.Options) {
      confetti({
        ...defaults,
        ...opts,
        particleCount: Math.floor(count * particleRatio),
        colors: ["#6366f1", "#a855f7", "#ec4899", "#8b5cf6", "#d946ef"]
      });
    }

    fire(0.25, {
      spread: 26,
      startVelocity: 55,
    });
    fire(0.2, {
      spread: 60,
    });
    fire(0.35, {
      spread: 100,
      decay: 0.91,
      scalar: 0.8
    });
    fire(0.1, {
      spread: 120,
      startVelocity: 25,
      decay: 0.92,
      scalar: 1.2
    });
    fire(0.1, {
      spread: 120,
      startVelocity: 45,
    });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!email || !validateEmail(email)) {
      setEmailError("Enter a valid email address");
      emailRef.current?.focus();
      return;
    }

    if (!name.trim() || !subject.trim() || !message.trim()) {
      return;
    }

    setIsSubmitting(true);

    const data = { name, email, subject, message };

    fetch("https://formsubmit.co/ajax/kartikjan.7588@gmail.com", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    })
      .then((res) => {
        if (!res.ok) throw new Error("Network response was not ok");
        return res.json();
      })
      .then(() => {
        setIsSubmitting(false);
        setSubmitted(true);
        setName("");
        setEmail("");
        setSubject("");
        setMessage("");
        setEmailError("");
        triggerSuccessConfetti();
      })
      .catch(() => {
        setIsSubmitting(false);
        alert("Failed to send message. Please try again later.");
      });
  };

  return (
    <section id="contact" className="py-24 px-6 bg-white dark:bg-zinc-900 relative overflow-hidden">
      {/* Background decoration */}
      <motion.div
        className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-indigo-500/10 rounded-full blur-3xl"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />

      <div className="max-w-7xl mx-auto relative z-10">
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
            Get In Touch
          </motion.h2>

          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 0.8, ease: easings.expoOut }}
            className="h-1.5 w-20 bg-indigo-500 rounded-full mx-auto"
          />
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Contact Info */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
          >
            <motion.h3
              variants={staggerItem}
              className="text-4xl font-bold text-zinc-900 dark:text-white mb-6"
            >
              Let's Connect
            </motion.h3>
            <motion.p
              variants={staggerItem}
              className="text-zinc-600 dark:text-zinc-400 text-lg mb-12 leading-relaxed"
            >
              Have a project in mind or just want to chat? I'm always open to discussing 
              new opportunities and creative ideas.
            </motion.p>

            <motion.div variants={staggerContainer} className="space-y-6">
              {[
                {
                  icon: Mail,
                  text: "kartikjan.7588@gmail.com",
                  href: "mailto:kartikjan.7588@gmail.com",
                  color: "indigo"
                },
                {
                  icon: Phone,
                  text: "+91 7597788430",
                  href: "tel:+917597788430",
                  color: "purple"
                },
                {
                  icon: MapPin,
                  text: "Jaipur, India",
                  href: "https://www.google.com/maps/search/?api=1&query=Jaipur%2C%20India",
                  external: true,
                  color: "pink"
                },
              ].map((item, i) => {
                const Icon = item.icon;
                return (
                  <motion.div
                    key={i}
                    variants={staggerItem}
                    whileHover={{ x: 8 }}
                    className="flex items-center gap-4 text-zinc-600 dark:text-zinc-300 group"
                  >
                    <motion.div
                      className="w-14 h-14 rounded-2xl bg-zinc-50 dark:bg-zinc-800 flex items-center justify-center border border-zinc-200 dark:border-zinc-700 group-hover:border-indigo-500/50 transition-all shadow-sm"
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      transition={{ type: "spring", stiffness: 400, damping: 10 }}
                    >
                      <Icon className="text-indigo-500" size={24} />
                    </motion.div>
                    <motion.a
                      href={item.href}
                      className="text-lg font-medium hover:text-indigo-500 dark:hover:text-indigo-400 transition-colors"
                      whileHover={{ scale: 1.02 }}
                      onClick={(e) => {
                        if (item.href && (item.href.startsWith("mailto:") || item.href.startsWith("tel:"))) {
                          e.preventDefault();
                          window.location.href = item.href;
                        }
                      }}
                      {...(item.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                    >
                      {item.text}
                    </motion.a>
                  </motion.div>
                );
              })}
            </motion.div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: easings.expoOut, delay: 0.2 }}
            className="bg-zinc-50 dark:bg-zinc-800/50 p-8 md:p-10 rounded-3xl border border-zinc-200 dark:border-zinc-700/50 shadow-xl relative overflow-hidden"
          >
            {/* Form glow effect */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-br from-indigo-500/5 via-purple-500/5 to-pink-500/5 opacity-0"
              animate={{ opacity: focusedField ? 1 : 0 }}
              transition={{ duration: 0.3 }}
            />

            <AnimatePresence mode="wait">
              {submitted ? (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ type: "spring", stiffness: 300, damping: 25 }}
                  className="text-center py-12 relative z-10"
                >
                  <motion.div
                    initial={{ scale: 0, rotate: -180 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ type: "spring", stiffness: 200, damping: 15, delay: 0.2 }}
                    className="w-24 h-24 bg-gradient-to-br from-green-100 to-emerald-100 dark:from-green-900/30 dark:to-emerald-900/30 text-green-600 dark:text-green-400 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg"
                  >
                    <CheckCircle size={48} />
                  </motion.div>
                  <motion.h3
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    className="text-2xl font-bold text-zinc-900 dark:text-white mb-2"
                  >
                    Message Sent!
                  </motion.h3>
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5 }}
                    className="text-zinc-600 dark:text-zinc-400"
                  >
                    Thank you for reaching out. I'll get back to you as soon as possible.
                  </motion.p>
                  <motion.button
                    onClick={() => setSubmitted(false)}
                    className="mt-8 px-6 py-3 bg-indigo-500 hover:bg-indigo-600 text-white font-bold rounded-xl transition-colors"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Send another message
                  </motion.button>
                </motion.div>
              ) : (
                <motion.form
                  key="form"
                  onSubmit={handleSubmit}
                  className="space-y-6 relative z-10"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <input type="hidden" name="_captcha" value="false" />
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Name Field */}
                    <motion.div
                      whileFocus={{ scale: 1.02 }}
                      transition={{ type: "spring", stiffness: 300 }}
                    >
                      <label className="block text-sm font-bold text-zinc-700 dark:text-zinc-300 mb-2">
                        Name
                      </label>
                      <motion.input
                        required
                        name="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        onFocus={() => setFocusedField("name")}
                        onBlur={() => setFocusedField(null)}
                        type="text"
                        className="w-full px-4 py-3 rounded-xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-700 focus:ring-2 focus:ring-indigo-500 outline-none transition-all dark:text-white"
                        placeholder="John Doe"
                        whileFocus={{ scale: 1.01 }}
                        animate={{
                          boxShadow: focusedField === "name" 
                            ? "0 0 0 4px rgba(99, 102, 241, 0.1)" 
                            : "0 0 0 0px rgba(99, 102, 241, 0)"
                        }}
                      />
                    </motion.div>

                    {/* Email Field */}
                    <motion.div
                      whileFocus={{ scale: 1.02 }}
                      transition={{ type: "spring", stiffness: 300 }}
                    >
                      <label className="block text-sm font-bold text-zinc-700 dark:text-zinc-300 mb-2">
                        Email
                      </label>
                      <motion.input
                        required
                        name="email"
                        ref={emailRef}
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        onFocus={() => setFocusedField("email")}
                        onBlur={handleEmailBlur}
                        type="email"
                        className={`w-full px-4 py-3 rounded-xl bg-white dark:bg-zinc-900 border outline-none transition-all dark:text-white ${
                          emailError 
                            ? "border-red-500 ring-2 ring-red-500/20" 
                            : "border-zinc-200 dark:border-zinc-700 focus:ring-2 focus:ring-indigo-500"
                        }`}
                        placeholder="john@example.com"
                        whileFocus={{ scale: 1.01 }}
                        animate={{
                          boxShadow: focusedField === "email" 
                            ? emailError
                              ? "0 0 0 4px rgba(239, 68, 68, 0.1)"
                              : "0 0 0 4px rgba(99, 102, 241, 0.1)"
                            : "0 0 0 0px rgba(99, 102, 241, 0)"
                        }}
                      />
                      <AnimatePresence>
                        {emailError && (
                          <motion.p
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            className="mt-2 text-sm text-red-600 dark:text-red-400 flex items-center gap-1"
                          >
                            <motion.span
                              animate={{ rotate: [0, -10, 10, -10, 0] }}
                              transition={{ duration: 0.5 }}
                            >
                              ⚠️
                            </motion.span>
                            {emailError}
                          </motion.p>
                        )}
                      </AnimatePresence>
                    </motion.div>
                  </div>

                  {/* Subject Field */}
                  <motion.div
                    whileFocus={{ scale: 1.02 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <label className="block text-sm font-bold text-zinc-700 dark:text-zinc-300 mb-2">
                      Subject
                    </label>
                    <motion.input
                      required
                      name="subject"
                      value={subject}
                      onChange={(e) => setSubject(e.target.value)}
                      onFocus={() => setFocusedField("subject")}
                      onBlur={() => setFocusedField(null)}
                      type="text"
                      className="w-full px-4 py-3 rounded-xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-700 focus:ring-2 focus:ring-indigo-500 outline-none transition-all dark:text-white"
                      placeholder="Project Inquiry"
                      whileFocus={{ scale: 1.01 }}
                      animate={{
                        boxShadow: focusedField === "subject" 
                          ? "0 0 0 4px rgba(99, 102, 241, 0.1)" 
                          : "0 0 0 0px rgba(99, 102, 241, 0)"
                      }}
                    />
                  </motion.div>

                  {/* Message Field */}
                  <motion.div
                    whileFocus={{ scale: 1.02 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <label className="block text-sm font-bold text-zinc-700 dark:text-zinc-300 mb-2">
                      Message
                    </label>
                    <motion.textarea
                      required
                      name="message"
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      onFocus={() => setFocusedField("message")}
                      onBlur={() => setFocusedField(null)}
                      rows={4}
                      className="w-full px-4 py-3 rounded-xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-700 focus:ring-2 focus:ring-indigo-500 outline-none transition-all dark:text-white resize-none"
                      placeholder="Your message here..."
                      whileFocus={{ scale: 1.01 }}
                      animate={{
                        boxShadow: focusedField === "message" 
                          ? "0 0 0 4px rgba(99, 102, 241, 0.1)" 
                          : "0 0 0 0px rgba(99, 102, 241, 0)"
                      }}
                    />
                  </motion.div>

                  {/* Submit Button */}
                  <motion.button
                    disabled={isSubmitting}
                    type="submit"
                    className="w-full py-4 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 disabled:from-zinc-400 disabled:to-zinc-500 text-white font-bold rounded-xl transition-all flex items-center justify-center gap-2 shadow-lg shadow-indigo-500/25 relative overflow-hidden group"
                    whileHover={{ scale: isSubmitting ? 1 : 1.02, y: isSubmitting ? 0 : -2 }}
                    whileTap={{ scale: isSubmitting ? 1 : 0.98 }}
                  >
                    {/* Button shine effect */}
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                      initial={{ x: "-100%" }}
                      whileHover={{ x: "100%" }}
                      transition={{ duration: 0.6, ease: "easeInOut" }}
                    />
                    
                    <span className="relative z-10">
                      {isSubmitting ? (
                        <motion.span
                          animate={{ opacity: [1, 0.5, 1] }}
                          transition={{ repeat: Infinity, duration: 1.5 }}
                        >
                          Sending...
                        </motion.span>
                      ) : (
                        <>
                          Send Message
                          <motion.span
                            className="inline-block"
                            whileHover={{ x: 4 }}
                            transition={{ type: "spring", stiffness: 400 }}
                          >
                            <Send size={18} />
                          </motion.span>
                        </>
                      )}
                    </span>
                  </motion.button>
                </motion.form>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
