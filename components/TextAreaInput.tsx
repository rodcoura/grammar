
import React from 'react';

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
  return (
    <div className="relative">
      <label htmlFor={id} className="block text-sm font-medium text-slate-700 mb-1">
        {label}
      </label>
      <textarea
        id={id}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        readOnly={readOnly}
        rows={rows}
        className={`block w-full p-3 border border-slate-300 rounded-md shadow-sm focus:ring-primary focus:border-primary sm:text-sm focus:outline-none resize-y ${readOnly ? 'bg-slate-100 text-slate-500 cursor-not-allowed' : 'bg-white text-slate-900'} ${className}`}
        disabled={readOnly} 
        aria-label={ariaLabel || label}
      />
      {children && <div className="absolute top-9 right-2">{children}</div>}
    </div>
  );
};

export default TextAreaInput;
