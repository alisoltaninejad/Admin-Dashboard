import React from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts';

const SimpleFinancialChart = () => {
  // داده‌های نمونه بهینه‌شده
  const data = [
    { month: 'فروردین', cost: 4200, income: 2800, sales: 2400 },
    { month: 'اردیبهشت', cost: 3800, income: 3200, sales: 2900 },
    { month: 'خرداد', cost: 2500, income: 4100, sales: 3500 },
    { month: 'تیر', cost: 3100, income: 3700, sales: 3800 },
    { month: 'مرداد', cost: 2900, income: 4800, sales: 4200 },
    { month: 'شهریور', cost: 3400, income: 5200, sales: 4900 },
  ];

  // تنظیمات رنگ برای خطوط
  const lineColors = {
    cost: '#ef4444', // قرمز
    income: '#22c55e', // سبز
    sales: '#3b82f6' // آبی
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
      <h3 className="text-lg font-bold text-gray-800 mb-4">تحلیل مالی ماهانه</h3>
      
      <div className="h-[350px]">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={data}
            margin={{ top: 5, right: 20, left: 10, bottom: 5 }}
          >
            <CartesianGrid 
              strokeDasharray="3 3" 
              vertical={false}
              stroke="#f3f4f6"
            />
            
            <XAxis 
              dataKey="month"
              axisLine={false}
              tickLine={false}
              tick={{ fill: '#6b7280' }}
            />
            
            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{ fill: '#6b7280' }}
              tickFormatter={(value) => new Intl.NumberFormat('fa-IR').format(value)}
            />
            
            <Tooltip
              contentStyle={{
                borderRadius: '8px',
                border: '1px solid #e5e7eb',
                boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
              }}
              formatter={(value, name) => [
                new Intl.NumberFormat('fa-IR').format(value) + ' ریال',
                name === 'cost' ? 'هزینه' : 
                name === 'income' ? 'درآمد' : 'فروش'
              ]}
              labelFormatter={(label) => `ماه: ${label}`}
            />
            
            <Legend 
              iconType="circle"
              iconSize={8}
              formatter={(value) => (
                <span className="text-gray-600 text-sm mr-1">
                  {value === 'cost' ? 'هزینه‌ها' : 
                   value === 'income' ? 'درآمد' : 'فروش'}
                </span>
              )}
            />
            
            {/* خط هزینه‌ها */}
            <Line
              type="monotone"
              dataKey="cost"
              stroke={lineColors.cost}
              strokeWidth={2}
              dot={{ r: 4 }}
              activeDot={{ r: 6 }}
            />
            
            {/* خط درآمد */}
            <Line
              type="monotone"
              dataKey="income"
              stroke={lineColors.income}
              strokeWidth={2}
              dot={{ r: 4 }}
              activeDot={{ r: 6 }}
            />
            
            {/* خط فروش */}
            <Line
              type="monotone"
              dataKey="sales"
              stroke={lineColors.sales}
              strokeWidth={2}
              dot={{ r: 4 }}
              activeDot={{ r: 6 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
      
      <div className="mt-3 text-xs text-gray-500 text-center">
        اعداد به ریال نمایش داده شده‌اند
      </div>
    </div>
  );
};

export default SimpleFinancialChart;