'use client';

import { motion } from 'framer-motion';
import { ChartBarIcon, CreditCardIcon, ArrowTrendingUpIcon } from '@heroicons/react/24/outline';

const Problem = () => {
  const problems = [
    {
      icon: CreditCardIcon,
      title: '신용점수 시스템의 한계',
      description: '카드매출이 충분한 가게도 낮은 신용점수로 인해 금융 사각지대에 놓여 있습니다.'
    },
    {
      icon: ChartBarIcon,
      title: '대출 이후의 마케팅 공백',
      description: '단순히 대출만 해주면 끝이 아닙니다. 매출을 키워야 진짜 상환이 가능합니다.'
    },
    {
      icon: ArrowTrendingUpIcon,
      title: '투자자의 소비 참여 부족',
      description: '투자자와 가게가 연결되지 않으면, 단골은 생기지 않고 수익도 불안정합니다.'
    }
  ];

  return (
    <div className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl mb-16">
            소상공인이 직면한 문제
          </h2>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            {problems.map((problem, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                viewport={{ once: true }}
                className="relative p-6 bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow"
              >
                <div className="absolute -top-6 left-1/2 transform -translate-x-1/2">
                  <div className="rounded-full bg-primary/10 p-3">
                    <problem.icon className="w-6 h-6 text-primary" />
                  </div>
                </div>
                <h3 className="mt-8 text-xl font-semibold text-gray-900">{problem.title}</h3>
                <p className="mt-4 text-gray-600">{problem.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Problem; 