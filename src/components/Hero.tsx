"use client";

import { motion } from "framer-motion";
import Image from "next/image";

export default function Hero() {
  return (
    <section className="hero-section">
      <motion.div
        className="hero-logo"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <Image
          src="/produtos/logo-100.png"
          alt="18k Wine"
          width={180}
          height={140}
          className="hero-logo-img"
          priority
        />
      </motion.div>
      
      <motion.p
        className="hero-tagline"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
      >
        Vinhos Kosher Premium
      </motion.p>
    </section>
  );
}
