import React, { useState } from 'react';

const PaymentHandles = ({ settings }) => {
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
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 md:p-8 mb-8">
      <h3 className="text-xl md:text-2xl font-playfair text-gray-800 dark:text-white mb-6 text-center">
        Send Your Gift 💝
      </h3>
      
      <div className="grid md:grid-cols-2 gap-6">
        {/* Venmo */}
        {settings.venmoHandle && (
          <div className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 rounded-lg p-6 text-center">
            <div className="text-blue-600 text-4xl mb-3">📱</div>
            <h4 className="text-lg font-semibold text-gray-800 dark:text-white mb-2">
              Venmo
            </h4>
            <div className="bg-white dark:bg-gray-700 rounded-lg p-3 mb-4">
              <code className="text-blue-600 dark:text-blue-400 font-mono text-lg">
                {settings.venmoHandle}
              </code>
            </div>
            <button
              onClick={() => copyToClipboard(settings.venmoHandle, 'venmo')}
              className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg transition-colors inline-flex items-center space-x-2"
            >
              <span>{copiedText === 'venmo' ? '✓ Copied!' : 'Copy Handle'}</span>
            </button>
          </div>
        )}

        {/* Zelle */}
        {settings.zelleHandle && (
          <div className="bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-800/20 rounded-lg p-6 text-center">
            <div className="text-purple-600 text-4xl mb-3">💳</div>
            <h4 className="text-lg font-semibold text-gray-800 dark:text-white mb-2">
              Zelle
            </h4>
            <div className="bg-white dark:bg-gray-700 rounded-lg p-3 mb-4">
              <code className="text-purple-600 dark:text-purple-400 font-mono text-lg">
                {settings.zelleHandle}
              </code>
            </div>
            <button
              onClick={() => copyToClipboard(settings.zelleHandle, 'zelle')}
              className="bg-purple-500 hover:bg-purple-600 text-white px-4 py-2 rounded-lg transition-colors inline-flex items-center space-x-2"
            >
              <span>{copiedText === 'zelle' ? '✓ Copied!' : 'Copy Email'}</span>
            </button>
          </div>
        )}
      </div>

      {/* Instructions */}
      <div className="mt-6 bg-accent-50 dark:bg-accent-900/20 border border-accent-200 dark:border-accent-700 rounded-lg p-4">
        <h5 className="font-semibold text-accent-800 dark:text-accent-300 mb-2">
          How to Send Your Gift:
        </h5>
        <ol className="list-decimal list-inside text-accent-700 dark:text-accent-400 space-y-1 text-sm">
          <li>Copy the payment handle above</li>
          <li>Open your Venmo or Zelle app</li>
          <li>Send your gift amount with a sweet message 💕</li>
          <li>Fill out the form below to let us know</li>
        </ol>
      </div>
    </div>
  );
};

export default PaymentHandles;
