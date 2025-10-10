import React from 'react';
import Icon from './../../components/Icons/Icons';

export default function FinancialFeature({ lable, price, percentage }) {
  // بررسی مثبت/منفی بودن درصد
  const isPositive = percentage >= 0;
  const absolutePercentage = Math.abs(percentage);
  const percentageColor = isPositive ? 'text-green-600' : 'text-red-600';

  // تابع جدید برای نمایش صحیح اعداد با علامت
  const formatPercentage = (value) => {
    const formatted = value.toLocaleString('fa-IR');
    return isPositive ? `${formatted}+` : `${formatted}−`; 
  };

  return (
    <div className="flex-grow shadow p-4 rounded-lg bg-white space-y-4">
      <h3 className="font-medium text-gray-700  text-sm">{lable}</h3>
      
      <div className="flex flex-col md:flex-row justify-between items-center mt-2">

        <h5 className="text-xs lg:text-xl font-bold text-gray-800">
          {new Intl.NumberFormat('fa-IR').format(price)} ریال
        </h5>
        
        <div className={`flex items-center gap-2 mt-1 text-[10px] md:text-xs lg:text-sm ${percentageColor}`}>
          <span className="flex  place-items-start">
            <span> % </span>{formatPercentage(absolutePercentage)}
            {isPositive ? (
              <Icon name="arrowUp" size='sm' className="mr-1" color='success'/>
            ) : (
              <Icon name="arrowDown" size='sm' className="mr-1" color='danger'/>
            )}
          </span>
        </div>
      </div>
      
      <span className="text-gray-400 text-[10px] lg:text-xs mt-2 block">
        نسبت به ماه گذشته
      </span>
    </div>
  );
}