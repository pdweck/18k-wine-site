"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export interface FAQItemType {
  question: string;
  answer: string;
}

interface ProductFAQProps {
  items: FAQItemType[];
}

export default function ProductFAQ({ items }: ProductFAQProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  if (!items?.length) return null;

  return (
    <section className="pp-faq" role="region" aria-label="Perguntas frequentes">
      {items.map((item, index) => {
        const isOpen = openIndex === index;
        return (
          <div key={index} className="pp-faq-item">
            <button
              type="button"
              className="pp-faq-question"
              onClick={() => setOpenIndex(isOpen ? null : index)}
              aria-expanded={isOpen}
              aria-controls={`pp-faq-answer-${index}`}
              id={`pp-faq-question-${index}`}
            >
              <span>{item.question}</span>
              <span className="pp-faq-icon" aria-hidden>
                {isOpen ? "-" : "+"}
              </span>
            </button>
            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  id={`pp-faq-answer-${index}`}
                  role="region"
                  aria-labelledby={`pp-faq-question-${index}`}
                  className="pp-faq-answer-wrap"
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.25, ease: "easeInOut" }}
                >
                  <p className="pp-faq-answer">{item.answer}</p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </section>
  );
}
