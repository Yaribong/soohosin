import React from 'react';

const PrivacyPolicy = () => {
  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      <h1 className="text-2xl font-bold mb-8">개인정보처리방침</h1>
      
      <div className="space-y-8">
        <section>
          <h2 className="text-lg font-semibold mb-3">1. 수집하는 개인정보 항목</h2>
          <div className="bg-gray-50 p-4 rounded-lg">
            <p className="text-gray-700">
              수호신은 투자 상담 및 안내를 위해 다음과 같은 개인정보를 수집합니다.
            </p>
            <ul className="mt-2 space-y-1 text-gray-600">
              <li>• 필수항목: 이름, 휴대폰번호, 이메일</li>
              <li>• 선택항목: 투자금액, 투자기간, 투자유형, 위험감수도, 투자경험, 투자목적</li>
            </ul>
          </div>
        </section>

        <section>
          <h2 className="text-lg font-semibold mb-3">2. 개인정보의 처리 목적</h2>
          <div className="bg-gray-50 p-4 rounded-lg">
            <p className="text-gray-700">
              수호신은 수집한 개인정보를 다음의 목적을 위해 활용합니다.
            </p>
            <ul className="mt-2 space-y-1 text-gray-600">
              <li>• 투자 상담 및 안내</li>
              <li>• 투자 관련 정보 제공</li>
              <li>• 서비스 이용에 따른 본인확인</li>
            </ul>
          </div>
        </section>

        <section>
          <h2 className="text-lg font-semibold mb-3">3. 개인정보의 보유 및 이용기간</h2>
          <div className="bg-gray-50 p-4 rounded-lg">
            <p className="text-gray-700">
              수호신은 개인정보 수집 및 이용목적이 달성된 후에는 해당 정보를 지체 없이 파기합니다.
              <br />
              다만, 다음의 정보는 아래의 이유로 명시한 기간 동안 보존합니다.
            </p>
            <div className="mt-3 space-y-2 text-gray-600">
              <p className="font-medium">보존 항목: 이름, 휴대폰번호, 이메일</p>
              <p>보존 근거: 투자 상담 및 안내</p>
              <p>보존 기간: 3년</p>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-lg font-semibold mb-3">4. 개인정보의 파기절차 및 방법</h2>
          <div className="bg-gray-50 p-4 rounded-lg">
            <p className="text-gray-700">
              수호신은 원칙적으로 개인정보 처리목적이 달성된 경우에는 지체없이 해당 개인정보를 파기합니다.
            </p>
            <div className="mt-3 space-y-2 text-gray-600">
              <p className="font-medium">파기절차</p>
              <p>• 이용자가 입력한 정보는 목적이 달성된 후 별도의 DB로 옮겨져 내부 방침 및 기타 관련 법령에 의한 정보보호 사유에 따라 일정 기간 저장된 후 파기됩니다.</p>
              <p className="font-medium mt-2">파기방법</p>
              <p>• 전자적 파일 형태로 저장된 개인정보는 기록을 재생할 수 없는 기술적 방법을 사용하여 삭제합니다.</p>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-lg font-semibold mb-3">5. 개인정보 보호책임자</h2>
          <div className="bg-gray-50 p-4 rounded-lg">
            <p className="text-gray-700">
              수호신은 개인정보 처리에 관한 업무를 총괄해서 책임지고, 개인정보 처리와 관련한 정보주체의 불만처리 및 피해구제 등을 위하여 아래와 같이 개인정보 보호책임자를 지정하고 있습니다.
            </p>
            <div className="mt-3 space-y-1 text-gray-600">
              <p>• 개인정보 보호책임자: 수호신 대표</p>
              <p>• 이메일: info@soohosin.com</p>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-lg font-semibold mb-3">6. 개인정보의 권리와 행사방법</h2>
          <div className="bg-gray-50 p-4 rounded-lg">
            <p className="text-gray-700">
              정보주체는 수호신에 대해 언제든지 다음 각 호의 개인정보 보호 관련 권리를 행사할 수 있습니다.
            </p>
            <ul className="mt-2 space-y-1 text-gray-600">
              <li>• 개인정보 열람요구</li>
              <li>• 오류 등이 있을 경우 정정 요구</li>
              <li>• 삭제요구</li>
              <li>• 처리정지 요구</li>
            </ul>
          </div>
        </section>
      </div>
    </div>
  );
};

export default PrivacyPolicy; 