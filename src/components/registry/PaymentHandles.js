import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

const PaymentHandles = ({ settings }) => {
  const { t } = useTranslation('registry');
  const [copiedText, setCopiedText] = useState('');

  const copyToClipboard = async (text, type) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedText(type);
      setTimeout(() => setCopiedText(''), 2000);
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  return (
    <div className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-xl shadow-lg p-6 md:p-8 mb-8 border border-gray-200 dark:border-gray-700">
      <h3 className="text-xl md:text-2xl font-playfair text-gray-800 dark:text-white mb-6 text-center">
        {t('paymentHandles.title')}
      </h3>
      
      <div className="grid md:grid-cols-2 gap-6">
        {/* Venmo */}
        {settings.venmoHandle && (
          <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-xl p-6 border border-blue-200 dark:border-gray-600 hover:shadow-lg transition-all duration-300">
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 bg-blue-500 rounded-xl flex items-center justify-center mr-4">
                <span className="text-white font-bold text-lg">V</span>
              </div>
              <div>
                <h4 className="text-lg font-semibold text-gray-800 dark:text-white">{t('paymentHandles.venmo.title')}</h4>
                <p className="text-sm text-gray-600 dark:text-gray-300">{t('paymentHandles.venmo.description')}</p>
              </div>
            </div>
            <div className="bg-white/60 dark:bg-gray-700/60 rounded-lg p-3 mb-4 backdrop-blur-sm">
              <code className="text-blue-600 dark:text-blue-400 font-mono text-lg">
                {settings.venmoHandle}
              </code>
            </div>
            <button
              onClick={() => copyToClipboard(settings.venmoHandle, 'venmo')}
              className="w-full bg-blue-500 hover:bg-blue-600 text-white px-4 py-3 rounded-lg transition-colors duration-200 flex items-center justify-center space-x-2"
            >
              <span>{copiedText === 'venmo' ? t('paymentHandles.venmo.copied') : t('paymentHandles.venmo.copyButton')}</span>
            </button>
          </div>
        )}

        {/* Zelle */}
        {settings.zelleHandle && (
          <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-xl p-6 border border-purple-200 dark:border-gray-600 hover:shadow-lg transition-all duration-300">
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 bg-purple-500 rounded-xl flex items-center justify-center mr-4">
                <span className="text-white font-bold text-lg">Z</span>
              </div>
              <div>
                <h4 className="text-lg font-semibold text-gray-800 dark:text-white">{t('paymentHandles.zelle.title')}</h4>
                <p className="text-sm text-gray-600 dark:text-gray-300">{t('paymentHandles.zelle.description')}</p>
              </div>
            </div>
            <div className="bg-white/60 dark:bg-gray-700/60 rounded-lg p-3 mb-4 backdrop-blur-sm">
              <code className="text-purple-600 dark:text-purple-400 font-mono text-lg">
                {settings.zelleHandle}
              </code>
            </div>
            <button
              onClick={() => copyToClipboard(settings.zelleHandle, 'zelle')}
              className="w-full bg-purple-500 hover:bg-purple-600 text-white px-4 py-3 rounded-lg transition-colors duration-200 flex items-center justify-center space-x-2"
            >
              <span>{copiedText === 'zelle' ? t('paymentHandles.zelle.copied') : t('paymentHandles.zelle.copyButton')}</span>
            </button>
          </div>
        )}
      </div>

      {/* Instructions */}
      <div className="mt-6 bg-accent-50 dark:bg-accent-900/20 border border-accent-200 dark:border-accent-700 rounded-lg p-4">
        <h5 className="font-semibold text-accent-800 dark:text-accent-300 mb-2">
          {t('paymentHandles.instructionsTitle')}
        </h5>
        <ol className="list-decimal list-inside text-accent-700 dark:text-accent-400 space-y-1 text-sm">
          {t('paymentHandles.instructions', { returnObjects: true }).map((instruction, index) => (
            <li key={index}>{instruction}</li>
          ))}
        </ol>
      </div>
    </div>
  );
};

export default PaymentHandles;
