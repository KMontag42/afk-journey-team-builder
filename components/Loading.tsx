"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import AnalyitcaOfficialLogoV4 from "@/public/AnalyticaOfficialLogoV4.png";

export default function LoadingComponent() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-black">
      <div className="relative w-64 h-16 mb-8">
        <motion.div
          className="text-white text-2xl"
          animate={{
            opacity: [1, 0.5, 1],
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          <Image
            src={AnalyitcaOfficialLogoV4}
            alt="Analytica Logo"
            layout="fill"
            objectFit="contain"
          />
        </motion.div>
      </div>
    </div>
  );
}
