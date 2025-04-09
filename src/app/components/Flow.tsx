'use client';

import { motion } from 'framer-motion';
import { ArrowLongRightIcon } from '@heroicons/react/24/outline';
import React from 'react';

const Flow = () => {
  const steps = [
    {
      title: '투자와 소비의 결합',
      description: '투자자는 카드매출 기반 대출에 참여하고, 실제 가게에서 소비하며 관계를 시작합니다.',
      color: 'bg-blue-900'
    },
    {
      title: '매출과 가게의 성장',
      description: '투자자의 소비는 소상공인의 매출 증가와 함께, 가게의 지속 가능한 성장으로 이어집니다.',
      color: 'bg-sky-500'
    },
    {
      title: '수익 실현과 재투자',
      description: '이자 수익과 혜택을 받은 투자자는 동일 또는 다른 가게에 재투자하며, 지역 성장의 선순환을 만듭니다.',
      color: 'bg-blue-900'
    }
  ];

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -50 },
    visible: { opacity: 1, x: 0 }
  };

  const arrowVariants = {
    hidden: { opacity: 0, scale: 0 },
    visible: { 
      opacity: 1, 
      scale: 1,
      transition: { delay: 0.2 }
    }
  };

  return (
    <div className="py-24 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.h2
          className="text-3xl font-bold text-center text-gray-900 sm:text-4xl mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          수호신의 순환 구조
        </motion.h2>

        <motion.div
          className="flex flex-col md:flex-row items-stretch justify-between gap-4 md:gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {steps.map((step, index) => (
            <React.Fragment key={step.title}>
              <motion.div
                variants={itemVariants}
                transition={{ duration: 0.5 }}
                className="w-full md:w-1/3 flex"
              >
                <div className={`${step.color} text-white rounded-xl p-6 shadow-lg transform transition-transform hover:scale-105 flex flex-col h-full w-full`}>
                  <h3 className="text-xl font-bold mb-3">{step.title}</h3>
                  <p className="text-white/90 text-sm flex-grow">{step.description}</p>
                </div>
              </motion.div>

              {index < steps.length - 1 && (
                <motion.div
                  variants={arrowVariants}
                  className="hidden md:block self-center"
                >
                  <ArrowLongRightIcon className="w-8 h-8 text-primary" />
                </motion.div>
              )}
            </React.Fragment>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          viewport={{ once: true }}
          className="mt-16 text-center"
        >
          <div className="inline-flex items-center justify-center px-6 py-3 bg-primary/10 rounded-full">
            <p className="text-primary font-medium">
              지속 가능한 지역 경제 생태계 조성
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Flow;
