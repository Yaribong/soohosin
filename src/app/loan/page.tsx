'use client';

import { useState, useEffect } from 'react';
import { db } from '@/lib/firebase';
import { collection, addDoc } from 'firebase/firestore';
import { motion } from 'framer-motion';
import { logPageView, logFormSubmit } from '@/lib/analytics';
import Link from 'next/link';

export default function LoanPage() {
  useEffect(() => {
    logPageView('대출 설문', '/loan');
  }, []);

  const [formData, setFormData] = useState({
    owner_name: '',
    phone: '',
    email: '',
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
        phone: '',
        email: '',
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
          <h1 className="text-3xl font-bold text-gray-900 mb-8 text-center">대출 설문</h1>
          
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
                  대표자 이름
                </label>
                <input
                  type="text"
                  name="owner_name"
                  value={formData.owner_name}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-primary focus:border-primary"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  연락 가능한 휴대폰 번호 <span className="text-red-500">*</span>
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-primary focus:border-primary"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  이메일
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-primary focus:border-primary"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  상호명 <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="store_name"
                  value={formData.store_name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-primary focus:border-primary"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  업종 <span className="text-red-500">*</span>
                </label>
                <select
                  name="biz_type"
                  value={formData.biz_type}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-primary focus:border-primary"
                >
                  <option value="">선택해주세요</option>
                  <option value="음식점">음식점</option>
                  <option value="카페">카페</option>
                  <option value="헬스장">헬스장</option>
                  <option value="미용">미용</option>
                  <option value="기타 서비스">기타 서비스</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  매장 주소 (시/군/구) <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="biz_location"
                  value={formData.biz_location}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-primary focus:border-primary"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  사업 개시년도 <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="biz_start_year"
                  value={formData.biz_start_year}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-primary focus:border-primary"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  월 카드매출액 (대략) <span className="text-red-500">*</span>
                </label>
                <select
                  name="monthly_card_sales"
                  value={formData.monthly_card_sales}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-primary focus:border-primary"
                >
                  <option value="">선택해주세요</option>
                  <option value="500만원 미만">500만원 미만</option>
                  <option value="500~1000만원 미만">500~1000만원 미만</option>
                  <option value="1000~2000만원 미만">1000~2000만원 미만</option>
                  <option value="2000~3000만원 미만">2000~3000만원 미만</option>
                  <option value="3000~4000만원 미만">3000~4000만원 미만</option>
                  <option value="4000~5000만원 미만">4000~5000만원 미만</option>
                  <option value="5000만원 이상">5000만원 이상</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  기존 대출 여부 <span className="text-red-500">*</span>
                </label>
                <select
                  name="has_existing_loan"
                  value={formData.has_existing_loan}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-primary focus:border-primary"
                >
                  <option value="">선택해주세요</option>
                  <option value="있음">있음</option>
                  <option value="없음">없음</option>
                </select>
              </div>

              {formData.has_existing_loan === '있음' && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    현재 남아있는 대출 잔액 (백만원)
                  </label>
                  <input
                    type="number"
                    name="existing_loan_amount"
                    value={formData.existing_loan_amount}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-primary focus:border-primary"
                  />
                </div>
              ) }

              {formData.has_existing_loan === '있음' && (
                <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  기존 대출 금리
                </label>
                <select
                  name="existing_loan_interest"
                  value={formData.existing_loan_interest}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-primary focus:border-primary"
                >
                  <option value="">선택해주세요</option>
                  <option value="3~5% 미만">3~5% 미만</option>
                  <option value="5~10% 미만">5~10% 미만</option>
                  <option value="10~15% 미만">10~15% 미만</option>
                  <option value="15~20% 미만">15~20% 미만</option>
                  <option value="20% 이상">20% 이상</option>
                </select>
              </div>
              )}

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  대출 사용 목적 <span className="text-red-500">*</span>
                </label>
                <select
                  name="loan_purpose"
                  value={formData.loan_purpose}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-primary focus:border-primary"
                >
                  <option value="">선택해주세요</option>
                  <option value="대출 상환">대출 상환</option>
                  <option value="운영비">운영비</option>
                  <option value="인테리어">인테리어</option>
                  <option value="신메뉴 개발">신메뉴 개발</option>
                  <option value="홍보 마케팅">홍보 마케팅</option>
                  <option value="기타">기타</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  희망 대출 금액 (백만원) <span className="text-red-500">*</span>
                </label>
                <input
                  type="number"
                  name="desired_loan_amount"
                  value={formData.desired_loan_amount}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-primary focus:border-primary"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  상환 계획/예상 방법
                </label>
                <select
                  name="repayment_plan"
                  value={formData.repayment_plan}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-primary focus:border-primary"
                >
                  <option value="">선택해주세요</option>
                  <option value="매일 이자만 상환">매일 이자만 상환</option>
                  <option value="매일 원금+이자 상환">매일 원금+이자 상환</option>
                  <option value="매월 이자만 상환">매월 이자만 상환</option>
                  <option value="매월 원금+이자 상환">매월 원금+이자 상환</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  구독 상품권/이용권/교환권 판매도 관심 있으실까요?
                </label>
                <select
                  name="interested_in_subscribe"
                  value={formData.interested_in_subscribe}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-primary focus:border-primary"
                >
                  <option value="">선택해주세요</option>
                  <option value="예">예</option>
                  <option value="아니오">아니오</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  기타 요청사항 / 궁금한 점
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
                    수집목적: 대출 상담 및 안내<br />
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