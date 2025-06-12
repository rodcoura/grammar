import React from 'react';
import { useTheme } from '../contexts/ThemeContext';

interface TextAreaInputProps {
  id: string;
  value: string;
  onChange?: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
  placeholder: string; // Will be dynamic based on language selection
  readOnly?: boolean;
  rows?: number;
  label: string; // Will be translated
  className?: string;
  children?: React.ReactNode; 
  ['aria-label']?: string; 
}

const TextAreaInput: React.FC<TextAreaInputProps> = ({
  id,
  value,
  onChange,
  placeholder,
  readOnly = false,
  rows = 10,
  label,
  className = '',
  children,
  'aria-label': ariaLabel,
}) => {
  const { theme } = useTheme();
  
  return (
    <div className="relative">
      <label htmlFor={id} className={`block text-sm font-medium ${theme === 'dark' ? 'text-slate-300' : 'text-slate-700'} mb-1`}>
        {label}
      </label>
      <textarea
        id={id}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        readOnly={readOnly}
        rows={rows}
        className={`block w-full p-3 border ${theme === 'dark' ? 'border-slate-600' : 'border-slate-300'} rounded-md shadow-sm focus:ring-primary focus:border-primary sm:text-sm focus:outline-none resize-y ${
          readOnly 
            ? theme === 'dark' 
              ? 'bg-slate-700 text-slate-400 cursor-not-allowed' 
              : 'bg-slate-100 text-slate-500 cursor-not-allowed'
            : theme === 'dark' 
              ? 'bg-slate-700 text-slate-100' 
              : 'bg-white text-slate-900'
        } ${theme === 'dark' ? 'placeholder-slate-500' : 'placeholder-slate-400'} ${className}`}
        disabled={readOnly} 
        aria-label={ariaLabel || label}
      />
      {children && <div className="absolute top-9 right-2">{children}</div>}
    </div>
  );
};

export default TextAreaInput;
