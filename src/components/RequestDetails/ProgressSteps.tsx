import React from 'react';
import { Check } from 'lucide-react';

interface ProgressStepsProps {
  currentStep: number;
}

const ProgressSteps: React.FC<ProgressStepsProps> = ({ currentStep }) => {
  const steps = [
    { number: 1, label: 'submitted' },
    { number: 2, label: 'Approval' },
    { number: 3, label: 'Booking' },
    { number: 4, label: 'completed' }
  ];

  return (
    <div className="relative px-4 sm:px-0">
      <div className="flex items-center justify-between relative">
        {/* Background line */}
        <div className="absolute top-4 left-4 right-4 h-0.5 bg-[#8c6d73] z-10">
          <div 
            className="h-full bg-[#8B6B6B] transition-all duration-300"
            style={{ width: `${((currentStep - 1) / (steps.length - 1)) * 100}%` }}
          />
        </div>

        {steps.map((step) => (
          <div key={step.number} className="flex flex-col items-center z-10">
            <div className={`w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center border-2 ${
              step.number <= currentStep 
                ? 'bg-[#8B6B6B] border-[#8B6B6B] text-white' 
                : 'border-gray-300 text-gray-400 bg-white'
            }`}>
              {step.number <= currentStep ? (
                <Check className="w-4 h-4 sm:w-5 sm:h-5" />
              ) : (
                <span className="text-xs sm:text-sm font-medium">{step.number}</span>
              )}
            </div>
            <span className={`text-xs mt-2 text-center ${
              step.number <= currentStep ? 'text-gray-900' : 'text-gray-400'
            }`}>
              {step.label}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProgressSteps;