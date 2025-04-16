'use client';

import { useState, useEffect } from 'react';
import { db } from '@/lib/firebase';
import { collection, addDoc } from 'firebase/firestore';
import { motion } from 'framer-motion';
import { logPageView, logFormSubmit, logButtonClick } from '@/lib/analytics';
import Link from 'next/link';
import { Listbox } from '@headlessui/react';
import { ChevronUpDownIcon } from '@heroicons/react/20/solid';

interface FormData {
  [key: string]: string;
  owner_name: string;
  email: string;
  phone: string;
  store_name: string;
  biz_type: string;
  biz_location: string;
  biz_start_year: string;
  monthly_card_sales: string;
  has_existing_loan: string;
  existing_loan_amount: string;
  existing_loan_interest: string;
  loan_purpose: string;
  desired_loan_amount: string;
  repayment_plan: string;
  interested_in_subscribe: string;
  message: string;
  agreeToTerms: string;
}

const dropdownFields = [
  {
    name: 'biz_type',
    label: '업종',
    options: ['음식점', '카페', '헬스장', '미용', '기타 서비스']
  },
  {
    name: 'monthly_card_sales',
    label: '월 카드매출액 (대략)',
    options: ['500만원 미만', '500~1000만원 미만', '1000~2000만원 미만', '2000~3000만원 미만', '3000~4000만원 미만', '4000~5000만원 미만', '5000만원 이상']
  },
  {
    name: 'has_existing_loan',
    label: '기존 대출 여부',
    options: ['있음', '없음']
  },
  {
    name: 'loan_purpose',
    label: '대출 사용 목적',
    options: ['대출 상환', '운영비', '인테리어', '신메뉴 개발', '홍보 마케팅', '기타']
  },
  {
    name: 'repayment_plan',
    label: '상환 계획/예상 방법',
    options: ['매일 이자만 상환', '매일 원금+이자 상환', '매월 이자만 상환', '매월 원금+이자 상환']
  },
  {
    name: 'interested_in_subscribe',
    label: '구독 상품권/이용권/교환권 판매도 관심 있으실까요?',
    options: ['예', '아니오']
  }
];

export default function LoanPage() {
  useEffect(() => {
    logPageView('대출 설문', '/loan');
  }, []);

  const [formData, setFormData] = useState<FormData>({
    owner_name: '',
    email: '',
    phone: '',
    store_name: '',
    biz_type: '',
    biz_location: '',
    biz_start_year: '',
    monthly_card_sales: '',
    has_existing_loan: '',
    existing_loan_amount: '',
    existing_loan_interest: '',
    loan_purpose: '',
    desired_loan_amount: '',
    repayment_plan: '',
    interested_in_subscribe: '',
    message: '',
    agreeToTerms: 'false',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.agreeToTerms) {
      alert('개인정보 수집 및 이용에 동의해주세요.');
      return;
    }

    setIsSubmitting(true);
    setError('');

    try {
      if (!formData.phone || !formData.store_name || !formData.biz_type || 
          !formData.biz_location || !formData.biz_start_year || 
          !formData.monthly_card_sales || !formData.has_existing_loan || 
          !formData.loan_purpose || !formData.desired_loan_amount) {
        throw new Error('필수 항목을 모두 입력해주세요.');
      }

      await addDoc(collection(db, 'loan'), {
        ...formData,
        timestamp: new Date()
      });

      logFormSubmit('대출 설문', formData);
      setSubmitSuccess(true);
      setFormData({
        owner_name: '',
        email: '',
        phone: '',
        store_name: '',
        biz_type: '',
        biz_location: '',
        biz_start_year: '',
        monthly_card_sales: '',
        has_existing_loan: '',
        existing_loan_amount: '',
        existing_loan_interest: '',
        loan_purpose: '',
        desired_loan_amount: '',
        repayment_plan: '',
        interested_in_subscribe: '',
        message: '',
        agreeToTerms: 'false',
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : '제출 중 오류가 발생했습니다.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleDropdownChange = (name: string, value: string) => {
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <div className="min-h-screen bg-gray-50 py-6 px-4 sm:px-6 lg:px-8 mt-16">
      <div className="max-w-2xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white rounded-2xl shadow-lg p-6 sm:p-8"
        >
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4 text-center">대출 설문</h1>

          <p className="text-center text-sm text-gray-500 mb-6">
            관계가 금융이 되는 플랫폼 <strong>SooHoSin</strong><br />
            현재 서비스 준비중입니다.<br />
            설문을 토대로 맞춤형 서비스로 찾아뵙겠습니다.
          </p>

          {submitSuccess ? (
            <div className="text-center py-8">
              <h2 className="text-2xl font-semibold text-primary mb-2">제출 완료!</h2>
              <p className="text-gray-600">설문에 참여해주셔서 감사합니다.</p>
              <p className="text-gray-600">서비스를 시작할때 알려드릴께요!</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              {error && <div className="bg-red-100 text-red-700 p-3 rounded-lg">{error}</div>}

              {[{
                label: '대표자 이름', name: 'owner_name'
              }, {
                label: '이메일', name: 'email'
              }, {
                label: '연락 가능한 휴대폰 번호*', name: 'phone', required: true
              }, {
                label: '상호명*', name: 'store_name', required: true
              }, {
                label: '매장 주소 (시/군/구)*', name: 'biz_location', required: true
              }, {
                label: '사업 개시년도*', name: 'biz_start_year', required: true
              }, {
                label: '희망 대출 금액 (백만원)*', name: 'desired_loan_amount', required: true
              }].map(({ label, name, required = false }) => (
                <div key={name}>
                  <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
                  <input
                    type="text"
                    name={name}
                    value={formData[name]}
                    onChange={handleChange}
                    required={required}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-primary focus:border-primary text-sm"
                  />
                </div>
              ))}

              {dropdownFields.map(({ name, label, options }) => (
                <div key={name}>
                  <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
                  <Listbox value={formData[name]} onChange={(value: string) => handleDropdownChange(name, value)}>
                    <div className="relative">
                      <Listbox.Button className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-white text-left focus:ring-primary focus:border-primary text-sm flex justify-between items-center">
                        <span>{formData[name] || '선택해주세요'}</span>
                        <ChevronUpDownIcon className="w-5 h-5 text-gray-400" />
                      </Listbox.Button>
                      <Listbox.Options className="absolute z-10 mt-1 w-full bg-white border border-gray-300 rounded-md shadow-lg max-h-60 overflow-auto focus:outline-none text-sm">
                        {options.map(option => (
                          <Listbox.Option
                            key={option}
                            value={option}
                            className={({ active }: { active: boolean }) =>
                              `cursor-pointer select-none px-4 py-2 ${active ? 'bg-primary/10 text-primary' : 'text-gray-700'}`
                            }
                          >
                            {option}
                          </Listbox.Option>
                        ))}
                      </Listbox.Options>
                    </div>
                  </Listbox>
                  {name === 'has_existing_loan' && formData[name] === '있음' && (
                    <>
                      <div className="mt-4">
                        <label className="block text-sm font-medium text-gray-700 mb-1">현재 남아있는 대출 잔액 (백만원)</label>
                        <input
                          type="text"
                          name="existing_loan_amount"
                          value={formData.existing_loan_amount}
                          onChange={handleChange}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-primary focus:border-primary text-sm"
                        />
                      </div>
                      <div className="mt-4">
                        <label className="block text-sm font-medium text-gray-700 mb-1">기존 대출 금리</label>
                        <Listbox value={formData.existing_loan_interest} onChange={(value: string) => handleDropdownChange('existing_loan_interest', value)}>
                          <div className="relative">
                            <Listbox.Button className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-white text-left focus:ring-primary focus:border-primary text-sm flex justify-between items-center">
                              <span>{formData.existing_loan_interest || '선택해주세요'}</span>
                              <ChevronUpDownIcon className="w-5 h-5 text-gray-400" />
                            </Listbox.Button>
                            <Listbox.Options className="absolute z-10 mt-1 w-full bg-white border border-gray-300 rounded-md shadow-lg max-h-60 overflow-auto focus:outline-none text-sm">
                              {['3~5% 미만', '5~10% 미만', '10~15% 미만', '15~20% 미만', '20% 이상'].map(option => (
                                <Listbox.Option
                                  key={option}
                                  value={option}
                                  className={({ active }: { active: boolean }) =>
                                    `cursor-pointer select-none px-4 py-2 ${active ? 'bg-primary/10 text-primary' : 'text-gray-700'}`
                                  }
                                >
                                  {option}
                                </Listbox.Option>
                              ))}
                            </Listbox.Options>
                          </div>
                        </Listbox>
                      </div>
                    </>
                  )}
                </div>
              ))}

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">기타 요청사항 / 궁금한 점</label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows={4}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-primary focus:border-primary text-sm"
                />
              </div>

              <div className="flex items-start">
                <input
                  id="agreeToTerms"
                  type="checkbox"
                  checked={formData.agreeToTerms === 'true'}
                  onChange={(e) => setFormData({ ...formData, agreeToTerms: e.target.checked ? 'true' : 'false' })}
                  className="mt-1 h-4 w-4 text-primary border-gray-300 rounded"
                />
                <div className="ml-3 text-sm">
                  <label htmlFor="agreeToTerms" className="font-medium text-gray-700">개인정보 수집 및 이용 동의</label>
                  <p className="text-gray-500 mt-1 text-xs">
                    수집항목: 이름, 휴대폰번호, 이메일<br />
                    수집목적: 대출 상담 및 안내<br />
                    보유기간: 3년<br />
                    * 동의를 거부할 수 있으며, 거부 시 서비스 이용이 제한될 수 있습니다.<br />
                    <Link href="/privacy" className="text-primary hover:underline">개인정보 처리방침</Link>
                  </p>
                </div>
              </div>

              <div className="pt-4">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  onClick={() => logButtonClick('대출 설문 제출', '/loan')}
                  className="w-full bg-primary text-white py-3 px-4 rounded-lg hover:bg-primary/90 transition duration-300 disabled:opacity-50"
                >
                  {isSubmitting ? '제출 중...' : '제출하기'}
                </button>
              </div>
            </form>
          )}
        </motion.div>
      </div>
    </div>
  );
} 