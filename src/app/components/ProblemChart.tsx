'use client';

import { motion } from 'framer-motion';
import { formatNumber } from '@/utils/format';
import dynamic from 'next/dynamic';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend,
  ChartData,
  ChartOptions,
  Scale,
  CoreScaleOptions,
  ArcElement,
  DoughnutController,
  PieController
} from 'chart.js';
import ChartDataLabels, { Context } from 'chartjs-plugin-datalabels';

// Chart.js 컴포넌트를 동적으로 불러옵니다
const Bar = dynamic(() => import('react-chartjs-2').then(mod => mod.Bar), { ssr: false });
const Pie = dynamic(() => import('react-chartjs-2').then(mod => mod.Pie), { ssr: false });

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  ArcElement,
  DoughnutController,
  PieController,
  Title,
  Tooltip,
  Legend,
  ChartDataLabels
);

interface BarDataset {
  type: 'bar' | 'line';
  label: string;
  data: number[];
  backgroundColor?: string;
  borderColor?: string;
  borderWidth?: number;
  yAxisID?: string;
  order?: number;
  pointBackgroundColor?: string;
  pointBorderColor?: string;
  pointStyle?: string;
  pointRadius?: number;
  pointHoverRadius?: number;
}

interface PieDataset {
  type: 'pie';
  label: string;
  data: number[];
  backgroundColor: string[];
}

type BarChartData = {
  labels: string[];
  datasets: BarDataset[];
};

type PieChartData = {
  labels: string[];
  datasets: PieDataset[];
};

const businessTrendOptions: ChartOptions<'bar'> = {
  responsive: true,
  maintainAspectRatio: false,
  aspectRatio: 1.5,
  interaction: {
    mode: 'index',
    intersect: false,
  },
  plugins: {
    legend: {
      display: true,
      position: 'bottom' as const,
      labels: {
        usePointStyle: true,
        pointStyle: 'circle',
        padding: 20,
        font: {
          family: "'Pretendard', sans-serif",
          size: 12
        }
      }
    },
    tooltip: {
      enabled: false
    },
    datalabels: {
      anchor: 'end',
      align: 'top',
      offset: 0,
      color: '#000',
      font: {
        family: "'Pretendard', sans-serif",
        size: 12,
        weight: 'bold'
      },
      formatter: function(value: number) {
        return formatNumber(value);
      }
    }
  },
  scales: {
    x: {
      grid: {
        display: false
      },
      ticks: {
        font: {
          family: "'Pretendard', sans-serif",
          size: 12
        }
      }
    },
    y: {
      type: 'linear' as const,
      display: false,
      position: 'left' as const,
      min: 500000,
      max: 1800000,
      grid: {
        color: 'rgba(0, 0, 0, 0.06)',
      },
      ticks: {
        font: {
          family: "'Pretendard', sans-serif",
          size: 12
        },
        callback: function(this: Scale<CoreScaleOptions>, tickValue: string | number) {
          return formatNumber(Number(tickValue));
        }
      }
    },
    y1: {
      type: 'linear' as const,
      display: false,
      position: 'right' as const,
      min: 54,
      max: 100,
      grid: {
        drawOnChartArea: false,
      },
      ticks: {
        font: {
          family: "'Pretendard', sans-serif",
          size: 12
        },
        callback: function(this: Scale<CoreScaleOptions>, tickValue: string | number) {
          return Number(tickValue).toFixed(1) + '%';
        }
      }
    }
  }
};

const closureReasonOptions: ChartOptions<'pie'> & {
  plugins: {
    datalabels: {
      color: string;
      font: {
        family: string;
        size: number;
        weight: string;
      };
      formatter: (value: number, context: Context) => string[];
      align: string;
      anchor: string;
    };
  };
} = {
  responsive: true,
  maintainAspectRatio: false,
  aspectRatio: 1.5,
  plugins: {
    legend: {
      display: false
    },
    tooltip: {
      enabled: false
    },
    datalabels: {
      color: '#ffffff',
      font: {
        family: "'Pretendard', sans-serif",
        size: 13,
        weight: 'bold'
      },
      formatter: function(value: number, context: Context) {
        const labels = context.chart.data.labels as string[];
        const label = labels[context.dataIndex];
        return [
          label,
          value + '%'
        ];
      },
      align: 'start',
      anchor: 'end',
      offset: function(context: Context) {
        const label = context.chart.data.labels?.[context.dataIndex] as string;
        return label === '기타' ? 50 : 8;
      },
      textAlign: 'center',
      padding: 6
    }
  }
};

export default function ProblemChart() {
  const businessTrendData: BarChartData = {
    labels: ['2019', '2020', '2021', '2022', '2023'],
    datasets: [
      {
        type: 'bar',
        label: '폐업',
        data: [922159, 895379, 885173, 867292, 986487],
        backgroundColor: 'rgba(0, 70, 150, 0.85)',
        yAxisID: 'y',
        order: 2
      },
      {
        type: 'bar',
        label: '신규',
        data: [1316360, 1519284, 1457425, 1351702, 1275569],
        backgroundColor: 'rgba(200, 200, 200)',
        
        yAxisID: 'y',
        order: 1
      },
      {
        type: 'line',
        label: '폐업률',
        data: [70.05, 58.93, 60.74, 64.16, 77.34],
        borderColor: 'rgba(255, 59, 48, 0.8)',
        backgroundColor: 'rgba(255, 59, 48, 0.1)',
        borderWidth: 2,
        pointBackgroundColor: 'rgba(255, 59, 48, 1)',
        pointBorderColor: 'rgba(255, 59, 48, 1)',
        pointStyle: 'circle',
        pointRadius: 4,
        pointHoverRadius: 8,
        yAxisID: 'y1'
      }
    ]
  };

  const closureReasonData: PieChartData = {
    labels: ['금융비용', '마케팅/\n경영부족', '내수부진', '인건비', '원재료비', '임대/관리비', '과다경쟁', '플랫폼수수료/\n광고비부담', '기타'],
    datasets: [
      {
        type: 'pie',
        label: '폐업 사유',
        data: [11, 7, 17, 17, 15, 15, 11, 5, 2],
        backgroundColor: [
          'rgba(0, 70, 150)',     // 금융비용
          'rgba(0, 70, 150)',     // 마케팅/경영부족
          'rgba(200, 200, 200)',     // 내수부진
          'rgba(200, 200, 200)',     // 인건비
          'rgba(200, 200, 200)',  // 원재료비
          'rgba(200, 200, 200)',  // 임대/관리비
          'rgba(200, 200, 200)',  // 과다경쟁
          'rgba(200, 200, 200)',  // 플랫폼수수료/광고비부담
          'rgba(200, 200, 200)'   // 기타
        ]
      }
    ]
  };

  const debtData: PieChartData = {
    labels: ['2,500만 미만', '5,000만 미만', '7,500만 미만', '1억 미만', '1억 이상'],
    datasets: [
      {
        type: 'pie',
        label: '폐업결심시점 부채액',
        data: [27, 16, 18, 4, 35],
        backgroundColor: [
          'rgba(0, 70, 150)',
          'rgba(0, 70, 150)',
          'rgba(200, 200, 200)',
          'rgba(200, 200, 200)',
          'rgba(200, 200, 200)'
        ]
      }
    ]
  };

  const revenueData: PieChartData = {
    labels: ['6,000만 이상', '3,000만 이상\n6,000만 미만', '1,000만 이상\n3,000만 미만', '500만 이상\n1,000만 미만', '500만 미만'],
    datasets: [
      {
        type: 'pie',
        label: '폐업전 월 매출액',
        data: [21, 19, 28, 15, 17],
        backgroundColor: [
          'rgba(0, 70, 150)',
          'rgba(0, 70, 150)',
          'rgba(200, 200, 200)',
          'rgba(200, 200, 200)',
          'rgba(200, 200, 200)'
        ]
      }
    ]
  };

  const pieChartOptions: ChartOptions<'pie'> & {
    plugins: {
      datalabels: {
        color: string;
        font: {
          family: string;
          size: number;
          weight: string;
        };
        formatter: (value: number, context: Context) => string[];
        align: string;
        anchor: string;
        offset: number;
      };
    };
  } = {
    responsive: true,
    maintainAspectRatio: false,
    aspectRatio: 1.5,
    plugins: {
      legend: {
        display: false
      },
      tooltip: {
        enabled: false
      },
      datalabels: {
        color: '#ffffff',
        font: {
          family: "'Pretendard', sans-serif",
          size: 13,
          weight: 'bold'
        },
        formatter: function(value: number, context: Context) {
          const labels = context.chart.data.labels as string[];
          return [
            labels[context.dataIndex],
            value + '%'
          ];
        },
        align: 'start',
        anchor: 'end',
        offset: 8
      }
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full max-w-7xl mx-auto p-4"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8 mb-8 md:mb-16">
        <div className="bg-white rounded-xl shadow-lg p-4 md:p-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4 md:mb-6">
            <h3 className="text-lg md:text-xl font-bold text-gray-800 mb-2 md:mb-0">사업자 폐업 현황</h3>
            <p className="text-xs md:text-sm text-gray-500">(출처: 통계청, 단위: 명, %)</p>
          </div>
          <div className="relative" style={{ height: '300px', minHeight: '300px', maxHeight: '400px' }}>
            <Bar data={businessTrendData as ChartData<'bar'>} options={businessTrendOptions} />
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-4 md:p-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4 md:mb-6">
            <h3 className="text-lg md:text-xl font-bold text-gray-800 mb-2 md:mb-0">폐업 사유</h3>
            <p className="text-xs md:text-sm text-gray-500">(출처: 중소기업중앙회)</p>
          </div>
          <div className="relative" style={{ height: '300px', minHeight: '300px', maxHeight: '400px' }}>
            <Pie data={closureReasonData as ChartData<'pie'>} options={closureReasonOptions} />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8">
        <div className="bg-white rounded-xl shadow-lg p-4 md:p-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4 md:mb-6">
            <h3 className="text-lg md:text-xl font-bold text-gray-800 mb-2 md:mb-0">폐업결심시점 부채액</h3>
            <p className="text-xs md:text-sm text-gray-500">(출처: 중소기업중앙회)</p>
          </div>
          <div className="relative" style={{ height: '300px', minHeight: '300px', maxHeight: '400px' }}>
            <Pie data={debtData as ChartData<'pie'>} options={pieChartOptions} />
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-4 md:p-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4 md:mb-6">
            <h3 className="text-lg md:text-xl font-bold text-gray-800 mb-2 md:mb-0">폐업전 월 매출액</h3>
            <p className="text-xs md:text-sm text-gray-500">(출처: 중소기업중앙회)</p>
          </div>
          <div className="relative" style={{ height: '300px', minHeight: '300px', maxHeight: '400px' }}>
            <Pie data={revenueData as ChartData<'pie'>} options={pieChartOptions} />
          </div>
        </div>
      </div>
    </motion.div>
  );
} 