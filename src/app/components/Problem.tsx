'use client';

import { motion } from 'framer-motion';
import { ChartBarIcon, CreditCardIcon, ArrowTrendingUpIcon } from '@heroicons/react/24/outline';
import ProblemChart from './ProblemChart';

const Problem = () => {
  const problems = [
    {
      icon: CreditCardIcon,
      title: '신용점수 중심의 대출 시스템',
      description: '카드매출이 충분한 가게도 낮은 신용점수로 인해 금융에서 배제되어 결국 사채시장으로 내몰립니다.',
    },
    {
      icon: ChartBarIcon,
      title: '대출만 있고, 성장 지원은 없다',
      description: '폐업 직전 월 3,000만원 이상을 벌던 가게도 있었습니다. 대출만으로는 부족하고, 매출 성장이 병행돼야 합니다.',
    },
    {
      icon: ArrowTrendingUpIcon,
      title: '과도한 이자 부담',
      description: '고금리 사채를 이용한 사업자는 작은 대출에도 이자부담으로 운영이 아닌 상환에 몰두하게 됩니다.',
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
          <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">
            소상공인이 직면한 문제
          </h2>
          <p className="mt-4 text-md lg:text-lg text-gray-600 mb-16">
            수호신이 해결하고자 하는 소상공인의 현실입니다
          </p>

          <ProblemChart />

          <div className="grid grid-cols-1 gap-10 md:grid-cols-3">
            {problems.map((problem, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                viewport={{ once: true }}
                className="flex flex-col items-center text-center p-6 bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow"
              >
                <div className="rounded-full bg-primary/10 p-4 mb-6">
                    <problem.icon className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">{problem.title}</h3>
                <p className="text-gray-600 flex-grow">{problem.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>

    
  );
};

export default Problem; 