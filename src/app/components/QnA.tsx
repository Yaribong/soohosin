'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDownIcon } from '@heroicons/react/24/outline';

const QnA = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const faqs = [
    {
      question: '수호신은 어떤 회사인가요?',
      answer: '수호신은 소상공인의 카드매출 데이터를 기반으로 대출을 실행하고, 지역 투자자와 연결하여 매출 상승까지 도와주는 플랫폼입니다. "문제는 대출보다 매출"이라는 철학 아래, 소상공인과 지역사회를 함께 성장시키고자 합니다.'
    },
    {
      question: '수호신 플랫폼은 어떤 방식으로 수익을 얻나요?',
      answer: '수호신은 대출 자체에서 이자 수익을 얻지 않으며, 대출금 기준으로 개인사업자와 투자자 양측에게 소정의 플랫폼 이용 수수료를 부과합니다. 이를 통해 지속가능한 플랫폼 운영이 가능해집니다.'
    },
    {
      question: '투자자는 어떤 방식으로 참여하나요?',
      answer: '투자자는 자신의 주요 활동 지역을 설정하고, 해당 지역의 가게를 선택해 원하는 금액만큼 투자할 수 있습니다. 투자금은 금융기관을 통해 안전하게 관리되며, 가게의 매출에 따라 수익이 발생합니다.'
    },
    {
      question: '투자금은 안전하게 관리되나요?',
      answer: '모든 투자금은 제휴된 금융기관을 통해 별도 계좌에서 안전하게 관리되며, 가게의 카드매출 데이터를 기반으로 운영되기 때문에 비교적 투명하고 안정적인 투자 환경을 제공합니다.'
    },
    {
      question: '기존 대출 서비스와 어떤 점이 다른가요?',
      answer: '기존 금융 서비스가 담보나 신용등급을 중시한다면, 수호신은 카드매출 데이터와 실시간 매출 흐름을 기반으로 대출을 설계합니다. 또한, 투자자와 소비자를 지역 기반으로 연결하여 매출 상승까지 유도하는 점에서 차별화됩니다.'
    }
  ];

  const toggleFaq = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div id="qna" className="py-24 bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">
            자주 묻는 질문
          </h2>
          <p className="mt-4 text-lg text-gray-600">
            수호신에 대해 궁금하신 점을 알려드립니다
          </p>
        </motion.div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="border border-gray-200 rounded-lg overflow-hidden"
            >
              <button
                onClick={() => toggleFaq(index)}
                className="w-full px-6 py-4 flex justify-between items-center bg-white hover:bg-gray-50 transition-colors"
              >
                <span className="text-left font-medium text-gray-900">
                  {faq.question}
                </span>
                <ChevronDownIcon
                  className={`w-5 h-5 text-gray-500 transition-transform ${
                    openIndex === index ? 'transform rotate-180' : ''
                  }`}
                />
              </button>
              <AnimatePresence>
                {openIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="border-t border-gray-200"
                  >
                    <div className="px-6 py-4 text-gray-600 bg-gray-50">
                      {faq.answer}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default QnA; 