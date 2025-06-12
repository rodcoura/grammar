import React from 'react';
import { useTheme } from '../contexts/ThemeContext';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'danger' | 'icon';
  isLoading?: boolean;
}

const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  isLoading = false,
  className = '',
  ...props
}) => {
  const { theme } = useTheme();
  
  const baseStyle = `inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 ${theme === 'dark' ? 'focus:ring-offset-slate-800' : 'focus:ring-offset-white'} disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-150`;

  let variantStyle = '';
  switch (variant) {
    case 'primary':
      variantStyle = 'text-white bg-primary hover:bg-primary-hover focus:ring-primary';
      break;
    case 'secondary':
      variantStyle = theme === 'dark' 
        ? 'text-slate-200 bg-slate-700 hover:bg-slate-600 focus:ring-secondary'
        : 'text-slate-700 bg-slate-200 hover:bg-slate-300 focus:ring-secondary';
      break;
    case 'danger':
      variantStyle = 'text-white bg-red-600 hover:bg-red-700 focus:ring-red-500';
      break;
    case 'icon':
      variantStyle = theme === 'dark'
        ? 'p-2 text-slate-400 hover:text-primary hover:bg-primary-light rounded-full focus:ring-primary focus:bg-primary-light'
        : 'p-2 text-slate-500 hover:text-primary hover:bg-primary-light rounded-full focus:ring-primary focus:bg-primary-light';
      break;
  }

  return (
    <button
      type="button"
      className={`${baseStyle} ${variantStyle} ${className}`}
      disabled={isLoading || props.disabled}
      {...props}
    >
      {isLoading && (
        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
      )}
      {children}
    </button>
  );
};

export default Button;
