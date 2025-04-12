import React from 'react';
import { cn } from '@/lib/utils';

interface QuizOptionProps {
  id: string;
  name: string;
  value: string;
  label: string;
  selected?: boolean;
  correct?: boolean | null; // null when not checked yet
  disabled?: boolean;
  onChange?: (value: string) => void;
  className?: string;
}

export function QuizOption({
  id,
  name,
  value,
  label,
  selected = false,
  correct = null,
  disabled = false,
  onChange,
  className,
}: QuizOptionProps) {
  const handleChange = () => {
    if (!disabled && onChange) {
      onChange(value);
    }
  };

  // Calculate styling based on state
  let stateClass = '';
  
  if (correct === null) {
    // Not checked yet
    stateClass = 'hover:bg-gray-50 dark:hover:bg-gray-700';
  } else if (correct === true && selected) {
    // Correct answer that user selected
    stateClass = 'border-green-500 bg-green-50 dark:bg-green-900 dark:bg-opacity-20';
  } else if (correct === false && selected) {
    // Incorrect answer that user selected
    stateClass = 'border-red-500 bg-red-50 dark:bg-red-900 dark:bg-opacity-20';
  } else if (correct === true && !selected) {
    // Correct answer that user didn't select
    stateClass = 'border-green-500 bg-green-50 dark:bg-green-900 dark:bg-opacity-20 opacity-70';
  }

  return (
    <label
      htmlFor={id}
      className={cn(
        "quiz-option block relative p-4 border border-gray-200 dark:border-gray-700 rounded-lg cursor-pointer transition-all",
        disabled && "opacity-70 cursor-not-allowed",
        stateClass,
        className
      )}
      onClick={handleChange}
    >
      <input 
        type="radio" 
        id={id} 
        name={name} 
        value={value} 
        checked={selected}
        onChange={handleChange}
        className="sr-only peer" 
        disabled={disabled}
      />
      <div className="flex items-center">
        <div className={cn(
          "h-5 w-5 border-2 border-gray-300 dark:border-gray-600 rounded-full flex items-center justify-center",
          selected && "border-primary-500 bg-primary-500"
        )}>
          <span className={cn(
            "material-icons-round text-white", 
            selected ? "opacity-100" : "opacity-0"
          )} style={{ fontSize: "14px" }}>
            check
          </span>
        </div>
        <span className={cn(
          "ml-3 text-gray-700 dark:text-gray-300", 
          selected && "text-primary-700 dark:text-primary-300"
        )}>
          {label}
        </span>
      </div>
      
      {correct !== null && (
        <div className="absolute right-4 top-1/2 -translate-y-1/2">
          {correct ? (
            <span className="material-icons-round text-green-500">check_circle</span>
          ) : (
            selected && <span className="material-icons-round text-red-500">cancel</span>
          )}
        </div>
      )}
    </label>
  );
}
