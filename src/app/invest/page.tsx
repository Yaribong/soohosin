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
  name: string;
  email: string;
  phone: string;
  location: string;
  investment_range: string;
  interest_reason: string;
  experience: string;
  preferred_sector: string;
  frequency: string;
  min_expected_return: string;
  like_reward: string;
  want_store: string;
  message: string;
  agreeToTerms: string;
}

const dropdownFields = [
  {
    name: 'investment_range', label: '선호 투자 금액대*',
    options: ['10만원 미만', '10~50만원', '50~100만원', '100만원 이상']
  },
  {
    name: 'interest_reason', label: '수호신 투자에 관심을 가진 이유',
    options: ['가게를 응원하고 싶어서', '수익 기대', '지역경제 기여']
  },
  {
    name: 'experience', label: '기존 투자 경험',
    options: ['없음', 'P2P', '주식', '부동산', '기타']
  },
  {
    name: 'preferred_sector', label: '선호 업종',
    options: ['식음료', '학원', '운동/헬스', '문화/서비스', '뷰티/미용', '기타']
  },
  {
    name: 'frequency', label: '투자 빈도',
    options: ['매주', '월 2~3회', '월 1회 이하', '없음']
  },
  {
    name: 'min_expected_return', label: '가게에 기대하는 최소 수익률',
    options: ['3~5% 미만', '5~8% 미만', '8~10% 미만']
  },
  {
    name: 'like_reward', label: '선호하는 혜택',
    options: ['할인쿠폰', '이용권', '기타']
  },
];

export default function InvestPage() {
  useEffect(() => {
    logPageView('투자 설문', '/invest');
  }, []);

  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    phone: '',
    location: '',
    investment_range: '',
    interest_reason: '',
    experience: '',
    preferred_sector: '',
    frequency: '',
    min_expected_return: '',
    like_reward: '',
    want_store: '',
    message: '',
    agreeToTerms: 'false',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!formData.agreeToTerms) {
      alert('개인정보 수집 및 이용에 동의해주세요.');
      return;
    }

    setIsSubmitting(true);
    setError('');

    try {
      if (!formData.email || !formData.investment_range) {
        throw new Error('필수 항목을 모두 입력해주세요.');
      }

      await addDoc(collection(db, 'invest'), {
        ...formData,
        timestamp: new Date()
      });

      logFormSubmit('투자자 설문', formData);
      setSubmitSuccess(true);
      setFormData({
        name: '', email: '', phone: '', location: '', investment_range: '',
        interest_reason: '', experience: '', preferred_sector: '', frequency: '',
        min_expected_return: '', like_reward: '', want_store: '', message: '',
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
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4 text-center">투자 설문</h1>

          <p className="text-center text-sm text-gray-500 mb-6">
            관계가 금융이 되는 플랫폼 <strong>SooHoSin</strong><br />
            현재 서비스 준비중입니다.<br />
            설문을 토대로 맞춤형 서비스로 찾아뵙겠습니다.
          </p>

          {submitSuccess ? (
            <div className="text-center py-8">
              <h2 className="text-2xl font-semibold text-primary mb-2">제출 완료!</h2>
              <p className="text-gray-600">설문에 참여해주셔서 감사합니다.</p>
              <p className="text-gray-600">서비스를 시작할 때 알려드릴게요!</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              {error && <div className="bg-red-100 text-red-700 p-3 rounded-lg">{error}</div>}

              {[{
                label: '이름', name: 'name'
              }, {
                label: '이메일*', name: 'email', type: 'email', required: true
              }, {
                label: '휴대폰번호', name: 'phone'
              }, {
                label: '거주지/활동지역 (시/군/구)', name: 'location'
              }, {
                label: '꼭 투자하고 싶은 가게 (지역/가게명)', name: 'want_store'
              }].map(({ label, name, type = 'text', required = false }) => (
                <div key={name}>
                  <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
                  <input
                    type={type}
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
                </div>
              ))}

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">기타 의견</label>
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
                    수집목적: 투자 상담 및 안내<br />
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
                  onClick={() => logButtonClick('투자자 설문 제출', '/invest')}
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