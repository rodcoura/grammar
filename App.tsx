
import React, { useState, useCallback, useEffect } from 'react';
import { SUPPORTED_LANGUAGES, DEFAULT_LANGUAGE_CODE } from './constants';
import { correctGrammarAndTranslate } from './services/geminiService';
import Header from './components/Header';
import Footer from './components/Footer';
import LanguageSelector from './components/LanguageSelector';
import TextAreaInput from './components/TextAreaInput';
import Button from './components/Button';
import Spinner from './components/Spinner';
import { SparklesIcon, ClipboardCopyIcon, XCircleIcon } from './components/Icons';
import { getTranslator } from './translations';

const App: React.FC = () => {
  const [inputText, setInputText] = useState<string>('');
  const [outputText, setOutputText] = useState<string>('');
  const [selectedLanguage, setSelectedLanguage] = useState<string>(''); // Start with no language selected
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState<boolean>(false);

  const t = getTranslator(selectedLanguage || DEFAULT_LANGUAGE_CODE); // Use default for UI before selection

  const handleLanguageChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedLanguage(event.target.value);
    setError(null); 
    // If user selects a language, and then re-selects the placeholder, treat as no language selected.
    if (event.target.value === '') {
        setInputText(''); // Clear input if language is deselected
        setOutputText('');// Clear output if language is deselected
    }
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInputText(event.target.value);
    if (event.target.value === '') {
        setOutputText('');
    }
    setError(null); 
  };

  const translateError = (errorMessage: string): string => {
    if (errorMessage.includes("API key is invalid or missing")) return t('errorApiKeyInvalid');
    if (errorMessage.includes("quota exceeded")) return t('errorApiQuotaExceeded');
    if (errorMessage.includes("Failed to process text")) return t('errorApiGeneral');
    if (errorMessage.includes("Please enter some text")) return t('errorNoInput');
    return t('errorUnexpected');
  };

  const handleSubmit = useCallback(async () => {
    if (!selectedLanguage) {
      setError(t('selectLanguagePlaceholder')); // Should not happen due to button disable
      return;
    }
    if (!inputText.trim()) {
      setError(t('errorNoInput'));
      return;
    }
    setIsLoading(true);
    setError(null);
    setOutputText('');

    try {
      const result = await correctGrammarAndTranslate(inputText, selectedLanguage);
      setOutputText(result);
    } catch (e: any) {
      setError(translateError(e.message || "An unexpected error occurred."));
      setOutputText('');
    } finally {
      setIsLoading(false);
    }
  }, [inputText, selectedLanguage, t]);

  const handleClearInput = () => {
    setInputText('');
    setOutputText('');
    setError(null);
  };

  const handleCopyOutput = () => {
    if (!outputText) return;
    navigator.clipboard.writeText(outputText)
      .then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      })
      .catch(err => console.error("Failed to copy text: ", err));
  };
  
  useEffect(() => {
    if (inputText || selectedLanguage) {
      setError(null);
    }
  }, [inputText, selectedLanguage]);

  const isLanguageSelected = selectedLanguage !== '';

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col items-center py-6 sm:py-10 px-4">
      <Header t={t} />
      <main className="w-full md:w-[80%] max-w-screen-xl bg-white shadow-2xl rounded-xl p-6 md:p-10 flex flex-col max-h-[80vh] overflow-y-auto">
        <div className="space-y-6">
          <LanguageSelector
            selectedLanguage={selectedLanguage}
            onLanguageChange={handleLanguageChange}
            languages={SUPPORTED_LANGUAGES}
            disabled={isLoading}
            t={t}
          />

          {!isLanguageSelected && (
            <p className="text-center text-slate-600 italic mt-2">
              {t('yourTextPlaceholderDisabled')}
            </p>
          )}

          <div className="grid md:grid-cols-2 gap-6 items-start">
            <TextAreaInput
              id="input-text"
              label={t('yourTextLabel')}
              value={inputText}
              onChange={handleInputChange}
              placeholder={isLanguageSelected ? t('yourTextPlaceholder') : t('yourTextPlaceholderDisabled')}
              rows={18}
              readOnly={isLoading || !isLanguageSelected}
              aria-label={t('yourTextLabel')}
            >
              {inputText && !isLoading && isLanguageSelected && (
                <Button variant="icon" onClick={handleClearInput} aria-label={t('clearInputTextAriaLabel')}>
                  <XCircleIcon />
                </Button>
              )}
            </TextAreaInput>

            <TextAreaInput
              id="output-text"
              label={t('correctedAndTranslatedTextLabel')}
              value={isLoading ? t('processingPlaceholder') : outputText}
              placeholder={t('aiProcessedTextPlaceholder')}
              readOnly
              rows={18}
              className={isLoading ? "animate-pulse" : ""}
              aria-label={t('correctedAndTranslatedTextLabel')}
            >
              {outputText && !isLoading && (
                <Button variant="icon" onClick={handleCopyOutput} aria-label={t('copyOutputTextAriaLabel')}>
                  {copied ? <span className="text-xs text-primary">{t('copiedMessage')}</span> : <ClipboardCopyIcon />}
                </Button>
              )}
            </TextAreaInput>
          </div>

          <div className="text-center">
            <Button 
              onClick={handleSubmit} 
              isLoading={isLoading} 
              disabled={isLoading || !inputText.trim() || !isLanguageSelected}
              className="w-full sm:w-auto px-8 py-3 text-base"
            >
              <SparklesIcon className="-ml-1 mr-2 h-5 w-5" />
              {t('correctAndTranslateButton')}
            </Button>
          </div>

          {isLoading && <Spinner t={t} />}

          {error && (
            <div className="mt-4 p-4 bg-red-50 border border-red-200 text-red-700 rounded-md text-sm" role="alert">
              <p className="font-semibold">{t('errorPrefix')}</p>
              <p>{error}</p>
            </div>
          )}
        </div>
      </main>
      <Footer t={t} />
    </div>
  );
};

export default App;
