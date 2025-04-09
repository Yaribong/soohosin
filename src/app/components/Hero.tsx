'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const Hero = () => {
  const [showIntro, setShowIntro] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setShowIntro(false), 4500); // 4.5초 후 교체
    return () => clearTimeout(timer);
  }, []);

  return (
    <div id="hero" className="relative h-[100vh] flex items-center justify-center bg-white">
      <div className="max-w-4xl mx-auto text-center px-6">
        <AnimatePresence mode="wait">
          {showIntro ? (
            <motion.div
              key="intro"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 1 }}
            >
              <h1 className="text-xl md:text-5xl font-bold text-gray-900 leading-snug mb-6">
                줄 서 있는 맛집을 보면 <br />
                <span className="text-primary">&quot;나도 먹어봐야지?&quot;</span>가 아니라 <br />
                <span className="text-primary">&quot;맛집에 투자해야겠다!&quot;</span>가 떠오른다면?
              </h1>
            </motion.div>
          ) : (
            <motion.div
              key="main"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 1 }}
            >
              <h1 className="text-3xl md:text-5xl font-bold text-gray-900 leading-snug mb-6">
                잘 찾아오셨습니다. <br />
                <span className="text-primary">줄서면서 투자하세요.</span>
              </h1>
              <p className="text-lg md:text-xl text-gray-700 mb-8">
                투자와 소비의 경계를 없애는 <span className="font-semibold text-primary">SooHoSin</span>
              </p>
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                transition={{ type: 'spring', stiffness: 300 }}
              >
                <motion.a
                  href="mailto:info@soohosin.com"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-primary text-white px-8 py-3 rounded-lg text-lg font-semibold hover:bg-primary/90 transition-colors inline-flex items-center cursor-pointer"
                >
                  투자문의
                </motion.a>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Hero;
