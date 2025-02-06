'use client';

import { useEffect } from 'react';
import { AlertTriangle } from 'lucide-react';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-pink-50 to-blue-50 p-4">
      <div className="text-center bg-white p-8 rounded-2xl shadow-2xl max-w-md w-full border border-gray-100">
        {/* Icon with gradient background */}
        <div className="mx-auto mb-6 flex items-center justify-center w-16 h-16 bg-gradient-to-br from-pink-500 to-blue-500 rounded-full">
          <AlertTriangle className="w-8 h-8 text-white" />
        </div>

        <h2 className="text-3xl font-bold text-gray-800 mb-4">Oops! Something Broke</h2>
        <p className="text-gray-600 mb-6">
          It looks like something went wrong on our end. Don&#39;t worry, it&#39;s not you—it&#39;s us. Let&#39;s
          give it another shot!
        </p>

        {/* Try Again Button */}
        <button
          onClick={reset}
          className="w-full bg-gradient-to-br from-pink-500 to-blue-500 text-white py-3 px-6 rounded-lg hover:from-pink-600 hover:to-blue-600 transition-all duration-300 shadow-md hover:shadow-lg"
        >
          Try Again
        </button>

        {/* Support Text */}
        <p className="mt-6 text-sm text-gray-500">
          Still stuck?{' '}
          <a
            href="yusrasaleem679@gmail.com.com"
            className="text-blue-500 hover:text-blue-600 underline"
          >
            Contact Support
          </a>
        </p>
      </div>
    </div>
  );
}