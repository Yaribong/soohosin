'use client';

import Image from 'next/image';

const Footer = () => {
  return (
    <footer className="bg-white border-t border-gray-100">
      <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-start text-left space-y-1.5">
          {/* 회사명 */}
          <div className="flex items-center gap-2">
          <Image src="/images/logo.svg" alt="Logo" width={30} height={30} />
          <Image src="/images/logo_name.svg" alt="SooHoSin" width={100} height={100} />
          </div>
          {/* 회사 정보 */}
          <div className="text-gray-600 space-y-1.5 text-sm">
            <p>주식회사 수호신</p>
            <a href="mailto:info@soohosin.com">info@SooHoSin.com</a>
          </div>

          {/* 저작권 */}
          <div className="text-xs text-gray-500 mt-6">
            <p>Copyright © 2025 SooHoSin. All rights reserved.</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 