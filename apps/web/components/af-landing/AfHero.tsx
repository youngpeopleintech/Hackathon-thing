'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';

const lineVariants = {
  hidden: { opacity: 0, y: 36 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: 0.35 + i * 0.13, duration: 0.85, ease: [0.25, 0.1, 0.25, 1] },
  }),
};

export function AfHero() {
  return (
    <section id="hero">
      <div className="hero-bg-image" aria-hidden />
      <div className="scroll-hint">
        <div className="scroll-line" />
        <span className="scroll-hint-text">Scroll</span>
      </div>
      <div className="hero-content">
        <div className="hero-eyebrow">Lagos, Nigeria &nbsp;·&nbsp; May 30 – June 13, 2026</div>
        <h1 className="hero-headline">
          <motion.span className="line" custom={0} initial="hidden" animate="visible" variants={lineVariants}>
            The
          </motion.span>
          <motion.span className="line" custom={1} initial="hidden" animate="visible" variants={lineVariants}>
            Artificial
          </motion.span>
          <motion.span className="line accent" custom={2} initial="hidden" animate="visible" variants={lineVariants}>
            Future.
          </motion.span>
        </h1>
        <motion.p
          className="hero-sub"
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
        >
          Join us on June 13 at The Civic Centre, Lagos for a day of conversations and panels about what AI looks
          like when Africans are the ones building it.
        </motion.p>
        <motion.div
          className="hero-actions"
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.95, duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
        >
          <a href="https://eventornigeria.com/explore/ypit-af" target="_blank" rel="noopener noreferrer" className="btn-primary">
            Get Conference Tickets
          </a>
        </motion.div>
        <motion.div
          className="hero-chips"
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.1, duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
        >
          <div className="chip chip--1 chip--done">
            <span className="chip-dot" />
            Workshops · Complete
          </div>
          <div className="chip chip--2">
            <span className="chip-dot" />
            Hackathon · May 30–June 6 · Free
          </div>
          <div className="chip chip--3">
            <span className="chip-dot" />
            Conference · June 13 · Paid
          </div>
        </motion.div>
        <motion.a
          href="https://www.youngpeopleintech.com"
          target="_blank"
          rel="noopener noreferrer"
          className="hero-presented-by"
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.25, duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
        >
          <Image src="/ypit-logo-white.png" alt="YPIT" height={16} width={40} style={{ objectFit: 'contain', width: 'auto' }} />
          <span>An event by Young People In Tech</span>
        </motion.a>
      </div>
    </section>
  );
}
