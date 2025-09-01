"use client";

import React from "react";
import { motion } from "framer-motion";
import { Award } from "lucide-react";
import { typography } from "../styles/typography";

const AwardBadge = () => {
  const message = "We believe we are the best. Hence we are the best.";

  return (
    <div className="flex justify-center">
      <div className="bg-white text-white px-3 py-2 rounded text-center border-2 border-white shadow-lg flex items-center gap-2">
        <Award className="w-4 h-4 text-black" />
        <motion.div
          className="overflow-hidden"
          initial={{ width: "0%" }}
          whileInView={{ width: "fit-content" }}
          transition={{
            duration: 2,
            ease: "linear",
            delay: 0.5,
          }}
        >
          <div
            className="text-md font-bold text-black whitespace-nowrap"
            style={typography.brandBold}
          >
            {message}
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{
                duration: 0.8,
                repeat: Infinity,
                repeatType: "reverse",
              }}
              className="inline-block w-[2px] h-3 bg-white ml-1"
            />
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default AwardBadge;
