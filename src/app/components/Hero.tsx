'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { logButtonClick } from '@/lib/analytics';

const Hero = () => {
  const [showIntro, setShowIntro] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setShowIntro(false), 4500); // 4.5초 후 교체
    return () => clearTimeout(timer);
  }, []);

  return (
    <div id="hero" className="relative h-[100vh] flex items-center justify-center bg-white">
      <div className="max-w-4xl mx-auto text-center px-6">
        <div className="h-[300px] flex flex-col justify-between">
          <AnimatePresence mode="wait">
            {showIntro ? (
              <motion.div
                key="intro"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 1 }}
                className="flex-1 flex items-center justify-center"
              >
                <h1 className="text-xl md:text-5xl font-bold text-gray-900 leading-snug">
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
                className="flex-1 flex flex-col items-center justify-center"
              >
                <h1 className="text-3xl md:text-5xl font-bold text-gray-900 leading-snug mb-6">
                  잘 찾아오셨습니다. <br />
                  <span className="text-primary">줄서면서 투자하세요.</span>
                </h1>
                <p className="text-lg md:text-xl text-gray-700">
                  관계가 금융이 되는 관계 플랫폼 <span className="font-semibold text-primary">SooHoSin</span>
                </p>
              </motion.div>
            )}
          </AnimatePresence>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="flex flex-row gap-4 justify-center items-center"
          >
            <Link
              href="/invest"
              onClick={() => logButtonClick('투자하기', '/')}
              className="inline-flex items-center justify-center px-6 py-3 text-base font-bold text-white bg-primary rounded-lg hover:bg-primary/90 transition duration-300"
            >
              투자하기
            </Link>
            <Link
              href="/loan"
              onClick={() => logButtonClick('대출받기', '/')}
              className="inline-flex items-center justify-center px-6 py-3 text-base font-bold text-primary bg-white rounded-lg border-primary border-2 hover:bg-primary/10 hover:text-primary transition duration-300"
            >
              대출받기
            </Link>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
