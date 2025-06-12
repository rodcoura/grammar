import React from 'react';
import { APP_TITLE } from '../constants';
import { TranslateIcon } from './Icons';
import { TranslationKey } from '../translations';
import { useTheme } from '../contexts/ThemeContext';
import ThemeToggle from './ThemeToggle';

interface HeaderProps {
  t: (key: TranslationKey, defaultText?: string) => string;
}

const Header: React.FC<HeaderProps> = ({ t }) => {
  const { theme } = useTheme();
  
  return (
    <header className="w-full md:w-[80%] max-w-screen-xl mx-auto mb-8 text-center relative">
      <div className="absolute top-0 right-0">
        <ThemeToggle />
      </div>
      <div className="flex items-center justify-center space-x-3 text-primary">
        <TranslateIcon className="w-10 h-10" />
        <h1 className={`text-4xl font-bold ${theme === 'dark' ? 'text-slate-100' : 'text-slate-800'}`}>{APP_TITLE}</h1>
      </div>
      <p className={`mt-2 text-lg ${theme === 'dark' ? 'text-slate-300' : 'text-slate-600'}`}>
        {t('headerSubtitle')}
      </p>
    </header>
  );
};

export default Header;
