import React from 'react';
import { TranslationKey } from '../translations'; // Assuming APP_TITLE is globally managed or not translated
import { useTheme } from '../contexts/ThemeContext';

interface FooterProps {
  t: (key: TranslationKey, defaultText?: string) => string;
}

const Footer: React.FC<FooterProps> = ({ t }) => {
  const { theme } = useTheme();
  
  return (
    <footer className="w-full md:w-[80%] max-w-screen-xl mx-auto mt-12 py-6 text-center">
      <p className={`text-sm ${theme === 'dark' ? 'text-slate-400' : 'text-slate-500'}`}>
        {t('footerPoweredBy')} &copy; {new Date().getFullYear()} SleekGramar.
      </p>
    </footer>
  );
};

export default Footer;
