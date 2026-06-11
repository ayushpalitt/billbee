"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";

const faqs = [
  {
    question: "Is there really a free forever plan?",
    answer: "Yes! Our Free tier allows you to create up to 3 active groups and track an unlimited number of manual expenses. It's perfect for roommates or a quick weekend trip."
  },
  {
    question: "How does the AI Receipt Scanner work?",
    answer: "On the Pro plan, you can simply upload a photo of your receipt. Our AI automatically extracts all the line items, merchant details, and calculates taxes and tips, categorizing everything for you instantly."
  },
  {
    question: "Can I cancel my Pro subscription at any time?",
    answer: "Absolutely. There are no lock-in contracts. You can cancel your Pro subscription at any time from your billing dashboard, and you'll retain Pro features until the end of your billing cycle."
  },
  {
    question: "What is the Financial Health Score?",
    answer: "It's a dynamic metric calculated by our AI that evaluates how quickly you settle your debts and how your spending habits compare to your historical averages. It helps you stay financially responsible within your groups."
  },
  {
    question: "Do all members of a group need a Pro account?",
    answer: "No! Only the person creating the group (the Hive Master) needs a Pro account to unlock advanced features like unlimited groups and advanced exports for that specific group."
  }
];

export function PricingFAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <div className="max-w-3xl mx-auto w-full px-4">
      <h2 className="text-3xl font-bold font-jakarta text-center text-slate-900 dark:text-white mb-10">
        Frequently Asked Questions
      </h2>
      
      <div className="space-y-4">
        {faqs.map((faq, index) => {
          const isOpen = openIndex === index;
          
          return (
            <div 
              key={index}
              className={`border rounded-2xl overflow-hidden transition-colors duration-300 ${isOpen ? 'bg-white dark:bg-slate-900 border-blue-500/30 dark:border-blue-500/30 shadow-sm' : 'bg-slate-50 dark:bg-slate-900/50 border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700'}`}
            >
              <button
                onClick={() => setOpenIndex(isOpen ? null : index)}
                className="flex items-center justify-between w-full p-6 text-left"
              >
                <span className="font-bold text-slate-900 dark:text-white text-lg pr-8">
                  {faq.question}
                </span>
                <ChevronDown 
                  className={`w-5 h-5 text-slate-400 shrink-0 transition-transform duration-300 ${isOpen ? 'rotate-180 text-blue-500' : ''}`} 
                />
              </button>
              
              <AnimatePresence>
                {isOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                  >
                    <div className="px-6 pb-6 text-slate-600 dark:text-slate-400 font-medium leading-relaxed">
                      {faq.answer}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>
    </div>
  );
}
