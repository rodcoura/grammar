
import React from 'react';
import { TranslationKey } from '../translations';

interface SpinnerProps {
  t: (key: TranslationKey, defaultText?: string) => string;
}

const Spinner: React.FC<SpinnerProps> = ({ t }) => {
  return (
    <div className="flex justify-center items-center my-8" role="status" aria-live="polite">
      <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-b-4 border-primary"></div>
      <p className="ml-4 text-slate-600">{t('spinnerLoadingMessage')}</p>
    </div>
  );
};

export default Spinner;
