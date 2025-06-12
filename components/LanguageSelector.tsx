import React from 'react';
import { Language } from '../types';
import { TranslationKey } from '../translations';
import { ChevronDownIcon } from './Icons';

interface LanguageSelectorProps {
  selectedLanguage: string;
  onLanguageChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  languages: Language[];
  disabled?: boolean;
  t: (key: TranslationKey, defaultText?: string) => string;
}

const LanguageSelector: React.FC<LanguageSelectorProps> = ({
  selectedLanguage,
  onLanguageChange,
  languages,
  disabled = false,
  t,
}) => {
  return (
    <div>
      <label htmlFor="language-select" className="block text-sm font-medium text-slate-700 mb-1">
        {t('targetLanguageLabel')}
      </label>
      <div className="relative">
        <select
          id="language-select"
          value={selectedLanguage}
          onChange={onLanguageChange}
          disabled={disabled}
          className="block w-full p-3 pr-10 border border-slate-300 rounded-md shadow-sm focus:ring-primary focus:border-primary sm:text-sm focus:outline-none disabled:bg-slate-50 disabled:text-slate-500 disabled:cursor-not-allowed appearance-none"
          aria-label={t('targetLanguageLabel')}
        >
          <option value="" disabled={selectedLanguage !== ""} hidden={selectedLanguage !== ""}>
            {t('selectLanguagePlaceholder')}
          </option>
           <option value="" disabled={selectedLanguage === ""}> {/* Real disabled option if nothing selected, but still shows placeholder */}
            {t('selectLanguagePlaceholder')}
          </option>
          {languages.map((lang) => (
            <option key={lang.code} value={lang.code}>
              {lang.name} 
            </option>
          ))}
        </select>
        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
          <ChevronDownIcon className="h-5 w-5 text-slate-400" aria-hidden="true" />
        </div>
      </div>
    </div>
  );
};

export default LanguageSelector;