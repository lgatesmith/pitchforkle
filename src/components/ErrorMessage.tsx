interface ErrorMessageProps {
  message: string;
  onRetry?: () => void;
}

export default function ErrorMessage({ message, onRetry }: ErrorMessageProps) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-brand-cream">
      <div className="text-center max-w-md p-8">
        <div className="text-6xl mb-4">⚠️</div>
        <h2 className="text-2xl font-bold text-brand-black mb-4">Oops!</h2>
        <p className="text-gray-600 mb-6">{message}</p>
        {onRetry && (
          <button
            onClick={onRetry}
            className="px-6 py-2 bg-brand-black text-white rounded-lg hover:bg-gray-800 transition-colors"
          >
            Try Again
          </button>
        )}
      </div>
    </div>
  );
}
