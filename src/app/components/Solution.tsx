'use client';

import { motion } from 'framer-motion';
import { BanknotesIcon, UsersIcon, ArrowTrendingUpIcon as SolutionTrendingUpIcon } from '@heroicons/react/24/outline'; // Renamed icon to avoid conflict if needed

const Solution = () => {
  const solutions = [
    {
      icon: BanknotesIcon,
      title: '카드매출 데이터 기반 대출',
      description: '복잡한 신용평가 대신 실제 카드매출로 대출 가능성을 평가합니다. 한눈에 보이는 투명한 기준.'
    },
    {
      icon: UsersIcon,
      title: '투자자 = 소비자',
      description: '투자자는 이자수익과 함께 해당 가게에서 혜택을 누리며, 매출 증가를 함께 만들어냅니다.'
    },
    {
      icon: SolutionTrendingUpIcon,
      title: '상생 기반 플랫폼 구조',
      description: '대출, 소비, 성장, 재투자가 선순환되는 구조를 통해 모두가 이익을 얻습니다.'
    }
  ];

  return (
    <div className="py-24 bg-white"> {/* Light gray background to differentiate sections */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl mb-4">
            수호신이 제공하는 솔루션
          </h2>
          <p className="mt-4 text-md lg:text-lg leading-6 text-gray-600 mb-16">
            지역 경제의 선순환을 만드는 수호신의 약속입니다.
          </p>
          <div className="grid grid-cols-1 gap-10 md:grid-cols-3">
            {solutions.map((solution, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                viewport={{ once: true }}
                className="flex flex-col items-center text-center p-6 bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow"
              >
                <div className="rounded-full bg-primary/10 p-4 mb-6">
                  <solution.icon className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">{solution.title}</h3>
                <p className="text-gray-600 flex-grow">{solution.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Solution;
