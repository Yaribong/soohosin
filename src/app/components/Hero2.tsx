'use client';

import { motion } from 'framer-motion';

const Hero2 = () => {
  return (
    <div id="business" className="relative h-screen flex items-center justify-center bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-2xl md:text-6xl font-bold text-gray-900 mb-6">
            소상공인의 카드매출 기반 대출과<br />
            매출 증가를 동시에 만들어주는<br />
            <span className="text-primary">지역 투자 플랫폼</span>
          </h1>
          <p className="text-lg md:text-2xl text-gray-600 mb-8">
            투자자는 소비자가 되고, 가게는 성장합니다.<br />
            수호신은 지역경제의 선순환을 이끌어갑니다.
          </p>
          <div className="space-x-4">
            <motion.a
              href="mailto:info@soohosin.com"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-primary text-white px-8 py-3 rounded-lg text-lg font-semibold hover:bg-primary/90 transition-colors inline-flex items-center cursor-pointer"
            >
              수호신 투자문의
            </motion.a>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Hero2; 