'use client';

import { useState, useEffect } from 'react';
import { db } from '@/lib/firebase';
import { collection, addDoc } from 'firebase/firestore';
import { motion } from 'framer-motion';
import { logPageView, logFormSubmit, logButtonClick } from '@/lib/analytics';
import Link from 'next/link';

export default function InvestPage() {
  useEffect(() => {
    logPageView('투자자 설문', '/invest');
  }, []);

  const [formData, setFormData] = useState({
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
    agreeToTerms: false,
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
        agreeToTerms: false,
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : '제출 중 오류가 발생했습니다.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white rounded-2xl shadow-lg p-8"
        >
          <h1 className="text-3xl font-bold text-gray-900 mb-8 text-center">투자자 설문</h1>
          
          {submitSuccess ? (
            <div className="text-center py-8">
              <h2 className="text-2xl font-semibold text-primary mb-4">제출 완료!</h2>
              <p className="text-gray-600">설문에 참여해주셔서 감사합니다.</p>
              <p className="text-gray-600">서비스를 시작할때 알려드릴께요!</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              {error && (
                <div className="bg-red-50 text-red-600 p-4 rounded-lg">
                  {error}
                </div>
              )}

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  이름
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-primary focus:border-primary"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  이메일 (서비스를 시작할때 알려드릴께요!) <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-primary focus:border-primary"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  휴대폰번호 (서비스를 시작할때 알려드릴께요!)
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-primary focus:border-primary"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  거주지/활동지역 (시/군/구)
                </label>
                <input
                  type="text"
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-primary focus:border-primary"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  선호 투자 금액대 <span className="text-red-500">*</span>
                </label>
                <select
                  name="investment_range"
                  value={formData.investment_range}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-primary focus:border-primary"
                >
                  <option value="">선택해주세요</option>
                  <option value="10만원 미만">10만원 미만</option>
                  <option value="10-50만원">10-50만원 미만</option>
                  <option value="50-100만원">50-100만원 미만</option>
                  <option value="100만원 이상">100만원 이상</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  수호신 투자에 관심을 가진 이유 (선택)
                </label>
                <select
                  name="interest_reason"
                  value={formData.interest_reason}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-primary focus:border-primary"
                >
                  <option value="">선택해주세요</option>
                  <option value="가게를 응원하고 싶어서">가게를 응원하고 싶어서</option>
                  <option value="수익 기대">수익 기대</option>
                  <option value="지역경제 기여">지역경제 기여</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  기존 투자 경험
                </label>
                <select
                  name="experience"
                  value={formData.experience}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-primary focus:border-primary"
                >
                  <option value="">선택해주세요</option>
                  <option value="없음">없음</option>
                  <option value="P2P">P2P</option>
                  <option value="주식">주식</option>
                  <option value="부동산">부동산</option>
                  <option value="기타">기타</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  선호 업종
                </label>
                <select
                  name="preferred_sector"
                  value={formData.preferred_sector}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-primary focus:border-primary"
                >
                  <option value="">선택해주세요</option>
                  <option value="식음료">식음료</option>
                  <option value="학원">학원</option>
                  <option value="운동/헬스">운동/헬스</option>
                  <option value="문화/서비스">문화/서비스</option>
                  <option value="뷰티/미용">뷰티/미용</option>
                  <option value="기타">기타</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  투자 빈도
                </label>
                <select
                  name="frequency"
                  value={formData.frequency}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-primary focus:border-primary"
                >
                  <option value="">선택해주세요</option>
                  <option value="매주">매주</option>
                  <option value="월 2~3회">월 2~3회</option>
                  <option value="월 1회 이하">월 1회 이하</option>
                  <option value="없음">없음</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  가게에 기대하는 최소 수익률
                </label>
                <select
                  name="min_expected_return"
                  value={formData.min_expected_return}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-primary focus:border-primary"
                >
                  <option value="">선택해주세요</option>
                  <option value="3~5% 미만">3~5% 미만</option>
                  <option value="5~8% 미만">5~8% 미만</option>
                  <option value="8~10% 미만">8~10% 미만</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  선호하는 혜택
                </label>
                <select
                  name="like_reward"
                  value={formData.like_reward}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-primary focus:border-primary"
                >
                  <option value="">선택해주세요</option>
                  <option value="할인쿠폰">할인쿠폰</option>
                  <option value="이용권">이용권</option>
                  <option value="기타">기타</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  꼭 투자하고 싶은 가게가 있다면 추천해주세요. (지역/가게명)
                </label>
                <input
                  type="text"
                  name="want_store"
                  value={formData.want_store}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-primary focus:border-primary"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  기타 의견
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows={4}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-primary focus:border-primary"
                />
              </div>

              <div className="flex items-start">
                <div className="flex items-center h-5">
                  <input
                    id="agreeToTerms"
                    type="checkbox"
                    checked={formData.agreeToTerms}
                    onChange={(e) => setFormData({ ...formData, agreeToTerms: e.target.checked })}
                    className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
                  />
                </div>
                <div className="ml-3 text-sm">
                  <label htmlFor="agreeToTerms" className="font-medium text-gray-700">
                    개인정보 수집 및 이용 동의
                  </label>
                  <p className="text-gray-500 mt-1">
                    수집항목: 이름, 휴대폰번호, 이메일<br />
                    수집목적: 투자 상담 및 안내<br />
                    보유기간: 3년<br />
                    * 동의를 거부할 수 있으며, 거부 시 서비스 이용이 제한될 수 있습니다.
                    <br />
                    <Link href="/privacy" className="text-primary hover:underline">
                      개인정보 처리방침
                    </Link>
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