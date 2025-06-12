
import React from 'react';
import { TranslationKey } from '../translations'; // Assuming APP_TITLE is globally managed or not translated

interface FooterProps {
  t: (key: TranslationKey, defaultText?: string) => string;
}

const Footer: React.FC<FooterProps> = ({ t }) => {
  return (
    <footer className="w-full md:w-[80%] max-w-screen-xl mx-auto mt-12 py-6 text-center">
      <p className="text-sm text-slate-500">
        {t('footerPoweredBy')} &copy; {new Date().getFullYear()} SleekGramar.
      </p>
    </footer>
  );
};

export default Footer;
